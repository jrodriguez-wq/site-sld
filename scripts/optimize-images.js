#!/usr/bin/env node
/**
 * Image optimization for the web
 *
 * 1. Converts jpg, jpeg, png, gif → WebP (best format for web: small, widely supported).
 * 2. Re-optimizes existing WebP that are too heavy so they load faster.
 * 3. --check: only reports sizes and suggests what would be optimized (no changes).
 *
 * Requires: sharp (npm install --save-dev sharp)
 *
 * Usage:
 *   node scripts/optimize-images.js --check       # Verify: list images and sizes, flag heavy ones
 *   node scripts/optimize-images.js               # Convert raster → WebP + re-optimize heavy WebP
 *   node scripts/optimize-images.js --delete      # Same + delete original raster after convert
 *   node scripts/optimize-images.js --dry        # Show what would be done (no writes)
 */

import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const EXTENSIONS_RASTER = [".jpg", ".jpeg", ".png", ".gif"];
const WEBP_QUALITY = 80;
const WEBP_EFFORT = 6; // 0–6, higher = smaller file, slower
const MAX_WIDTH = 1920;
const MAX_WEBP_KB = 300; // Re-optimize WebP over this size (KB)
const DRY_RUN = process.argv.includes("--dry");
const DELETE_ORIGINALS = process.argv.includes("--delete");
const CHECK_ONLY = process.argv.includes("--check");

async function ensureSharp() {
  try {
    const sharpModule = await import("sharp");
    return sharpModule.default ?? sharpModule;
  } catch {
    console.error(
      "\n⚠️  sharp is required. Install with:\n   npm install --save-dev sharp\n"
    );
    process.exit(1);
  }
}

const EXCLUDE_PATHS = ["favicon"];

function getRelativePath(absPath) {
  return path.relative(PUBLIC_DIR, absPath).replace(/\\/g, "/");
}

function getAllRasterImages(dir) {
  const results = [];
  function walk(current) {
    if (!fs.existsSync(current)) return;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(current, e.name);
      const relative = path.relative(dir, full);
      if (e.isDirectory()) walk(full);
      else if (EXTENSIONS_RASTER.includes(path.extname(e.name).toLowerCase())) {
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

function getAllWebpImages(dir) {
  const results = [];
  function walk(current) {
    if (!fs.existsSync(current)) return;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(current, e.name);
      const relative = path.relative(dir, full);
      if (e.isDirectory()) walk(full);
      else if (path.extname(e.name).toLowerCase() === ".webp") {
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
  return "/" + getRelativePath(absPath);
}

function toWebpPath(publicPath) {
  const ext = path.extname(publicPath).toLowerCase();
  if (!EXTENSIONS_RASTER.includes(ext)) return publicPath;
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

/** WebP options for smallest size while keeping good quality */
function webpOptions(quality = WEBP_QUALITY) {
  return {
    quality,
    effort: WEBP_EFFORT,
    smartSubsample: true,
  };
}

async function runCheckOnly() {
  console.log("🖼️  Image check (sizes and optimization suggestions)\n");

  const raster = getAllRasterImages(PUBLIC_DIR);
  const webps = getAllWebpImages(PUBLIC_DIR);
  const rows = [];
  let totalBytes = 0;
  let heavyCount = 0;

  for (const absPath of raster) {
    const size = fs.statSync(absPath).size;
    totalBytes += size;
    const kb = (size / 1024).toFixed(1);
    const publicPath = getPublicPath(absPath);
    rows.push({ path: publicPath, sizeKB: parseFloat(kb), size, type: "raster", heavy: size > MAX_WEBP_KB * 1024 });
    if (size > MAX_WEBP_KB * 1024) heavyCount++;
  }
  for (const absPath of webps) {
    const size = fs.statSync(absPath).size;
    totalBytes += size;
    const kb = (size / 1024).toFixed(1);
    const publicPath = getPublicPath(absPath);
    const heavy = size > MAX_WEBP_KB * 1024;
    if (heavy) heavyCount++;
    rows.push({ path: publicPath, sizeKB: parseFloat(kb), size, type: "webp", heavy });
  }

  rows.sort((a, b) => b.size - a.size);

  for (const r of rows) {
    const flag = r.heavy ? " ⚠️  heavy" : r.type === "raster" ? " → convert to WebP" : "";
    const kbStr = String(r.sizeKB.toFixed(1)).padStart(8);
    console.log(`  ${kbStr} KB  ${r.path}${flag}`);
  }

  const totalMB = (totalBytes / (1024 * 1024)).toFixed(1);
  console.log(`\n  Total: ${rows.length} images, ${totalMB} MB`);
  if (heavyCount > 0) {
    console.log(`  ${heavyCount} image(s) over ${MAX_WEBP_KB} KB — run without --check to re-optimize.`);
  }
  if (raster.length > 0) {
    console.log(`  ${raster.length} raster image(s) — run without --check to convert to WebP.`);
  }
  console.log("");
}

async function main() {
  if (CHECK_ONLY) {
    await runCheckOnly();
    return;
  }

  const sharp = await ensureSharp();
  console.log("🖼️  Image optimization (WebP, max " + MAX_WIDTH + "px, quality " + WEBP_QUALITY + ")\n");

  const rasterImages = getAllRasterImages(PUBLIC_DIR);
  const conversions = [];
  const replacements = [];

  // 1) Convert raster → WebP
  for (const absPath of rasterImages) {
    const publicPath = getPublicPath(absPath);
    const webpPath = toWebpPath(publicPath);
    const webpAbsPath = path.join(PUBLIC_DIR, webpPath.slice(1));

    if (publicPath === webpPath) continue;
    if (fs.existsSync(webpAbsPath)) {
      console.log(`⏭️  Skip (WebP exists): ${publicPath}`);
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
          .webp(webpOptions())
          .toFile(webpAbsPath);
      }

      const origSize = fs.statSync(absPath).size;
      const newSize = DRY_RUN ? 0 : fs.statSync(webpAbsPath).size;
      const kbOrig = (origSize / 1024).toFixed(1);
      const kbNew = DRY_RUN ? "?" : (newSize / 1024).toFixed(1);
      const pct = DRY_RUN ? "" : ` -${((1 - newSize / origSize) * 100).toFixed(0)}%`;
      console.log(`✅ ${publicPath} → ${webpPath}  (${kbOrig} KB → ${kbNew} KB${pct})`);

      conversions.push({ absPath, publicPath, webpPath, skipped: false });
      replacements.push({ from: publicPath, to: webpPath });
    } catch (err) {
      console.error(`❌ ${publicPath}: ${err.message}`);
    }
  }

  // 2) Re-optimize heavy WebP (in place)
  const webpImages = getAllWebpImages(PUBLIC_DIR);
  let reoptCount = 0;
  for (const absPath of webpImages) {
    const stat = fs.statSync(absPath);
    if (stat.size <= MAX_WEBP_KB * 1024) continue;

    const publicPath = getPublicPath(absPath);
    const tmpPath = absPath + ".tmp.webp";

    try {
      let newSize = stat.size;
      if (!DRY_RUN) {
        const buffer = fs.readFileSync(absPath);
        const img = sharp(buffer);
        const meta = await img.metadata();
        const width = meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : meta.width;
        await img
          .resize(width, null, { withoutEnlargement: true })
          .webp(webpOptions())
          .toFile(tmpPath);
        newSize = fs.statSync(tmpPath).size;
        if (newSize < stat.size) {
          fs.renameSync(tmpPath, absPath);
        } else {
          fs.unlinkSync(tmpPath);
          newSize = stat.size;
        }
      }

      const origKB = (stat.size / 1024).toFixed(1);
      const newKB = DRY_RUN ? "?" : (newSize / 1024).toFixed(1);
      const pct = DRY_RUN ? "" : ` -${((1 - newSize / stat.size) * 100).toFixed(0)}%`;
      console.log(`${DRY_RUN ? "📝 Would re-optimize" : "✅"} ${publicPath}  (${origKB} KB → ${newKB} KB${pct})`);
      reoptCount++;
    } catch (err) {
      if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
      console.error(`❌ ${publicPath}: ${err.message}`);
    }
  }

  if (replacements.length > 0) {
    const sourceFiles = findAllSourceFiles();
    let updatedCount = 0;
    for (const fullPath of sourceFiles) {
      if (updateSourceFile(fullPath, replacements)) {
        const relPath = path.relative(process.cwd(), fullPath);
        console.log(DRY_RUN ? `📝 Would update: ${relPath}` : `📝 Updated: ${relPath}`);
        updatedCount++;
      }
    }
  }

  if (DELETE_ORIGINALS && !DRY_RUN) {
    for (const { absPath, publicPath, webpPath, skipped } of conversions) {
      const webpAbsPath = path.join(PUBLIC_DIR, webpPath.slice(1));
      const webpExists = fs.existsSync(webpAbsPath);
      if (fs.existsSync(absPath) && webpExists) {
        fs.unlinkSync(absPath);
        console.log(`🗑️  Deleted: ${publicPath}`);
      }
    }
  } else if (DELETE_ORIGINALS && DRY_RUN) {
    console.log("\n[--dry] Would delete raster originals where WebP exists (run without --dry to apply)");
  }

  const verb = DRY_RUN ? "would be " : "";
  const total = conversions.length + reoptCount;
  if (total > 0) {
    console.log(`\n✅ Done. ${conversions.length} converted, ${reoptCount} re-optimized. ${verb}updated.`);
  } else {
    console.log("\n✓ No images to convert or re-optimize. Use --check to list sizes.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
