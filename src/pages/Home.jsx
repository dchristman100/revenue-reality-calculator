import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Play, Zap, Shield, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0A1628] border-b-2 border-[#FF6B47]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697e7fc276d9d592d37c9370/3b299dd05_FinalV2.png" 
              alt="ShiFt" 
              className="h-16"
            />
          </div>
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('Calculator')} className="text-slate-600 hover:text-[#0D0F33] font-medium hidden sm:block">
              Calculator
            </Link>
            <Link to={createPageUrl('Experience')} className="text-slate-600 hover:text-[#0D0F33] font-medium hidden sm:block">
              Experience
            </Link>
            <Button
              asChild
              className="bg-[#FF6B47] hover:bg-[#FF5533] text-white rounded-lg font-bold uppercase text-sm"
            >
              <a href="https://experience.shiftnow.io" target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-[#0A1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-transparent border border-[#FF6B47] text-[#FF6B47] px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-8">
                <Zap className="w-4 h-4" />
                Your AI sales team that never sleeps
              </div>

              <h1 
                className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
                style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
              >
                Never Miss Another Lead.
                <br />
                <span className="text-[#FF6B47]">AI That Converts 24/7.</span>
              </h1>

              <p className="text-lg text-white mb-10 max-w-2xl mx-auto leading-relaxed">
                AI responds in seconds. Converts while you sleep. Delivers 5-10x ROI.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  className="h-14 px-8 text-sm font-bold uppercase bg-[#FF6B47] hover:bg-[#FF5533] text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  <Link to={createPageUrl('Calculator')}>
                    CALCULATE YOUR GAP
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-14 px-8 text-sm font-bold uppercase border-2 border-[#FF6B47] text-[#FF6B47] hover:bg-[#FF6B47] hover:text-white rounded-lg transition-all"
                >
                  <a href="https://experience.shiftnow.io" target="_blank" rel="noopener noreferrer">
                    LIVE DEMO
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "24/7", label: "ALWAYS ON" },
              { value: "<1s", label: "CONNECTION TIME" },
              { value: "5-10x", label: "AVERAGE ROI" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <p 
                  className="text-6xl lg:text-7xl font-bold text-[#FF6B47] mb-3"
                  style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-xs font-semibold text-[#B8BCC8] uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl lg:text-5xl font-bold text-[#1F2937] mb-6"
              style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
            >
              Two Problems. One Solution.
            </h2>
            <p className="text-[#B8BCC8] text-lg max-w-2xl mx-auto">
              Every roofing contractor bleeds money in the same two places.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#FFEBEE] rounded-2xl p-8 border-l-4 border-[#F54A48]"
            >
              <span className="text-3xl mb-4 block">🗑️</span>
              <h3 className="text-xl font-bold text-[#1F2937] mb-3" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
                Garbage Leads
              </h3>
              <p className="text-[#B8BCC8] mb-4">
                40% of your leads waste your time and never buy.
              </p>
              <p className="text-[#FF6B47] font-bold">
                AI qualifies every lead instantly—score 0-100 before you pick up the phone.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#E8F4FD] rounded-2xl p-8 border-l-4 border-[#1976D2]"
            >
              <span className="text-3xl mb-4 block">📞</span>
              <h3 className="text-xl font-bold text-[#1F2937] mb-3" style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}>
                Missed Calls
              </h3>
              <p className="text-[#B8BCC8] mb-4">
                78% of jobs go to whoever answers first. Every voicemail is money walking to your competitor.
              </p>
              <p className="text-[#FF6B47] font-bold">
                AI answers every call in under 30 seconds—24/7, even at 2am.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-4xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
            >
              Never Miss Another Lead.
              <br />
              <span className="text-[#FF6B47]">Calculate Your Revenue Leak.</span>
            </h2>
            <p className="text-white text-lg mb-10 max-w-2xl mx-auto">
              60 seconds. See exactly how much you're losing to missed calls and tire-kickers.
            </p>

            <Button
              asChild
              className="h-14 px-10 text-sm font-bold uppercase bg-[#FF6B47] hover:bg-[#FF5533] text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              <Link to={createPageUrl('Calculator')}>
                CALCULATE YOUR GAP
              </Link>
            </Button>
            
            <div className="flex items-center justify-center gap-6 mt-8 text-[#B8BCC8] text-xs font-semibold uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Free—no credit card
              </span>
              <span className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                60 seconds
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <span className="text-[#B8BCC8] font-semibold">Trusted by 200+ roofing contractors</span>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 fill-[#FF6B47] text-[#FF6B47]" />
              ))}
              <span className="ml-2 text-[#1F2937] font-bold">5-10x ROI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#B8BCC8] text-sm">
          © 2026 ShiFt. All rights reserved.
        </div>
      </footer>
    </div>
  );
}