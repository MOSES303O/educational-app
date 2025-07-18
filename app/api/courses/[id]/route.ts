import { NextRequest, NextResponse } from "next/server"
import { coursesData } from "../data"

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const id = context.params.id
  const course = coursesData.find((course) => course.id === id)

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 })
  }

  return NextResponse.json(course)
}
