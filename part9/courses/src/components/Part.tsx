import type {
  CoursePart,
  CoursePartBase,
  CoursePartBaseDescription,
  CoursePartGroup,
  CoursePartBackground,
  CoursePartSpecial
} from "../types";

interface Props {
  part: CoursePart;
}

const CoursePartBaseComp = ({ name, exerciseCount }: CoursePartBase) => {
  return (
    <>
      <h2>{name} {exerciseCount}</h2>
    </>
  );
};

const CoursePartBasicComp = ({
  name,
  exerciseCount,
  description,
}: CoursePartBaseDescription) => {
  return (
    <>
      <CoursePartBaseComp name={name} exerciseCount={exerciseCount} />
      <p style={{fontStyle: "italic"}}>{description}</p>
    </>
  );
};

const CoursePartGroupComp = ({
  name,
  exerciseCount,
  groupProjectCount,
}: CoursePartGroup) => {
  return (
    <>
      <CoursePartBaseComp name={name} exerciseCount={exerciseCount} />
      <p>groupProjectCount: {groupProjectCount}</p>
    </>
  );
};

const CoursePartBackgroundComp = ({
  name,
  exerciseCount,
  description,
  backgroundMaterial,
}: CoursePartBackground) => {
  return (
    <>
      <CoursePartBasicComp
        name={name}
        exerciseCount={exerciseCount}
        description={description}
      />
      <p>backgroundMaterial: {backgroundMaterial}</p>
    </>
  );
};

const CoursePartSpecialComp = ({
  name,
  exerciseCount,
  description,
  requirements,
}: CoursePartSpecial) => {
  return (
    <>
      <CoursePartBasicComp
        name={name}
        exerciseCount={exerciseCount}
        description={description}
      />
      <p>requirements: {requirements.join(",")}</p>
    </>
  );
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const Part = ({part}: Props) => {
  const {kind} =part;
  switch (kind) {
    case "basic":
      return <CoursePartBasicComp {...part} />;
    case "group":
      return <CoursePartGroupComp {...part} />;
    case "background":
      return <CoursePartBackgroundComp {...part} />;
    case "special":
      return <CoursePartSpecialComp {...part} />;
    default: assertNever(part)
  }

  return <></>;
};
