import { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Task } from "@/lib/types";
import { useToast } from "@/hooks/useToast";
import { useDebounce } from "@/hooks/useDebounce";

export function useSuggest(tasks: Task[]) {
  const [suggestions, setSuggestions] = useState<Task[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  const suggestMutation = useMutation({
    mutationFn: async (tasksForSuggestions: Task[]) => {
      const response = await axios.post("/api/suggest", {
        tasks: tasksForSuggestions,
      });
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

  const getSuggestions = useCallback(() => {
    const tasksForSuggestions = [...tasks.slice(0, 10)];
    suggestMutation.mutate(tasksForSuggestions as Task[]);
  }, [tasks, suggestMutation]);

  const handleTitleChange = useDebounce(getSuggestions, 500);

  return {
    suggestions,
    setSuggestions,
    showSuggestions,
    handleTitleChange,
    setShowSuggestions,
    isLoading: suggestMutation.isLoading,
  };
}
