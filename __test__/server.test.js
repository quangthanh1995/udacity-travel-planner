const app = require("../src/server/server");
const request = require("supertest");

describe("POST /addTrip", () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4000, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it("should return status code 200", async () => {
    const response = await request(server)
      .post("/addTrip")
      .send({ location: "Tokyo", startDate: "2024-07-28", endDate: "2024-07-29" });

    expect(response.status).toBe(200);
  });
});
