import React, { Component } from 'react';
import axios from 'axios';
class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      formErrors: { name: "", email: "", password: "" },
      usernameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false,
      res:false,
    };
  }

  handleReset = () =>{
      this.setState({
        email: "",
        name: "",
        password: "",
        formErrors: { name: "", email: "", password: "" },
        usernameValid: false,
        emailValid: false,
        passwordValid: false,
        formValid: false,
        res:false,
      })
  }


  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
    let res =true;
    this.setState({res});
  };
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    switch (fieldName) {
      case "name":
        usernameValid =
          value.match(/^[a-zA-Z][a-zA-Z0-9]*$/) &&
          (value.length >= 5 && value.length <= 11);
        fieldValidationErrors.name = usernameValid
          ? ""
          : " should be 5 to 11 characters long";
        break;
      case "email":
        emailValid = value.match(
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        );
        fieldValidationErrors.email = emailValid ? "" : " invalid email";
        break;
      case "password":
          passwordValid = value.length >= 8;
          fieldValidationErrors.password = passwordValid ? "" : " Should be atleast 8 characters long";
          break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        usernameValid: usernameValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.usernameValid &&
        this.state.passwordValid
    });
  }
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
handleSubmit = event => {
  event.preventDefault();
  // const user = {
  //   name: this.state.name,
  //   email: this.state.email,
  //   password: this.state.password
  // };
  
  axios.post('http://localhost:4000/submit/', { name: this.state.name,
  email: this.state.email,
  password: this.state.password })
  .then(res => {
    console.log(res);
    console.log(res.data);
  })
}
  render() {
    return (
      <form onSubmit = {this.handleSubmit} method = "POST">
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.name
          )}`}
        >
        <h1>Registration Form</h1>
        <label>Name:  </label><br />
        <input type= "text"
        name='name'
        value={this.state.name}
        onChange={this.handleUserInput}/>
        <br/>
        <div style={{color:'red'}}>
          {this.state.formErrors.name}
        </div>
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
        <label>Email:       </label><br />
        <input type= "email"
        name = 'email'
        value={this.state.email}
        onChange={this.handleUserInput}/>
        <br/>
        <div style={{color:'red'}}>
          {this.state.formErrors.email}
        </div>
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.password
          )}`}
        >
        <label>Password:  </label><br />
        <input type= "password"
        name = 'password'
        value={this.state.password}
        onChange={this.handleUserInput}/>
        <div style={{color:'red'}}>
          {this.state.formErrors.password}
        </div>
        <br/>
        
        <input type = "submit" disabled={!this.state.formValid} value = "submit"/>
        <button disabled={!this.state.res} onClick ={this.handleReset}>Reset</button>
      </div>
      </form>
    );
  }
}
export default Registration;