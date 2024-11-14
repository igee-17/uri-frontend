"use client";
import { useState, useEffect } from "react";
import JobTable from "./components/JobTable";
import StatsSection from "./components/StatsSection";
import FilterSection from "./components/FilterSection";
import DateRangeFilter from "./components/DateRangeFilter";

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<Stat>({
    totalApplications: 4,
    statusCounts: {
      pending: 1,
      accepted: 2,
      rejected: 3,
      interview: 1,
    },
    monthCounts: {
      September: 1,
      October: 3,
    },
  });
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`https://uri-backend.onrender.com/applications`),
      fetch(`https://uri-backend.onrender.com/applications/stats`),
    ])
      .then(([jobsRes, statsRes]) =>
        Promise.all([jobsRes.json(), statsRes.json()])
      )
      .then(([jobsData, statsData]) => {
        setJobs(jobsData);
        setStats(statsData);
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const jobDate = new Date(job.dateApplied);
    const matchesStatus = filter === "all" || job.status === filter;
    const matchesDateRange =
      (!dateRange.startDate || jobDate >= new Date(dateRange.startDate)) &&
      (!dateRange.endDate || jobDate <= new Date(dateRange.endDate));
    return matchesStatus && matchesDateRange;
  });

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Job Applications Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <FilterSection
              filter={filter}
              setFilter={setFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
            <DateRangeFilter onDateChange={setDateRange} />
            <JobTable
              jobs={filteredJobs}
              filter={filter}
              sortOrder={sortOrder}
            />
          </div>
          <div className="lg:col-span-1">
            <StatsSection stats={stats} />
          </div>
        </div>
      </div>
    </main>
  );
}
