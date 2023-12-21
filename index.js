///creating an http server
//default library=>no
// also run node index.js
//query paramerters:used for get request
//localhost:3000?n=3&a=2&b=3
//for post request :you send data in the body

//Code section1
const express = require("express");
const app = express();

function sum(n) {
  let ans = 0;
  for (let i = 0; i <= n; i++) {
    ans += i;
  }
  return ans;
}

app.get("/", function (req, res) {
  const n = req.query.n;
  const ans = sum(parseInt(n)); // Parse n to an integer for calculations
  res.send("Hi, your answer is: " + ans); // Send the response with the answer
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//2 throw back error on the adatabase
const express = require("express");
const app = express();
//req and response
app.get("/", function (req, res) {
  throw new Error("Server is failed");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

//4

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

var users = [
  {
    name: "kartik",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.get("/", function (req, res) {
  const johnKidney = users[0].kidneys;
  const numberOfKidneys = johnKidney.length;
  let numberOfHealthyKidney = 0;

  for (let i = 0; i < johnKidney.length; i++) {
    if (johnKidney[i].healthy === true) {
      numberOfHealthyKidney++;
    }
  }

  const numberOfUnHealthyKidneys = numberOfKidneys - numberOfHealthyKidney;
  res.json({
    numberOfKidneys,
    numberOfHealthyKidney,
    numberOfUnHealthyKidneys,
  });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.json({
    msg: "Done",
  });
});

app.put("/", function (req, res) {
  for (let i = 0; i < users.length; i++) {
    const userKidneys = users[i].kidneys;

    for (let j = 0; j < userKidneys.length; j++) {
      userKidneys[j].healthy = true;
    }
  }

  res.json({
    msg: "All kidneys updated to healthy for all users",
    users: users,
  });
});
//removing all the unhealthy kidneys
//you should the return the status as 411
//only if one bad kidney is there do this else return 411

app.delete("/", function (req, res) {
  const newKidneys = [];

  function isThereAtleastOneHealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (!users[0].kidneys[i].healthy) {
        atleastOneUnhealthyKidney = true;
      }
    }
    return atleastOneUnhealthyKidney;
  }

  if (isThereAtleastOneHealthyKidney()) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        newKidneys.push({
          healthy: true,
        });
      }
    }

    users[0].kidneys = newKidneys;
    res.json({
      msg: "Done",
    });
  } else {
    res.status(411).json({
      msg: "You have no bad kidneys",
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
