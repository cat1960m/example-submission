import isNumberValue from "./utils";

interface ResultData {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  const result = weight / (height * height);
  let comment = "";
  if (result < 16.0) {
    comment = "Underweight (Severe thinness)";
  } else if (result < 17.0) {
    comment = "Underweight (Moderate thinness)";
  } else if (result < 18.5) {
    comment = "Underweight (Mild thinness)";
  } else if (result < 25.0) {
    comment = "Normal range";
  } else if (result < 30.0) {
    comment = "Overweight (Pre-obese)";
  } else if (result < 35.0) {
    comment = "Obese (Class I)";
  } else if (result < 40.0) {
    comment = "Obese (Class II)";
  } else {
    comment = "Obese (Class III)";
  }

  return comment + " - " + result;
};

const parseArgs = (args: string[]): ResultData => {
  console.log("args", args.length, args);

  if (args.length !== 4) {
    throw Error("Incorrect args");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, height, weight] = args;

  console.log(height, weight);

  if (isNumberValue(height) && isNumberValue(weight)) {
    const result: ResultData = {
      height: Number(height) / 100,
      weight: Number(weight),
    };
    return result;
  }
  throw Error("input data are not numbers");
};

if (require.main === module) {
  try {
    const result = parseArgs(process.argv);
    console.log(calculateBmi(result.height, result.weight));
  } catch (error: unknown) {
    let err = "Something went wrong";

    if (error instanceof Error) {
      err = error.message;
    }

    console.log(err);
  }
}

export default calculateBmi;
