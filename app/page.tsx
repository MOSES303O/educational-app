import { SubjectSelector } from "@/components/subject-selector"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, Users, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
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
              href="#"
              className="text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#"
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
              href="#"
              className="text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="#"
              className="text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hidden md:block"
            >
              Sign In
            </Link>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              asChild
            >
              <Link href="/courses">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Find Your Perfect University Course
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Discover university courses tailored to your high school subjects and interests. Start your
                    educational journey today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-emerald-600 hover:bg-emerald-700" size="lg" asChild>
                    <Link href="/courses">Explore Courses</Link>
                  </Button>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Students studying"
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950" id="how-it-works">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How It Works</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Three simple steps to find the perfect university course for your future
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-4">
                  <BookOpen className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Select Your Subjects</h3>
                <p className="text-center text-gray-500">
                  Choose the high school subjects you excel in or are interested in pursuing further.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-4">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Get Matched</h3>
                <p className="text-center text-gray-500">
                  Our system matches your subjects with relevant university courses and career paths.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-4">
                  <Award className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Explore Options</h3>
                <p className="text-center text-gray-500">
                  Browse through personalized course recommendations and find your perfect fit.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900" id="subject-selector">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Find Your Course</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Select your high school subjects to discover university courses that match your interests and
                  strengths
                </p>
              </div>
              <div className="w-full max-w-2xl mx-auto mt-8">
                <SubjectSelector />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mx-auto lg:mr-auto">
                <Image
                  src="/placeholder.svg?height=550&width=550"
                  width={550}
                  height={550}
                  alt="Students in a university"
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose EduPathway?</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    We help students make informed decisions about their educational future
                  </p>
                </div>
                <ul className="grid gap-4">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-emerald-100 p-1">
                      <svg
                        className="h-5 w-5 text-emerald-600"
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
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-medium leading-none">Personalized Recommendations</p>
                      <p className="text-sm text-gray-500">
                        Get course suggestions tailored to your academic strengths and interests
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-emerald-100 p-1">
                      <svg
                        className="h-5 w-5 text-emerald-600"
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
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-medium leading-none">Comprehensive Database</p>
                      <p className="text-sm text-gray-500">
                        Access information on thousands of courses from universities nationwide
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-emerald-100 p-1">
                      <svg
                        className="h-5 w-5 text-emerald-600"
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
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-base font-medium leading-none">Career Guidance</p>
                      <p className="text-sm text-gray-500">
                        Explore potential career paths associated with different courses
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-emerald-600 hover:bg-emerald-700" size="lg" asChild>
                    <Link href="/courses">Get Started Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-50 dark:bg-emerald-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join Thousands of Students</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Who have found their perfect university course through EduPathway
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
                <div className="flex flex-col items-start rounded-lg border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-emerald-500"
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
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-left">
                    <p className="text-gray-500">
                      "EduPathway helped me discover a computer science program that perfectly matched my interests in
                      mathematics and physics. I'm now in my second year and loving it!"
                    </p>
                  </blockquote>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="rounded-full bg-gray-100 p-1">
                      <svg
                        className="h-8 w-8 text-gray-500"
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
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">David Kimani</p>
                      <p className="text-sm text-gray-500">Computer Science Student</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start rounded-lg border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-emerald-500"
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
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-left">
                    <p className="text-gray-500">
                      "I was unsure about what to study after high school. The subject selection tool helped me find a
                      biology program that aligned with my passion for science."
                    </p>
                  </blockquote>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="rounded-full bg-gray-100 p-1">
                      <svg
                        className="h-8 w-8 text-gray-500"
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
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Sarah Ochieng</p>
                      <p className="text-sm text-gray-500">Biology Student</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start rounded-lg border bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-emerald-500"
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
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-left">
                    <p className="text-gray-500">
                      "As a parent, I found EduPathway incredibly helpful in guiding my daughter toward a course that
                      matched her strengths in languages and history."
                    </p>
                  </blockquote>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="rounded-full bg-gray-100 p-1">
                      <svg
                        className="h-8 w-8 text-gray-500"
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
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">James Mwangi</p>
                      <p className="text-sm text-gray-500">Parent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-emerald-600 dark:bg-emerald-700">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">Ready to Find Your Path?</h2>
                <p className="max-w-[700px] text-emerald-100 md:text-xl mx-auto">
                  Start exploring university courses that match your interests and academic strengths
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full bg-white text-emerald-600 hover:bg-gray-100" size="lg" asChild>
                  <Link href="/courses">Get Started Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-gray-50 dark:bg-gray-900 py-6 md:py-12">
        <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-emerald-600" />
            <span className="text-lg font-bold">EduPathway</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
          <p className="text-sm text-gray-500">© 2023 EduPathway. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

