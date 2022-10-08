import express from "express";
import router  from "@routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(8000, () => {
  console.log("server start");
});
