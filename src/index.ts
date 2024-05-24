import app from "./server.ts";
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
