import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PageHeader from '../components/PageHeader';
import { CheckCircle2, Edit2, Save, X, User } from 'lucide-react';

export default function Profile() {
  const { user, setUser } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [preferredSports, setPreferredSports] = useState(user?.preferredSports || []);
  const [success, setSuccess] = useState(false);

  const sportsList = ["Badminton", "Football Turf", "Tennis", "Basketball", "Table Tennis", "Cricket Net"];

  const handleSportToggle = (sport) => {
    if (preferredSports.includes(sport)) {
      setPreferredSports(preferredSports.filter(s => s !== sport));
    } else {
      setPreferredSports([...preferredSports, sport]);
    }
  };

  const handleSave = () => {
    if (!name || !phone) return;
    
    const updatedUser = {
      ...user,
      name,
      phone,
      preferredSports
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    
    setIsEditing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Profile" 
        description="Manage your personal information, contact credentials, and sport preferences."
      >
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-primary text-white font-semibold text-xs px-4 py-2.5 rounded-lg hover:bg-primary-dark shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit Profile</span>
          </button>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="border border-gray-250 bg-white text-gray-700 font-semibold text-xs px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-1.5"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="bg-primary text-white font-semibold text-xs px-4 py-2.5 rounded-lg hover:bg-primary-dark shadow-sm transition-colors flex items-center space-x-1.5"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </PageHeader>

      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-xs px-3 py-2.5 rounded-lg flex items-center space-x-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card p-6">
            <h4 className="font-bold text-gray-800 text-base mb-5 pb-2 border-b border-gray-150">Personal Details</h4>

            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-5 items-center pb-5 border-b border-gray-100/50">
                <div className="h-20 w-20 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100 flex-shrink-0">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-800 text-lg leading-tight">{user?.name}</h5>
                  <p className="text-xs text-gray-400 mt-1">Member ID: {user?.id || 'M001'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block font-semibold text-gray-450 uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email}
                    className="px-4 py-2.5 w-full bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-450 uppercase mb-2">Full Name</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`px-4 py-2.5 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 ${isEditing ? 'bg-white border-gray-250 focus:border-primary' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-450 uppercase mb-2">Phone Number</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`px-4 py-2.5 w-full border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 ${isEditing ? 'bg-white border-gray-250 focus:border-primary' : 'bg-gray-50 border-gray-200 text-gray-500'}`}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-450 uppercase mb-2">Membership Status</label>
                  <input
                    type="text"
                    disabled
                    value={`${user?.membershipType} (Active until ${user?.expiryDate})`}
                    className="px-4 py-2.5 w-full bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences / Sports Preferred list */}
        <div className="premium-card p-6">
          <h4 className="font-bold text-gray-800 text-sm pb-3 border-b border-gray-200 mb-4">Preferred Sports</h4>
          
          <div className="space-y-2">
            {sportsList.map((sport) => {
              const isPreferred = preferredSports.includes(sport);
              return (
                <button
                  key={sport}
                  disabled={!isEditing}
                  onClick={() => handleSportToggle(sport)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${isPreferred ? 'border-primary bg-primary-soft text-primary' : 'border-gray-200 text-gray-650 hover:bg-gray-50'} ${!isEditing ? 'cursor-default opacity-85' : 'cursor-pointer hover:border-gray-300'}`}
                >
                  <span>{sport}</span>
                  {isPreferred && <span className="h-2 w-2 rounded-full bg-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
