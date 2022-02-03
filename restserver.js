const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// parse the incoming request
app.use(bodyparser.json());
app.use(cors());

// mock data
let topCourses = [
  { courseName: "React", rating: 4.6 },
  { courseName: "GraphQL", rating: 4.2 },
  { courseName: "Node", rating: 4.6 },
];

app.get("/courses/", (req, res) => {
  res.status(200);
  res.join({
    message: "Welcome to Express Rest Api Example",
  });
});
// find the course
app.get("/courses/:course", (req, res) => {
  console.log(req.params);
  let data = topCourses.find(
    (course) =>
      course.courseName.toLowerCase() == req.params.course.toLowerCase()
  );
  if (data) {
    res.status(200);
    res.json({
      messgae: `Rating of ${data.courseName} is ${data.rating}`,
    });
  } else {
    res.status(404);
    res.json({
      message: `Oops! Cannot find ${req.params.course}`,
    });
  }
});
// adding a new course
app.post("/courses/add", (req, res) => {
  let data = topCourses.find((course) => {
    course.courseName.toLowerCase() == req.params.course.toLowerCase();
  });
  if (data) {
    res.status(409);
    res.join({
      message: `course ${req.body.courseName} Already Exists`,
    });
  } else {
    let lenOfCourseArray = topCourses.length;
    topCourses.push(req.body);
    if (topCourses.length > lenOfCourseArray) {
      res.status(201);
      res.json(topCourses);
    } else {
      res.status(500);
      res.json({
        message: "Insertion Failed",
      });
    }
  }
});
// update course
app.push("/course/:course", (req, res) => {
  let objIndex = topCourses.findIndex((obj) => {
    obj.courseName.toLowerCase() == req.params.course.toLowerCase();
  });
  if (objIndex > -1) {
    topCourses[objIndex].rating = req.body.rating;
    res.status(200);
    res.json({
      message: `Rating of ${req.params.course} is ${topCourses[objIndex].rating}`,
    });
  } else {
    res.status(404);
    res.json({
      message: `Oops! Cannot find ${req.params.course}`,
    });
  }
});
// delete object
app.delete("/courses/:course", (req, res) => {
  let data = topCourses.find(
    (course) =>
      course.courseName.toLowerCase() == req.params.course.toLowerCase()
  );
  if (data) {
    topCourses = topCourses.filter(
      (obj) => obj.courseName.toLowerCase() != req.params.course.toLowerCase()
    );
    res.status(200);
    res.json(topCourses);
  }
});
const port = 4000;
app.listen(PORT, () => console.log(`listening to port ${PORT}`));
