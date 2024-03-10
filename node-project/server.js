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
      let result = await models.User.findOne({
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

// posts 조회
app.get("/posts", async (req, res) => {
  let page = parseInt(req.query.page);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;
  let totalPost = await models.Post.count();
  let totalPage = Math.ceil(totalPost / limit);
  if (page > totalPage) {
    page = totalPage;
  }

  let offset = totalPage == 0 ? 0 : (page - 1) * limit; // row가 없을경우 offset을 0으로 설정 (오류 방지)

  const data = await models.Post.findAll({
    include: [
      {
        model: models.User,
        attributes: ["nickname"],
      },
    ],
    order: [["id", order]],
    offset,
    limit,
  });
  res.send({ data, totalPage });
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  const data = await models.Post.findOne({
    include: [
      {
        model: models.User,
        attributes: ["nickname"],
      },
    ],
    where: { id },
  });
  res.send(data);
});

// post 작성
app.post("/posts", async (req, res) => {
  const row = await models.Post.create(req.body);
  res.send(row.id.toString());
});

// app.get("*", (req, res)=>{
//   res.sendFile('index.html');
// })
