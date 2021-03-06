import express from "express";
import swaggerUi from "swagger-ui-express";
import yamljs from "yamljs";
import passport from "passport";
import postingsRouter from "./routers/postingsRouter.js";
import usersRouter from "./routers/usersRouter.js";
import kakaoLoginRouter from "./routers/kakaoLogin.js";
import session from "express-session";
import cors from "cors";
import db from "./db.js";

const app = express();
const PORT = 4000;
const swaggerDocument = yamljs.load("./api/api.yaml");

app.use(cors());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "sdflsdjfjlis",
    cookie: { maxAge: 600000 * 3 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

//업로드된 파일 static으로 올리기
app.use("/uploads", express.static("uploads"));

//middle ware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/postings", postingsRouter);
app.use("/api/users", usersRouter);
app.use("/kakao", kakaoLoginRouter);

const handleListening = () => {
  console.log(`Server listening on port http://localhost:${PORT}😀`);
};

app.listen(PORT, handleListening);
