import app from "../../src/app";
import axios from "axios";


describe("Questions tests", () => {
    test("Get all Questions", async () => {
      const res = await axios.get('http://localhost:9000/api/questions');
      expect(res.status).toBe(200);
    });
  });