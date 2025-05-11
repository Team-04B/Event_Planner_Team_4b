"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { chengePassword } from "@/service/AuthService";
import { Upload, User } from "lucide-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const Profile = ({ datas }: any) => {
  const form = useForm<FieldValues>();
  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = await chengePassword(data);
      console.log(result);
      if (result?.success) {
        toast.success("you ar password success fully cheange");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  };
  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your profile information and change your password
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              {/* Profile Image */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={
                      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    }
                    alt="profile"
                  />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center">
                  <Label
                    htmlFor="avatar-upload"
                    className="flex cursor-pointer items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    {"Change Avatar"}
                    <Upload className="ml-2 h-4 w-4" />
                  </Label>
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>

                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={datas?.name || "Not Found"}
                    readOnly
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="text'"
                    value={datas?.email || "Not Found"}
                    readOnly
                  />
                </div>
              </div>

              <Separator />

              {/* Password Change */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Change Password</h3>
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="new-password"></Label>
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" className="ml-auto">
                {isSubmitting ? "cheanges...." : " Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
