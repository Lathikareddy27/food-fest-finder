import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UtensilsCrossed, Mail, Lock, Eye, EyeOff, User, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="gradient-warm rounded-xl p-2">
              <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-serif">FoodBuddy</span>
          </Link>

          <h1 className="text-3xl font-serif font-bold mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-8">Join the food companion community</p>

          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="space-y-2">
              <Label>Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Your name" className="pl-10 h-11 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="you@email.com" type="email" className="pl-10 h-11 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Your city" className="pl-10 h-11 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Min 8 characters" type={showPassword ? 'text' : 'password'} className="pl-10 pr-10 h-11 rounded-xl" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full gradient-warm text-primary-foreground rounded-xl h-12 text-base font-semibold mt-2">
              Create Account
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">or</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="rounded-xl h-11">🔵 Google</Button>
              <Button variant="outline" className="rounded-xl h-11">⚫ Apple</Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account? <Link to="/login" className="text-primary font-semibold">Sign In</Link>
          </p>
        </motion.div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img src="https://images.unsplash.com/photo-1543353071-873f17a7a088?w=800" alt="Food gathering" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-warm opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-primary-foreground text-center">
            <h2 className="text-4xl font-serif font-bold mb-4">Find Your Food Tribe</h2>
            <p className="text-primary-foreground/80 text-lg max-w-sm">Connect with food lovers, discover new restaurants, and never dine alone.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
