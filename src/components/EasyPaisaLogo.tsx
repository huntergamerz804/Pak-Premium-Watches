import React from 'react';

interface EasyPaisaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EasyPaisaLogo: React.FC<EasyPaisaLogoProps> = ({ className = '', size = 'md' }) => {
  const dimensions = {
    sm: { width: 105, height: 28 },
    md: { width: 135, height: 36 },
    lg: { width: 165, height: 44 }
  }[size];

  return (
    <div
      className={`inline-flex items-center select-none bg-[#033D22] border border-[#00A859]/60 px-3 py-1.5 rounded-sm shadow-md ${className}`}
      title="Easypaisa Mobile Account"
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 145 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Easypaisa green badge icon with stylized 'e' and rupee/mobile nod */}
        <g transform="translate(4, 5)">
          <rect width="28" height="28" rx="14" fill="#00A859" />
          <circle cx="14" cy="14" r="10" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="40 10" />
          <path
            d="M10 14.5C10 12 12 10 14.5 10C17 10 18.5 11.5 18.5 13.5H10.5C10.5 16 12 17.5 14.5 17.5C16 17.5 17 16.8 17.5 15.8"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="19" cy="9" r="2" fill="#76FF03" />
        </g>

        {/* Wordmark: easypaisa */}
        <text
          x="38"
          y="24"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="800"
          fontSize="16"
          letterSpacing="-0.3px"
        >
          easy<tspan fill="#00E676">paisa</tspan>
        </text>
      </svg>
    </div>
  );
};
