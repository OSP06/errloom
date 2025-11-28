import { AlertTriangle, Clock, Users, DollarSign, Building } from 'lucide-react';

interface RealIncidentContextProps {
  company: string;
  date: string;
  duration: string;
  impact: string;
  cause: string;
  story: string;
}

export function RealIncidentContext({
  company,
  date,
  duration,
  impact,
  cause,
  story
}: RealIncidentContextProps) {
  return (
    <div className="mt-8 space-y-6">
      {/* Header */}
      <div className="bg-linear-to-r from-red-900 to-orange-900 rounded-2xl p-8 text-white">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-red-500/50 rounded-full text-sm mb-3 font-semibold">
              REAL PRODUCTION INCIDENT
            </div>
            <h2 className="text-3xl font-bold mb-3">
              What Actually Happened: {company}
            </h2>
            <p className="text-lg opacity-90">
              {date}
            </p>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          value={duration}
          label="Total Downtime"
          color="red"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          value={impact.split(',')[0] || "Unknown"}
          label="Users Affected"
          color="orange"
        />
        <StatCard
          icon={<Building className="w-6 h-6" />}
          value={company}
          label="Company"
          color="yellow"
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6" />}
          value="High"
          label="Business Impact"
          color="purple"
        />
      </div>

      {/* Story */}
      <div className="bg-gray-800 rounded-2xl p-8 border-2 border-gray-700">
        <h3 className="text-2xl font-bold mb-4 text-white">The Full Story</h3>
        <div className="prose max-w-none">
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {story}
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <h4 className="font-bold text-white mb-2">Root Cause</h4>
          <p className="text-gray-300">{cause}</p>
        </div>
      </div>

      {/* What You Learned */}
      <div className="bg-green-900/20 rounded-2xl p-8 border-2 border-green-700/50">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-400">
              How Your Skills Prevent This
            </h3>
            <p className="text-gray-300 mb-4">
              The scenario you just completed teaches you to recognize and fix the exact
              issues that caused this real-world disaster. You now have the knowledge to:
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold">✓</span>
                <span>Identify the warning signs before catastrophe strikes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold">✓</span>
                <span>Implement safeguards that prevent these failures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold">✓</span>
                <span>Respond effectively when incidents do occur</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: 'red' | 'orange' | 'yellow' | 'purple';
}) {
  const colorClasses = {
    red: 'from-red-500 to-red-600',
    orange: 'from-orange-500 to-orange-600',
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <div className={`bg-linear-to-br ${colorClasses[color]} rounded-xl p-6 text-white`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
    </div>
  );
}
