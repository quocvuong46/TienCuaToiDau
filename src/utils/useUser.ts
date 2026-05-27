import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "./supabase/client";

export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export function useUser() {
  const queryClient = useQueryClient();
  const supabase = createClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) return null;
      return user as User;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return {
    user,
    data: user,
    loading: isLoading,
    refetch,
  };
}

export default useUser;
