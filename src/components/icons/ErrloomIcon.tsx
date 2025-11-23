import React from 'react';

interface ErrloomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
}

/**
 * ErrloomIcon - Custom icon combining code brackets, debugger breakpoint, and code lines
 *
 * Visual elements:
 * - Code brackets (< >) representing "coder"
 * - Debug breakpoint (center circle) representing "debugger"
 * - Code window frame representing "code lines"
 *
 * Colors: Uses gradient from orange (#f97316) to red (#dc2626)
 */
export const ErrloomIcon: React.FC<ErrloomIconProps> = ({ size = 24, strokeWidth = 2, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <defs>
        <linearGradient id={`errloom-gradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>

      <rect x="3" y="3" width="18" height="18" rx="2" stroke={`url(#errloom-gradient-${size})`} />
      <path d="M8 9l-2 3 2 3M16 9l2 3-2 3" stroke={`url(#errloom-gradient-${size})`} />
      <circle cx="12" cy="12" r="2" stroke={`url(#errloom-gradient-${size})`} />
      <path d="M12 8v2M12 14v2M8.5 10.5l1.5 1.5M14 12l1.5-1.5M8.5 13.5l1.5-1.5M14 12l1.5 1.5" stroke={`url(#errloom-gradient-${size})`} />
    </svg>
  );
};

// Default export for convenience
export default ErrloomIcon;
