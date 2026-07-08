import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

export default function DataTable({ columns, data, searchPlaceholder, searchKey, filterOptions }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Handle filters update
  const handleFilterChange = (key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  // Filter & Search data
  const filteredData = data.filter(item => {
    // Search filter
    if (searchTerm && searchKey) {
      const val = item[searchKey];
      if (!val || !val.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
    }

    // Dropdown filters
    for (const [key, value] of Object.entries(activeFilters)) {
      if (value && value !== 'All') {
        if (item[key] !== value) return false;
      }
    }

    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="premium-card overflow-hidden">
      {/* Filters and Search Bar */}
      <div className="p-4 border-b border-gray-150 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {searchKey && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder || "Search..."}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 py-2 w-full text-sm border border-gray-250 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        )}

        {filterOptions && (
          <div className="flex flex-wrap gap-3">
            {filterOptions.map(filter => (
              <div key={filter.key} className="flex items-center space-x-1">
                <span className="text-xs text-gray-400 font-medium">{filter.label}:</span>
                <select
                  value={activeFilters[filter.key] || 'All'}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  className="text-xs border border-gray-250 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary bg-white font-medium"
                >
                  <option value="All">All</option>
                  {filter.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-150 bg-gray-50/30 text-gray-500 font-medium select-none">
              {columns.map((col, idx) => (
                <th key={idx} className="p-4 font-semibold">{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-gray-400">
                  No records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50/50 transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="p-4 text-gray-700">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-150 flex items-center justify-between text-xs text-gray-500">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
          </span>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 font-medium">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-50 transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
