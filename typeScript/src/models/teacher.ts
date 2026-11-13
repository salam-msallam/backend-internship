import type { Person } from "./person";

export interface Teacher extends Person {
  subject: string;
  salary: number;
}