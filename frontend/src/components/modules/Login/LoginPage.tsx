"use client"

import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { loginUser } from "@/service/AuthService"
import { jwtDecode } from "jwt-decode"
import { setUser } from "@/redux/userSlice/userSlice"
import { useAppDispatch } from "@/redux/hook"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Separator } from "@/components/ui/separator"
import { LockIcon, UserIcon, Calendar, Users, Sparkles, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

interface LoginResponse {
  data: {
    accessToken: string
  }
}

const LoginPage = () => {
  const form = useForm<FieldValues>()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams?.get("redirectPath") || "/dashboard"
  const [isVisible, setIsVisible] = useState(false)

  const {
    formState: { isSubmitting },
    setValue,
  } = form

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = (await loginUser(data)) as LoginResponse

      if (res?.data?.accessToken) {
        const token = res.data.accessToken
        const user = jwtDecode(token)

        dispatch(setUser({ user, token }))
        toast.success("Welcome back! Login successful!")
        router.push(redirect)
      } else {
        toast.error("Invalid response from server.")
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
        console.error(error)
      } else {
        toast.error("An unknown error occurred.")
        console.error("Unknown error:", error)
      }
    }
  }

  // Function to set admin credentials
  const setAdminCredentials = () => {
    setValue("email", "team04b@gmail.com")
    setValue("password", "team04b@gmail.com")
    toast.info("Admin credentials filled")
  }

  // Function to set user credentials
  const setUserCredentials = () => {
    setValue("email", "rimonamdadul301@gmail.com")
    setValue("password", "rimonamdadul301@gmail.com")
    toast.info("User credentials filled")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex">
      {/* Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white/3 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-white/3 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-white/5 rounded-full animate-bounce delay-700"></div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        {/* Hero Content */}
        <div
          className={`relative z-10 flex flex-col justify-center items-start p-12 text-white transform transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="bg-white/10 p-3 rounded-full mr-4 backdrop-blur-sm border border-white/20">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold">EventTora</h1>
            </div>
            <div className="w-20 h-1 bg-gradient-to-r from-white to-gray-300 rounded-full mb-6"></div>
          </div>

          <h2 className="text-3xl font-bold mb-4 leading-tight">
            Discover Amazing
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Events Near You
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of event enthusiasts and never miss out on the experiences that matter to you.
          </p>

          {/* Feature Cards */}
          <div className="space-y-4 mb-8">
            <div
              className={`flex items-center space-x-3 transform transition-all duration-700 delay-300 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-gray-300">Connect with like-minded people</span>
            </div>
            <div
              className={`flex items-center space-x-3 transform transition-all duration-700 delay-500 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-gray-300">Discover unique experiences</span>
            </div>
            <div
              className={`flex items-center space-x-3 transform transition-all duration-700 delay-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
                <Calendar className="h-5 w-5" />
              </div>
              <span className="text-gray-300">Never miss important events</span>
            </div>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 gap-6 transform transition-all duration-1000 delay-900 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-sm text-gray-400">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-sm text-gray-400">Happy Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div
          className={`w-full max-w-md transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Mobile Hero Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-gray-800 to-black p-3 rounded-full mr-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent">
                EventTora
              </h1>
            </div>
            <p className="text-gray-600">Welcome back to your event journey</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
              <p className="text-gray-600">Sign in to continue your event journey</p>
            </div>

            {/* Quick Login Buttons */}
            <div className="mb-6">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center justify-center gap-2 h-11 border-2 border-gray-300 hover:border-gray-800 hover:bg-gray-50 transition-all duration-300 group"
                  onClick={setAdminCredentials}
                >
                  <LockIcon className="h-4 w-4 group-hover:text-gray-800 transition-colors" />
                  <span className="text-sm font-medium">Admin</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center justify-center gap-2 h-11 border-2 border-gray-300 hover:border-gray-600 hover:bg-gray-50 transition-all duration-300 group"
                  onClick={setUserCredentials}
                >
                  <UserIcon className="h-4 w-4 group-hover:text-gray-600 transition-colors" />
                  <span className="text-sm font-medium">User</span>
                </Button>
              </div>
              <p className="text-xs text-center text-gray-500">Quick login for demo purposes</p>
            </div>

            <div className="relative mb-6">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-3 text-sm text-gray-500">or continue with email</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="h-12 border-2 border-gray-200 focus:border-gray-800 transition-all duration-300"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="h-12 border-2 border-gray-200 focus:border-gray-800 transition-all duration-300"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Sign In
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-gray-800 hover:text-black font-medium hover:underline transition-all duration-300"
                >
                  Create one now
                </Link>
              </p>
            </div>

            {/* <div className="mt-4 text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-all duration-300"
              >
                Forgot your password?
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
