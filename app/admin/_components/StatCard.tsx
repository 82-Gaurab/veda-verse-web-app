interface StatCardProps {
  title: string;
  value: number;
  color: string;
}

export default function StatCard({ title, value, color }: StatCardProps) {
  return (
    <div
      className={`p-6 shadow-md text-white ${color} rounded-3xl p-6 
        shadow-[8px_8px_20px_#c8d0e0,-8px_-8px_20px_#ffffff]
        transition-all duration-300
        hover:shadow-[4px_4px_10px_#9bb8f1,-4px_-4px_10px_#ffffff]
        active:scale-[0.98]`}
    >
      <p className="text-xs uppercase tracking-widest">{title}</p>

      <p className="text-3xl font-semibold mt-3">{value}</p>
    </div>
  );
}
