"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { createEvent } from "@/service/Events";
import { EventFormData } from "@/types/eventType";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { eventFormSchema } from "./createEventValidations";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateEvent = () => {
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: undefined,
      venue: "",
      publicEvent: false,
      paidEvent: false,
      image: null,
      fee: null,
    },
  });

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting },
    setValue,
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const eventData = {
      title: data.title,
      description: data.description,
      dateTime: data.date?.toISOString() || null,
      venue: data.venue,
      isPublic: data.publicEvent,
      isPaid: data.paidEvent,

      fee: data.fee
        ? typeof data.fee === "string"
          ? parseFloat(data.fee.replace(/[^\d.-]/g, ""))
          : data.fee
        : null,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(eventData));
    formData.append("file", data.image);
    console.log(eventData);

    try {
      const res = await createEvent(formData);
      console.log(res);
      if (res.success) {
        toast.success(res.message);
        reset();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-xl my-4 font-bold">Create New Event</h1>
      <Form {...form}>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {/* Title */}
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Event title" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Give your event a catchy name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Event description" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Provide details about the event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date & Venue */}
            <div className="flex gap-6">
              {/* Date */}
              <FormField
                control={control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date and Time</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormDescription className="text-xs">
                      When will your event take place?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Venue */}
              <FormField
                control={control}
                name="venue"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Venue</FormLabel>
                    <FormControl>
                      <Input placeholder="Center Park, New York" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Where will your event be held?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Toggles */}
            <div className="flex gap-6">
              <FormField
                control={control}
                name="publicEvent"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col space-y-2">
                    <FormLabel>Public Event</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Make this event visible to everyone
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="paidEvent"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col space-y-2">
                    <FormLabel>Paid Event</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Charge fee for this event
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image & Fee */}
            <div className="flex gap-6">
              {/* Image Upload */}
              <FormField
                control={control}
                name="image"
                render={() => (
                  <FormItem className="w-full">
                    <FormLabel>Event Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setValue("image", file, { shouldValidate: true });
                        }}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Upload a banner or flyer for your event
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Fee Input */}
              {watch("paidEvent") && (
                <FormField
                  control={control}
                  name="fee"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Entry Fee</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="$0.00"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        How much will you charge?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          <Button type="submit" className="mt-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Event"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateEvent;
