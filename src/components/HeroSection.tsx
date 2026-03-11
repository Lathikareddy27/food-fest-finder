import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => (
  <section className="relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
    </div>

    <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
            <span className="text-lg">🍕</span> 500+ food lovers already joined
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6">
            Find Food{' '}
            <span className="text-gradient-warm">Companions</span>{' '}
            Near You
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-md leading-relaxed">
            Meet new people and enjoy meals together. Discover food meetups, 
            connect with fellow foodies, and never dine solo again.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Link to="/meetups">
              <Button size="lg" className="gradient-warm text-primary-foreground rounded-xl px-8 h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto">
                Explore Meetups <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/create">
              <Button size="lg" variant="outline" className="rounded-xl px-8 h-12 text-base font-semibold w-full sm:w-auto">
                Host a Meetup
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {['P', 'R', 'A', 'V'].map((letter, i) => (
                <div key={i} className="h-8 w-8 rounded-full gradient-warm flex items-center justify-center border-2 border-background">
                  <span className="text-xs font-bold text-primary-foreground">{letter}</span>
                </div>
              ))}
            </div>
            <span>Join <strong className="text-foreground">2,500+</strong> food lovers</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative rounded-3xl overflow-hidden" style={{ boxShadow: 'var(--shadow-warm)' }}>
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700"
              alt="Friends enjoying food together"
              className="w-full h-[450px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 border border-border"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex items-center gap-3">
              <div className="gradient-warm rounded-xl p-2.5">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <p className="font-semibold text-sm">12 meetups nearby</p>
                <p className="text-xs text-muted-foreground">Within 5 km radius</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
