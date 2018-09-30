import axios from "axios";

const service = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:5000/api",
  withCredentials: true
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,

  postDocuments() {
    return service
      .post("/documents")
      .then(res => {
        localStorage.setItem("user", "anonymous");
        return res.data;
      })
      .catch(errHandler);
  },

  getDocument(docId) {
    return service
      .get("/documents/" + docId)
      .then(res => res.data)
      .catch(errHandler);
  },

  createFile(data) {
    console.log("Data in api create file -->", data);
    const formData = new FormData();
    formData.append("file", data.file);
    return service
      .post("/documents/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(errHandler);
  },

  updateDocument(docId, data) {
    return service
      .patch("/documents/" + docId, data)
      .then(res => res.data)
      .catch(errHandler);
  },
  getProfile() {
    return service.get("/profile").then(res => res.data);
  },

  updateProfile(id, data) {
    return service
      .get("/profile/" + id, data)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteDocument(id) {
    return service
      .delete("/documents/" + id)
      .then(res => res.data)
      .catch(errHandler);
  },

  signup(userInfo) {
    return service
      .post("/signup", userInfo)
      .then(res => res.data)
      .catch(errHandler);
  },

  login(username, password) {
    return service
      .post("/login", {
        username,
        password
      })
      .then(res => {
        localStorage.setItem("user", JSON.stringify(res.data));
        return res.data;
      })
      .catch(errHandler);
  },

  logout() {
    localStorage.removeItem("user");
    return service.get("/logout");
  },

  isLoggedIn() {
    console.log(localStorage.getItem("user") != null);
    return localStorage.getItem("user") != null;
  },

  addPicture(file) {
    const formData = new FormData();
    formData.append("picture", file);
    return service
      .post("/users/first-user/pictures", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => res.data)
      .catch(errHandler);
  }
};
