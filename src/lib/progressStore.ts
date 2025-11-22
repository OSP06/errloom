import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedScenarios: Set<string>;
  markScenarioComplete: (scenarioId: string) => void;
  isScenarioComplete: (scenarioId: string) => boolean;
  getCompletedCount: (level: string, totalScenarios: number) => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedScenarios: new Set<string>(),

      markScenarioComplete: (scenarioId: string) => {
        set((state) => ({
          completedScenarios: new Set(state.completedScenarios).add(scenarioId)
        }));
      },

      isScenarioComplete: (scenarioId: string) => {
        return get().completedScenarios.has(scenarioId);
      },

      getCompletedCount: (level: string) => {
        const completed = get().completedScenarios;
        let count = 0;
        completed.forEach((id) => {
          if (id.startsWith(`${level}-`)) {
            count++;
          }
        });
        return count;
      }
    }),
    {
      name: 'errloom-progress',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state } = JSON.parse(str);
          return {
            state: {
              ...state,
              completedScenarios: new Set(state.completedScenarios || [])
            }
          };
        },
        setItem: (name, value) => {
          const { state } = value;
          localStorage.setItem(
            name,
            JSON.stringify({
              state: {
                ...state,
                completedScenarios: Array.from(state.completedScenarios)
              }
            })
          );
        },
        removeItem: (name) => localStorage.removeItem(name)
      }
    }
  )
);
