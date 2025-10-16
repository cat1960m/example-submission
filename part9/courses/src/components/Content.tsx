import type { CoursePart } from "../types";
import { Part } from "./Part";

interface Props {
  courseParts: CoursePart[];
}

export const Content = ({ courseParts }: Props) => {
  return (
    <div>
      {courseParts.map((part) => (
        <div  style={{border: "1px solid gray", padding: "5px", margin: "5px", backgroundColor: "gray"}}>
          <Part part={part} />{" "}
        </div>
      ))}
    </div>
  );
};
