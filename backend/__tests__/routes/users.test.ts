import axios from "axios";


describe("Users", () => {
    test("Post user with no point", async () => {
      const res = await axios.post('http://localhost:9000/api/users',{name:"zed"});
      expect(res.status).toBe(200);
      expect(res.data).toEqual("No user found");
    });

    test("Post user with points", async () => {
      const res = await axios.post('http://localhost:9000/api/users',{name:"mario", points:77});
      expect(res.status).toBe(200);
    });
  });