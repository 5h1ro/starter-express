var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./app/index");
var userRouter = require("./app/users/router");

var app = express();
const URL = "/api/v1";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(`${URL}/users`, userRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  return res
    .status(404)
    .send({ success: false, message: "Endpoint Not Found" });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  return res.status(err.status || 500).send({
    status: false,
    message: err.message,
  });
});

module.exports = app;
