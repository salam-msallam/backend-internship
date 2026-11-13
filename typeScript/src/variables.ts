
export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
};

const user1: User = {
  id: 1,
  name: "S",
  email: "sss@gmail.com",
  age: 24,
  isActive: true
};

const user2: User = {
  id: 2,
  name: "A",
  email: "aaa@gmail.com",
  age: 28,
  isActive: false
};

function printUser(user: User): void {
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
  console.log(`Active: ${user.isActive}`);
}

printUser(user1);
printUser(user2);
