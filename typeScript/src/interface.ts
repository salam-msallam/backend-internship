import type { Person } from "./models/person";
import type { Student } from "./models/student";
import type { Teacher } from "./models/teacher";
import { getPassedStudents } from "./utils/student.utils";

const students: Student[] = [
  {
    id: 1,
    name: "Salam",
    age: 22,
    grade: 90,
    university: "D",
  },
  {
    id: 2,
    name: "A",
    age: 24,
    grade: 75,
    university: "A",
  },
];

const teacher: Teacher = {
  id: 3,
  name: "O",
  age: 35,
  subject: "Programming",
  salary: 1500,
};

function printPerson(person: Person): void {
  console.log(`Name: ${person.name}`);
  console.log(`Age: ${person.age}`);
}

function printTeacher(teacher: Teacher): void {
  printPerson(teacher);
  console.log(`Subject: ${teacher.subject}`);
  console.log(`Salary: ${teacher.salary}`);
}

for (const student of students) {
  printPerson(student);
}

printTeacher(teacher);

console.log("Passed students:", getPassedStudents(students));