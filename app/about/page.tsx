import { Button } from "@/components/ui/button"
import { GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
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
              className="text-sm font-medium text-emerald-600 dark:text-emerald-400 transition-colors"
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
              className="text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hidden md:block"
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About EduPathway</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Helping students find their perfect university courses since 2020
              </p>
            </div>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center mt-12">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="EduPathway team"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-gray-500">
                  At EduPathway, we believe that every student deserves access to quality education that aligns with
                  their interests, strengths, and career aspirations. Our mission is to bridge the gap between high
                  school education and university courses by providing personalized recommendations based on students'
                  academic profiles.
                </p>
                <p className="text-gray-500">
                  We understand that choosing a university course is one of the most important decisions in a student's
                  life. That's why we've developed a comprehensive platform that analyzes students' high school subjects
                  and grades to match them with suitable university programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-4 order-2 lg:order-1">
                <h2 className="text-2xl font-bold">Our Story</h2>
                <p className="text-gray-500">
                  EduPathway was founded in 2020 by a group of education enthusiasts who recognized the challenges that
                  students face when transitioning from high school to university. Many students were selecting courses
                  based on limited information, peer pressure, or societal expectations rather than their own strengths
                  and interests.
                </p>
                <p className="text-gray-500">
                  What started as a small project to help local students in Nairobi has now grown into a comprehensive
                  platform serving thousands of students across Kenya. Our team has expanded to include education
                  specialists, career counselors, and technology experts who are passionate about transforming education
                  and career guidance.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="EduPathway history"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Our Values</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">The principles that guide our work and decisions</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background shadow-sm">
                <div className="rounded-full bg-emerald-100 p-4 mb-4">
                  <svg
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m7 10 3 3 7-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Integrity</h3>
                <p className="text-gray-500">
                  We are committed to providing honest, unbiased information to help students make informed decisions
                  about their education and future careers.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background shadow-sm">
                <div className="rounded-full bg-emerald-100 p-4 mb-4">
                  <svg
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="text-gray-500">
                  We continuously improve our platform and services by embracing new technologies and educational
                  methodologies to better serve our users.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background shadow-sm">
                <div className="rounded-full bg-emerald-100 p-4 mb-4">
                  <svg
                    className="h-6 w-6 text-emerald-600"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Inclusivity</h3>
                <p className="text-gray-500">
                  We believe in equal access to educational opportunities for all students, regardless of their
                  background, location, or economic status.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Our Team</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Meet the dedicated professionals behind EduPathway
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    width={200}
                    height={200}
                    alt="Team member"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">John Kamau</h3>
                <p className="text-sm text-gray-500">Founder & CEO</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    width={200}
                    height={200}
                    alt="Team member"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">Mary Wanjiku</h3>
                <p className="text-sm text-gray-500">Education Director</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    width={200}
                    height={200}
                    alt="Team member"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">David Ochieng</h3>
                <p className="text-sm text-gray-500">Chief Technology Officer</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 overflow-hidden rounded-full">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    width={200}
                    height={200}
                    alt="Team member"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold">Sarah Njeri</h3>
                <p className="text-sm text-gray-500">Career Counselor</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-600 dark:bg-emerald-700">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">Join Our Community</h2>
                <p className="max-w-[700px] text-emerald-100 md:text-xl mx-auto">
                  Start your educational journey with EduPathway today
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full bg-white text-emerald-600 hover:bg-gray-100" size="lg" asChild>
                  <Link href="/signup">Get Started Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-gray-50 dark:bg-gray-900 py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-emerald-600" />
                <span className="text-lg font-bold">EduPathway</span>
              </div>
              <p className="text-sm text-gray-500">
                Helping students find their perfect university courses based on their high school subjects and
                interests.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm hover:text-emerald-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm hover:text-emerald-600 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="text-sm hover:text-emerald-600 transition-colors">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-emerald-600 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-emerald-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-emerald-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-emerald-600 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-emerald-600"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-sm">+254 712 345 678</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-emerald-600"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="16" rx="2" width="20" x="2" y="4" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span className="text-sm">info@edupathway.co.ke</span>
                </li>
                <li className="flex gap-4 mt-4">
                  <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-500">© 2023 EduPathway. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
