import type { Tab } from '../lib/types';

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex gap-2 mb-4 border-b-2 border-gray-200">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => onTabChange(index)}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === index
              ? 'text-blue-600 border-b-2 border-blue-600 -mb-[2px]'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}
