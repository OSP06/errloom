/**
 * Manifest Loader
 *
 * Loads the auto-generated scenario manifest which contains
 * metadata for all scenarios without hardcoding them in the app.
 */

export interface ScenarioMetadata {
  id: string;
  title: string;
  duration: string;
  durationMinutes: number;
  teaches: string[];
  description: string;
  level: string;
  completed: boolean;
  locked: boolean;
}

export interface LevelStats {
  count: number;
  totalMinutes: number;
  formattedDuration: string;
}

export interface ManifestLevel {
  scenarios: ScenarioMetadata[];
  stats: LevelStats;
}

export interface Manifest {
  version: string;
  generatedAt: string;
  levels: {
    beginner: ManifestLevel;
    intermediate: ManifestLevel;
    advanced: ManifestLevel;
  };
  stats: {
    totalScenarios: number;
    totalMinutes: number;
    totalHours: number;
  };
}

let cachedManifest: Manifest | null = null;

/**
 * Load the scenario manifest from the public folder
 */
export async function loadManifest(): Promise<Manifest> {
  if (cachedManifest) {
    return cachedManifest;
  }

  try {
    const response = await fetch('/scenarios/index.json');

    if (!response.ok) {
      throw new Error(`Failed to load manifest: ${response.statusText}`);
    }

    const manifest = await response.json();
    cachedManifest = manifest;
    return manifest;
  } catch (error) {
    console.error('Error loading manifest:', error);
    throw error;
  }
}

/**
 * Get scenarios for a specific level
 */
export async function getScenariosByLevel(level: string): Promise<ScenarioMetadata[]> {
  const manifest = await loadManifest();
  return manifest.levels[level as keyof typeof manifest.levels]?.scenarios || [];
}

/**
 * Get all scenarios across all levels
 */
export async function getAllScenarios(): Promise<ScenarioMetadata[]> {
  const manifest = await loadManifest();
  return [
    ...manifest.levels.beginner.scenarios,
    ...manifest.levels.intermediate.scenarios,
    ...manifest.levels.advanced.scenarios
  ];
}

/**
 * Get global statistics
 */
export async function getGlobalStats() {
  const manifest = await loadManifest();
  return manifest.stats;
}

/**
 * Get statistics for a specific level
 */
export async function getLevelStats(level: string): Promise<LevelStats | null> {
  const manifest = await loadManifest();
  return manifest.levels[level as keyof typeof manifest.levels]?.stats || null;
}

/**
 * Find a scenario by ID across all levels
 */
export async function findScenarioById(scenarioId: string): Promise<ScenarioMetadata | null> {
  const allScenarios = await getAllScenarios();
  return allScenarios.find(s => s.id === scenarioId) || null;
}

/**
 * Find the next scenario in a level
 */
export async function getNextScenario(level: string, currentScenarioId: string): Promise<ScenarioMetadata | null> {
  const scenarios = await getScenariosByLevel(level);
  const currentIndex = scenarios.findIndex(s => s.id === currentScenarioId);

  if (currentIndex === -1 || currentIndex === scenarios.length - 1) {
    return null;
  }

  return scenarios[currentIndex + 1];
}
