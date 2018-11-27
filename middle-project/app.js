var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var expressHbs = require("express-handlebars");
var app = express();
var driverController = require("./apiControllers/driverControllers");
var adminController = require("./routes/adminController");
var apiController = require("./apiControllers/app1Controllers");
// var apiController4 = require("./apiControllers/app4Controller");

// view engine setup
app.engine(".hbs", expressHbs({ defaultLayout: "layout", extname: ".hbs" }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    key: "user_sid",
    secret: "middlleproject",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

app.use((req, res, next) => {
  // if (
  //   (req.cookies.user_sid && !req.session.user) ||
  //   (req.cookies.user_sid && !req.session.admin)
  // ) {
  //   res.clearCookie("user_sid");
  // }
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/driver", driverController);
app.use("/apicaller", apiController);
app.use("/admin", adminController);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
