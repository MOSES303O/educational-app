"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  ArrowLeft,
  BookOpen,
  GraduationCapIcon as GradCap,
  Building,
  Calendar,
  Clock,
  Heart,
  Check,
} from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { fetchCourseById } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import { useSelectedCourses } from "@/lib/course-store"
import { toast } from "@/components/ui/use-toast"

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string
  const router = useRouter()

  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { addCourse, isCourseSelected, toggleCourseSelection } = useSelectedCourses()

  useEffect(() => {
    async function loadCourseDetails() {
      try {
        setLoading(true)
        const data = await fetchCourseById(courseId)
        setCourse(data)
      } catch (err) {
        console.error("Error loading course details:", err)
        setError("Failed to load course details. Please try again later.")
      } finally {
        // Add a slight delay to ensure smooth transition
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }

    loadCourseDetails()
    // Use stable reference to courseId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApplyNow = () => {
    if (course && !isCourseSelected(course.id)) {
      addCourse(course)
      toast({
        title: "Course Added",
        description: `${course.title} has been added to your selected courses.`,
        duration: 3000,
      })
    }

    // Redirect to signup page for payment
    router.push("/signup")
  }

  const handleToggleSelection = () => {
    if (course) {
      toggleCourseSelection(course)

      if (!isCourseSelected(course.id)) {
        toast({
          title: "Course Added",
          description: `${course.title} has been added to your selected courses.`,
          duration: 3000,
        })
      } else {
        toast({
          title: "Course Removed",
          description: `${course.title} has been removed from your selected courses.`,
          duration: 3000,
        })
      }
    }
  }

  if (loading) {
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
                className="text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors hidden md:block"
              >
                Sign In
              </Link>
              <Button className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">
                Get Started
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-start gap-4 mb-8">
                <Button variant="outline" size="sm" asChild className="mb-2">
                  <Link href="/courses">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Courses
                  </Link>
                </Button>

                <div className="w-full space-y-4">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-7 w-40" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Skeleton className="h-7 w-48" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Skeleton className="h-6 w-40" />
                        <div className="flex flex-wrap gap-2">
                          <Skeleton className="h-6 w-24" />
                          <Skeleton className="h-6 w-24" />
                          <Skeleton className="h-6 w-24" />
                        </div>
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-6 w-32" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-7 w-36" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <Skeleton className="h-7 w-24" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-10 w-full mb-4" />
                      <Skeleton className="h-4 w-3/4" />
                    </CardContent>
                  </Card>
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
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div>
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              <div>
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div>
                <Skeleton className="h-6 w-24 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-40" />
                  <div className="flex gap-4 mt-4">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-5 w-5 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
          </div>
        </footer>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Button asChild>
          <Link href="/courses">Back to Courses</Link>
        </Button>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Course not found</h1>
        <Button asChild className="mt-4">
          <Link href="/courses">Back to Courses</Link>
        </Button>
      </div>
    )
  }

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
            <Button variant="outline" size="icon" className="relative" onClick={() => router.push("/selected-courses")}>
              <Heart className="h-5 w-5 text-emerald-600" />
            </Button>
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
            <div className="flex flex-col items-start gap-4 mb-8">
              <Button variant="outline" size="sm" asChild className="mb-2">
                <Link href="/courses">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Courses
                </Link>
              </Button>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                <div>
                  <Badge className="mb-2">{course.id}</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{course.title}</h1>
                  <p className="text-xl text-gray-500 mt-2">{course.university}</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button
                    variant={isCourseSelected(course.id) ? "default" : "outline"}
                    className={`flex items-center gap-2 ${isCourseSelected(course.id) ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                    onClick={handleToggleSelection}
                  >
                    {isCourseSelected(course.id) ? (
                      <>
                        <Check className="h-4 w-4" />
                        Selected
                      </>
                    ) : (
                      <>
                        <Heart className="h-4 w-4" />
                        Select Course
                      </>
                    )}
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleApplyNow}>
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                      {course.fullDescription.split("\n\n").map((paragraph, index) => {
                        if (paragraph.startsWith("- ")) {
                          const items = paragraph.split("\n- ")
                          return (
                            <ul key={index} className="my-4 list-disc pl-5">
                              {items.map((item, i) => (
                                <li key={i}>{item.replace("- ", "")}</li>
                              ))}
                            </ul>
                          )
                        }
                        return <p key={index}>{paragraph}</p>
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Entry Requirements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Required Subjects</h3>
                        <div className="flex flex-wrap gap-2">
                          {course.subjects.map((subject) => (
                            <Badge key={subject} variant="secondary">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Minimum Points Required</h3>
                        <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
                          {course.points} points
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Career Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {course.careers.map((career) => (
                        <li key={career} className="flex items-center gap-2">
                          <div className="rounded-full bg-emerald-100 p-1 dark:bg-emerald-900">
                            <svg
                              className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
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
                          {career}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="text-sm text-gray-500">Course Code</p>
                          <p className="font-medium">{course.code}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <GradCap className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="text-sm text-gray-500">Duration</p>
                          <p className="font-medium">{course.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="text-sm text-gray-500">Start Date</p>
                          <p className="font-medium">{course.startDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="text-sm text-gray-500">Application Deadline</p>
                          <p className="font-medium">{course.applicationDeadline}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-emerald-600" />
                        <div>
                          <p className="text-sm text-gray-500">Available Campuses</p>
                          <p className="font-medium">{course.campuses.join(", ")}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Apply Now</CardTitle>
                    <CardDescription>Ready to start your journey?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleApplyNow}>
                      Start Application
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">Application deadline: {course.applicationDeadline}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                      Have questions about this course? Contact our admissions team for assistance.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">Contact Admissions</Link>
                    </Button>
                  </CardContent>
                </Card>
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
