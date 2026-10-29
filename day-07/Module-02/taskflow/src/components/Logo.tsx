export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="logoGrad"
          x1="3"
          y1="3"
          x2="29"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B7ADEE" />
          <stop offset="1" stopColor="#86B6E8" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="11" fill="url(#logoGrad)" />
      <circle cx="23" cy="9" r="5" fill="#fff" fillOpacity=".28" />
      <path
        d="M9.5 16.5l4.2 4.2 8.8-9.2"
        stroke="#fff"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
