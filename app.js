const express = require("express");
const path = require("path");
const app = express();
const { v4 } = require("uuid");

let TASKLIST = [
  { id: v4(), title: "Complete the task from Vlad", completed: false },
  { id: v4(), title: "learn  js", completed: false },
];
app.use(express.json());
//GET
app.get("/api/contacts", (req, res) => {
  res.status(200).json(TASKLIST);
});
//POST
app.post("/api/contacts", (req, res) => {
  const task = { ...req.body, id: v4() };
  TASKLIST.push(task);
  res.status(201).json(task);
});
//DELETE
app.delete("/api/contacts/:id", (req, res) => {
  TASKLIST = TASKLIST.filter(({ id }) => id !== req.params.id);
  res.status(200).json({ message: "Контакт был удален" });
});
app.put("/api/contacts/:id", (req, res) => {
  const idx = TASKLIST.findIndex(({ id }) => id === req.params.id);
  TASKLIST[idx] = req.body;
  res.status(200).json({ message: "задача изменена" });
});

app.use(express.static(path.resolve(__dirname, "client")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "index.html"));
});
app.listen(3000, () => console.log("Server started..."));
