
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase/config";
import { signOut } from "firebase/auth";
import { Sparkles, ShieldCheck, CheckCircle2, UserCircle } from "lucide-react";

export default function VerificationChoice() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FEF9E1] flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tight mb-4">
            Stand Out to Top Brands
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose how you want to present your profile to agencies and brands. Verified creators get hired 4x faster.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Option 1: Standard (Left) */}
          <div className="bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-gray-200 transition-all flex flex-col">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
              <UserCircle className="text-gray-500" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">Standard Profile</h2>
            <p className="text-gray-500 mb-8 flex-grow">
              Start applying to briefs immediately. You can always get verified later.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 size={20} className="text-gray-300 shrink-0" />
                Access to public brand briefs
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle2 size={20} className="text-gray-300 shrink-0" />
                Standard portfolio display
              </li>
            </ul>

            <Button 
              onClick={async () => { await signOut(auth); router.push("/login"); }}
              className="w-full h-14 rounded-xl border-2 border-gray-200 bg-transparent text-[#1A1A1A] hover:bg-gray-50 text-base font-bold shadow-none"
            >
              Continue Without Verification
            </Button>
          </div>

          {/* Option 2: Verified (Right - Recommended) */}
          <div className="bg-[#1A1A1A] rounded-3xl p-8 border-2 border-[#1A1A1A] shadow-2xl flex flex-col relative overflow-hidden">
            {/* Sparkle decoration */}
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Sparkles size={120} className="text-white" />
            </div>

            <div className="inline-flex items-center gap-2 bg-[#D3A373]/20 text-[#D3A373] px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider w-fit mb-6">
              <Sparkles size={14} /> Recommended
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">AI Verified Creator</h2>
            <p className="text-gray-400 mb-8 flex-grow">
              Take a 2-minute AI interview to verify your skills. Get the coveted &apos;Verified&apos; badge.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <ShieldCheck size={20} className="text-[#D3A373] shrink-0" />
                <span className="font-medium text-white">Verified Creator Badge</span> on your profile
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <CheckCircle2 size={20} className="text-[#D3A373] shrink-0" />
                Priority ranking in Brand search results
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <CheckCircle2 size={20} className="text-[#D3A373] shrink-0" />
                Access to exclusive high-budget briefs
              </li>
            </ul>

            <Button 
              onClick={() => router.push("/profile/verify")}
              className="w-full h-14 rounded-xl bg-[#D3A373] hover:bg-[#c29262] text-white text-base font-bold shadow-lg"
            >
              Start AI Verification
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
