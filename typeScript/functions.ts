
type Student = {
  id: number;
  name: string;
  grade: number;
};

const students: Student[] = [
  { id: 1, name: "a", grade: 90 },
  { id: 2, name: "b", grade: 65 },
  { id: 3, name: "c", grade: 85 },
  { id: 4, name: "d", grade: 45 }
];


function printStudents(students: Student[]): void {
  students.forEach((student) => {
    console.log(`${student.name}: ${student.grade}`);
  });
}

function getPassedStudents(students: Student[]): Student[] {
  return students.filter((student) => student.grade >= 60);
}

function calculateAverage(students: Student[]): number {
  if (students.length === 0) return 0;

  const total = students.reduce(
    (sum, student) => sum + student.grade,
    0
  );

  return total / students.length;
}

function findStudent(students: Student[], id: number): Student | undefined {
  return students.find((student) => student.id === id);
}

printStudents(students);

console.log("Passed:", getPassedStudents(students));
console.log("Average:", calculateAverage(students));
console.log("Student:", findStudent(students, 2));
