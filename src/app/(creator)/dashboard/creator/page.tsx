import { Sparkles, Briefcase, TrendingUp, MessageSquarePlus, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

export const dynamic = "force-dynamic";
const prisma = new PrismaClient();

export default async function CreatorDashboardHome() {
  const profile = await prisma.creatorProfile.findFirst({
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
      creatorLogs: { orderBy: { createdAt: 'desc' }, take: 3 },
      portfolioItems: { take: 2 }
    }
  });

  const userName = profile?.user?.name || "AI Creator";
  const views = Math.floor(Math.random() * 80) + 120;
  
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">Welcome back, {userName}</h1>
            {profile?.isVerified && (
              <span className="bg-[#FEF9E1] text-[#D3A373] flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border border-[#D3A373]/20">
                <ShieldCheck size={14} /> AI Verified
              </span>
            )}
          </div>
          <p className="text-gray-500 mt-2 text-sm">Here is what is happening with your GenWorks portfolio today.</p>
        </div>
        <button className="bg-[#1A1A1A] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg flex items-center gap-2">
          <Sparkles size={16} className="text-[#D3A373]" />
          Create New Post
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Profile Views" value={views.toString()} trend="+12% from last week" trendUp={true} icon={<TrendingUp size={22} className="text-[#D3A373]" />} />
        <StatCard title="Active Briefs" value="0" trend="Waiting for your first proposal" trendUp={null} icon={<Briefcase size={22} className="text-[#D3A373]" />} />
        <StatCard title="AI Match Score" value={profile?.verificationScore ? profile.verificationScore + "%" : "Pending"} trend={profile?.isVerified ? "AI Identity Verified" : "Complete AI Interview"} trendUp={!!profile?.isVerified} icon={<Zap size={22} className="text-[#D3A373]" />} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pt-2">
        <div className="xl:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold flex items-center gap-2 text-[#1A1A1A]">🔥 Curated Briefs<span className="bg-red-100 text-red-600 text-[10px] uppercase font-black px-2 py-0.5 rounded-sm tracking-wider">Live</span></h2>
            <Link href="/dashboard/briefs" className="text-sm font-medium text-gray-500 hover:text-[#1A1A1A] transition-colors">View all</Link>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-6 border border-gray-200/60 rounded-3xl hover:border-[#D3A373]/40 hover:shadow-md transition-all cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg text-[#1A1A1A] group-hover:text-[#D3A373] transition-colors">10 Cinematic Midjourney Concept Arts</h3>
                  <div className="flex items-center gap-2 mt-1.5"><span className="text-sm font-medium text-gray-700">Nike India</span><span className="text-gray-300">•</span><span className="text-sm text-gray-500">Budget: ₹25,000</span></div>
                </div>
                <div className="bg-green-50 border border-green-200 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1"><CheckCircle2 size={12} /> 92% Match</div>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                <span className="text-xs font-medium bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-gray-600">Photorealistic</span>
                <span className="text-xs font-medium bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-gray-600">Midjourney v6</span>
                <span className="text-xs font-medium bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-gray-600">Storyboard</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#1A1A1A]">Recent Logs</h2>
          <div className="bg-white rounded-3xl p-6 border border-gray-200/60 shadow-sm h-full max-h-[500px] overflow-y-auto scrollbar-hide">
            {profile?.creatorLogs && profile.creatorLogs.length > 0 ? (
              <div className="space-y-6">
                {profile.creatorLogs.map((log) => (
                  <div key={log.id} className="pb-5 border-b border-gray-100 last:border-0 last:pb-0 relative">
                    <div className="absolute left-0 top-1 w-1 h-full bg-[#D3A373]/20 rounded-full" />
                    <div className="pl-4">
                      <p className="text-sm text-gray-700 leading-relaxed">{log.content}</p>
                      <span className="text-[11px] font-medium text-gray-400 mt-2 block uppercase tracking-wide">{new Date(log.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="bg-[#FEF9E1] w-14 h-14 rounded-full flex items-center justify-center mb-4 border border-[#D3A373]/20"><MessageSquarePlus size={24} className="text-[#D3A373]" /></div>
                <h4 className="font-semibold text-gray-900 mb-1">No AI logs yet</h4>
                <p className="text-sm text-gray-500 mb-6 max-w-[200px] leading-relaxed">Document your AI experiments to build credibility.</p>
                <button className="text-[#1A1A1A] text-sm font-semibold border border-gray-200 px-5 py-2 rounded-full hover:border-gray-300 transition-colors">Write a log</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon }: { title: string; value: string; trend: string; trendUp: boolean | null; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-200/60 shadow-sm hover:shadow-md hover:border-gray-300 transition-all group">
      <div className="flex justify-between items-start">
        <div><p className="text-sm text-gray-500 font-medium mb-1">{title}</p><h3 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">{value}</h3></div>
        <div className="bg-[#FEF9E1] p-3 rounded-2xl group-hover:scale-105 transition-transform border border-[#D3A373]/10">{icon}</div>
      </div>
      <p className={`text-xs font-medium mt-5 ${trendUp === true ? 'text-green-600' : trendUp === false ? 'text-red-500' : 'text-gray-500'}`}>{trend}</p>
    </div>
  );
}
