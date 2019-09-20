import React from "react";
import "../App.css";

class ErrorMessage extends React.Component {
  render() {
    const errors = this.props.errors;
    return (
      <div className="group">
        {Object.keys(errors).map((fieldName, i) => {
          if (errors[fieldName].length > 0) {
            return <p key={i}>{errors[fieldName]}</p>;
          } else {
            return "";
          }
        })}
      </div>
    );
  }
}
export default ErrorMessage;
