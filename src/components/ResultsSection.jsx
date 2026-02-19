import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import AnimatedCounter from './AnimatedCounter';

export default function ResultsSection({ results, experienceUrl, mode }) {
  useEffect(() => {
    base44.analytics.track({
      eventName: 'leaks_teased',
      properties: { leak_count: 2, remaining: 5, total_gap: results.total.monthly }
    });
  }, []);

  const leaks = [];
  if (results.garbage.total > 0) {
    leaks.push({ label: 'Wasted Time on Unqualified Leads', amount: results.garbage.total });
  }
  if (results.missed.total > 0) {
    leaks.push({ label: 'Missed & After-Hours Calls', amount: results.missed.total });
  }
  leaks.sort((a, b) => b.amount - a.amount);

  return (
    <section className="py-12 lg:py-20 bg-[#0D0F33] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1
            className="text-3xl sm:text-4xl font-extrabold text-white mb-6"
            style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
          >
            You Have Active Revenue Leaks
          </h1>

          {/* Big number */}
          <div className="mb-4">
            <span
              className="text-6xl sm:text-7xl font-extrabold text-[#F54A48]"
              style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
            >
              <AnimatedCounter value={results.total.monthly} prefix="$" />
            </span>
            <span className="text-2xl font-bold text-[#F54A48]">/mo</span>
          </div>

          <p className="text-[#64748B] text-base max-w-xl mx-auto">
            is disappearing through at least 3 of the 7 hidden revenue leaks that cost most contractors $30K–$100K every month.
          </p>
        </motion.div>

        {/* Leak Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-white font-bold text-lg mb-4">Your Biggest Leaks:</p>
          <div className="space-y-3">
            {leaks.map((leak, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg border"
                style={{
                  backgroundColor: '#0D0F33',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderLeft: '3px solid #F54A48'
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🩸</span>
                  <span className="text-white font-bold">{leak.label}</span>
                </div>
                <span className="text-[#DC2626] font-extrabold text-lg whitespace-nowrap ml-4">
                  -${leak.amount.toLocaleString()}/mo
                </span>
              </div>
            ))}

            {/* Static "5 More" card */}
            <div
              className="p-4 rounded-lg"
              style={{
                backgroundColor: '#0D0F33',
                border: '1px solid rgba(255,255,255,0.1)',
                borderLeft: '3px solid #FA982F'
              }}
            >
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xl">🩸</span>
                <span className="text-[#FA982F] font-bold">5 More Leaks Not Yet Measured</span>
              </div>
              <p className="text-[#64748B] text-sm ml-8">
                Booking gaps, no-shows, close rate, follow-up failure, marketing waste
              </p>
            </div>
          </div>
        </motion.div>

        {/* Annual + teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-center mb-10"
        >
          <p className="text-white font-bold text-xl mb-2">
            That's <span className="text-[#F54A48]">${results.total.annual.toLocaleString()}</span>/year.
          </p>
          <p className="text-white text-base">
            Want to see all 7 leaks — and exactly what plugging them is worth?
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-center"
        >
          <Button
            asChild
            className="w-full sm:w-auto h-14 px-8 text-base font-bold bg-[#F54A48] hover:bg-[#e04442] text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] mb-2"
            onClick={() => base44.analytics.track({ eventName: 'all_leaks_cta_click', properties: { total_gap: results.total.monthly, destination: 'booking' } })}
          >
            <a href="https://makea.shiftnow.io/widget/bookings/reality" target="_blank" rel="noopener noreferrer">
              See All 7 Leaks — Book Your Free Reality Session →
            </a>
          </Button>
          <p className="text-[#64748B] text-xs mb-6">15 minutes. Your numbers. Zero obligation.</p>

          <Link
            to={experienceUrl}
            className="text-white underline text-sm hover:text-[#FA982F] transition-colors"
            onClick={() => base44.analytics.track({ eventName: 'fix_leaks_cta_click', properties: { total_gap: results.total.monthly, destination: 'experience' } })}
          >
            See How ShiFt Plugs These Leaks →
          </Link>
        </motion.div>

      </div>
    </section>
  );
}