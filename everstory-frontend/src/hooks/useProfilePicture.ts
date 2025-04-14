// src/hooks/useProfilePicture.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/client";

export const useProfilePicture = () => {
  return useQuery({
    queryKey: ["profile-pfp"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/me/pfp");
      return response.upload_url; // Extract only the URL
    },
    staleTime: 5 * 60 * 1000, // optional caching
  });
};
