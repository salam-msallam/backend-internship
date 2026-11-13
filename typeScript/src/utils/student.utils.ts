import type { Student } from "../models/student";

export function getPassedStudents(
  students: readonly Student[],
  passingGrade: number = 60,
): Student[] {
  if (
    !Number.isFinite(passingGrade) ||
    passingGrade < 0 ||
    passingGrade > 100
  ) {
    throw new RangeError("Passing grade must be between 0 and 100.");
  }

  return students.filter(student => student.grade >= passingGrade);
}