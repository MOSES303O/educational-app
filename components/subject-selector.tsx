"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, ChevronsUpDown, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { fetchSubjects, matchCourses } from "@/lib/api"

// Grades remain the same as they're static
const grades = [
  { value: "A", label: "A", points: 12 },
  { value: "A-", label: "A-", points: 11 },
  { value: "B+", label: "B+", points: 10 },
  { value: "B", label: "B", points: 9 },
  { value: "B-", label: "B-", points: 8 },
  { value: "C+", label: "C+", points: 7 },
  { value: "C", label: "C", points: 6 },
  { value: "C-", label: "C-", points: 5 },
  { value: "D+", label: "D+", points: 4 },
  { value: "D", label: "D", points: 3 },
  { value: "D-", label: "D-", points: 2 },
  { value: "E", label: "E", points: 1 },
]

type SubjectGrade = {
  subject: string
  grade: string
}

export function SubjectSelector() {
  const [subjects, setSubjects] = useState<Array<{ value: string; label: string }>>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [subjectGrades, setSubjectGrades] = useState<SubjectGrade[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const MIN_SUBJECTS = 7
  const MAX_SUBJECTS = 9

  useEffect(() => {
    async function loadSubjects() {
      try {
        setLoading(true)
        const data = await fetchSubjects()
        // Handle both array response and object with results property
        setSubjects(Array.isArray(data) ? data : data.results || [])
      } catch (err) {
        console.error("Error loading subjects:", err)
        // Fallback to hardcoded subjects if API fails
        setSubjects([
          { value: "mathematics", label: "Mathematics" },
          { value: "kiswahili", label: "Kiswahili" },
          { value: "english", label: "English" },
          { value: "biology", label: "Biology" },
          { value: "chemistry", label: "Chemistry" },
          { value: "physics", label: "Physics" },
          { value: "history", label: "History" },
          { value: "geography", label: "Geography" },
          { value: "business_studies", label: "Business Studies" },
          { value: "computer_studies", label: "Computer Studies" },
          { value: "agriculture", label: "Agriculture" },
          { value: "home_science", label: "Home Science" },
          { value: "art_design", label: "Art & Design" },
          { value: "music", label: "Music" },
          { value: "religious_education", label: "Religious Education" },
        ])
      } finally {
        setLoading(false)
      }
    }

    loadSubjects()
  }, [])

  useEffect(() => {
    // Calculate total points whenever subjectGrades changes
    const points = subjectGrades.reduce((total, sg) => {
      const gradeInfo = grades.find((g) => g.value === sg.grade)
      return total + (gradeInfo?.points || 0)
    }, 0)
    setTotalPoints(points)

    // Set error message based on subject count
    if (selectedSubjects.length < MIN_SUBJECTS) {
      setError(`Please select at least ${MIN_SUBJECTS} subjects (${selectedSubjects.length}/${MIN_SUBJECTS} selected)`)
    } else if (selectedSubjects.length > MAX_SUBJECTS) {
      setError(
        `Please select no more than ${MAX_SUBJECTS} subjects (${selectedSubjects.length}/${MAX_SUBJECTS} selected)`,
      )
    } else {
      // Check if all selected subjects have grades
      const missingGrades = selectedSubjects.filter((subject) => !subjectGrades.some((sg) => sg.subject === subject))
      if (missingGrades.length > 0) {
        setError(`Please select grades for all subjects (${missingGrades.length} missing)`)
      } else {
        setError(null)
      }
    }
  }, [selectedSubjects, subjectGrades])

  const handleSelect = (value: string) => {
    if (selectedSubjects.includes(value)) {
      // Remove subject
      setSelectedSubjects((prev) => prev.filter((item) => item !== value))
      setSubjectGrades((prev) => prev.filter((sg) => sg.subject !== value))
    } else {
      // Add subject if under max limit
      if (selectedSubjects.length < MAX_SUBJECTS) {
        setSelectedSubjects((prev) => [...prev, value])
      }
    }
  }

  const removeSubject = (value: string) => {
    setSelectedSubjects((prev) => prev.filter((item) => item !== value))
    setSubjectGrades((prev) => prev.filter((sg) => sg.subject !== value))
  }

  const handleGradeChange = (subject: string, grade: string) => {
    setSubjectGrades((prev) => {
      // Check if subject already has a grade
      const existingIndex = prev.findIndex((sg) => sg.subject === subject)

      if (existingIndex >= 0) {
        // Update existing grade
        const updated = [...prev]
        updated[existingIndex] = { subject, grade }
        return updated
      } else {
        // Add new grade
        return [...prev, { subject, grade }]
      }
    })
  }

  const getSubjectGrade = (subject: string) => {
    return subjectGrades.find((sg) => sg.subject === subject)?.grade || ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate subject count
    if (selectedSubjects.length < MIN_SUBJECTS || selectedSubjects.length > MAX_SUBJECTS) {
      return
    }

    // Check if all subjects have grades
    const missingGrades = selectedSubjects.filter((subject) => !subjectGrades.some((sg) => sg.subject === subject))

    if (missingGrades.length > 0) {
      return
    }

    try {
      // Call the matchCourses API to get recommended courses
      await matchCourses(subjectGrades, totalPoints)

      // Build query parameters
      const queryParams = new URLSearchParams()
      subjectGrades.forEach((sg) => {
        queryParams.append("subjects", `${sg.subject}:${sg.grade}`)
      })
      queryParams.append("points", totalPoints.toString())

      // Navigate to courses page
      router.push(`/courses?${queryParams.toString()}`)
    } catch (err) {
      console.error("Error matching courses:", err)
      // Continue anyway since this is just a preview
      const queryParams = new URLSearchParams()
      subjectGrades.forEach((sg) => {
        queryParams.append("subjects", `${sg.subject}:${sg.grade}`)
      })
      queryParams.append("points", totalPoints.toString())

      // Navigate to courses page even if matching fails
      router.push(`/courses?${queryParams.toString()}`)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center p-8">Loading subjects...</div>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Select your high school subjects ({MIN_SUBJECTS}-{MAX_SUBJECTS})
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Total Points:</span>
            <Badge variant="secondary" className="text-sm py-1 px-3">
              {totalPoints}
            </Badge>
          </div>
        </div>

        {error && (
          <Alert
            variant="destructive"
            className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-wrap gap-2 mb-2">
          {selectedSubjects.map((subject) => {
            const subjectLabel = subjects.find((s) => s.value === subject)?.label
            return (
              <div key={subject} className="flex items-center gap-2 p-2 rounded-md border bg-background">
                <Badge variant="outline" className="text-sm py-1 px-2 border-emerald-200 dark:border-emerald-800">
                  {subjectLabel}
                </Badge>
                <Select value={getSubjectGrade(subject)} onValueChange={(value) => handleGradeChange(subject, value)}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade.value} value={grade.value}>
                        {grade.label} ({grade.points})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button
                  type="button"
                  onClick={() => removeSubject(subject)}
                  className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove {subjectLabel}</span>
                </button>
              </div>
            )
          })}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
              disabled={selectedSubjects.length >= MAX_SUBJECTS}
            >
              {selectedSubjects.length > 0
                ? `${selectedSubjects.length} subject${selectedSubjects.length > 1 ? "s" : ""} selected`
                : "Select subjects..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search subjects..." />
              <CommandList>
                <CommandEmpty>No subject found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-y-auto">
                  {subjects.map((subject) => (
                    <CommandItem
                      key={subject.value}
                      value={subject.value}
                      onSelect={() => handleSelect(subject.value)}
                      disabled={selectedSubjects.length >= MAX_SUBJECTS && !selectedSubjects.includes(subject.value)}
                      className={cn(
                        selectedSubjects.length >= MAX_SUBJECTS && !selectedSubjects.includes(subject.value)
                          ? "opacity-50 cursor-not-allowed"
                          : "",
                      )}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedSubjects.includes(subject.value) ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {subject.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select between {MIN_SUBJECTS} and {MAX_SUBJECTS} subjects that you have studied in high school and assign
          grades to each.
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
        disabled={!!error}
      >
        Find Courses
      </Button>
    </form>
  )
}

