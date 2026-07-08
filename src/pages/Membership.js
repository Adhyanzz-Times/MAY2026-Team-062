import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MembershipService } from '../services/membership';
import PageHeader from '../components/PageHeader';
import { Award, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function Membership() {
  const { user, refreshUser } = useAuth();
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Premium Membership');
  const [renewing, setRenewing] = useState(false);

  useEffect(() => {
    async function loadMembership() {
      if (!user) return;
      try {
        const data = await MembershipService.getMembership(user.id);
        setMembership(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadMembership();
  }, [user]);

  const handleRenew = async () => {
    setRenewing(true);
    try {
      const renewed = await MembershipService.renewMembership(user.id, selectedPlan);
      setMembership(renewed);
      refreshUser(); // Update app layout state
      setShowRenewModal(false);
    } catch (err) {
      alert("Renewal failed");
    } finally {
      setRenewing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Membership Plan" 
        description="Check your membership validity, benefits, and manage subscription renewals."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Active Plan Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card p-6 bg-gradient-to-br from-white to-purple-50/20">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="inline-flex items-center space-x-1.5 rounded-full bg-purple-100 text-purple-800 px-3 py-1 text-[11px] font-bold border border-purple-200 shadow-sm mb-3">
                  <Sparkles className="h-3 w-3 fill-purple-800" />
                  <span>{membership?.status}</span>
                </span>
                <h3 className="text-xl font-bold text-gray-900">{membership?.type}</h3>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-400">Valid until</span>
                <p className="font-bold text-gray-800">{membership?.expiryDate}</p>
              </div>
            </div>

            <div className="pt-5 border-t border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Subscription Fee</span>
                <h4 className="text-xl font-bold text-gray-900 mt-1">{membership?.price}</h4>
              </div>
              <button
                onClick={() => setShowRenewModal(true)}
                className="bg-primary text-white text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-primary-dark shadow-sm hover:shadow transition-colors"
              >
                Renew Membership
              </button>
            </div>
          </div>

          {/* Benefits summary list */}
          <div className="premium-card p-6">
            <h4 className="font-bold text-gray-800 text-base mb-4 flex items-center">
              <ShieldCheck className="h-5 w-5 text-primary mr-2" /> Membership Benefits
            </h4>
            <ul className="space-y-3.5 text-xs text-gray-650">
              {membership?.benefits?.map((benefit, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pricing reference card */}
        <div className="premium-card p-6 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-gray-800 text-sm pb-3 border-b border-gray-200 mb-4 flex items-center">
              <Award className="h-5 w-5 text-purple-700 mr-1.5" /> Upgrade Details
            </h4>
            <div className="space-y-4 text-xs leading-relaxed">
              <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                <h5 className="font-bold text-purple-900">Standard Plan</h5>
                <p className="text-gray-500 mt-1">₹ 2,500 / Year. Bookings up to 3 days in advance.</p>
              </div>
              <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                <h5 className="font-bold text-purple-900">Premium Plan</h5>
                <p className="text-gray-500 mt-1">₹ 5,000 / Year. Bookings up to 7 days in advance. Priority court slots.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Renewal Plan Selector modal */}
      {showRenewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 animate-scale-up">
            <h4 className="text-base font-bold text-gray-900 mb-3">Renew Membership</h4>
            <p className="text-xs text-gray-500 mb-5 leading-relaxed">
              Choose your membership plan extension tier:
            </p>

            <div className="space-y-3 mb-6">
              {['Standard Membership', 'Premium Membership'].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full p-4 text-left border rounded-xl flex items-center justify-between text-xs font-semibold transition-all ${selectedPlan === plan ? 'border-primary bg-primary-soft text-primary' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  <span>{plan}</span>
                  <span className="font-bold">{plan.includes('Premium') ? '₹5,000' : '₹2,500'}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end space-x-3 text-xs">
              <button
                onClick={() => setShowRenewModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Close
              </button>
              <button
                onClick={handleRenew}
                disabled={renewing}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-semibold shadow"
              >
                {renewing ? 'Processing...' : 'Confirm Renewal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
