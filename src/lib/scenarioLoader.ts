import yaml from 'js-yaml';
import type { Scenario } from './types';

export async function loadScenario(level: string, scenarioId: string): Promise<Scenario> {
  try {
    const response = await fetch(`/scenarios/${level}/${scenarioId}.yaml`);

    if (!response.ok) {
      throw new Error(`Failed to load scenario: ${response.statusText}`);
    }

    const yamlText = await response.text();
    const data = yaml.load(yamlText) as unknown;

    return data as Scenario;
  } catch (error) {
    console.error('Error loading scenario:', error);
    throw error;
  }
}
