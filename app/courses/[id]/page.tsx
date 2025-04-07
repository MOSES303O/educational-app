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
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { fetchCourseById } from "@/lib/api"

export default function CourseDetailPage() {
  const params = useParams()
  const courseId = params.id as string

  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
        setLoading(false)
      }
    }

    loadCourseDetails()
  }, [courseId])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading course details...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
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
              href="#"
              className="text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              About
            </Link>
            <Link
              href="/courses"
              className="text-sm font-medium text-emerald-600 dark:text-emerald-400 transition-colors"
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

              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                <div>
                  <Badge className="mb-2">{course.id}</Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{course.title}</h1>
                  <p className="text-xl text-gray-500 mt-2">{course.university}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">Apply Now</Button>
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
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Start Application</Button>
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
                    <Button variant="outline" className="w-full">
                      Contact Admissions
                    </Button>
                  </CardContent>
                </Card>
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

