import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatsSection: React.FC<{ stats: Stat }> = ({ stats }) => {
  if (!stats) return null;

  const chartData = Object.entries(stats.statusCounts).map(
    ([status, count]) => ({
      status,
      count: Number(count),
    })
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Application Statistics</h2>

      <div className="mb-6">
        <div className="text-3xl font-bold text-indigo-600">
          {stats.totalApplications}
        </div>
        <div className="text-sm text-gray-500">Total Applications</div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsSection;
