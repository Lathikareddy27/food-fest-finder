export interface Restaurant {
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
  distance_km: number;
}

export interface RestaurantSearchResult {
  restaurants: Restaurant[];
  center: { lat: number; lng: number };
}
