import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import MeetupCard from '@/components/MeetupCard';
import CategoryChip from '@/components/CategoryChip';
import { meetups, categories } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <HeroSection />

      {/* Categories */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
            What's Your <span className="text-gradient-warm">Craving</span>?
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <CategoryChip
                key={cat.id}
                icon={cat.icon}
                name={cat.name}
                count={cat.count}
                isActive={activeCategory === cat.id}
                onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Meetups */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">
              Trending <span className="text-gradient-warm">Meetups</span>
            </h2>
            <Link to="/meetups">
              <Button variant="ghost" className="text-primary font-semibold">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetups.slice(0, 3).map((meetup, i) => (
              <motion.div
                key={meetup.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <MeetupCard meetup={meetup} featured />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* CTA */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-warm rounded-3xl p-10 md:p-16 text-primary-foreground"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Find Your Food Buddy?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Join thousands of food lovers discovering new restaurants and making friends over great meals.
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-card text-foreground hover:bg-card/90 rounded-xl px-8 h-12 text-base font-semibold">
                Get Started — It's Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
