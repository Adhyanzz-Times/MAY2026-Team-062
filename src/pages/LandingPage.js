import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const facilities = [
    { name: "Badminton Courts", desc: "Top-grade indoor courts with excellent LED lighting.", img: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400" },
    { name: "Football Turf", desc: "Premium artificial turf suitable for 5-a-side and 7-a-side.", img: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400" },
    { name: "Tennis Courts", desc: "Professional synthetically surfaced clay courts.", img: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400" },
    { name: "Basketball Court", desc: "Standard indoor wooden court with dynamic hoops.", img: "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?w=400" }
  ];

  return (
    <div className="w-full bg-white text-gray-800 -mt-10 overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-purple-50/20 flex flex-col items-center text-center">
        {/* Decorative Badge */}
        <div className="inline-flex items-center space-x-1.5 rounded-full bg-primary-soft text-primary px-3.5 py-1 text-xs font-semibold shadow-sm mb-6 border border-primary/10">
          <Sparkles className="h-3.5 w-3.5 fill-primary" />
          <span>Powered by SportSync AI Assistant</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight max-w-4xl leading-[1.1] mb-6">
          Play Together. <br className="md:hidden" />
          <span className="bg-gradient-to-r from-primary to-purple-800 bg-clip-text text-transparent">Stay Connected.</span>
        </h1>
        <p className="text-base md:text-lg text-gray-500 max-w-xl mb-8 leading-relaxed">
          Manage bookings, memberships, events, tournaments, and maintenance reports – all in one unified, intelligent workspace.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <button 
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            <span>Join Now</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto border border-gray-250 bg-white font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            Sign In
          </button>
        </div>

        {/* Hero Wireframe image placeholder */}
        <div className="mt-16 w-full max-w-5xl rounded-2xl overflow-hidden border border-gray-100 shadow-2xl bg-gray-50/50 p-2">
          <img 
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200" 
            alt="Sports Platform Banner" 
            className="w-full rounded-xl object-cover h-[300px] md:h-[450px]"
          />
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="px-6 py-20 md:py-28 max-w-7xl mx-auto border-t border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Premium Facilities</h2>
          <p className="text-sm text-gray-500 mt-2">Book court slots instantly. Check availability grids powered by AI optimization.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => (
            <div key={idx} className="premium-card overflow-hidden hover-premium flex flex-col justify-between h-full">
              <div>
                <div className="h-44 overflow-hidden bg-gray-100">
                  <img src={fac.img} alt={fac.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{fac.name}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{fac.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button 
            onClick={() => navigate('/login')}
            className="border border-primary text-primary font-semibold text-xs px-5 py-2.5 rounded-lg hover:bg-primary-soft transition-colors"
          >
            View All Facilities
          </button>
        </div>
      </section>

      {/* Features Showcase */}
      <section id="about" className="bg-gray-50/50 border-t border-gray-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col space-y-4">
            <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold">
              <Star className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg">AI Recommendation</h4>
            <p className="text-sm text-gray-500">Get personalized court times and matching practice partners based on your gaming history.</p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col space-y-4">
            <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold">
              <Trophy className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg">Tournaments & Camps</h4>
            <p className="text-sm text-gray-500">Sign up for coaching events and competitive tournaments organized directly by our team.</p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col space-y-4">
            <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary flex items-center justify-center font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-gray-900 text-lg">Direct Complaints Reporting</h4>
            <p className="text-sm text-gray-500">Upload pictures of malfunctioning equipment to trigger automated maintenance dispatches.</p>
          </div>
        </div>
      </section>

      {/* Events Showcase Section */}
      <section id="events" className="px-6 py-20 md:py-28 max-w-7xl mx-auto border-t border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Upcoming Tournaments</h2>
          <p className="text-sm text-gray-500 mt-2">See what's happening at the club and reserve a spot to compete.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="premium-card p-6 flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary text-white uppercase tracking-wider mb-2 inline-block">Badminton</span>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Summer Badminton Tournament</h4>
              <p className="text-xs text-gray-505 leading-relaxed">Join the annual amateur tournament. Singles and doubles matches with grand trophies.</p>
            </div>
            <button onClick={() => navigate('/login')} className="mt-4 text-xs font-bold text-primary hover:underline text-left">Register to Play →</button>
          </div>
          <div className="premium-card p-6 flex flex-col justify-between h-full">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-primary text-white uppercase tracking-wider mb-2 inline-block">Tennis</span>
              <h4 className="font-bold text-lg text-gray-900 mb-2">Weekend Tennis Coaching Camp</h4>
              <p className="text-xs text-gray-505 leading-relaxed">Interactive masterclass drills under pro coaches. Limited to 15 intermediate players.</p>
            </div>
            <button onClick={() => navigate('/login')} className="mt-4 text-xs font-bold text-primary hover:underline text-left">Reserve Spot →</button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-55/50 border-t border-gray-100 py-20 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Get in Touch</h2>
          <p className="text-sm text-gray-500 mt-2 mb-8">Have questions about memberships or facilities? Our support team is here to assist.</p>
          <div className="premium-card p-6 bg-white text-left space-y-4">
            <div>
              <span className="block text-[10px] font-semibold text-gray-400 uppercase">Support Email</span>
              <span className="text-sm font-semibold text-gray-800">support@sportsync.iitm.ac.in</span>
            </div>
            <div>
              <span className="block text-[10px] font-semibold text-gray-400 uppercase">Club Office Address</span>
              <span className="text-sm font-semibold text-gray-800">IIT Madras Campus, Adyar, Chennai - 600036</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
