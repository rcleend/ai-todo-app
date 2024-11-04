import React, { useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { Task } from "@/lib/types";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

interface TaskSuggestionsProps {
  suggestions: Task[];
  isLoading: boolean;
  onSelectSuggestion: (suggestion: Task) => void;
  onClose: () => void;
  show: boolean;
}

export function TaskSuggestions({
  suggestions,
  isLoading,
  onSelectSuggestion,
  onClose,
  show,
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

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 pb-4 bg-popover border-2 rounded-md shadow-md [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/.48))_border-box] border-transparent animate-border"
        >
          <div className="flex items-center gap-1 px-4 py-2 border-b border-border/50">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span className="text-xs text-muted-foreground">
              AI Suggestions
            </span>
          </div>
          {isLoading ? (
            <div className="space-y-0">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between px-4 py-2"
                >
                  <Skeleton className="h-5 w-3/4" />
                </div>
              ))}
            </div>
          ) : (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-left hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => onSelectSuggestion(suggestion)}
                role="option"
                aria-selected="false"
              >
                <span>{suggestion.title}</span>
              </div>
            ))
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
