export interface Meetup {
  id: string;
  title: string;
  restaurant: string;
  cuisine: string;
  location: string;
  date: string;
  time: string;
  maxPeople: number;
  joinedPeople: number;
  creator: User;
  description: string;
  image: string;
  rating: number;
  distance: string;
  status: 'open' | 'full' | 'completed';
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  meetupsCreated: number;
  meetupsJoined: number;
  location: string;
  bio: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Breakfast', icon: '🥞', count: 24 },
  { id: '2', name: 'Lunch', icon: '🍔', count: 56 },
  { id: '3', name: 'Dinner', icon: '🍝', count: 42 },
  { id: '4', name: 'Coffee', icon: '☕', count: 31 },
  { id: '5', name: 'Brunch', icon: '🥑', count: 18 },
  { id: '6', name: 'Street Food', icon: '🌮', count: 37 },
  { id: '7', name: 'Fine Dining', icon: '🥂', count: 12 },
  { id: '8', name: 'Desserts', icon: '🍰', count: 28 },
];

export const users: User[] = [
  { id: '1', name: 'Priya Sharma', avatar: '', rating: 4.8, meetupsCreated: 12, meetupsJoined: 34, location: 'Mumbai', bio: 'Foodie explorer 🍕' },
  { id: '2', name: 'Rahul Patel', avatar: '', rating: 4.6, meetupsCreated: 8, meetupsJoined: 22, location: 'Delhi', bio: 'Weekend brunch lover' },
  { id: '3', name: 'Ananya Gupta', avatar: '', rating: 4.9, meetupsCreated: 20, meetupsJoined: 45, location: 'Bangalore', bio: 'Chef by heart ❤️' },
  { id: '4', name: 'Vikram Singh', avatar: '', rating: 4.5, meetupsCreated: 5, meetupsJoined: 15, location: 'Hyderabad', bio: 'Biryani enthusiast' },
  { id: '5', name: 'Sara Khan', avatar: '', rating: 4.7, meetupsCreated: 10, meetupsJoined: 28, location: 'Pune', bio: 'Vegan food lover 🌱' },
];

export const meetups: Meetup[] = [
  {
    id: '1', title: 'Saturday Brunch Vibes', restaurant: 'The Breakfast Club', cuisine: 'Continental',
    location: 'Koramangala, Bangalore', date: '2026-03-15', time: '10:30 AM',
    maxPeople: 6, joinedPeople: 3, creator: users[2], description: 'Join us for an amazing brunch with pancakes, eggs benedict, and great conversations!',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600', rating: 4.5, distance: '1.2 km', status: 'open'
  },
  {
    id: '2', title: 'Biryani Night Out', restaurant: 'Paradise Biryani', cuisine: 'Indian',
    location: 'Jubilee Hills, Hyderabad', date: '2026-03-16', time: '7:30 PM',
    maxPeople: 8, joinedPeople: 6, creator: users[3], description: 'The best Hyderabadi biryani in town! Let\'s enjoy together.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600', rating: 4.8, distance: '2.5 km', status: 'open'
  },
  {
    id: '3', title: 'Pizza & Chill', restaurant: 'Brik Oven', cuisine: 'Italian',
    location: 'Indiranagar, Bangalore', date: '2026-03-17', time: '8:00 PM',
    maxPeople: 4, joinedPeople: 4, creator: users[0], description: 'Wood-fired pizzas and good vibes! All spots filled but join the waitlist.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600', rating: 4.3, distance: '0.8 km', status: 'full'
  },
  {
    id: '4', title: 'Vegan Discovery Lunch', restaurant: 'Green Theory', cuisine: 'Vegan',
    location: 'Baner, Pune', date: '2026-03-18', time: '12:30 PM',
    maxPeople: 5, joinedPeople: 2, creator: users[4], description: 'Explore amazing plant-based dishes! Newcomers welcome 🌱',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600', rating: 4.6, distance: '3.1 km', status: 'open'
  },
  {
    id: '5', title: 'Street Food Walk', restaurant: 'Chandni Chowk', cuisine: 'Street Food',
    location: 'Old Delhi', date: '2026-03-19', time: '5:00 PM',
    maxPeople: 10, joinedPeople: 7, creator: users[1], description: 'Walk through the legendary streets of Old Delhi tasting the best chaat, paranthas, and jalebi!',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600', rating: 4.9, distance: '4.2 km', status: 'open'
  },
  {
    id: '6', title: 'Coffee Tasting Session', restaurant: 'Third Wave Coffee', cuisine: 'Coffee',
    location: 'HSR Layout, Bangalore', date: '2026-03-20', time: '3:00 PM',
    maxPeople: 4, joinedPeople: 1, creator: users[2], description: 'Single origin pour-overs and espresso flights. Perfect for coffee nerds ☕',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600', rating: 4.4, distance: '1.8 km', status: 'open'
  },
];

export const messages: Message[] = [
  { id: '1', senderId: '2', senderName: 'Rahul', senderAvatar: '', text: 'Hey! Looking forward to this meetup!', timestamp: '10:30 AM' },
  { id: '2', senderId: '3', senderName: 'Ananya', senderAvatar: '', text: 'Same! The food there is amazing 🔥', timestamp: '10:32 AM' },
  { id: '3', senderId: '1', senderName: 'Priya', senderAvatar: '', text: 'Should we pre-order anything?', timestamp: '10:35 AM' },
  { id: '4', senderId: '2', senderName: 'Rahul', senderAvatar: '', text: 'Let\'s decide when we get there!', timestamp: '10:36 AM' },
];

export const cuisineTypes = ['All', 'Indian', 'Continental', 'Italian', 'Chinese', 'Vegan', 'Street Food', 'Coffee', 'Desserts'];
