// components/BadgeDisplay.jsx

export default function BadgeDisplay({ badges = [] }) {
  if (!badges.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge, i) => (
        <span
          key={i}
          className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full border border-yellow-300"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}
