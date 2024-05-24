import express, { urlencoded, json } from "express";
import { notFound } from "./middleware/not-found.ts";
import { error } from "./middleware/error.ts";
import notesRouter from "./routes/notes.ts";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api", notesRouter);

app.use(notFound);
app.use(error);

export default app;
