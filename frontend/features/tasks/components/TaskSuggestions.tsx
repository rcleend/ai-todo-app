import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Task } from "@/lib/types";

interface TaskSuggestionsProps {
  suggestions: Task[];
  isLoading: boolean;
  onSelectSuggestion: (suggestion: Task) => void;
}

export function TaskSuggestions({
  suggestions,
  isLoading,
  onSelectSuggestion,
}: TaskSuggestionsProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          className="w-full justify-between text-left font-normal"
          onClick={() => onSelectSuggestion(suggestion)}
        >
          <span className="truncate">{suggestion.title}</span>
          <Plus className="h-4 w-4 shrink-0" />
        </Button>
      ))}
    </div>
  );
}
