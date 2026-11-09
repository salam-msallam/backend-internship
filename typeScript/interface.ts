
interface Person {
  id: number;
  name: string;
  age: number;
}


interface Student extends Person {
  age: number;
  grade: number;
  university: string;
}


interface Teacher extends Person {
  age: number;
  subject: string;
  salary: number;
}


const students: Student[] = [
  {
    id: 1,
    name: "Salam",
    age: 22,
    grade: 90,
    university: "D"
  },
  {
    id: 2,
    name: "A",
    age: 24,
    grade: 75,
    university: "A"
  }
];


const teacher: Teacher = {
  id: 3,
  name: "O",
  age: 35,
  subject: "Programming",
  salary: 1500
};

function printPerson(person: Person): void {
  console.log(`Name: ${person.name}`);
  console.log(`Age: ${person.age}`);
}

function getPassedStudents(students: Student[]): Student[] {
  return students.filter(student => student.grade >= 60);
}

function printTeacher(teacher: Teacher): void {
  console.log(`Teacher: ${teacher.name}`);
  console.log(`Subject: ${teacher.subject}`);
  console.log(`Salary: ${teacher.salary}`);
}

printPerson(students[0]);
printPerson(teacher);

console.log("Passed Students:", getPassedStudents(students));

printTeacher(teacher);
