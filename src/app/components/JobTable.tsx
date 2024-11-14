import { useMemo } from "react";

interface Job {
  id: string;
  jobTitle: string;
  companyName: string;
  status: string;
  dateApplied: string;
}

export default function JobTable({
  jobs,
  filter,
  sortOrder,
}: {
  jobs: Job[];
  filter: string;
  sortOrder: string;
}) {
  const filteredAndSortedJobs = useMemo(() => {
    return jobs
      .filter((job) => filter === "all" || job.status === filter)
      .sort((a, b) => {
        const dateA = new Date(a.dateApplied).getTime();
        const dateB = new Date(b.dateApplied).getTime();
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      });
  }, [jobs, filter, sortOrder]);

  return (
    <div className="bg-white rounded-lg shadow mt-10">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Applied
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {job.jobTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.companyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${
                      job.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : ""
                    }
                    ${
                      job.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : ""
                    }
                    ${
                      job.status === "rejected" ? "bg-red-100 text-red-800" : ""
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(job.dateApplied).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
