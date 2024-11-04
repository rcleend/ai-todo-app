import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFormSchema, TaskFormValues } from "@/features/tasks/schemas";
import { useSuggest } from "../hooks/useSuggest";
import { TaskSuggestions } from "./TaskSuggestions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/lib/types";

interface TaskFormProps {
  onSubmit: (values: TaskFormValues, reset: () => void) => void;
  tasks: Task[];
}

export function TaskForm({ onSubmit, tasks }: TaskFormProps) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const {
    suggestions,
    setSuggestions,
    showSuggestions,
    handleTitleChange,
    setShowSuggestions,
    isLoading,
  } = useSuggest(tasks);

  const handleSelectSuggestion = (suggestion: Task) => {
    form.setValue("title", suggestion.title);
    form.setValue("description", suggestion.description || "");
    setShowSuggestions(false);
  };

  const handleSubmit = (values: TaskFormValues) => {
    onSubmit(values, form.reset);
  };

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>
        <CardTitle>Task Manager</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="min-h-[70px] relative">
                    <FormControl>
                      <Input
                        placeholder="Task title"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleTitleChange();
                        }}
                        onFocus={() => {
                          handleTitleChange();
                          setShowSuggestions(true);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                    {showSuggestions && (
                      <TaskSuggestions
                        suggestions={suggestions}
                        isLoading={isLoading}
                        onSelectSuggestion={handleSelectSuggestion}
                        onClose={() => {
                          setSuggestions([]);
                          setShowSuggestions(false);
                        }}
                        show={showSuggestions}
                      />
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="min-h-[70px]">
                    <FormControl>
                      <Textarea
                        placeholder="Task description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-4">
                Add Task
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
