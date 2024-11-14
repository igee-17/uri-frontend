interface Stat {
  totalApplications: number;
  statusCounts: {
    pending: number;
    accepted: number;
    rejected: number;
    interview: number;
  };
  monthCounts: any;
}

interface Job {
  id: string;
  jobTitle: string;
  companyName: string;
  status: string;
  dateApplied: string;
}

// interface Stat {
//   totalApplications: number;
//   byStatus: {
//     accepted: number;
//     pending: number;
//     rejected: number;
//   };
//   byMonth: {
//     September: number;
//     October: number;
//   };
// }
