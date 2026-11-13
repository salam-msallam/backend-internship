import type { Person } from "./person";

export interface Student extends Person {
  grade: number;
  university: string;
}