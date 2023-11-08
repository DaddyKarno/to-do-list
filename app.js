const express = require("express");
const path = require("path");
const app = express();

const TASKLIST = { title: "Complete the task from Vlad", completed: false };

app.get("/api/contacts", (req, res) => {
  res.status(200).json(TASKLIST);
});

app.use(express.static(path.resolve(__dirname, "client")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});
app.listen(3000, () => console.log("Server started..."));
