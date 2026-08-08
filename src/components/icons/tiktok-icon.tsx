export function TikTokIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.6 5.82c-.9-.87-1.4-2.06-1.4-3.32h-3.14v13.44c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9c.3 0 .58.04.84.13V9.9a6.1 6.1 0 0 0-.84-.06A6.05 6.05 0 0 0 3.1 15.9a6.05 6.05 0 0 0 6.06 6.06 6.05 6.05 0 0 0 6.06-6.06V9.06a8.24 8.24 0 0 0 4.82 1.54V7.46a4.82 4.82 0 0 1-3.44-1.64Z" />
    </svg>
  );
}
