import { Sparkles, Briefcase, TrendingUp } from "lucide-react";

export default function CreatorDashboardHome() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Arjun 👋</h1>
          <p className="text-gray-500 mt-1">Here is what is happening with your AI portfolio today.</p>
        </div>
        <button className="bg-[#D3A373] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#b0875e] transition-colors shadow-sm flex items-center gap-2">
          <Sparkles size={16} />
          Create New Post
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Profile Views" value="124" trend="+12% this week" icon={<TrendingUp size={20} className="text-[#D3A373]" />} />
        <StatCard title="Active Applications" value="3" trend="1 awaiting reply" icon={<Briefcase size={20} className="text-[#D3A373]" />} />
        <StatCard title="Match Score" value="94%" trend="Top 5% of creators" icon={<Sparkles size={20} className="text-[#D3A373]" />} />
      </div>

      {/* Split Layout: Job Feed vs Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        
        {/* Left Column: Live Briefs (Takes 2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            🔥 Recommended Briefs
            <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">Live</span>
          </h2>
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            
            {/* Mock Job Card */}
            <div className="p-5 border border-gray-100 rounded-2xl hover:border-[#D3A373]/30 transition-colors bg-[#F8F7F3]/30">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg">10 Cinematic Midjourney Concept Arts</h3>
                  <p className="text-sm text-gray-500 mt-1">Nike India • Budget: ₹25,000</p>
                </div>
                <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  92% Match
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <span className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">Photorealistic</span>
                <span className="text-xs bg-white border border-gray-200 px-3 py-1 rounded-full text-gray-600">Midjourney v6</span>
              </div>
              <div className="mt-5 flex justify-end">
                <button className="bg-[#1A1A1A] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black transition-colors">
                  Send Proposal
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Your Recent Posts */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Your Recent Posts</h2>
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
            <div className="text-center py-10">
              <div className="bg-[#FEF9E1] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquarePlus size={24} className="text-[#D3A373]" />
              </div>
              <p className="text-sm text-gray-500 mb-4">You haven't posted any AI experiments yet.</p>
              <button className="text-[#D3A373] text-sm font-semibold hover:underline">
                Write your first post
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, trend, icon }: { title: string; value: string; trend: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-2">{value}</h3>
        </div>
        <div className="bg-[#FEF9E1] p-3 rounded-2xl">
          {icon}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4 font-medium">{trend}</p>
    </div>
  );
}
