import express from "express";
import fs from "fs/promises";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
const app = express();

app.set("views", process.cwd() + "/views");
app.set("view engine", "ejs");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// let express uderstands and transforms the form values into javascript
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// let express to understands the text data
app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const router = express.Router();
const apiRouter = express.Router();

router.get("", (req, res) => {
  return res.render("index");
});

const middle = async (req, res, next) => {
  // 이미지 긴걸 읽어서 변수에 저장
  const { img, text } = req.body;
  // uuid에서 id 하나 발급
  const filename = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  //fs모듈을 써서 uploads 폴더에 저장을 하는데
  //파일 이름을 uuid id로 하고,

  function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
      response = {};

    if (matches.length !== 3) {
      return new Error("Invalid input string");
    }

    response.type = matches[1];
    response.data = Buffer(matches[2], "base64");

    return response;
  }

  var imageBuffer = decodeBase64Image(img);
  console.log(imageBuffer.type);
  const base64String = imageBuffer.data.toString("base64");
  const aaaa = Buffer(base64String, "base64");
  console.log(aaaa);
  try {
    const result = await fs.writeFile(
      `./uploads/${filename}.jpeg`,
      imageBuffer.data
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }

  //db에는 /uploads/${uuid}

  console.log("미들");

  return next();
};

apiRouter.route("/images").post(middle, (req, res) => {
  // console.log(JSON.parse(JSON.stringify(req.body)));
  console.log("이것은 파일인가?!");
  const { file } = req;

  return res.status(200).send({ result: "success" });
});

app.use("/", router);
app.use("/api", apiRouter);

app.listen(4000);
