import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn, verifyToken } from '../redux/actions/userActions';

class SignIn extends Component {
  componentDidMount() {
    if (localStorage.hasOwnProperty('JWT')) {
      const token = localStorage.getItem('JWT');
      this.props.verifyToken({ token });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.isLogged === !prevProps.user.isLogged) {
      this.props.history.push('/vacations');
    }
  }

  render() {
    return (
      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        onSubmit={values => {
          this.props.signIn(values);
        }}
        //Validates input exists and is not an empty string
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .required('This field is required')
            .trim(),
          password: Yup.string()
            .required('This field is required')
            .trim()
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit
          } = props;
          return (
            <div id="signin" className="container mt-4 border">
              <form onSubmit={handleSubmit}>
                <div className="text-center ">
                  <h1 className="mt-2">Welcome to ObserVacation</h1>
                  <hr />
                  <h2 className="text-center">Sign In</h2>
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.username &&
                      touched.username &&
                      'border border-danger'}`}
                    id="username"
                    placeholder="Enter Username"
                    name="username"
                    values={values.username}
                    onChange={e => {
                      this.props.user.loginErrorMessage = '';
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username && (
                    <div className="text-danger">{errors.username}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password &&
                      touched.password &&
                      'border border-danger'}`}
                    id="password"
                    placeholder="Password"
                    name="password"
                    values={values.password}
                    onChange={e => {
                      this.props.user.loginErrorMessage = '';
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary mb-2 text">
                    Submit
                  </button>
                  <br />
                  <p className="text-danger">
                    {this.props.user.loginErrorMessage}
                  </p>

                  <span>
                    Don't have an account? <Link to="/signup">Sign up</Link>{' '}
                    now!
                  </span>
                </div>
              </form>
            </div>
          );
        }}
      </Formik>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user
});
export default connect(
  mapStateToProps,
  { signIn, verifyToken }
)(SignIn);
