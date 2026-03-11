import { useParams, useNavigate, Link } from 'react-router-dom';
import { meetups, messages } from '@/data/mockData';
import { ArrowLeft, MapPin, Clock, Users, Star, Send, Share2, CheckCircle2, Flag, Ban, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MeetupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [chatMsg, setChatMsg] = useState('');
  const meetup = meetups.find(m => m.id === id);

  if (!meetup) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-3">😕</p>
          <p className="font-serif font-semibold text-xl">Meetup not found</p>
          <Link to="/meetups" className="text-primary mt-2 inline-block">Browse meetups</Link>
        </div>
      </div>
    );
  }

  const spotsLeft = meetup.maxPeople - meetup.joinedPeople;

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Hero image */}
      <div className="relative h-64 md:h-80">
        <img src={meetup.image} alt={meetup.restaurant} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <button onClick={() => navigate(-1)} className="bg-card/80 backdrop-blur rounded-xl p-2.5 hover:bg-card transition">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button className="bg-card/80 backdrop-blur rounded-xl p-2.5 hover:bg-card transition">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge className="gradient-warm text-primary-foreground border-0 mb-2">{meetup.cuisine}</Badge>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-white">{meetup.title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-6">
        {/* Info row */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-primary" /> {meetup.location}</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {meetup.date} · {meetup.time}</span>
          <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary" /> {meetup.joinedPeople}/{meetup.maxPeople} joined</span>
          <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-primary text-primary" /> {meetup.rating}</span>
        </div>

        {/* Budget info */}
        {meetup.budget && (
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium">
            💰 Budget: {meetup.budget} per person
          </div>
        )}

        {/* Description */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h2 className="font-serif font-semibold text-lg mb-2">About</h2>
          <p className="text-muted-foreground leading-relaxed">{meetup.description}</p>
        </div>

        {/* Host */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-semibold text-lg">Hosted by</h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                  ⋯
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toast({ title: '🚩 Reported', description: 'This user has been reported. We will review.' })}>
                  <Flag className="h-4 w-4 mr-2" /> Report User
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: '🚫 Blocked', description: 'This user has been blocked.' })}>
                  <Ban className="h-4 w-4 mr-2" /> Block User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full gradient-warm flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">{meetup.creator.name.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-semibold">{meetup.creator.name}</p>
                {meetup.creator.verified && (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-primary text-primary" /> {meetup.creator.rating} rating</span>
                <span>·</span>
                <span>{meetup.creator.meetupsCreated} meetups hosted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Participants */}
        {meetup.participants && meetup.participants.length > 0 && (
          <div className="bg-card rounded-2xl p-6 border border-border mb-6" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h2 className="font-serif font-semibold text-lg mb-4">Participants ({meetup.participants.length})</h2>
            <div className="flex flex-wrap gap-3">
              {meetup.participants.map((p, i) => (
                <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2">
                  <div className="h-8 w-8 rounded-full gradient-warm flex items-center justify-center">
                    <span className="text-xs font-bold text-primary-foreground">{p.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">{p.name}</span>
                      {p.verified && <CheckCircle2 className="h-3 w-3 text-primary" />}
                    </div>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-primary text-primary" /> {p.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safety tools */}
        <div className="flex gap-2 mb-6">
          <Button variant="outline" className="rounded-xl text-sm" onClick={() => toast({ title: '📍 Location shared', description: 'Your location has been shared with meetup participants.' })}>
            <Navigation className="h-4 w-4 mr-1.5" /> Share Location
          </Button>
        </div>

        {/* Chat */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden mb-6" style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="p-4 border-b border-border">
            <h2 className="font-serif font-semibold text-lg">Group Chat</h2>
          </div>
          <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
            {messages.map(msg => (
              <div key={msg.id} className="flex items-start gap-2">
                <div className="h-7 w-7 rounded-full gradient-warm flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-primary-foreground">{msg.senderName.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold">{msg.senderName} <span className="font-normal text-muted-foreground">{msg.timestamp}</span></p>
                  <p className="text-sm text-muted-foreground">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border flex gap-2">
            <Input placeholder="Type a message..." className="rounded-xl h-10" value={chatMsg} onChange={e => setChatMsg(e.target.value)} />
            <Button size="icon" className="gradient-warm rounded-xl h-10 w-10 shrink-0">
              <Send className="h-4 w-4 text-primary-foreground" />
            </Button>
          </div>
        </div>

        {/* Join button */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {spotsLeft > 0 ? (
            <Button
              onClick={() => toast({ title: '🎉 You joined!', description: `You're now part of "${meetup.title}"` })}
              className="w-full gradient-warm text-primary-foreground rounded-xl h-14 text-lg font-semibold shadow-lg"
            >
              Join Meetup · {spotsLeft} spots left
            </Button>
          ) : (
            <Button className="w-full rounded-xl h-14 text-lg font-semibold" variant="outline">
              Join Waitlist
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MeetupDetail;