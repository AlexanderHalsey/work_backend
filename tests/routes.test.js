var app = require("../app");
var request = require("supertest");
var mongoose = require("mongoose");

describe("tests sur le route signUp", () => {
    test("sign in avec des infos correctes", async () => {
        await request(app)
            .post("/signUp/signIn")
            .send({
                emailFromFront: "hafed.benchellali@gmail.com",
                passwordFromFront: "Ah"
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.result).toBe(true);
            })

    });
    test("sign in avec des infos incorrectes", async () => {
        await request(app)
            .post("/signUp/signIn")
            .send({
                emailFromFront: "nayeff.b@gmail.com",
                passwordFromFront: "boob"
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.result).toBe(false);
            })
    });
    test("le route existingToken avec un token valide", async () => {
        await request(app)
            .get("/signUp/existingToken?token=0yA5-bYP-KxxJXMT_g3MUY3bbShN9xn7")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.user).not.toBeNull();
            })
    });
    test("le route existingToken avec un token qui n'est pas valide", async () => {
        await request(app)
            .get("/signUp/existingToken?token=untokenquinestpasvalide")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body.user).toBeNull();
            })
    });
})

afterAll(() => {
    mongoose.connection.close();
})