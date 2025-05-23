/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { jwtDecode } from "jwt-decode"
import { registerUser } from "@/service/AuthService"
import { useRouter } from "next/navigation"
import { setUser } from "@/redux/userSlice/userSlice"
import { useAppDispatch } from "@/redux/hook"
import { toast } from "sonner"
import { ArrowRight, Calendar, CheckCircle, Shield, Users } from "lucide-react"
import { useEffect, useState } from "react"

const RegisterPage = () => {
  const form = useForm()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  const {
    formState: { isSubmitting },
  } = form

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await registerUser(data)
      const token = res?.data?.accessToken
      const user = jwtDecode(token)
      dispatch(setUser({ user: user, token: token }))

      if (token) {
        toast.success("Account successfully created!")
        router.push("/")
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.")
      console.error(error)
    }
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
            Create Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Event Journey Today
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join our community and start discovering, creating, and sharing amazing events.
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
              <span className="text-gray-300">Connect with event organizers and attendees</span>
            </div>
            <div
              className={`flex items-center space-x-3 transform transition-all duration-700 delay-500 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
                <Calendar className="h-5 w-5" />
              </div>
              <span className="text-gray-300">Create and manage your own events</span>
            </div>
            <div
              className={`flex items-center space-x-3 transform transition-all duration-700 delay-700 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
                <CheckCircle className="h-5 w-5" />
              </div>
              <span className="text-gray-300">Get personalized event recommendations</span>
            </div>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 gap-6 transform transition-all duration-1000 delay-900 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2 min</div>
              <div className="text-sm text-gray-400">Quick Setup</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">Secure</div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Section */}
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
            <p className="text-gray-600">Create your account and start your event journey</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-600">Join EventTora and discover amazing events</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
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
                          placeholder="Create a strong password"
                          className="h-12 border-2 border-gray-200 focus:border-gray-800 transition-all duration-300"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-2 mt-2">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <p className="text-xs text-gray-500">
                    Your data is securely encrypted and we never share your information.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-gray-800 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Account...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Create Account
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-gray-800 hover:text-black font-medium hover:underline transition-all duration-300"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-center text-gray-500">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-gray-700 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-gray-700 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
