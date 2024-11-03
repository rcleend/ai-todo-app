import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function EmptyTasks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-card"
    >
      <div className="p-3 mb-4 rounded-full bg-primary/10">
        <Sparkles className="w-8 h-8 text-primary" />
      </div>
      <h3 className="mb-2 text-xl font-semibold">No tasks yet!</h3>
      <p className="text-muted-foreground">
        Start adding tasks above and make today productive! ✨
      </p>
    </motion.div>
  );
}
