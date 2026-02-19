import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { ArrowRight, Play, Target, Phone, BarChart3, Star, X, Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';

export default function Experience() {
  const urlParams = new URLSearchParams(window.location.search);
  const fromCalculator = urlParams.get('from') === 'calculator';
  const totalGap = urlParams.get('total_gap');
  const garbageCost = urlParams.get('garbage_cost');
  const missedCost = urlParams.get('missed_cost');
  const mode = urlParams.get('mode');
  
  const [showCalcBanner, setShowCalcBanner] = useState(!fromCalculator);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const highlightGarbage = garbageCost && missedCost && parseInt(garbageCost) > parseInt(missedCost);
  const highlightMissed = garbageCost && missedCost && parseInt(missedCost) > parseInt(garbageCost);
  
  const heroSubhead = fromCalculator && totalGap
    ? `You're losing $${parseInt(totalGap).toLocaleString()}/month. Here's how we fix it.`
    : "Watch AI capture leads you're currently losing.";
  
  const finalCtaHeadline = fromCalculator && totalGap
    ? `Stop losing $${parseInt(totalGap).toLocaleString()}/month`
    : "Ready to stop the bleeding?";

  const features = [
    {
      icon: Target,
      title: "AI Qualification",
      description: "3 questions. Score 0-100. Tire-kickers eliminated before they waste your time.",
      highlight: highlightGarbage,
      color: "#F54A48"
    },
    {
      icon: Phone,
      title: "24/7 Answering",
      description: "Every call answered in under 30 seconds. Even at 2am. Even on weekends.",
      highlight: highlightMissed,
      color: "#1976D2"
    },
    {
      icon: BarChart3,
      title: "Smart Insights",
      description: "Know exactly which leads will close and which marketing is working.",
      highlight: false,
      color: "#FA982F"
    }
  ];

  const pricingTiers = [
    {
      name: "Essential",
      price: "$397",
      description: "Fix ONE problem",
      features: ["AI Qualification OR 24/7 Answering", "Basic analytics", "Email support"]
    },
    {
      name: "Professional",
      price: "$597",
      description: "Fix BOTH problems",
      features: ["AI Qualification", "24/7 Answering", "Advanced analytics", "Priority support"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$997",
      description: "Full NeuralOS",
      features: ["Everything in Professional", "Custom integrations", "Dedicated success manager", "API access"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
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
          <Button
            asChild
            className="bg-[#FF6B47] hover:bg-[#FF5533] text-white rounded-lg font-bold uppercase text-sm"
          >
            <a href="https://makea.shiftnow.io/widget/bookings/reality" target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          </Button>
        </div>
      </header>

      {/* Calculator Back-Link Banner */}
      {showCalcBanner && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#E8F4FD] border-l-4 border-[#1976D2]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">💡</span>
              <div>
                <span className="text-[#0D0F33] font-medium">Haven't calculated your revenue gap yet?</span>
                <Link to={createPageUrl('Home')} className="ml-2 text-[#1976D2] hover:underline font-medium">
                  → See how much you're losing in 60 seconds
                </Link>
              </div>
            </div>
            <button onClick={() => setShowCalcBanner(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 
              className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1F2937] leading-tight mb-6"
              style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
            >
              Experience ShiFt Live
            </h1>
            <p className="text-xl text-[#B8BCC8] mb-10 max-w-2xl mx-auto">
              {heroSubhead}
            </p>
            <Button
              onClick={() => setIsVideoPlaying(true)}
              className="h-14 px-8 text-sm font-bold uppercase bg-[#FF6B47] hover:bg-[#FF5533] text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              <Play className="mr-2 w-5 h-5" />
              LIVE DEMO
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-video bg-[#0D0F33] rounded-2xl shadow-2xl overflow-hidden"
          >
            {isVideoPlaying ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="ShiFt NeuralOS Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div 
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={() => setIsVideoPlaying(true)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#F54A48]/20 to-[#FA982F]/20" />
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-[#F54A48] ml-1" />
                </div>
                <div className="absolute bottom-8 left-8 text-white">
                  <p className="text-sm opacity-80">Watch how ShiFt works</p>
                  <p className="text-lg font-semibold">3 minute demo</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl lg:text-4xl font-bold text-[#1F2937] mb-4"
              style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
            >
              How We Close Your Revenue Gap
            </h2>
            <p className="text-[#B8BCC8] text-lg">Three systems working together to capture every lead</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`p-8 h-full transition-all hover:shadow-xl ${feature.highlight ? 'ring-2 ring-offset-2' : ''}`} style={{ ringColor: feature.highlight ? feature.color : 'transparent' }}>
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${feature.color}15` }}
                  >
                    <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0D0F33] mb-3" style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}>
                    {feature.title}
                  </h3>
                  <p className="text-[#6B7C93] leading-relaxed">
                    {feature.description}
                  </p>
                  {feature.highlight && (
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium" style={{ color: feature.color }}>
                      <Zap className="w-4 h-4" />
                      Recommended for you
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0D0F33] to-[#1a1d4a] rounded-3xl p-8 sm:p-12 lg:p-16 text-white"
          >
            <div className="text-center mb-12">
              <p className="text-[#FA982F] font-medium mb-3">CASE STUDY</p>
              <h2 
                className="text-3xl lg:text-4xl font-extrabold mb-4"
                style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
              >
                "$67K recovered. 30 days."
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-8 mb-12">
              {[
                { label: "Before", value: "22%", sublabel: "close rate" },
                { label: "After", value: "61%", sublabel: "close rate" },
                { label: "Result", value: "$67K", sublabel: "recovered" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-slate-400 mb-2">{stat.label}</p>
                  <p 
                    className="text-4xl lg:text-5xl font-extrabold text-[#F54A48]"
                    style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-slate-400">{stat.sublabel}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Read Full Case Study →
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl lg:text-4xl font-bold text-[#0D0F33] mb-4"
              style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
            >
              From $398/mo
            </h2>
            <p className="text-[#6B7C93] text-lg font-medium">Fix one problem. Or both.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`p-8 h-full relative ${tier.popular ? 'ring-2 ring-[#F54A48] shadow-xl' : ''}`}>
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F54A48] text-white text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-[#0D0F33] mb-1">{tier.name}</h3>
                  <p 
                    className="text-4xl font-extrabold text-[#0D0F33] mb-2"
                    style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
                  >
                    {tier.price}<span className="text-lg text-[#6B7C93] font-normal">/mo</span>
                  </p>
                  <p className="text-slate-500 mb-6">{tier.description}</p>
                  <ul className="space-y-3">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 lg:p-16 text-center"
          >
            <h2 
              className="text-3xl lg:text-4xl font-extrabold text-[#0D0F33] mb-6"
              style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
            >
              {finalCtaHeadline}
            </h2>

            <Button
              asChild
              className="h-14 px-8 text-base font-bold uppercase bg-[#F54A48] hover:bg-[#e04442] text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              <a href="https://makea.shiftnow.io/widget/bookings/reality" target="_blank" rel="noopener noreferrer">
                BOOK DEMO →
              </a>
            </Button>

            <p className="text-[#6B7C93] mt-4 font-medium">
              15 minutes. Your business.
            </p>
          </motion.div>
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