import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UtensilsCrossed, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex">
      {/* Left: Image (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800" alt="Restaurant" className="w-full h-full object-cover" />
        <div className="absolute inset-0 gradient-warm opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-primary-foreground text-center">
            <h2 className="text-4xl font-serif font-bold mb-4">Welcome Back, Foodie!</h2>
            <p className="text-primary-foreground/80 text-lg max-w-sm">Great meals and great company are just a login away.</p>
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="gradient-warm rounded-xl p-2">
              <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-serif">FoodBuddy</span>
          </Link>

          <h1 className="text-3xl font-serif font-bold mb-2">Sign In</h1>
          <p className="text-muted-foreground mb-8">Enter your credentials to continue</p>

          <form className="space-y-5" onSubmit={e => e.preventDefault()}>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="you@email.com" type="email" className="pl-10 h-11 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="••••••••" type={showPassword ? 'text' : 'password'} className="pl-10 pr-10 h-11 rounded-xl" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <a href="#" className="text-primary font-medium">Forgot password?</a>
            </div>

            <Button type="submit" className="w-full gradient-warm text-primary-foreground rounded-xl h-12 text-base font-semibold">
              Sign In
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="rounded-xl h-11">🔵 Google</Button>
              <Button variant="outline" className="rounded-xl h-11">⚫ Apple</Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account? <Link to="/signup" className="text-primary font-semibold">Sign Up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
