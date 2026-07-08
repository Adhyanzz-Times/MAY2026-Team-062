import React from 'react';

export default function PageHeader({ title, description, children }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 pb-6 border-b border-gray-200/80 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center space-x-3 flex-shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}
