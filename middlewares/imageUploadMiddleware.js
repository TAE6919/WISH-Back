import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../logger/logger.js";
// base64 형식 파일 디코딩
const decodeBase64Image = (dataString) => {
  let matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error("Invalid input string");
  }
  response.type = matches[1];
  response.data = Buffer(matches[2], "base64");
  return response;
};

export const uploadImage = async (req, res, next) => {
  // base64 형식 읽어서 변수에 저장
  const { img } = req.body;
  // uuid에서 id 하나 발급
  const fileName = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  const imageBuffer = decodeBase64Image(img);

  const imageUrl = `uploads/${fileName}.jpeg`;

  //fs모듈을 써서 uploads 폴더에 저장, 파일이름은 uuid.jpeg
  try {
    const result = await fs.writeFile(imageUrl, imageBuffer.data);
    console.log(result);
    //성공하면 req에 새로운 객체 생성
    req.imageUrl = { imageUrl };
    next();
  } catch (err) {
    logger.error(err);
    //에러 발생시, 작업 중단하고 클라이언트에게 메세지 전송
    return res.status(400).send({ msg: "파일 저장에 실패하였습니다." });
  }
};
