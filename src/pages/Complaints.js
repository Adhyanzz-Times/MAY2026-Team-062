import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ComplaintService } from '../services/complaint';
import PageHeader from '../components/PageHeader';
import ComplaintCard from '../components/ComplaintCard';
import { AlertTriangle, Sparkles, UploadCloud } from 'lucide-react';

export default function Complaints() {
  const { user } = useAuth();
  
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Facilities');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  
  // AI States
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const categories = ['Facilities', 'Electrical', 'Plumbing', 'Equipment'];
  const priorities = ['Low', 'Medium', 'High'];

  const loadComplaints = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await ComplaintService.getComplaints('member', user.id);
      setComplaints(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Handle classification and duplicates as title/details change
  useEffect(() => {
    if (!title) {
      setDuplicateWarning(null);
      return;
    }

    const checkState = async () => {
      // 1. Auto Classification
      const text = `${title} ${description}`.toLowerCase();
      if (text.includes('light') || text.includes('wire') || text.includes('flicker') || text.includes('bulb') || text.includes('power')) {
        setCategory('Electrical');
      } else if (text.includes('pipe') || text.includes('tap') || text.includes('leak') || text.includes('water') || text.includes('drain')) {
        setCategory('Plumbing');
      } else if (text.includes('net') || text.includes('racket') || text.includes('shuttle') || text.includes('post') || text.includes('ball')) {
        setCategory('Equipment');
      }

      // 2. Duplicate Check
      const dup = await ComplaintService.detectDuplicate(title, description);
      if (dup.isDuplicate) {
        setDuplicateWarning(dup.existingComplaint);
      } else {
        setDuplicateWarning(null);
      }
    };

    const timer = setTimeout(checkState, 500);
    return () => clearTimeout(timer);
  }, [title, description]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setScanning(true);
    setAiAnalysis(null);

    try {
      // Simulate image scanning
      const scanResult = await ComplaintService.analyzeImage(file.name);
      setAiAnalysis(scanResult);
      // Auto fill classified category and priority
      if (scanResult.suggestedCategory) setCategory(scanResult.suggestedCategory);
      if (scanResult.suggestedPriority) setPriority(scanResult.suggestedPriority);
    } catch (err) {
      console.error(err);
    } finally {
      setScanning(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return;
    
    setSubmitting(true);
    try {
      await ComplaintService.submitComplaint({
        memberId: user.id,
        memberName: user.name,
        title,
        category,
        priority,
        description,
        imageUrl: imageFile ? URL.createObjectURL(imageFile) : null
      });

      // Reset
      setTitle('');
      setDescription('');
      setImageFile(null);
      setAiAnalysis(null);
      setDuplicateWarning(null);

      // Reload list
      loadComplaints();
    } catch (err) {
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Raise a Complaint" 
        description="Submit issues related to court facilities, lighting, equipment, or plumbing."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form: Submit New Complaint */}
        <div className="lg:col-span-2 space-y-6">
          <div className="premium-card p-6">
            <h3 className="font-bold text-gray-800 text-base mb-5 pb-2 border-b border-gray-150">Complaint Form</h3>

            {/* Duplicate Complaint Banner warning */}
            {duplicateWarning && (
              <div className="mb-5 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 flex items-start space-x-3 text-xs">
                <AlertTriangle className="h-5 w-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-900">Similar Active Complaint Detected!</span>
                  <p className="mt-1 leading-relaxed text-amber-800">
                    A complaint titled "{duplicateWarning.title}" (Status: {duplicateWarning.status}) has already been logged. You can still submit, but our team is already working on this.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Title / Brief Description</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Flickering lights in court 3"
                  className="px-4 py-2.5 w-full text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-3 py-2.5 w-full text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="px-3 py-2.5 w-full text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  >
                    {priorities.map(prio => (
                      <option key={prio} value={prio}>{prio}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue in detail"
                  className="px-4 py-2.5 w-full text-sm border border-gray-250 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* Image upload scan */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Upload Image (Optional)</label>
                <div className="relative border-2 border-dashed border-gray-250 rounded-xl p-6 text-center hover:bg-gray-50/50 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <UploadCloud className="h-8 w-8 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-600">
                      {imageFile ? imageFile.name : 'Click or drag photo here to upload'}
                    </span>
                    <span className="text-[10px] text-gray-400">PNG, JPG up to 5MB</span>
                  </div>
                </div>
              </div>

              {/* Image Scan Results Indicator */}
              {scanning && (
                <div className="bg-purple-50/30 border border-purple-100/50 rounded-xl p-4 flex items-center space-x-3 text-xs text-purple-900 animate-pulse">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-purple-700 border-t-transparent" />
                  <span>AI Scanning uploaded image file...</span>
                </div>
              )}

              {aiAnalysis && (
                <div className="bg-purple-50/80 border border-purple-200 rounded-xl p-4 flex items-start space-x-3 text-xs text-purple-950 shadow-sm">
                  <Sparkles className="h-5 w-5 text-purple-700 fill-purple-100 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-purple-900 text-sm">AI Image Classification Result!</span>
                    <p className="mt-1 leading-relaxed text-purple-800">
                      Issue detected: {aiAnalysis.issueDetected} (Confidence: {aiAnalysis.confidence}). <br />
                      Suggested category changed to {aiAnalysis.suggestedCategory} with {aiAnalysis.suggestedPriority} priority.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || scanning}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition-all shadow-md text-xs mt-2 disabled:opacity-50"
              >
                {submitting ? 'Submitting Complaint...' : 'Submit Complaint'}
              </button>
            </form>
          </div>
        </div>

        {/* Right list: My Complaints log */}
        <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2">
          <h4 className="font-bold text-gray-800 text-sm pl-1">Raised Complaints Log</h4>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : complaints.length === 0 ? (
            <div className="text-center py-10 premium-card bg-gray-50/50 text-xs text-gray-400 font-medium">
              No reported complaints.
            </div>
          ) : (
            complaints.map(comp => (
              <ComplaintCard key={comp.id} complaint={comp} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
