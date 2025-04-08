"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { GraduationCap, ArrowLeft, ChevronDown, ChevronRight, CheckCircle, XCircle, Check, Heart } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { fetchCourses } from "@/lib/api"
import { CoursesSkeleton } from "@/components/courses-skeleton"
import { useSelectedCourses, type Course } from "@/lib/course-store"
import { toast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AuthenticationModal } from "@/components/authentication-modal"

export default function CoursesPage() {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})
  const [coursesData, setCoursesData] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const router = useRouter()

  const searchParams = useSearchParams()

  // Get user's total points from URL params
  const userPoints = Number.parseInt(searchParams.get("points") || "0", 10)

  // Get subject filters and points from URL once
  const subjectParams = searchParams.getAll("subjects")
  const pointsParam = searchParams.get("points")

  // Use our custom hook for selected courses
  const { selectedCourses, toggleCourseSelection, isCourseSelected } = useSelectedCourses()

  useEffect(() => {
    // Check if user is authenticated and has paid
    const userRecord = JSON.parse(localStorage.getItem("eduPathwayUser") || "{}")

    if (userRecord && userRecord.id) {
      if (!userRecord.hasPaid) {
        // User exists but hasn't paid - show authentication modal
        setShowAuthModal(true)
        return
      }
    }

    async function loadCourses() {
      try {
        setLoading(true)

        // Get subject filters from URL if any
        const subjects = subjectParams.map((s) => {
          const [subject] = s.split(":")
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
            description:
              "A comprehensive program covering programming, algorithms, data structures, and software engineering.",
          },
          {
            id: "BA001",
            code: "BBA-001",
            title: "Bachelor of Business Administration",
            university: "Strathmore University",
            points: 28,
            description: "Develop skills in management, marketing, finance, and entrepreneurship.",
          },
          {
            id: "MD001",
            code: "MBChB-001",
            title: "Bachelor of Medicine and Surgery",
            university: "Kenyatta University",
            points: 42,
            description: "Train to become a medical doctor with a focus on clinical practice and medical sciences.",
          },
          {
            id: "ED001",
            code: "BEd-ARTS-001",
            title: "Bachelor of Education (Arts)",
            university: "Moi University",
            points: 30,
            description: "Prepare for a career in teaching with a focus on humanities and social sciences.",
          },
          {
            id: "AG001",
            code: "BSc-AGRI-001",
            title: "Bachelor of Agriculture",
            university: "Egerton University",
            points: 32,
            description: "Study crop production, animal husbandry, agricultural economics, and sustainable farming.",
          },
          {
            id: "EN001",
            code: "BEng-CIVIL-001",
            title: "Bachelor of Engineering (Civil)",
            university: "JKUAT",
            points: 38,
            description: "Learn to design, construct and maintain infrastructure like buildings, roads, and bridges.",
          },
        ]
        setCoursesData(mockData)
      } finally {
        // Add a slight delay to ensure smooth transition
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }

    loadCourses()
    // Use stable references to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const isQualified = (requiredPoints) => {
    return userPoints >= requiredPoints
  }

  const handleSelectCourse = (e, course) => {
    e.stopPropagation()
    toggleCourseSelection(course)

    if (!isCourseSelected(course.id)) {
      toast({
        title: "Course Selected",
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
              className="text-sm font-medium text-emerald-600 dark:text-emerald-400 transition-colors"
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="relative"
                    onClick={() => router.push("/selected-courses")}
                  >
                    <Heart className="h-5 w-5 text-emerald-600" />
                    {selectedCourses.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {selectedCourses.length}
                      </span>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Selected Courses</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Available Courses</h1>
                  <p className="text-gray-500 md:text-xl">
                    Browse through our comprehensive list of university courses
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => router.push("/selected-courses")}
                  >
                    <Heart className="h-4 w-4" />
                    Selected Courses ({selectedCourses.length})
                  </Button>
                </div>
              </div>

              {userPoints > 0 && (
                <div className="flex items-center mt-2">
                  <Badge variant="outline" className="text-sm py-1 px-3 border-emerald-200 dark:border-emerald-800">
                    Your Total Points: {userPoints}
                  </Badge>
                </div>
              )}
            </div>

            {loading ? (
              <CoursesSkeleton />
            ) : error ? (
              <div className="flex justify-center items-center p-8 rounded-md border bg-red-50 text-red-500">
                {error}
              </div>
            ) : (
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
                      <TableHead>Select</TableHead>
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
                          <TableCell>
                            <Button
                              variant={isCourseSelected(course.id) ? "default" : "outline"}
                              size="sm"
                              className={isCourseSelected(course.id) ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                              onClick={(e) => handleSelectCourse(e, course)}
                            >
                              {isCourseSelected(course.id) ? <Check className="h-4 w-4" /> : "Select"}
                            </Button>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700"
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/courses/${course.id}`)
                              }}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                        {expandedRows[course.id] && (
                          <TableRow className="bg-muted/50">
                            <TableCell colSpan={8} className="p-4">
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
                                <div className="pt-2 flex gap-2">
                                  <Button
                                    variant={isCourseSelected(course.id) ? "default" : "outline"}
                                    className={isCourseSelected(course.id) ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                                    onClick={(e) => handleSelectCourse(e, course)}
                                  >
                                    {isCourseSelected(course.id) ? (
                                      <>
                                        <Check className="h-4 w-4 mr-2" />
                                        Selected
                                      </>
                                    ) : (
                                      "Add to Selected"
                                    )}
                                  </Button>
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
            )}
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

      {/* Authentication Modal for Existing Users */}
      {showAuthModal && <AuthenticationModal onClose={() => setShowAuthModal(false)} />}
    </div>
  )
}
