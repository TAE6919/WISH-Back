import { isSignUp } from "./validJoi.js";

test("케이스 1 : username은 3자 이상이어야 한다.", async () => {
  expect(
    await isSignUp({
      nick: "123asd",
      email: "email@email.com",
      password: "12324",
      confirmPassword: "12324",
    })
  ).toEqual(true);
  expect(
    await isSignUp({
      nick: "123",
      email: "email@email.com",
      password: "12324",
      confirmPassword: "12324",
    })
  ).toEqual(true);
  expect(
    await isSignUp({
      nick: "13",
      email: "email@email.com",
      password: "12324",
      confirmPassword: "12324",
    })
  ).toEqual(false);
});

test("케이스 2 : username a-z, A-Z, + 만 허용한다.", async () => {
  expect(
    await isSignUp({
      nick: "123aSd+",
      email: "email@email.com",
      password: "12324",
      confirmPassword: "12324",
    })
  ).toEqual(true);
  expect(
    await isSignUp({
      nick: "123aAd+!",
      email: "email@email.com",
      password: "12324",
      confirmPassword: "12324",
    })
  ).toEqual(false);
});
