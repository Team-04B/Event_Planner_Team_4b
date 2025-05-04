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
import { loginUser } from "@/service/AuthService";
import { jwtDecode } from "jwt-decode";
import { setUser } from "@/redux/userSlice/userSlice";
import { useAppDispatch } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginPage = () => {
  const form = useForm();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    formState: { isSubmitting },
  } = form;
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    try {
      const res = await loginUser(data);
      const token = res?.data?.accessToken;
      const user = jwtDecode(token);
      dispatch(setUser({ user: user, token: token }));
      console.log(token, user);
      if (token) {
        toast.success("user success fully login!");
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.message);
      console.log(error);
    }
  };
  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
      <div className="flex items-center  space-x-4 mb-6 ">
        <div className="">
          <h1 className="text-xl font-semibold">Login</h1>
          <p className="font-extralight text-sm text-gray-600">Welcome back!</p>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

          <Button
            // disabled={reCaptchaStatus ? false : true}
            type="submit"
            className="mt-5 cursor-pointer w-full"
          >
            {isSubmitting ? "Logging...." : "Login"}
          </Button>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account ?
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
