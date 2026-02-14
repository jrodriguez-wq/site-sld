#!/usr/bin/env node
/**
 * Optimize Images Script
 * Converts jpg, jpeg, png, gif → webp in public/ and updates all source references.
 *
 * Usage:
 *   node scripts/optimize-images.js          # Convert + update refs, keep originals
 *   node scripts/optimize-images.js --delete # Convert + update refs + delete originals
 *   node scripts/optimize-images.js --dry    # Show what would be done (no changes)
 */

import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif"];
const WEBP_QUALITY = 82;
const MAX_WIDTH = 1920;
const DRY_RUN = process.argv.includes("--dry");
const DELETE_ORIGINALS = process.argv.includes("--delete");

async function ensureSharp() {
  try {
    const sharpModule = await import("sharp");
    return sharpModule.default ?? sharpModule;
  } catch {
    console.error(
      "\n⚠️  sharp is required. Install it with:\n   npm install --save-dev sharp\n"
    );
    process.exit(1);
  }
}

const EXCLUDE_PATHS = ["favicon"]; // Skip favicons (PNG often required)

function getAllRasterImages(dir) {
  const results = [];
  function walk(current) {
    if (!fs.existsSync(current)) return;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(current, e.name);
      const relative = path.relative(dir, full);
      if (e.isDirectory()) walk(full);
      else if (EXTENSIONS.includes(path.extname(e.name).toLowerCase())) {
        const skip = EXCLUDE_PATHS.some((p) =>
          relative.split(path.sep).includes(p)
        );
        if (!skip) results.push(full);
      }
    }
  }
  walk(dir);
  return results;
}

function getPublicPath(absPath) {
  const relative = path.relative(PUBLIC_DIR, absPath);
  return "/" + relative.replace(/\\/g, "/");
}

function toWebpPath(publicPath) {
  const ext = path.extname(publicPath).toLowerCase();
  if (!EXTENSIONS.includes(ext)) return publicPath;
  return publicPath.slice(0, -ext.length) + ".webp";
}

function findAllSourceFiles() {
  const ext = [".ts", ".tsx", ".js", ".json"];
  const dirs = ["app", "components", "lib", "data"];
  const files = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) walk(full);
      else if (ext.includes(path.extname(name))) files.push(full);
    }
  }
  for (const d of dirs) {
    walk(path.join(process.cwd(), d));
  }
  return files;
}

function updateSourceFile(filePath, replacements) {
  let content = fs.readFileSync(filePath, "utf8");
  let changed = false;
  for (const { from, to } of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }
  if (changed && !DRY_RUN) {
    fs.writeFileSync(filePath, content);
  }
  return changed;
}

async function main() {
  const sharp = await ensureSharp();
  console.log("🖼️  Image optimization (→ WebP)\n");

  const images = getAllRasterImages(PUBLIC_DIR);
  const conversions = [];
  const replacements = [];

  for (const absPath of images) {
    const publicPath = getPublicPath(absPath);
    const webpPath = toWebpPath(publicPath);
    const webpAbsPath = path.join(PUBLIC_DIR, webpPath.slice(1));

    if (publicPath === webpPath) continue;
    if (fs.existsSync(webpAbsPath)) {
      console.log(`⏭️  Skip (already exists): ${publicPath} → ${webpPath}`);
      replacements.push({ from: publicPath, to: webpPath });
      conversions.push({ absPath, publicPath, webpPath, skipped: true });
      continue;
    }

    try {
      if (!DRY_RUN) {
        const buffer = fs.readFileSync(absPath);
        const img = sharp(buffer);
        const meta = await img.metadata();
        const width = meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : meta.width;

        await img
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: WEBP_QUALITY })
          .toFile(webpAbsPath);
      }

      const origSize = fs.statSync(absPath).size;
      const newSize = DRY_RUN ? 0 : fs.statSync(webpAbsPath).size;
      const saved = origSize - newSize;

      const kbOrig = (origSize / 1024).toFixed(1);
      const kbNew = DRY_RUN ? "?" : (newSize / 1024).toFixed(1);
      const pct = DRY_RUN ? "" : `, -${((saved / origSize) * 100).toFixed(0)}%`;
      console.log(`✅ ${publicPath} → ${webpPath}  (${kbOrig}KB → ${kbNew}KB${pct})`);

      conversions.push({ absPath, publicPath, webpPath, skipped: false });
      replacements.push({ from: publicPath, to: webpPath });
    } catch (err) {
      console.error(`❌ ${publicPath}: ${err.message}`);
    }
  }

  if (replacements.length === 0) {
    console.log("\n✓ No images to convert.");
    return;
  }

  // Update source files
  const sourceFiles = findAllSourceFiles();
  let updatedCount = 0;
  for (const fullPath of sourceFiles) {
    if (updateSourceFile(fullPath, replacements)) {
      const relPath = path.relative(process.cwd(), fullPath);
      console.log(DRY_RUN ? `📝 Would update: ${relPath}` : `📝 Updated: ${relPath}`);
      updatedCount++;
    }
  }

  // Delete originals if requested
  if (DELETE_ORIGINALS && !DRY_RUN) {
    for (const { absPath, publicPath, skipped } of conversions) {
      if (!skipped && fs.existsSync(absPath)) {
        fs.unlinkSync(absPath);
        console.log(`🗑️  Deleted: ${publicPath}`);
      }
    }
  } else if (DELETE_ORIGINALS && DRY_RUN) {
    console.log("\n[--dry] Would delete originals (run without --dry to apply)");
  }

  const verb = DRY_RUN ? "would be " : "";
  console.log(`\n✅ Done. ${conversions.length} images processed, ${updatedCount} source files ${verb}updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
