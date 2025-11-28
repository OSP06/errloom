import { Lightbulb, Target } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ScenarioMode } from '../lib/types';

interface ModeSelectionModalProps {
  open: boolean;
  onSelect: (mode: ScenarioMode) => void;
  scenarioTitle: string;
  availableModes: ScenarioMode[];
}

export function ModeSelectionModal({
  open,
  onSelect,
  scenarioTitle,
  availableModes
}: ModeSelectionModalProps) {
  const modes = {
    guided: {
      icon: <Lightbulb className="w-12 h-12 text-blue-400" />,
      title: 'Guided Mode',
      description: 'Learn with helpful hints, explanations, and step-by-step guidance',
      features: [
        'Detailed explanations for each task',
        'Helpful hints when you get stuck',
        'Perfect for learning new concepts',
        'Recommended for first-time scenarios'
      ],
      badge: 'Recommended',
      badgeColor: 'bg-blue-500 text-white'
    },
    challenge: {
      icon: <Target className="w-12 h-12 text-red-400" />,
      title: 'Challenge Mode',
      description: 'Test your skills with minimal help—solve it on your own',
      features: [
        'Minimal hints and guidance',
        'Focus on independent problem-solving',
        'Faster completion time',
        'Best for experienced debuggers'
      ],
      badge: 'Expert',
      badgeColor: 'bg-red-500 text-white'
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-3xl bg-gray-900/95 backdrop-blur-xl border-gray-700 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-mono">Choose Your Mode</DialogTitle>
          <DialogDescription className="text-base">
            {scenarioTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          {availableModes.map((mode) => {
            const modeData = modes[mode];
            return (
              <Card
                key={mode}
                className="relative border-2 hover:border-orange-500 transition-all duration-300 group cursor-pointer bg-gray-800/50 backdrop-blur-md hover:bg-gray-800/70 hover:scale-105 shadow-lg hover:shadow-2xl"
                onClick={() => onSelect(mode)}
              >
                <CardContent className="p-6">
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className={modeData.badgeColor}>
                      {modeData.badge}
                    </Badge>
                  </div>

                  {/* Icon */}
                  <div className="mb-4">
                    {modeData.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2">{modeData.title}</h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4">
                    {modeData.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {modeData.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-orange-400 font-bold mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <Button
                    className="w-full bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    Start {modeData.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
