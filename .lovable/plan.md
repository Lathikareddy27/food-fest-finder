

# Plan: Set Up User Authentication with Profiles

## Overview
Wire up the existing Login and Signup pages to real authentication, create a `profiles` table to store user data, and add auth state management throughout the app.

## Database Changes (Migration)

**1. Create `profiles` table:**
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  location TEXT,
  bio TEXT,
  avatar_url TEXT,
  rating NUMERIC DEFAULT 0,
  meetups_created INTEGER DEFAULT 0,
  meetups_joined INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);
```

**2. Auto-create profile on signup (trigger):**
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Frontend Changes

**3. Create `src/contexts/AuthContext.tsx`**
- Auth context provider wrapping the app
- Uses `onAuthStateChange` listener (set up BEFORE `getSession()`)
- Exposes `user`, `session`, `signUp`, `signIn`, `signOut`, `loading`

**4. Update `src/pages/Login.tsx`**
- Add state for email/password inputs
- Call `supabase.auth.signInWithPassword()` on submit
- Show toast on error, navigate to `/` on success
- Show loading state on button

**5. Update `src/pages/Signup.tsx`**
- Add state for name, email, location, password
- Call `supabase.auth.signUp()` with `full_name` and `location` in `options.data`
- Show success toast ("Check your email to verify your account")
- Navigate to `/login` after signup

**6. Update `src/pages/Profile.tsx`**
- Fetch profile from `profiles` table using auth user ID
- Replace mock data with real data
- Wire "Sign Out" button to `signOut()`
- Redirect to `/login` if not authenticated

**7. Update `src/App.tsx`**
- Wrap app with `AuthProvider`
- Hide Navbar/BottomNav on `/login` and `/signup` routes

**8. Update `src/components/Navbar.tsx`**
- Show user avatar/initial when logged in, "Sign In" button when not
- Link profile icon to `/login` when unauthenticated

**9. Create `src/components/ProtectedRoute.tsx`**
- Wrapper that redirects to `/login` if user is not authenticated
- Used for `/create`, `/profile` routes

## No auto-confirm
Email verification will be required (default behavior). Users must verify their email before signing in.

