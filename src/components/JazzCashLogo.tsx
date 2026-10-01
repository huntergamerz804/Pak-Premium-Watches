import React from 'react';

interface JazzCashLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const JazzCashLogo: React.FC<JazzCashLogoProps> = ({ className = '', size = 'md' }) => {
  const dimensions = {
    sm: { width: 100, height: 28 },
    md: { width: 130, height: 36 },
    lg: { width: 160, height: 44 }
  }[size];

  return (
    <div
      className={`inline-flex items-center select-none bg-[#7A0C2E] border border-[#B31745]/60 px-3 py-1.5 rounded-sm shadow-md ${className}`}
      title="JazzCash Mobile Account"
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 140 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Jazz Iconic Swirl / Petal motif */}
        <g transform="translate(4, 5)">
          <circle cx="14" cy="14" r="13" fill="#D31044" />
          <path
            d="M8 14C8 9.5 11.5 6 16 6C17.5 6 19 6.5 20.2 7.4C18.2 8.2 16.5 10 16 12.5C14.5 11 12 11 10.5 12.5C9.2 13.8 9.2 16 10.5 17.5C12 19 14.5 19 16 17.5C16.8 19.5 18.5 21 21 21.5C19.5 22.5 17.8 23 16 23C11.5 23 8 19.5 8 14Z"
            fill="#FFDE00"
          />
          <circle cx="17.5" cy="10" r="2.2" fill="#FFFFFF" />
        </g>

        {/* Wordmark: jazz */}
        <text
          x="38"
          y="25"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="-0.5px"
        >
          jazz
        </text>

        {/* Wordmark: cash in vibrant gold/yellow */}
        <text
          x="75"
          y="25"
          fill="#FFDE00"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="18"
          letterSpacing="-0.5px"
        >
          cash
        </text>
      </svg>
    </div>
  );
};
