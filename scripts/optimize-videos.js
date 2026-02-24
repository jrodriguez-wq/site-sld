#!/usr/bin/env node
/**
 * Optimize Videos Script
 * Compresses MP4 videos for web and ensures faststart (smooth streaming, no freezing).
 *
 * Why videos stutter: large file size + moov atom at end of file = browser must
 * download most of the file before playback. This script compresses and moves
 * metadata to the start (faststart) so playback can start immediately.
 *
 * Requires: ffmpeg (apt install ffmpeg / brew install ffmpeg)
 *
 * Usage:
 *   node scripts/optimize-videos.js                    # Optimize; creates .optimized
 *   node scripts/optimize-videos.js --replace          # Optimize + replace originals (old → .backup)
 *   node scripts/optimize-videos.js --replace --delete-old   # Optimize + replace + remove old (no .backup)
 *   node scripts/optimize-videos.js --force            # Re-encode all (even if under size)
 *   node scripts/optimize-videos.js --dry              # Show what would be done
 */

import fs from "fs";
import path from "path";
import { execSync, spawnSync } from "child_process";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const DRY_RUN = process.argv.includes("--dry");
const FORCE_RECODE = process.argv.includes("--force");
const REPLACE_ORIGINALS = process.argv.includes("--replace");
const DELETE_OLD = process.argv.includes("--delete-old");

// Only process these site videos; others in public/ are ignored (e.g. videoplayback.mp4)
const ALLOWED_NAMES = [/^SLD-video1\.mp4$/i, /^SLD-video2\.(mp4|MP4)$/i];
// Targets: keep hero small for autoplay; content videos smaller for click-to-play
const TARGETS = [
  { pattern: /SLD-video1\.mp4$/i, maxSizeMB: 2, crf: 30, preset: "medium", label: "hero" },
  { pattern: /SLD-video2\.(mp4|MP4)$/i, maxSizeMB: 8, crf: 32, preset: "medium", label: "content" },
];

function getAllVideos(dir) {
  const results = [];
  function walk(current) {
    if (!fs.existsSync(current)) return;
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(current, e.name);
      if (e.isDirectory()) walk(full);
      else if (/\.(mp4|webm|mov)$/i.test(e.name)) results.push(full);
    }
  }
  walk(dir);
  return results;
}

function getSizeMB(filePath) {
  return fs.statSync(filePath).size / (1024 * 1024);
}

function hasFFmpeg() {
  try {
    execSync("ffmpeg -version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function runFaststartOnly(absPath, outPath) {
  const result = spawnSync(
    "ffmpeg",
    ["-i", absPath, "-c", "copy", "-movflags", "+faststart", "-y", outPath],
    { stdio: "pipe" }
  );
  return result.status === 0;
}

function runFullEncode(absPath, outPath, target) {
  const result = spawnSync(
    "ffmpeg",
    [
      "-i", absPath,
      "-c:v", "libx264",
      "-crf", String(target.crf),
      "-preset", target.preset,
      "-movflags", "+faststart",
      "-an",
      "-y",
      outPath,
    ],
    { stdio: "pipe" }
  );
  return result.status === 0;
}

async function main() {
  console.log("🎬 Video optimization (web streaming)\n");

  if (!hasFFmpeg()) {
    console.error("⚠️  ffmpeg is required:\n   sudo apt install ffmpeg  (Linux)\n   brew install ffmpeg  (macOS)\n");
    process.exit(1);
  }

  const allVideos = getAllVideos(PUBLIC_DIR);
  const videos = allVideos.filter((absPath) =>
    ALLOWED_NAMES.some((re) => re.test(path.basename(absPath)))
  );
  if (videos.length === 0) {
    console.log("No site videos found in public/ (allowed: SLD-video1.mp4, SLD-video2.MP4)");
    return;
  }
  if (allVideos.length > videos.length) {
    console.log(`ℹ️  Skipping ${allVideos.length - videos.length} other video(s) in public/\n`);
  }

  const toReplace = [];

  for (const absPath of videos) {
    const name = path.basename(absPath);
    const sizeMB = getSizeMB(absPath);
    const target = TARGETS.find((t) => t.pattern.test(name)) || {
      maxSizeMB: 8,
      crf: 30,
      preset: "medium",
      label: "default",
    };

    const needsFullEncode = FORCE_RECODE || sizeMB > target.maxSizeMB;
    const outPath = absPath.replace(/(\.\w+)$/, ".optimized$1");

    if (DRY_RUN) {
      if (needsFullEncode) {
        console.log(`📝 Would re-encode: ${name} (${sizeMB.toFixed(1)}MB, target ${target.maxSizeMB}MB for ${target.label})`);
      } else {
        console.log(`📝 Would apply faststart only: ${name} (${sizeMB.toFixed(1)}MB)`);
      }
      toReplace.push({ absPath, outPath });
      continue;
    }

    if (needsFullEncode) {
      console.log(`🔄 Re-encoding: ${name} (${sizeMB.toFixed(1)}MB → target ${target.maxSizeMB}MB, ${target.label})...`);
      if (!runFullEncode(absPath, outPath, target)) {
        console.error(`❌ Failed: ${name}`);
        continue;
      }
      const newSizeMB = getSizeMB(outPath);
      console.log(`   ✅ ${sizeMB.toFixed(1)}MB → ${newSizeMB.toFixed(1)}MB`);
    } else {
      console.log(`🔄 Applying faststart: ${name} (${sizeMB.toFixed(1)}MB)...`);
      if (!runFaststartOnly(absPath, outPath)) {
        console.error(`❌ Failed: ${name}`);
        continue;
      }
      console.log(`   ✅ faststart applied`);
    }

    toReplace.push({ absPath, outPath });
  }

  if (REPLACE_ORIGINALS && toReplace.length > 0 && !DRY_RUN) {
    const backupPaths = [];
    console.log("\n📦 Replacing originals with optimized...");
    for (const { absPath, outPath } of toReplace) {
      if (!fs.existsSync(outPath)) continue;
      const backupPath = absPath.replace(/(\.\w+)$/, ".backup$1");
      fs.renameSync(absPath, backupPath);
      fs.renameSync(outPath, absPath);
      backupPaths.push(backupPath);
      console.log(`   ${path.basename(absPath)} ← optimized (old → ${path.basename(backupPath)})`);
    }
    if (DELETE_OLD && backupPaths.length > 0) {
      console.log("\n🗑️  Removing old files (--delete-old)...");
      for (const backupPath of backupPaths) {
        if (fs.existsSync(backupPath)) {
          fs.unlinkSync(backupPath);
          console.log(`   Removed ${path.basename(backupPath)}`);
        }
      }
    } else if (backupPaths.length > 0) {
      console.log("\n💡 Old files kept as .backup. Use --delete-old to remove them.");
    }
  } else if (toReplace.length > 0 && !DRY_RUN) {
    console.log("\n💡 Next: run with --replace to use optimized files, or --replace --delete-old to replace and remove old.");
  }

  console.log("\nDone.");
}

main().catch(console.error);
