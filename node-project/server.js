const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local");
const models = require("./models");
const app = express();

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(
  session({
    secret: "1111",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.session());

// passport 설정
passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "pwd",
    },
    async (email, pwd, done) => {
      let result = await models.Users.findOne({
        where: { email: email },
      });
      if (!result) {
        return done(null, false, { message: "fail" });
      }
      if (result.pwd != pwd) {
        return done(null, false, { message: "pwd-fail" });
      }
      return done(null, result);
    }
  )
);

passport.serializeUser((user, done) => {
  process.nextTick(() => {
    done(null, { id: user.id, email: user.email, nickname: user.nickname });
  });
});

passport.deserializeUser(async (user, done) => {
  let result = await models.member.findOne({ where: { id: user.id } });
  if (result) {
    process.nextTick(() => {
      return done(null, {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
      });
    });
  }
});

app.listen(8081, () => {
  console.log("server on http://localhost:8081/");
});

// app.get("/", (req, res) => {
//   res.sendFile('index.html');
// });

// 로그인
app.post("/login", (req, res) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) return res.status(500).json(error);

    if (!user) return res.status(401).send(info.message);

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).send("success");
    });
  })(req, res);
});

// 게시글 작성
app.post("/posts", async (req, res) => {
  console.log(req.body)
  await models.Post
    .create(req.body)
    .then(() => {
      res.send('success')
    })
    .catch((error) => {
      res.send('fail')
    });
});

app.get("*", (req, res)=>{
  res.sendFile('index.html');
})