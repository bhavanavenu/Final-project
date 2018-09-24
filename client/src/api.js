import axios from "axios";
//import Upload from "./components/pages/Upload";
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
      .then(res => res.data)
      .catch(errHandler);
  },

  getDocument(docId) {
    return service
      .get("/documents/" + docId)
      .then(res => res.data)
      .catch(errHandler);
  },

  updateDocument(docId, data) {
    const formData = new FormData();
    //formData.append("doc", "document");
    formData.append("file", data.file);
    formData.append("label", data.label);
    formData.append("type", data.type);
    formData.append("text", data.text);

    return service.patch("/documents/" + docId, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  },

  getProfile(username) {
    return service
      .get("/profile/" + username)
      .then(res => res.data)
      .catch(errHandler);
  },

  updateProfile(username) {
    return service
      .get("/profile/" + username)
      .then(res => res.data)
      .catch(errHandler);
  },

  deleteDocument(id) {
    return service
      .get("/documents/" + id)
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

  // loadUser() {
  //   const userData = localStorage.getItem('user');
  //   if (!userData) return false;
  //   const user = JSON.parse(userData);
  //   if (user.token) {
  //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
  //     return user;
  //   }
  //   return false;
  // },

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
