#!/usr/bin/env node
/**
 * Optimize Videos Script
 * Compresses MP4 videos for web using ffmpeg.
 * Target: <5MB for hero/background, <15MB for content videos.
 *
 * Requires: ffmpeg installed (apt install ffmpeg / brew install ffmpeg)
 *
 * Usage:
 *   node scripts/optimize-videos.js              # Process all videos
 *   node scripts/optimize-videos.js --dry        # Show commands without running
 */

import fs from "fs";
import path from "path";
import { execSync, spawnSync } from "child_process";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const DRY_RUN = process.argv.includes("--dry");

const TARGETS = [
  { pattern: /SLD-video1\.mp4$/i, maxSizeMB: 3, crf: 28, preset: "medium" },
  { pattern: /SLD-video2\.(mp4|MP4)$/i, maxSizeMB: 15, crf: 30, preset: "medium" },
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

async function main() {
  console.log("🎬 Video optimization\n");

  if (!hasFFmpeg()) {
    console.error("⚠️  ffmpeg is required. Install with:\n   sudo apt install ffmpeg  (Linux)\n   brew install ffmpeg  (macOS)\n");
    process.exit(1);
  }

  const videos = getAllVideos(PUBLIC_DIR);
  if (videos.length === 0) {
    console.log("No videos found in public/");
    return;
  }

  for (const absPath of videos) {
    const name = path.basename(absPath);
    const sizeMB = getSizeMB(absPath);
    const target = TARGETS.find((t) => t.pattern.test(name)) || {
      maxSizeMB: 10,
      crf: 28,
      preset: "medium",
    };

    if (sizeMB <= target.maxSizeMB) {
      console.log(`⏭️  Skip (already optimized): ${name} (${sizeMB.toFixed(1)}MB)`);
      continue;
    }

    const outPath = absPath.replace(/(\.\w+)$/, ".optimized$1");
    const cmd = `ffmpeg -i "${absPath}" -c:v libx264 -crf ${target.crf} -preset ${target.preset} -movflags +faststart -an -y "${outPath}"`;

    if (DRY_RUN) {
      console.log(`📝 Would optimize: ${name} (${sizeMB.toFixed(1)}MB → target ${target.maxSizeMB}MB)`);
      console.log(`   ${cmd}\n`);
      continue;
    }

    console.log(`🔄 Optimizing: ${name} (${sizeMB.toFixed(1)}MB)...`);
    const result = spawnSync("ffmpeg", [
      "-i", absPath,
      "-c:v", "libx264",
      "-crf", String(target.crf),
      "-preset", target.preset,
      "-movflags", "+faststart",
      "-an",
      "-y",
      outPath,
    ], { stdio: "pipe" });

    if (result.status !== 0) {
      console.error(`❌ Failed: ${name}`);
      continue;
    }

    const newSizeMB = getSizeMB(outPath);
    console.log(`✅ ${name} → ${path.basename(outPath)} (${sizeMB.toFixed(1)}MB → ${newSizeMB.toFixed(1)}MB)`);
    console.log(`   Replace original: mv "${outPath}" "${absPath}"\n`);
  }

  console.log("Done. Review .optimized files and replace originals manually.");
}

main().catch(console.error);
