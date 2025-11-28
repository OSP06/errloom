#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCENARIOS_DIR = join(__dirname, '../public/scenarios');
const OUTPUT_FILE = join(SCENARIOS_DIR, 'index.json');

const LEVELS = ['beginner', 'intermediate', 'advanced'];

/**
 * Parse duration string (e.g., "15 minutes", "2 hours") to minutes
 */
function parseDuration(durationStr) {
  const match = durationStr.match(/(\d+)\s*(minute|min|hour|hr)/i);
  if (!match) return 0;

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  if (unit.startsWith('hour') || unit === 'hr') {
    return value * 60;
  }
  return value;
}

/**
 * Format duration in minutes to human-readable string
 */
function formatDuration(minutes) {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  }
  return `${hours}h ${mins}m`;
}

/**
 * Load and parse a single scenario YAML file
 */
async function loadScenario(level, filename) {
  const filePath = join(SCENARIOS_DIR, level, filename);
  const content = await readFile(filePath, 'utf-8');
  const data = yaml.load(content);

  // Extract only the metadata we need for the manifest
  const metadata = {
    id: data.id,
    title: data.title,
    duration: data.duration,
    durationMinutes: parseDuration(data.duration),
    teaches: data.teaches || [],
    description: data.description || '',
    level: data.level,
    completed: false,
    locked: false
  };

  // Add optional fields if they exist
  if (data.featured) {
    metadata.featured = data.featured;
  }
  if (data.viral) {
    metadata.viral = data.viral;
  }
  if (data.modes && Array.isArray(data.modes)) {
    metadata.modes = data.modes;
  }

  return metadata;
}

/**
 * Load all scenarios for a given level
 */
async function loadLevelScenarios(level) {
  const levelDir = join(SCENARIOS_DIR, level);
  const files = await readdir(levelDir);
  const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));

  const scenarios = await Promise.all(
    yamlFiles.map(file => loadScenario(level, file))
  );

  // Sort by duration for consistent ordering
  scenarios.sort((a, b) => a.durationMinutes - b.durationMinutes);

  return scenarios;
}

/**
 * Generate the complete manifest
 */
async function generateManifest() {
  console.log('🔍 Scanning scenario files...');

  const manifest = {
    version: '1.0',
    generatedAt: new Date().toISOString(),
    levels: {},
    stats: {
      totalScenarios: 0,
      totalMinutes: 0,
      totalHours: 0
    }
  };

  for (const level of LEVELS) {
    try {
      const scenarios = await loadLevelScenarios(level);

      const totalMinutes = scenarios.reduce((sum, s) => sum + s.durationMinutes, 0);

      manifest.levels[level] = {
        scenarios,
        stats: {
          count: scenarios.length,
          totalMinutes,
          formattedDuration: formatDuration(totalMinutes)
        }
      };

      manifest.stats.totalScenarios += scenarios.length;
      manifest.stats.totalMinutes += totalMinutes;

      console.log(`  ✅ ${level}: ${scenarios.length} scenarios (${formatDuration(totalMinutes)})`);
    } catch (error) {
      console.error(`  ❌ Error loading ${level} scenarios:`, error.message);
      process.exit(1);
    }
  }

  manifest.stats.totalHours = Math.ceil(manifest.stats.totalMinutes / 60);

  // Write the manifest file
  await writeFile(OUTPUT_FILE, JSON.stringify(manifest, null, 2), 'utf-8');

  console.log(`\n📦 Generated manifest:`);
  console.log(`  Total scenarios: ${manifest.stats.totalScenarios}`);
  console.log(`  Total duration: ${formatDuration(manifest.stats.totalMinutes)} (~${manifest.stats.totalHours}+ hours)`);
  console.log(`  Output: ${OUTPUT_FILE}\n`);
}

// Run the generator
generateManifest().catch(error => {
  console.error('❌ Failed to generate manifest:', error);
  process.exit(1);
});
