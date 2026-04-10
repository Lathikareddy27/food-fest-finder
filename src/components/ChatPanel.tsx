import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface ChatMessage {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  profile?: { display_name: string | null; avatar_url: string | null };
}

interface ChatPanelProps {
  meetupId: string;
}

const ChatPanel = ({ meetupId }: ChatPanelProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMsg, setNewMsg] = useState('');
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select('id, user_id, content, created_at, profiles:user_id(display_name, avatar_url)')
        .eq('meetup_id', meetupId)
        .order('created_at', { ascending: true })
        .limit(100);
      if (data) {
        setMessages(data.map((m: any) => ({
          ...m,
          profile: m.profiles,
        })));
      }
    };
    fetchMessages();

    // Subscribe to realtime
    const channel = supabase
      .channel(`chat-${meetupId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `meetup_id=eq.${meetupId}` },
        async (payload) => {
          const newMessage = payload.new as any;
          // Fetch profile for the new message
          const { data: profile } = await supabase
            .from('profiles')
            .select('display_name, avatar_url')
            .eq('user_id', newMessage.user_id)
            .single();
          setMessages((prev) => [...prev, { ...newMessage, profile }]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [meetupId]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!newMsg.trim() || !user) return;
    setSending(true);
    await supabase.from('chat_messages').insert({
      meetup_id: meetupId,
      user_id: user.id,
      content: newMsg.trim(),
    });
    setNewMsg('');
    setSending(false);
  };

  if (!user) {
    return (
      <div className="bg-card rounded-2xl border border-border p-6 text-center" style={{ boxShadow: 'var(--shadow-card)' }}>
        <p className="text-muted-foreground text-sm">Sign in to join the group chat</p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
      <div className="p-4 border-b border-border">
        <h2 className="font-serif font-semibold text-lg">Group Chat</h2>
      </div>
      <div ref={scrollRef} className="p-4 space-y-3 max-h-72 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No messages yet. Start the conversation!</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start gap-2 ${msg.user_id === user.id ? 'flex-row-reverse' : ''}`}>
            <div className="h-7 w-7 rounded-full gradient-warm flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-primary-foreground">
                {(msg.profile?.display_name || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
            <div className={`max-w-[75%] ${msg.user_id === user.id ? 'text-right' : ''}`}>
              <p className="text-xs font-semibold">
                {msg.profile?.display_name || 'User'}{' '}
                <span className="font-normal text-muted-foreground">
                  {format(new Date(msg.created_at), 'h:mm a')}
                </span>
              </p>
              <p className={`text-sm rounded-xl px-3 py-1.5 inline-block ${
                msg.user_id === user.id
                  ? 'gradient-warm text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}>
                {msg.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="p-3 border-t border-border flex gap-2"
      >
        <Input
          placeholder="Type a message..."
          className="rounded-xl h-10"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <Button type="submit" size="icon" disabled={sending || !newMsg.trim()} className="gradient-warm rounded-xl h-10 w-10 shrink-0">
          <Send className="h-4 w-4 text-primary-foreground" />
        </Button>
      </form>
    </div>
  );
};

export default ChatPanel;
