const express = require("express");
const session = require("express-session");
const ssoRouter = require("./routes/sso-router");
const path = require("path");
const app = express();

app.use(express.json());
app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.listen(3000, () => {
    console.log("Listeniing on port 3000");
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", ssoRouter);
