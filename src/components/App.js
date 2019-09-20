import React from "react";
import "../App.css";
import Form from "./Form";

class App extends React.Component {
  // //validate function
  // validateUser(user) {
  //   const users = { ...this.state.users };
  //   const timeStamp = Date.now();
  //   users[`user-${timeStamp}`] = user;
  //   this.setState({ users: users });
  //   console.log(this.state.users);
  // }
  //render method
  render() {
    return (
      <div className="form">
        <Form />
      </div>
    );
  }
}

export default App;
