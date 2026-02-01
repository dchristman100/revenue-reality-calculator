import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Play, Zap, Shield, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F54A48] to-[#FA982F] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-[#0D0F33] text-xl" style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}>ShiFt</span>
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
              className="bg-[#F54A48] hover:bg-[#e04442] text-white rounded-lg"
            >
              <a href="https://calendly.com/shiftnow/reality-session" target="_blank" rel="noopener noreferrer">
                Book Demo
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-[#FFEBEE] text-[#F54A48] px-4 py-2 rounded-full text-sm font-semibold mb-8">
                <Zap className="w-4 h-4" />
                Speed Wins. Every Time.
              </div>

              <h1 
                className="text-5xl lg:text-7xl font-extrabold text-[#0D0F33] leading-tight mb-6"
                style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
              >
                Stop Losing Leads.
                <br />
                <span className="text-[#F54A48]">Start Closing Deals.</span>
              </h1>

              <p className="text-xl text-[#6B7C93] mb-10 max-w-2xl mx-auto leading-relaxed">
                Roofing contractors lose $50K+ monthly to garbage leads and missed calls. 
                ShiFt fixes both. With AI.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  className="h-14 px-8 text-base font-bold uppercase bg-[#F54A48] hover:bg-[#e04442] text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  <Link to={createPageUrl('Calculator')}>
                    CALCULATE YOUR GAP →
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="h-14 px-8 text-base font-semibold border-2 border-[#0D0F33] text-[#0D0F33] hover:bg-[#0D0F33] hover:text-white rounded-lg transition-all"
                >
                  <Link to={createPageUrl('Experience')}>
                    <Play className="mr-2 w-5 h-5" />
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0D0F33]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "200+", label: "Contractors" },
              { value: "$67K", label: "Avg Monthly Recovery" },
              { value: "61%", label: "Close Rate Lift" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <p 
                  className="text-4xl lg:text-5xl font-extrabold text-[#F54A48] mb-2"
                  style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-[#6B7C93]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl lg:text-4xl font-bold text-[#0D0F33] mb-4"
              style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
            >
              Two Problems. One Solution.
            </h2>
            <p className="text-[#6B7C93] text-lg max-w-2xl mx-auto">
              Every contractor bleeds money in the same two places. ShiFt stops both.
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
              <h3 className="text-xl font-bold text-[#0D0F33] mb-3" style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}>
                Garbage Leads
              </h3>
              <p className="text-[#6B7C93] mb-4">
                40% of leads are tire-kickers. Hours wasted. Zero revenue.
              </p>
              <p className="text-[#F54A48] font-semibold">
                ShiFt scores every lead 0-100. Instantly. Before you call.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#E8F4FD] rounded-2xl p-8 border-l-4 border-[#1976D2]"
            >
              <span className="text-3xl mb-4 block">📞</span>
              <h3 className="text-xl font-bold text-[#0D0F33] mb-3" style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}>
                Missed Calls
              </h3>
              <p className="text-[#6B7C93] mb-4">
                78% of jobs go to whoever answers first. Voicemail = lost deal.
              </p>
              <p className="text-[#2E77AE] font-semibold">
                ShiFt answers in 30 seconds. 24/7. Even at 2am.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-[#0D0F33] to-[#1a1d4a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl lg:text-5xl font-extrabold text-white mb-6"
              style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
            >
              See Your
              <br />
              <span className="text-[#F54A48]">Revenue Gap.</span>
            </h2>
            <p className="text-[#6B7C93] text-lg mb-10 max-w-2xl mx-auto">
              60 seconds. Exact number. No guesswork.
            </p>

            <Button
              asChild
              className="h-14 px-10 text-base font-bold uppercase bg-[#F54A48] hover:bg-[#e04442] text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              <Link to={createPageUrl('Calculator')}>
                CALCULATE YOUR GAP →
              </Link>
            </Button>
            
            <div className="flex items-center justify-center gap-6 mt-8 text-[#6B7C93] text-sm font-medium">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Free
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <span className="text-slate-500 font-medium">Trusted by 200+ contractors</span>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 fill-[#FA982F] text-[#FA982F]" />
              ))}
              <span className="ml-2 text-slate-600 font-medium">4.9/5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#6B7C93] text-sm">
          © 2026 ShiFt | Privacy | Terms
        </div>
      </footer>
    </div>
  );
}