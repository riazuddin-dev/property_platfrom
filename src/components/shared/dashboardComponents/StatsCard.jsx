import { ArrowUpRight } from "lucide-react";

export default function StatsCard({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div
      className="
      relative
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      dark:border-slate-800
      bg-white
      dark:bg-slate-900
      p-6
      shadow-md
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      "
    >
      {/* Background Circle */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-teal-500/10"></div>

      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-sm text-slate-500 font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-slate-800 dark:text-white">
            {value}
          </h2>

          <div className="flex items-center gap-2 mt-5 text-green-500 text-sm font-semibold">
            <ArrowUpRight size={16} />

            <span>Updated Today</span>
          </div>
        </div>

        <div
          className="
          w-16
          h-16
          rounded-2xl
          bg-gradient-to-r
          from-teal-500
          to-cyan-500
          flex
          items-center
          justify-center
          shadow-lg
          "
        >
          <Icon
            size={30}
            className="text-white"
          />
        </div>
      </div>
    </div>
  );
}