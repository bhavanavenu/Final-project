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
    return service.post("/documents");
  },

  editDocuments(data) {
    const formData = new FormData();
    //formData.append("doc", "document");
    formData.append("doc", data.selectedFile);
    formData.append("label", data.selectedLabel);
    formData.append("type", data.selectedType);
    formData.append("text", data.selectedText);

    // formData.append(
    //   "doc",
    //   data.selectedFile,
    //   data.selectedLabel,
    //   data.selectedType,
    //   data.selectedText
    // );
    return service.post("/documents", formData).then(res => {
      console.log(res);
    });

    // axios.post('http://localhost:5000/api/documents')
    // add logic to send data to backend to create a document
    // return service
    //   .post("/documents", data)
    //   .then(res => res.data)
    //   .catch(errHandler);
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

  getDelete(id) {
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
