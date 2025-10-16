// eslint-disable-next-line @typescript-eslint/no-require-imports
import express = require("express");
import isNumberValue from "./utils";
import calculateBmi from "./calculateBmi";
import exerciseCalculator from "./exerciseCalculator";

const app = express();
app.use(express.json()); //it is needed to Express can parse JSON bodies

app.get("/hello", (_res, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmiParams/:height/:weight", (req, res) => {
  console.log("bmi", req.params.height, req.params.weight);

  if (!(isNumberValue(req.params.height) && isNumberValue(req.params.weight))) {
    res.status(400).json({ error: "malformatted params" });
    return;
  }
  const height = Number(req.params.height);
  const weight = Number(req.params.weight);

  const result = calculateBmi(height / 100, weight);
  res.json({ result });
});

app.post("/exercise", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {target, values} = req.body;
  if(!isNumberValue(target)) {
    res.status(400).json("incorrect target");
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const vals = (values as string).split(",")
  vals.forEach(item => {
    if(!isNumberValue(item)) {
       res.status(400).json("incorrect values");
    return;
    }
  });

  ;
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  const targ = Number(target);
  
  const result = exerciseCalculator(vals.map((item: string) => Number(item)), targ);
  res.json(result);
});

app.get("/bmi", (req, res) => {
  console.log("bmi", req.query.height, req.query.weight);

  if (!(isNumberValue(req.query.height) && isNumberValue(req.query.weight))) {
    res.status(400).json({ error: "malformatted params" });
  } else {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const result = calculateBmi(height / 100, weight);
    res.json({ height, weight, result });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
