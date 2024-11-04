import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Task } from "@/lib/types";

interface TaskSuggestionsProps {
  suggestions: Task[];
  isLoading: boolean;
  onSelectSuggestion: (suggestion: Task) => void;
  onClose: () => void;
}

export function TaskSuggestions({
  suggestions,
  isLoading,
  onSelectSuggestion,
  onClose,
}: TaskSuggestionsProps) {
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (isLoading || suggestions.length === 0) {
    return null;
  }

  return (
    <div
      ref={suggestionsRef}
      className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] border-transparent animate-border"
    >
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-accent/50 transition-colors"
          onClick={() => onSelectSuggestion(suggestion)}
        >
          <span className="truncate flex-1">{suggestion.title}</span>
          <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      ))}
    </div>
  );
}
