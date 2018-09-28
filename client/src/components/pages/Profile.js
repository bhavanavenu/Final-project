// import React, { Component } from "react";
// import api from "../../api";
// import utils from "../../utils";

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./Faq.css";

class Profile extends Component {
  render() {
    return (
      <div className="container ">
        <div className="faq align-middle mt-5 shadow-lg p-5 rounded">
          <h5 style={{ fontSize: 30 }}>Frequency Asked Questions:</h5>

          <dl>
            <dt style={{ fontSize: 20 }}>What is Cipher?</dt>
            <dd>
              If you need to send a password or some other form of simple but
              sensitive information to someone you can not send it over IM or
              email. These methods are not secure as anyone with little
              knowledge can intercept this information during transmission.
              Using Cipher as the "middle man" you can safely and securely
              transfer this data to your recipient.
            </dd>
            <dt style={{ fontSize: 20 }}>How secure is it?</dt>
            <dd>
              Cipher runs on HTTPS. Once the data is accessed by the receiver,
              the encrypted documents on the backend are removed from the
              system.
            </dd>
            <dt>How are the documents stored before being read?</dt>
            <dd>The documents are encrypted and put into a database.</dd>
            <dt style={{ fontSize: 20 }}>Can you read the notes?</dt>
            <dd>
              No. The notes are encrypted using a key that is never stored on
              the server. Only the valid URL can display the documents. Once
              they are viewed the encrypted documents are removed from the
              system and the link can not be accessed again.
            </dd>
          </dl>

          <p>
            <h5>About Author</h5>
            Hi, my name is Bhavana Venu, I developed this project for helping
            anyone to share information anonymously to anyone in a secure way. I
            am activly improving this application and you can checkout the
            source the code{" "}
            <a href="https://github.com/bhavanavenu/Final-project">here</a>.
          </p>
        </div>
      </div>
    );
  }
}
export default Profile;

// class Profile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       user: "",
//       documents: []
//     };
//   }

//   render() {
//     console.log("user -->", this.state.username);
//     if (api.isLoggedIn()) {
//       return (
//         <div className="Profile">
//           <h1>My profile</h1>
//           Name : {this.state.username}
//           <tbody>
//             {this.state.documents.map(c => (
//               <tr key={c._id}>
//                 <td>{c.text}</td>
//                 <td>{c.label}</td>
//                 <td>{c.fileUrl}</td>
//               </tr>
//             ))}
//           </tbody>
//         </div>
//       );
//     }
//   }
//   componentDidMount() {
//     api.getProfile().then(res => {
//       this.setState({
//         user: res.user,
//         username: res.user.username,
//         documents: res.documents
//       });
//     });
//   }
// }

// export default Profile;
