import React from 'react';
import classnames from 'classnames';

class Login extends React.Component {
    state = {
      email: '',
      password:  '',
      errors: {},
      loading: false
    } 
  
    handleChange = (e) => {
      if (!!this.state.errors[e.target.name]) {
        let errors = Object.assign({}, this.state.errors);
        delete errors[e.target.name];
        this.setState({
          [e.target.name]: e.target.value,
          errors
        });
      } else {
        this.setState({ [e.target.name]: e.target.value });
      }
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
  
      // validation
      let errors = {};
      if (this.state.email === '') errors.email = "Can't be empty";
      if (this.state.password === '') errors.password = "Can't be empty";
      this.setState({ errors });
      const isValid = Object.keys(errors).length === 0
  
      if (isValid) {
        const { email, password } = this.state;
        this.setState({ loading: true });
        this.props.login({ email, password })
          .catch((err) => err.response.json().then(({errors}) => this.setState({ errors, loading: false })));
      }
    }
  
         render() {
      const form = (
        <form className={classnames('ui', 'form', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
          <h1>Login</h1>
  
          {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
  
          <div className={classnames('four wide field', { error: !!this.state.errors.title})}>
            <input
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
              id="email"
              type = "text"
            />
            <span>{this.state.errors.title}</span>
          </div>
  
          <div className={classnames('four wide field', { error: !!this.state.errors.cover})}>
            <input
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
              type = "password"
            />
            <span>{this.state.errors.cover}</span>
          </div>
  
          <div className="field">
            <button className="medium ui button"> Login </button>
          </div>
        </form>
      );
      return (
        <div>
          { form }
        </div>
      );
    }
  }

  export default Login;