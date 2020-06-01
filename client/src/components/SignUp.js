import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { signIn, signUp } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';
class SignUp extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.user.isLogged === !prevProps.user.isLogged) {
      this.props.history.push('/vacations');
    }
  }

  render() {
    return (
      <Formik
        initialValues={{
          fname: '',
          lname: '',
          username: '',
          password: ''
        }}
        onSubmit={values => {
          this.props.signUp(values);
        }}
        validationSchema={Yup.object().shape({
          fname: Yup.string().required('This field is required'),
          lname: Yup.string().required('This field is required'),
          username: Yup.string()
            .required('This field is required')
            .min(4, 'Username must be at least 4 characters'),
          password: Yup.string()
            .required('This field is required')
            .min(4, 'Password must be at least 4 characters')
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
            <div id="signup" className="container mt-4 border">
              <form onSubmit={handleSubmit}>
                <h1 className="text-center">Sign Up</h1>
                <div id="fnameDiv" className="form-group">
                  <label htmlFor="fname">First Name:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.fname &&
                      touched.fname &&
                      'border border-danger'}`}
                    id="fname"
                    placeholder="Enter First Name"
                    name="fname"
                    values={values.fname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.fname && touched.fname && (
                    <div className="text-danger">{errors.fname}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="lname">Last Name:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.fname &&
                      touched.fname &&
                      'border border-danger'}`}
                    id="lname"
                    placeholder="Enter Last Name"
                    name="lname"
                    values={values.lname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.lname && touched.lname && (
                    <div className="text-danger">{errors.lname}</div>
                  )}
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
                      this.props.user.usernameErrorMessage = '';
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password && (
                    <div className="text-danger">{errors.password}</div>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-danger">
                    {this.props.user.usernameErrorMessage}
                  </p>
                  <button type="submit" className="btn btn-primary mb-2 text">
                    Submit
                  </button>
                  <br />
                  <span>
                    Already have an account? <Link to="/">Sign in</Link> now!
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
  { signIn, signUp }
)(SignUp);
