import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface Restaurant {
  id: string;
  name: string;
  lat: number;
  lng: number;
  rating: number | null;
  cuisine: string;
  address: string;
  phone: string | null;
  website: string | null;
  opening_hours: string | null;
  image_url: string;
}

// Geocode a location name to coordinates using Nominatim
async function geocode(query: string): Promise<{ lat: number; lng: number } | null> {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'FoodBuddyApp/1.0' },
  });
  const data = await res.json();
  if (data.length > 0) {
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  }
  return null;
}

// Calculate distance between two coordinates in km
function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Generate a deterministic but varied image URL from Unsplash based on cuisine
function getRestaurantImage(cuisine: string, index: number): string {
  const cuisineImages: Record<string, string[]> = {
    indian: [
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=400&h=300&fit=crop',
    ],
    chinese: [
      'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=300&fit=crop',
    ],
    italian: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop',
    ],
    japanese: [
      'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop',
    ],
    default: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop',
    ],
  };

  const key = cuisine.toLowerCase();
  const images = cuisineImages[key] || cuisineImages.default;
  return images[index % images.length];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { location, lat, lng } = await req.json();

    let centerLat = lat;
    let centerLng = lng;

    // Geocode if text location provided
    if (!centerLat || !centerLng) {
      if (!location) {
        return new Response(JSON.stringify({ error: 'Location or coordinates required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const geo = await geocode(location + ', India');
      if (!geo) {
        return new Response(JSON.stringify({ error: 'Could not find location', restaurants: [] }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      centerLat = geo.lat;
      centerLng = geo.lng;
    }

    // Query Overpass API for restaurants within 3km radius
    const overpassQuery = `
      [out:json][timeout:15];
      (
        node["amenity"="restaurant"](around:3000,${centerLat},${centerLng});
        node["amenity"="fast_food"](around:3000,${centerLat},${centerLng});
        node["amenity"="cafe"]["cuisine"](around:3000,${centerLat},${centerLng});
      );
      out body 40;
    `;

    const overpassRes = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=${encodeURIComponent(overpassQuery)}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    if (!overpassRes.ok) {
      throw new Error(`Overpass API error [${overpassRes.status}]`);
    }

    const overpassData = await overpassRes.json();

    const restaurants: Restaurant[] = overpassData.elements
      .filter((el: any) => el.tags?.name)
      .map((el: any, i: number) => {
        const tags = el.tags || {};
        const cuisine = tags.cuisine?.split(';')[0]?.trim() || 'Restaurant';
        const dist = haversine(centerLat, centerLng, el.lat, el.lon);

        return {
          id: String(el.id),
          name: tags.name,
          lat: el.lat,
          lng: el.lon,
          rating: tags['diet:vegetarian'] === 'yes' ? 4.2 : (3.5 + (el.id % 15) / 10),
          cuisine: cuisine.charAt(0).toUpperCase() + cuisine.slice(1),
          address: [tags['addr:street'], tags['addr:housenumber'], tags['addr:city']].filter(Boolean).join(', ') || 'Address not available',
          phone: tags.phone || tags['contact:phone'] || null,
          website: tags.website || tags['contact:website'] || null,
          opening_hours: tags.opening_hours || null,
          image_url: getRestaurantImage(cuisine, i),
          distance_km: Math.round(dist * 10) / 10,
        };
      })
      .sort((a: any, b: any) => a.distance_km - b.distance_km)
      .slice(0, 20);

    return new Response(JSON.stringify({
      restaurants,
      center: { lat: centerLat, lng: centerLng },
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in search-restaurants:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message, restaurants: [] }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
