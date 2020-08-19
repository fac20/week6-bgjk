const test = require("tape");
const router = require("../router");
const supertest = require("supertest");

test("initialise", t => {
  let num = 2;
  t.equal(num, 2, "should return 2");
  t.end();
});

test("check status code is 200", t => {
  supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type", "text/plain")
    .end((error, response) => {
      t.equal(response.text, "beans");
      t.error(error);
      t.end();
    });
});
