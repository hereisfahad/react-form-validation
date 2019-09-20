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
      validForm: true,
      errors: {
        fullName: "",
        email: "",
        password: ""
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
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
    let validFullName = this.state.validFullName;
    let validEmail = this.state.validEmail;
    let validPassword = this.state.validPassword;

    const validEmailRegex = RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    switch (fieldName) {
      case "fullName":
        validFullName =
          fieldValue.length < 5 ? "Full Name must be 5 characters long!" : "";
        validationErrors.fullName = validFullName;
        {
          if (validFullName.length < 0) {
            this.setState({
              validFullName: fieldValue
            });
          }
        }
        break;
      case "email":
        validEmail = validEmailRegex.test(fieldValue)
          ? ""
          : "Email is not valid!";
        validationErrors.email = validEmail;
        break;
      case "password":
        validPassword =
          fieldValue.length < 8 ? "Password must be 8 characters long!" : "";
        validationErrors.password = validPassword;
        break;
      default:
        break;
    }

    this.setState(
      {
        errors: validationErrors,
        validEmail: validEmail,
        validFullName: validFullName,
        validPassword: validPassword
      },
      () => {
        console.log(this.state);
        this.setState({
          validForm:
            this.state.validPassword &&
            this.state.validFullName &&
            this.state.validEmail
        });
      }
    );
  }

  validateForm() {}

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