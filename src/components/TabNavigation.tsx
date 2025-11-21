import type { Tab } from '../lib/types';

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex gap-1 border-b border-gray-700 bg-gray-900/50">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(index)}
          className={`px-6 py-3 font-medium transition-all relative ${
            activeTab === index
              ? 'text-orange-400 bg-gray-800'
              : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
          }`}
        >
          {tab.name}
          {activeTab === index && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500"></div>
          )}
        </button>
      ))}
    </div>
  );
}
