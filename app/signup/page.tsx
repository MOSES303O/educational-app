"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GraduationCap, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SignupPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [mpesaCode, setMpesaCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [countdown, setCountdown] = useState(7)
  const router = useRouter()

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and format as needed
    const value = e.target.value.replace(/[^\d]/g, "")
    setPhoneNumber(value)
  }

  const handleMpesaCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow alphanumeric characters
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
    setMpesaCode(value)
  }

  // Update the handleSubmit function to implement STK push
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate phone number (simple validation for Kenya numbers)
    if (!phoneNumber || phoneNumber.length < 9) {
      setErrorMessage("Please enter a valid phone number")
      setPaymentStatus("error")
      return
    }

    // Validate M-Pesa code (simple validation)
    if (!mpesaCode || mpesaCode.length < 6) {
      setErrorMessage("Please enter a valid M-Pesa code")
      setPaymentStatus("error")
      return
    }

    // Simulate STK push
    setIsProcessing(true)
    setPaymentStatus("processing")

    // Simulate API call delay
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentStatus("success")

      // Update user record to indicate payment
      const userRecord = JSON.parse(localStorage.getItem("eduPathwayUser") || "{}")
      userRecord.hasPaid = true
      localStorage.setItem("eduPathwayUser", JSON.stringify(userRecord))

      // Start countdown for redirect
      setCountdown(7)
    }, 3000)
  }

  // Countdown effect after successful payment
  useEffect(() => {
    let timer: NodeJS.Timeout

    if (paymentStatus === "success" && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (paymentStatus === "success" && countdown === 0) {
      // Redirect to courses page
      router.push("/courses")
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [paymentStatus, countdown, router])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xl font-bold">EduPathway</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/courses"
              className="text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Courses
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/signup"
              className="text-sm font-medium text-emerald-600 dark:text-emerald-400 transition-colors hidden md:block"
            >
              Sign In
            </Link>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign up for EduPathway</CardTitle>
            <CardDescription>
              Enter your phone number and M-Pesa code to create an account and access premium features
            </CardDescription>
          </CardHeader>
          <CardContent>
            {paymentStatus === "success" ? (
              <div className="space-y-4">
                <Alert className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Payment Successful!</AlertTitle>
                  <AlertDescription>
                    Your payment of KES 210 has been processed successfully. You now have full access to EduPathway
                    premium features.
                  </AlertDescription>
                </Alert>
                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-4">Redirecting to courses in {countdown} seconds...</p>
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 mt-4"
                    asChild
                  >
                    <Link href="/courses">Explore Courses Now</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {paymentStatus === "error" && (
                  <Alert
                    variant="destructive"
                    className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800"
                  >
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (M-Pesa)</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">+254</div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="712345678"
                      className="rounded-l-none"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      maxLength={10}
                      disabled={isProcessing}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">Enter your M-Pesa registered phone number</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mpesa-code">M-Pesa Code</Label>
                  <Input
                    id="mpesa-code"
                    type="text"
                    placeholder="ABC123XYZ"
                    value={mpesaCode}
                    onChange={handleMpesaCodeChange}
                    maxLength={10}
                    disabled={isProcessing}
                    required
                  />
                  <p className="text-xs text-gray-500">Enter the unique M-Pesa code you received</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-4 border rounded-md bg-muted/50">
                    <div>
                      <p className="font-medium">EduPathway Premium</p>
                      <p className="text-sm text-gray-500">One-time payment</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">KES 210.00</p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing Payment..." : "Confirm Payment"}
                </Button>

                {paymentStatus === "processing" && (
                  <div className="text-center text-sm text-gray-500 animate-pulse">
                    Verifying your payment details...
                  </div>
                )}
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm text-gray-500">
              By signing up, you agree to our{" "}
              <Link href="#" className="text-emerald-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-emerald-600 hover:underline">
                Privacy Policy
              </Link>
            </div>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="#" className="text-emerald-600 hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <footer className="w-full border-t bg-gray-50 dark:bg-gray-900 py-6">
        <div className="container px-4 md:px-6 text-center">
          <p className="text-sm text-gray-500">© 2023 EduPathway. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/about" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
              Contact
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:text-emerald-600 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
