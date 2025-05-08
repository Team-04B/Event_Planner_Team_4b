/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { registerUser } from "@/service/AuthService";
import { useRouter } from "next/navigation";
import { setUser } from "@/redux/userSlice/userSlice";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner";

const RegisterPage = () => {
  const form = useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    try {
      const res = await registerUser(data);
      console.log(res);
      const token = res?.data?.accessToken;
      const user = jwtDecode(token);
      dispatch(setUser({ user: user, token: token }));
      console.log(token, user);
      if (token) {
        toast.success("user success fully created!");
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center  space-x-4 mb-6 ">
        <div className="">
          <h1 className="text-xl font-semibold">Register</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
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

          <Button type="submit" className="mt-5 cursor-pointer w-full">
            {isSubmitting ? "Register...." : "Register Now"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Already have a account ?
        <Link href="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
