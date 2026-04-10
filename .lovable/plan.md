

# Plan: Free-text Location Search, Leaflet Map, Create Meetup from Restaurant, Real-time Chat

This is a large feature set with 5 major changes. Here's the plan:

## 1. Free-text Location Search (any location, not just predefined list)

**Current problem**: The location drawer only matches against a hardcoded list of ~12 Indian areas. Typing "Kadapa" returns nothing.

**Fix**: Allow free-text search — when the user types any location and hits search/enter, navigate directly to `/meetups?location=<typed text>`. The edge function already geocodes any text via Nominatim, so it will work for Kadapa, any city, any area worldwide.

- Update `LocationSearchDrawer` to submit the raw typed query (not just matching from the predefined list)
- Add a "Search this location" button that appears when typing, allowing any text to be searched

## 2. "Create Meetup at this Restaurant" Button

- Add a button on each `RestaurantCard` that navigates to `/create` with query params: `restaurant`, `cuisine`, `location`, `lat`, `lng`
- Update `CreateMeetup` page to read these query params on mount and pre-fill the form fields

## 3. Interactive Leaflet Map (replacing placeholder grid map)

- Install `leaflet` and `react-leaflet` packages
- Replace `RestaurantMapView` with a real Leaflet/OpenStreetMap tile map
- Show restaurant pins with popups (name, rating, cuisine, distance, "Create Meetup" link)
- Center map on the searched location's coordinates
- Also update the meetup `MapView` component to use Leaflet

## 4. Real-time Chat System

This requires authentication and database tables.

**Database tables needed:**
- `profiles` — user profile linked to auth.users
- `meetups` — stored meetups (replacing mock data for chat-enabled ones)
- `chat_messages` — with `meetup_id`, `user_id`, `content`, `created_at`; realtime enabled

**Implementation:**
- Set up Supabase Auth (email/password + Google sign-in, email verification required)
- Auth pages: update existing Login/Signup to use real Supabase auth
- Create a `ChatPanel` component using Supabase Realtime subscriptions on `chat_messages`
- Replace the mock chat in `MeetupDetail` with the real-time `ChatPanel`
- RLS policies: users can read messages for meetups they've joined, insert their own messages

## 5. Auth Integration

Since chat requires knowing who the user is:
- Wire up Login and Signup pages with Supabase Auth
- Add auth context/provider
- Protect create meetup and chat behind auth
- Auto-create profile on signup via database trigger

---

## Technical Summary

| Item | Files affected |
|---|---|
| Free-text search | `LocationSearchDrawer.tsx` |
| Create from restaurant | `RestaurantCard.tsx`, `CreateMeetup.tsx` |
| Leaflet map | New `LeafletMap.tsx`, replace `RestaurantMapView.tsx`, `MapView.tsx`, install leaflet deps |
| Auth system | `Login.tsx`, `Signup.tsx`, new `AuthProvider.tsx`, new `profiles` table migration |
| Real-time chat | New `ChatPanel.tsx`, new `chat_messages` + `meetups` table migrations, update `MeetupDetail.tsx` |

**Question before proceeding**: Do you need to store user profile data such as username, display name, avatar, or preferences for the chat system?

