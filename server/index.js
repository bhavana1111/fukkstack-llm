import express from "express";
import cors from "cors";
import generate from "./api.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/generate", async (req, res) => {
  try {
    const { queryDescription } = req.body;
    console.log(queryDescription);
    const sqlQuery = await generate(queryDescription);
    res.json({ answer: sqlQuery });
  } catch (error) {
    console.log(error);
    res.json({
      sqlQuery:
        "Great Question.I seem having problem answering.Please ask again",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
