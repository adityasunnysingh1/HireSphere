import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions.js";

export const useCreateSession = () => {
  const queryClient = useQueryClient(); // Get the client to refresh data later

  return useMutation({
    mutationKey: ["createSession"],
 
    mutationFn: ({ token, ...sessionData }) => {
      return sessionApi.createSession(sessionData, token);
    },

    onSuccess: () => { // Accept data to use it if needed
      toast.success("Session created successfully!");
      // Refresh these lists so the new session appears immediately
      queryClient.invalidateQueries(["activeSessions"]); 
      queryClient.invalidateQueries(["recentSessions"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create room");
    },
  });
};

export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ["activeSessions"],
    queryFn: sessionApi.getActiveSessions,
  });

  return result;
};

export const useMyRecentSessions = () => {
  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: sessionApi.getMyRecentSessions,
  });

  return result;
};

export const useSessionById = (id) => {
  const result = useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: 5000, // refetch every 5 seconds to detect session status changes
  });

  return result;
};

export const useJoinSession = () => {
  const result = useMutation({
    mutationKey: ["joinSession"],
    mutationFn: sessionApi.joinSession,
    onSuccess: () => toast.success("Joined session successfully!"),
    onError: (error) => toast.error(error.response?.data?.message || "Failed to join session"),
  });

  return result;
};

export const useEndSession = () => {
  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: sessionApi.endSession,
    onSuccess: () => toast.success("Session ended successfully!"),
    onError: (error) => toast.error(error.response?.data?.message || "Failed to end session"),
  });

  return result;
};