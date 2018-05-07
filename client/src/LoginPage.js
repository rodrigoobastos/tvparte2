import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from './actions';
import Login from './Login';

class LoginPage extends React.Component {

  state = {
    redirect: false
  }

  login = ({email, password}) => {
    return this.props.login({ email, password }).then(
      () => { this.setState({ redirect: true })},
    );
    
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to={`/user/${this.props.user._id}`} /> :
          <Login
            login={this.login}
          />
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return { user: state.user };
}

export default connect(mapStateToProps, { login })(LoginPage);
