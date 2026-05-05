const tones = {
  blue: "bg-[#eef4ff] text-[#246bfe]",
  amber: "bg-[#fff7e8] text-[#b77900]",
  violet: "bg-[#f4f0ff] text-[#6d4aff]",
  green: "bg-[#ecfdf3] text-[#159947]",
};

function StatCard({ stat }) {
  return (
    <article className="rounded-lg border border-[#e5eaf2] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#667085]">{stat.label}</p>
          <p className="mt-3 text-3xl font-extrabold text-[#111827]">{stat.value}</p>
        </div>
        <span className={`rounded-lg px-3 py-2 text-sm font-bold ${tones[stat.tone]}`}>
          {stat.value}
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-[#667085]">{stat.change}</p>
    </article>
  );
}

export default StatCard;
