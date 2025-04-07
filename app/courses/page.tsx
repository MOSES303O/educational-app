"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GraduationCap, ArrowLeft, ChevronDown, ChevronRight, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { fetchCourses } from "@/lib/api"

export default function CoursesPage() {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [coursesData, setCoursesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const searchParams = useSearchParams()

  // Get user's total points from URL params
  const userPoints = Number.parseInt(searchParams.get("points") || "0", 10)

  useEffect(() => {
    async function loadCourses() {
      try {
        setLoading(true)

        // Get subject filters from URL if any
        const subjects = searchParams.getAll("subjects").map((s) => {
          const [subject, grade] = s.split(":")
          return subject
        })

        // Fetch courses from API
        const params = {
          ...(subjects.length > 0 && { subject: subjects }),
          ...(userPoints > 0 && { min_points: userPoints.toString() }),
        }

        const data = await fetchCourses(params)
        // Ensure we're handling the data correctly whether it's an array or has a results property
        setCoursesData(Array.isArray(data) ? data : data.results || [])
        setLoading(false)
      } catch (err) {
        console.error("Error loading courses:", err)
        setError("Failed to load courses. Please try again later.")

        // For demo purposes, use mock data if API fails
        const mockData = [
          {
            id: "CS001",
            code: "BSC-CS-001",
            title: "Bachelor of Computer Science",
            university: "University of Nairobi",
            points: 32,
          },
          {
            id: "BA001",
            code: "BBA-001",
            title: "Bachelor of Business Administration",
            university: "Strathmore University",
            points: 28,
          },
          {
            id: "MD001",
            code: "MBChB-001",
            title: "Bachelor of Medicine and Surgery",
            university: "Kenyatta University",
            points: 42,
          },
          {
            id: "ED001",
            code: "BEd-ARTS-001",
            title: "Bachelor of Education (Arts)",
            university: "Moi University",
            points: 30,
          },
          {
            id: "AG001",
            code: "BSc-AGRI-001",
            title: "Bachelor of Agriculture",
            university: "Egerton University",
            points: 32,
          },
          {
            id: "EN001",
            code: "BEng-CIVIL-001",
            title: "Bachelor of Engineering (Civil)",
            university: "JKUAT",
            points: 38,
          },
        ]
        setCoursesData(mockData)
        setLoading(false)
      }
    }

    loadCourses()
  }, [searchParams, userPoints])

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const isQualified = (requiredPoints) => {
    return userPoints >= requiredPoints
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading courses...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
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
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Available Courses</h1>
              <p className="text-gray-500 md:text-xl">Browse through our comprehensive list of university courses</p>

              {userPoints > 0 && (
                <div className="flex items-center mt-2">
                  <Badge variant="outline" className="text-sm py-1 px-3 border-emerald-200 dark:border-emerald-800">
                    Your Total Points: {userPoints}
                  </Badge>
                </div>
              )}
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Course ID</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>Required Points</TableHead>
                    <TableHead>Qualification</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coursesData.map((course) => (
                    <>
                      <TableRow
                        key={course.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => toggleRow(course.id)}
                      >
                        <TableCell>
                          {expandedRows[course.id] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{course.id}</TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.university}</TableCell>
                        <TableCell>{course.points}</TableCell>
                        <TableCell>
                          {isQualified(course.points) ? (
                            <div className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                              <span className="text-green-500">Qualified</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <XCircle className="h-5 w-5 text-red-500 mr-1" />
                              <span className="text-red-500">Not Qualified</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              window.location.href = `/courses/${course.id}`
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                      {expandedRows[course.id] && (
                        <TableRow className="bg-muted/50">
                          <TableCell colSpan={7} className="p-4">
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-semibold">Course Code</h4>
                                  <p>{course.code}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold">Course Name</h4>
                                  <p>{course.title}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold">University</h4>
                                  <p>{course.university}</p>
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold">Qualification Status</h4>
                                  {isQualified(course.points) ? (
                                    <div className="flex items-center">
                                      <CheckCircle className="h-5 w-5 text-green-500 mr-1" />
                                      <span className="text-green-500">You meet the cluster weight requirements</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center">
                                      <XCircle className="h-5 w-5 text-red-500 mr-1" />
                                      <span className="text-red-500">
                                        You do not meet the cluster weight requirements
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="pt-2">
                                <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
                                  <Link href={`/courses/${course.id}`}>View Course Details</Link>
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
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

