import React from "react";
import "../App.css";
import ErrorMessage from "./ErrorMessage";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullName: "",
      password: "",
      validEmail: false,
      validFullName: false,
      validPassword: false,
      validForm: false,
      errors: {
        fullName: "",
        email: "",
        password: ""
      }
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.validateForm(this.state.errors)) {
      console.info("Valid Form");
    } else {
      console.error("Invalid Form");
    }
  };

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, fieldValue) {
    let validationErrors = this.state.errors;
    const validEmailRegex = RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    switch (fieldName) {
      case "fullName":
        validationErrors.fullName =
          fieldValue.length < 5
          ? ( 
            this.setState( { validFullName: false }, ()=>this.validateForm() ),
              "Full Name must be 5 characters long!" 
              )
          : ( 
            this.setState( { validFullName: true }, ()=>this.validateForm() ),
             '' 
             );
        break;

      case "email":
        validationErrors.email = validEmailRegex.test(fieldValue)
          ? ( this.setState( { validEmail: true }, ()=>this.validateForm() ), "" )
          : ( this.setState( { validEmail: false }, ()=>this.validateForm() ), "Email is not valid!" );
        break;

      case "password":
        validationErrors.password =
          fieldValue.length < 8
           ? ( this.setState( { validPassword: false }, ()=>this.validateForm() ), "Password must be 8 characters long!")
           : ( this.setState( { validPassword: true }, ()=>this.validateForm() ), "" );
        break;

      default:
        break;
    }
    
  }
//update the validForm property in the state to which is then used to diabeled the submit button
  validateForm = ()=>{ 
    this.setState({
      validForm: 
      this.state.validFullName && this.state.validPassword && this.state.validEmail
    },console.log(this.state))
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} className="login-html">
        <div>
          <div className="group">
            <ErrorMessage errors={this.state.errors} />
          </div>
          <div className="group">
            <label className="label">Username</label>
            <input
              type="text"
              name="fullName"
              className="input"
              placeholder="Username"
              onChange={this.handleChange}
            />
          </div>
          <div className="group">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              data-type="password"
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
          <div className="group">
            <label className="label">Email Address</label>
            <input
              type="email"
              name="email"
              className="input"
              placeholder="Email"
              onChange={this.handleChange}
            />
          </div>
          <div className="group-button">
            <button
              type="submit"
              className="button"
              disabled={!this.state.validForm}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
