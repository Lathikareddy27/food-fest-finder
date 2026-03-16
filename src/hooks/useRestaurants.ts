import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { RestaurantSearchResult } from '@/types/restaurant';

export function useRestaurants(location: string) {
  return useQuery<RestaurantSearchResult>({
    queryKey: ['restaurants', location],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('search-restaurants', {
        body: { location },
      });
      if (error) throw error;
      return data as RestaurantSearchResult;
    },
    enabled: !!location && location !== 'Near Me',
    staleTime: 5 * 60 * 1000, // 5 min cache
  });
}
