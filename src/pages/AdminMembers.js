import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import { mockUsers } from '../mock/data';

export default function AdminMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Load members
    const list = mockUsers.filter(u => u.role === 'member');
    // Add extra mock member records to look professional
    const extraMembers = [
      { id: "M002", name: "Rohan Kulkarni", email: "rohan@sportsync.demo", phone: "+91 98321 44552", membershipType: "Premium Plan", joinDate: "05 Feb 2026", preferredSports: ["Football"] },
      { id: "M003", name: "Isha Sen", email: "isha@sportsync.demo", phone: "+91 97554 22311", membershipType: "Standard Plan", joinDate: "12 Mar 2026", preferredSports: ["Tennis"] },
      { id: "M004", name: "Kabir Sharma", email: "kabir@sportsync.demo", phone: "+91 99882 11003", membershipType: "Premium Plan", joinDate: "10 Jan 2026", preferredSports: ["Badminton"] }
    ];

    setMembers([...list, ...extraMembers]);
  }, []);

  const columns = [
    { header: 'Member ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email Address', accessor: 'email' },
    { header: 'Phone Number', accessor: 'phone' },
    { 
      header: 'Membership Tier', 
      render: (row) => (
        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${row.membershipType?.includes('Premium') ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-gray-100 text-gray-700 border-gray-250'}`}>
          {row.membershipType}
        </span>
      )
    },
    { header: 'Join Date', accessor: 'joinDate' }
  ];

  const filterOptions = [
    { key: 'membershipType', label: 'Membership Plan', options: ['Premium Plan', 'Standard Plan', 'Premium', 'Standard'] }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Manage Members" 
        description="Browse all registered club members, view active memberships, and check registration dates."
      />

      <DataTable
        columns={columns}
        data={members}
        searchPlaceholder="Search by name or email..."
        searchKey="name"
        filterOptions={filterOptions}
      />
    </div>
  );
}
