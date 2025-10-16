export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartBasic extends CoursePartBaseDescription {
  kind: "basic";
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBackground extends CoursePartBaseDescription {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartSpecial extends CoursePartBaseDescription {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
    | CoursePartSpecial;
