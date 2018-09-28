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
        <div className="faq align-middle mt-5">
          <h5 style={{ fontSize: 30 }}>Frequency Asked Questions:</h5>

          <dl>
            <dt>How secure is Cipher?</dt>
            <dd>
              Cipher runs in HTTPS.Once the notes are viewed the encrypted
              documents are removed from the system. Pretty secure.
            </dd>
            <dt>How are the documents stored before being read?</dt>
            <dd>The documents are encrypted and put into a database.</dd>
            <dt>Can you read the notes?</dt>
            <dd>
              No.The notes are encrypted using a key that is never stored on the
              server. Only the valid URL can display the documents. Once they
              are viewed the encrypted documents are removed from the system and
              the link can not be viewed again.
            </dd>
          </dl>
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
