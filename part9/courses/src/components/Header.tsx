
interface Props {
   courseName: string;
}

export const Header = ({courseName}:Props) => {
  return <h1>{courseName}</h1>
}