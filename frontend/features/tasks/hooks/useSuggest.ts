import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "@/lib/types";
import { useToast } from "@/hooks/useToast";

export function useSuggest() {
  const [suggestions, setSuggestions] = useState<Task[]>([]);
  const { toast } = useToast();

  const suggestMutation = useMutation({
    mutationFn: async (tasks: Task[]) => {
      const response = await axios.post("/api/suggest", { tasks });
      return response.data;
    },
    onSuccess: (data) => {
      setSuggestions(data.suggestions);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate task suggestions.",
        variant: "destructive",
      });
    },
  });

  const getSuggestions = (tasks: Task[]) => {
    suggestMutation.mutate(tasks);
  };

  return {
    suggestions,
    getSuggestions,
    isLoading: suggestMutation.isLoading,
  };
}
