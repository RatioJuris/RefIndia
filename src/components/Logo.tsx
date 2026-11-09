export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#1e3a8a" />
      <text x="12" y="45" fontFamily="Georgia, serif" fontSize="36" fontWeight="700" fill="#ffffff">R</text>
      <text x="35" y="44" fontFamily="Georgia, serif" fontSize="40" fontWeight="700" fill="#ff9933">”</text>
    </svg>
  );
}
