import React, { useState, useEffect, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, ArrowRight, Play, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from '@/api/base44Client';

// Calculation Engine
function calculateRevenueGap(inputs) {
  const {
    monthlyLeads,
    avgJobValue,
    closeRate,
    tireKickerPercent,
    missedCalls,
    hourlyValue
  } = inputs;
  
  const garbageLeads = monthlyLeads * (tireKickerPercent / 100);
  const hoursWasted = garbageLeads * 2.5;
  
  const timeCost = hoursWasted * hourlyValue;
  const leadCost = garbageLeads * 150;
  const dealsMissed = hoursWasted / 4;
  const opportunityCost = dealsMissed * avgJobValue * (closeRate / 100);
  
  const totalGarbage = timeCost + leadCost + opportunityCost;
  
  const potentialRevenue = missedCalls * avgJobValue * (closeRate / 100);
  const totalMissed = potentialRevenue * 0.5;
  
  const totalMonthly = totalGarbage + totalMissed;
  const totalAnnual = totalMonthly * 12;
  
  return {
    garbage: {
      total: Math.round(totalGarbage),
      timeCost: Math.round(timeCost),
      leadCost: Math.round(leadCost),
      opportunityCost: Math.round(opportunityCost),
      leadsCount: Math.round(garbageLeads),
      hoursWasted: Math.round(hoursWasted)
    },
    missed: {
      total: Math.round(totalMissed),
      potentialRevenue: Math.round(potentialRevenue),
      callsCount: missedCalls
    },
    total: {
      monthly: Math.round(totalMonthly),
      annual: Math.round(totalAnnual)
    }
  };
}

// Custom Slider Component
function SliderInput({ label, value, onChange, min, max, step, format, tooltip }) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  const displayValue = format === 'currency' 
    ? `$${value.toLocaleString()}`
    : format === 'percent'
    ? `${value}%`
    : value.toLocaleString();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-slate-600">{label}</label>
        {tooltip && (
          <span className="text-xs text-slate-400 max-w-[200px] text-right hidden sm:block">{tooltip}</span>
        )}
      </div>
      <div className="text-center mb-4">
        <span className="text-3xl font-bold text-[#0D0F33]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {displayValue}
        </span>
      </div>
      <div className="relative">
        <div className="h-2 bg-slate-200 rounded-full">
          <div 
            className="h-full rounded-full"
            style={{ 
              width: `${percentage}%`,
              background: 'linear-gradient(90deg, #F54A48, #FA982F)'
            }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0D0F33] rounded-full border-[3px] border-white shadow-lg pointer-events-none transition-all"
          style={{ left: `calc(${percentage}% - 12px)` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-slate-400">
        <span>{format === 'currency' ? `$${min.toLocaleString()}` : format === 'percent' ? `${min}%` : min}</span>
        <span>{format === 'currency' ? `$${max.toLocaleString()}` : format === 'percent' ? `${max}%` : max}</span>
      </div>
    </div>
  );
}

// Animated Counter
function AnimatedCounter({ value, prefix = '', suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.round(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <span>{prefix}{displayValue.toLocaleString()}{suffix}</span>
  );
}

export default function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode') || 'combined';
  
  const [inputs, setInputs] = useState({
    monthlyLeads: 40,
    avgJobValue: 10000,
    closeRate: 20,
    tireKickerPercent: 40,
    missedCalls: 20,
    hourlyValue: 250
  });
  
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
  const results = useMemo(() => calculateRevenueGap(inputs), [inputs]);
  
  const updateInput = (key, value) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };
  
  const handleCalculate = () => {
    setShowEmailGate(true);
  };
  
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    
    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email');
      hasError = true;
    }
    
    if (!phone || phone.length < 10) {
      setPhoneError('Please enter a valid phone number');
      hasError = true;
    }
    
    if (hasError) return;
    
    setShowEmailGate(false);
    setShowResults(true);
  };
  
  const getCopy = () => {
    if (mode === 'garbage') {
      return {
        h1: "How Much Do Tire-Kickers Cost You?",
        subhead: "Our research shows roofing contractors lose $50K+ every month chasing leads that were never going to buy. Calculate YOUR cost.",
        cta: "Calculate My Garbage Lead Cost"
      };
    } else if (mode === 'missed') {
      return {
        h1: "How Much Do Missed Calls Cost You?",
        subhead: "78% of roofing jobs go to whoever answers first. Calculate how much you're losing to voicemail.",
        cta: "Calculate My Missed Call Cost"
      };
    }
    return {
      h1: "How Much Are You Really Losing?",
      subhead: "Most roofing contractors lose $50K+ every month to garbage leads and missed calls. Calculate YOUR exact number in 60 seconds.",
      cta: "Calculate My Revenue Gap"
    };
  };
  
  const copy = getCopy();
  
  const experienceUrl = `${createPageUrl('Experience')}?from=calculator&total_gap=${results.total.monthly}&garbage_cost=${results.garbage.total}&missed_cost=${results.missed.total}&mode=${mode}&leads=${inputs.monthlyLeads}&job_value=${inputs.avgJobValue}&close_rate=${inputs.closeRate}&missed_calls=${inputs.missedCalls}`;

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
          <span className="text-xs text-[#B8BCC8] font-semibold uppercase tracking-wider hidden sm:block">Your AI sales team that never sleeps</span>
        </div>
      </header>

      {!showResults ? (
        <>
          {/* Hero Section */}
          <section className="py-12 lg:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left: Copy */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 
                    className="text-4xl lg:text-5xl font-bold text-[#1F2937] leading-tight mb-6"
                    style={{ fontFamily: "'Inter', 'Poppins', sans-serif" }}
                  >
                    {copy.h1}
                  </h1>
                  <p className="text-lg text-[#B8BCC8] mb-8 leading-relaxed">
                    {copy.subhead}
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      { text: 'Free — no credit card required', icon: Check },
                      { text: '60 seconds — get your number fast', icon: Check },
                      { text: 'Personalized — based on YOUR business', icon: Check }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <item.icon className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-slate-700">{item.text}</span>
                      </div>
                    ))}
                  </div>
                  
                </motion.div>
                
                {/* Right: Calculator */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <SliderInput
                      label="How many leads do you get per month?"
                      value={inputs.monthlyLeads}
                      onChange={(v) => updateInput('monthlyLeads', v)}
                      min={10}
                      max={500}
                      step={5}
                      tooltip="All sources — web, calls, referrals"
                    />
                    
                    <SliderInput
                      label="What's your average job worth?"
                      value={inputs.avgJobValue}
                      onChange={(v) => updateInput('avgJobValue', v)}
                      min={2500}
                      max={75000}
                      step={2500}
                      format="currency"
                      tooltip="Typical completed job revenue"
                    />
                    
                    <SliderInput
                      label="What's your current close rate?"
                      value={inputs.closeRate}
                      onChange={(v) => updateInput('closeRate', v)}
                      min={5}
                      max={50}
                      step={5}
                      format="percent"
                      tooltip="% of leads that become customers"
                    />
                    
                    {(mode === 'combined' || mode === 'garbage') && (
                      <SliderInput
                        label="What % of your leads are tire-kickers?"
                        value={inputs.tireKickerPercent}
                        onChange={(v) => updateInput('tireKickerPercent', v)}
                        min={10}
                        max={70}
                        step={5}
                        format="percent"
                        tooltip="Leads that waste time but never buy"
                      />
                    )}
                    
                    {(mode === 'combined' || mode === 'missed') && (
                      <SliderInput
                        label="How many calls go unanswered per month?"
                        value={inputs.missedCalls}
                        onChange={(v) => updateInput('missedCalls', v)}
                        min={0}
                        max={50}
                        step={5}
                        tooltip="Voicemail, after-hours, or missed"
                      />
                    )}
                    
                    <SliderInput
                      label="What's your time worth per hour?"
                      value={inputs.hourlyValue}
                      onChange={(v) => updateInput('hourlyValue', v)}
                      min={100}
                      max={2000}
                      step={100}
                      format="currency"
                      tooltip="As an owner, your hourly value"
                    />
                    
                    <Button
                      onClick={handleCalculate}
                      className="w-full h-14 text-sm font-bold uppercase bg-[#FF6B47] hover:bg-[#FF5533] text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                    >
                      {copy.cta}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Trust Bar */}
          <section className="py-8 border-t border-slate-200 bg-[#F5F3EE]">
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
        </>
      ) : (
        /* Results Section */
        <section className="py-12 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Big Number */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <p className="text-lg text-slate-500 mb-4">Your Monthly Revenue Gap</p>
              <div className="bg-gradient-to-r from-[#FFEBEE] via-white to-[#E8F5E9] rounded-2xl p-8 sm:p-12 inline-block">
                <p 
                  className="text-5xl sm:text-7xl font-extrabold text-[#F54A48]"
                  style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
                >
                  <AnimatedCounter value={results.total.monthly} prefix="$" />
                </p>
              </div>
              <p className="text-xl text-[#0D0F33] mt-6 font-semibold">
                <span className="text-[#F54A48] font-extrabold">${results.total.annual.toLocaleString()}</span> annually. Gone.
              </p>
            </motion.div>
            
            {/* Breakdown Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#FFEBEE] rounded-xl p-6 border-l-4 border-[#F54A48]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🗑️</span>
                  <h3 className="font-semibold text-[#0D0F33] uppercase tracking-wide text-sm">Garbage Lead Cost</h3>
                </div>
                <p className="text-3xl font-extrabold text-[#F54A48] mb-4" style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}>
                  ${results.garbage.total.toLocaleString()}/mo
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Time wasted on tire-kickers: <span className="font-medium">${results.garbage.timeCost.toLocaleString()}</span></li>
                  <li>• Lead costs for non-buyers: <span className="font-medium">${results.garbage.leadCost.toLocaleString()}</span></li>
                  <li>• Deals lost to distraction: <span className="font-medium">${results.garbage.opportunityCost.toLocaleString()}</span></li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#E8F4FD] rounded-xl p-6 border-l-4 border-[#1976D2]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">📞</span>
                  <h3 className="font-semibold text-[#0D0F33] uppercase tracking-wide text-sm">Missed Call Cost</h3>
                </div>
                <p className="text-3xl font-extrabold text-[#2E77AE] mb-4" style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}>
                  ${results.missed.total.toLocaleString()}/mo
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Revenue potential lost: <span className="font-medium">${results.missed.potentialRevenue.toLocaleString()}</span></li>
                </ul>
                <p className="text-sm text-slate-500 mt-4 italic">
                  78% of jobs go to whoever answers first.
                </p>
              </motion.div>
            </div>
            
            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center"
            >
              <h2 
                className="text-2xl sm:text-3xl font-extrabold text-[#0D0F33] mb-6"
                style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
              >
                Close This Gap.
              </h2>

              <Button
                asChild
                className="h-14 px-8 text-base font-bold uppercase bg-[#F54A48] hover:bg-[#e04442] text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] mb-4"
              >
                <a href="https://makea.shiftnow.io/widget/bookings/reality" target="_blank" rel="noopener noreferrer">
                  BOOK FREE SESSION →
                </a>
              </Button>

              <p className="text-[#6B7C93] mb-8 font-medium">15 minutes. No pitch.</p>
              
              <div className="flex items-center justify-center gap-4 text-slate-400 mb-8">
                <div className="h-px bg-slate-200 w-16" />
                <span>or</span>
                <div className="h-px bg-slate-200 w-16" />
              </div>
              
              <Button
                asChild
                variant="outline"
                className="h-12 px-6 border-2 border-[#0D0F33] text-[#0D0F33] hover:bg-[#0D0F33] hover:text-white rounded-lg transition-all"
              >
                <Link to={experienceUrl}>
                  <Eye className="mr-2 w-4 h-4" />
                  See ShiFt in Action First →
                </Link>
              </Button>
              
              <p className="text-[#6B7C93] mt-3 text-sm font-medium">See AI qualify leads. Live.</p>
            </motion.div>
            
            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 text-center"
            >
              <p className="text-slate-600 italic">
                "Phoenix contractor cut garbage leads 80%. Close rate: 22% → 61%."
              </p>
              <a href="#" className="text-[#F54A48] font-medium hover:underline mt-2 inline-block">
                Read the Case Study →
              </a>
            </motion.div>
          </div>
        </section>
      )}
      
      {/* Email Gate Modal */}
      <Dialog open={showEmailGate} onOpenChange={setShowEmailGate}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <div className="p-8">
            <h3 
              className="text-2xl font-bold text-[#0D0F33] text-center mb-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Your results are ready.
            </h3>
            <p className="text-slate-500 text-center mb-6">
              Enter your email to see your personalized Revenue Gap report.
            </p>
            
            <form onSubmit={handleEmailSubmit}>
              <div className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="Your business email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError('');
                    }}
                    className="h-12"
                    required
                  />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
                
                <div>
                  <Input
                    type="tel"
                    placeholder="Your mobile phone number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setPhoneError('');
                    }}
                    className="h-12"
                    required
                  />
                  {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full h-12 bg-[#F54A48] hover:bg-[#e04442] text-white font-semibold rounded-lg mt-4"
              >
                SHOW MY RESULTS
              </Button>
            </form>
            
            <p className="text-xs text-slate-400 text-center mt-4">
              We'll also email you a PDF copy. No spam, ever.
            </p>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Footer */}
      <footer className="py-8 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#B8BCC8] text-sm">
          © 2026 ShiFt. All rights reserved.
        </div>
      </footer>
    </div>
  );
}