import isNumberValue from "./utils";

enum RatingDescription {
  rating1 = "too little",
  rating2 = "not too bad but could be better",
  rating3 = "good!!",
}

type Rating = 1 | 2 | 3;

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: Rating;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

const exerciseCalculator = (trainings: number[], target: number): Result => {
  const sum = trainings.reduce((result, current) => {
    return result + current;
  }, 0);

  const trainingDays = trainings.reduce((result, current) => {
    return current ? result + 1 : result;
  }, 0);

  const average = sum / trainings.length;

  let rating: Rating | null = null;
  if (average < 1.5) {
    rating = 1;
  } else if (average < 2.5) {
    rating = 2;
  } else {
    rating = 3;
  }

  let description: RatingDescription | null = null;

  switch (rating) {
    case 1:
      description = RatingDescription.rating1;
      break;
    case 2:
      description = RatingDescription.rating2;
      break;
    case 3:
      description = RatingDescription.rating3;
      break;
  }

  const result: Result = {
    periodLength: trainings.length,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription: description,
    target,
    average,
  };

  return result;
};
interface ResultData {
  values: number[];
  target: number;
}

const parseArgs = (args: string[]): ResultData => {
  if (args.length < 4) {
    throw Error("incorrect args");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, target, ...rest] = args;

  console.log("target", target, isNumberValue(target), rest);

  if (!isNumberValue(target)) {
    throw Error("target is incorrect");
  }

  rest.forEach((item) => {
    if (!isNumberValue(item)) {
      throw Error(`values are incorrect`);
    }
  });

  return { values: rest.map((item) => Number(item)), target: Number(target) };
};

if (require.main === module) {
  try {
    const result = parseArgs(process.argv);
    const data = exerciseCalculator(result.values, result.target);
    console.log(data);
  } catch (error: unknown) {
    let err = "Something went wrong";

    if (error instanceof Error) {
      err = error.message;
    }

    console.log(err);
  }
}

//const result = exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2);
//console.log("resulT:", result);

export default exerciseCalculator;
