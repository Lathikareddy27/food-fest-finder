import { UserPlus, Utensils, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: UserPlus,
    title: 'Create or Find',
    description: 'Post a food meetup or find one nearby that matches your taste.',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: Utensils,
    title: 'Match & Meet',
    description: 'Connect with fellow foodies and join the table. No more eating alone!',
    color: 'bg-accent/10 text-accent',
  },
  {
    icon: MessageCircle,
    title: 'Chat & Enjoy',
    description: 'Coordinate through group chat, share reviews, and make foodie friends.',
    color: 'bg-secondary-foreground/10 text-secondary-foreground',
  },
];

const HowItWorks = () => (
  <section className="py-16 px-6">
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-3">
        How It <span className="text-gradient-warm">Works</span>
      </h2>
      <p className="text-muted-foreground mb-12 max-w-lg mx-auto">
        Three simple steps to your next food adventure
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl p-8 border border-border hover:border-primary/20 transition-all duration-300"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className={`h-14 w-14 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-5`}>
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className="font-serif font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
            {i < 2 && (
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl text-muted-foreground/30">
                →
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
