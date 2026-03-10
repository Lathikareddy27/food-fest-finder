import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cuisineTypes } from '@/data/mockData';
import { MapPin, Clock, Users, Utensils, ArrowLeft, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const CreateMeetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    title: '', restaurant: '', cuisine: '', location: '', date: '', time: '', maxPeople: '4', description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: '🎉 Meetup Created!', description: 'Your food meetup is now live.' });
    navigate('/meetups');
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <div className="bg-card border-b border-border px-6 py-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 text-sm">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <h1 className="text-3xl font-serif font-bold">
            Create a <span className="text-gradient-warm">Meetup</span>
          </h1>
          <p className="text-muted-foreground mt-1">Set up a food meetup and find companions</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Meetup Title</Label>
            <Input id="title" placeholder="e.g. Saturday Brunch Vibes" className="h-11 rounded-xl"
              value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="restaurant">Restaurant</Label>
              <div className="relative">
                <Utensils className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="restaurant" placeholder="Restaurant name" className="pl-10 h-11 rounded-xl"
                  value={form.restaurant} onChange={e => setForm({...form, restaurant: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cuisine Type</Label>
              <Select onValueChange={v => setForm({...form, cuisine: v})}>
                <SelectTrigger className="h-11 rounded-xl"><SelectValue placeholder="Select cuisine" /></SelectTrigger>
                <SelectContent>
                  {cuisineTypes.filter(c => c !== 'All').map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="location" placeholder="Area, City" className="pl-10 h-11 rounded-xl"
                value={form.location} onChange={e => setForm({...form, location: e.target.value})} required />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" className="h-11 rounded-xl"
                value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="time" type="time" className="pl-10 h-11 rounded-xl"
                  value={form.time} onChange={e => setForm({...form, time: e.target.value})} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxPeople">Max People</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="maxPeople" type="number" min="2" max="20" className="pl-10 h-11 rounded-xl"
                  value={form.maxPeople} onChange={e => setForm({...form, maxPeople: e.target.value})} required />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Tell people what to expect..." className="rounded-xl min-h-[100px]"
              value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="gradient-warm text-primary-foreground rounded-xl h-12 px-8 text-base font-semibold flex-1">
              Create Meetup
            </Button>
            <Button type="button" variant="outline" className="rounded-xl h-12 px-6" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default CreateMeetup;
