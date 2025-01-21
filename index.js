const express = require("express");
const app = express();
const PORT = 3001;

const fs = require("fs");
const path = require("path");
const pathToFile = path.resolve("./data.json");

//console.log(pathToFile);

const getResources = () => JSON.parse(fs.readFileSync(pathToFile));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/resources", (req, res) => {
  const resources = getResources();
  res.send(resources);
});

app.post("/api/resources", (req, res) => {
  const resources = getResources();
  const resource = req.body;

  resources.createdAt = new Date();
  resources.status = "inactive";
  resources.id = Date.now().toString();
  resourses.unshift(resource);

  fs.writeFile(pathToFile, JSON.stringify(resources, null, 2), (err) => {
    if (err) {
      return res.status(422).send("Cannot store data in the file!");
    }
    return res.send("Data has been saved!");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
