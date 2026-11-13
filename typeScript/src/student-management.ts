import type { Student } from "./models/student";
import type { Teacher } from "./models/teacher";

export type CreateStudentInput = Omit<Student, "id">;
export type UpdateStudentInput = Partial<CreateStudentInput>;
export type StudentSummary = Pick<Student, "name" | "grade">;

function validateStudent(student: CreateStudentInput): void {
  if (
    !student.name.trim() ||
    !student.university.trim() ||
    !Number.isFinite(student.age) ||
    student.age < 0 ||
    !Number.isFinite(student.grade) ||
    student.grade < 0 ||
    student.grade > 100
  ) {
    throw new RangeError("Invalid student data.");
  }
}

export class StudentRepository {
  private readonly students: Student[] = [];
  private nextId = 1;

  async create(input: CreateStudentInput): Promise<Student> {
    validateStudent(input);

    const student: Student = {
      ...input,
      id: this.nextId++,
    };

    this.students.push(student);
    return { ...student };
  }

  async findAll(): Promise<Student[]> {
    return this.students.map(student => ({ ...student }));
  }

  async update(
    id: number,
    changes: UpdateStudentInput,
  ): Promise<Student> {
    const index = this.students.findIndex(student => student.id === id);
    const current = this.students[index];

    if (!current) {
      throw new Error(`Student ${id} not found.`);
    }

    const updated: Student = {
      ...current,
      ...changes,
      id: current.id,
    };

    validateStudent(updated);

    this.students[index] = updated;
    return { ...updated };
  }
}

export function getStudentSummary(
  student: Student,
): StudentSummary {
  return {
    name: student.name,
    grade: student.grade,
  };
}

export function printAcademicPerson(
  person: Student | Teacher,
): void {
  console.log(`Name: ${person.name}`);

  if ("grade" in person) {
    console.log(`Student grade: ${person.grade}`);
  } else {
    console.log(`Teacher subject: ${person.subject}`);
  }
}

async function main(): Promise<void> {
  const repository = new StudentRepository();

  try {
    const student = await repository.create({
      name: "Salam",
      age: 22,
      grade: 90,
      university: "D",
    });

    const updated = await repository.update(student.id, {
      grade: 95,
    });

    console.log(getStudentSummary(updated));
    printAcademicPerson(updated);

    const teacher: Teacher = {
      id: 100,
      name: "O",
      age: 35,
      subject: "Programming",
      salary: 1500,
    };

    printAcademicPerson(teacher);

    const students = await repository.findAll();
    console.log(students);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unexpected error", error);
    }
  }
}

main();