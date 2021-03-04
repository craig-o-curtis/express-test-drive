import express from "express";
import util from "util";
import path from "path";
import favicon from "serve-favicon";

import data from "./data/data.json";

const app = express();
const PORT = 3333;

// ** for public folder on path /
// ** ** with `/` can grab anything from the public folder
app.use(express.static("public"));
// app.use(express.static("images"));
// ** images folder, on path /images
app.use("/images", express.static("images"));

// ** favicon - serve-favicon middleware -- not loading...
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// ** Middleware - for every request
app.use((req, res, next) => {
  util.log(`Time: ${Date.now()}`);
  next();
});

// ** Middleware for JSON
// ** allow usage of json
// app.use(express.json());
// ** allow usage of URLEncoded
// app.use(express.urlencoded({ extended: true }));

// ** Proxies
// ** https://goo.gl/vujgNr
// ** https://expressjs.com/en/guide/behind-proxies.html
// ** loopback = 127.0.0.1/8, ::1/128
app.set("trust proxy", "loopback");

// ** Read
app.get("/", (req, res) => {
  util.log(`GET request /`);
  // res.send(`a GET request with / route on port ${PORT}`);
  // ** get data
  // ** return to client
  res.status(200).json(data);
});

app.get("/item", (req, res) => {
  res.end(); // ** stop an API call
});

// ** Params
app.get(
  "/item/:id",
  (req, res, next) => {
    // ** middleware that pulls data

    util.log(`req.params.id ${req.params.id}`);
    let userId = Number(req.params.id);

    if (isNaN(userId)) {
      util.log(`Invalid userId ${userId}. Must be a number`);
      throw new Error("userId must be a number");
    }

    util.log(`userId ${userId}`);
    let user = data.find((user) => user.id === userId);

    if (user === undefined) {
      util.log(`Invalid userId ${userId}`);
      throw new Error("user not found");
    }

    util.log(`user ${JSON.stringify(user)}`);

    // ** middleware that uses req obj
    util.log(`Request from: ${req.originalUrl}`);
    util.log(`Request type: ${req.method}`);

    res.send(user);
    next(); // *** jumps into the next function - basically custom middleware
  },
  /* route handler*/ (req, res) => {
    console.log("did you get the right data?");
  }
);

// ** Create
// ** Header "Content-Type" : "application/json"
app.post("/newItem", (req, res) => {
  util.log(`POST request /newItem`);
  util.log(req.body);
  res.send(req.body);
  res.send(`a POST request with /newItem route on port ${PORT}`);
});

// ** Create URL Encoded
// ** Header "Content-Type" : "application/x-www-form-urlencoded"
app.post("/newItemURLEncoded", (req, res) => {
  util.log(`POST request /newItemURLEncoded`);
  util.log(req.body);
  res.send(req.body);
  res.send(`a POST request with /newItemURLEncoded route on port ${PORT}`);
});

// ** Update
app.put("/item", (req, res) => {
  util.log(`PUT request /item`);
  res.send(`a PUT request with /item route on port ${PORT}`);
});

// ** Delete
app.delete("/item", (req, res) => {
  util.log(`DELETE request /item`);
  res.send(`a DELETE request with /item route on port ${PORT}`);
});

// ** Redirects
app.get("/redirect", (req, res) => {
  res.redirect("https://www.google.com");
});

// ** Download
app.get("/download", (req, res) => {
  res.download("images/rocket.jpg");
});

// ** Chaining with routes
app
  .route("/chainedItem")
  .get((req, res) => {
    res.send(`a GET request with /chainedItem route on port ${PORT}`);
  })
  .put((req, res) => {
    res.send(`a PUT request with /chainedItem route on port ${PORT}`);
  })
  .delete((req, res) => {
    res.send(`a DELETE request with /chainedItem route on port ${PORT}`);
  });

// ** JSON data
// ** { "hello": "json is cool" }
// ** URLEncoded data
// ** hello=URLEncoded+is+cool

// ** Custom error handling fn
// ** Express infers creating error handler
// ** (default error looks better)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send(`
//     Red alert!
//     Red alert!:\n
//     ${err.stack}
//   `);
// });

app.listen(PORT, () => {
  util.log(`Server running on port ${PORT}`);
  // util.log(data);
  util.debuglog("debug log");
});

// ** Express and 3rd Party Middleware
// ** http://expressjs.com/en/resources/middleware.html
