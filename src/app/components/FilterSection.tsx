const FilterSection: React.FC<{
  filter: string;
  setFilter: (value: string) => void;
  sortOrder: string;
  setSortOrder: (value: string) => void;
}> = ({ filter, setFilter, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="desc">Newest First</option>
        <option value="asc">Oldest First</option>
      </select>
    </div>
  );
};

export default FilterSection;
