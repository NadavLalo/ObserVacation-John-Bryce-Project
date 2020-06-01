import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { addNewVacation } from '../redux/actions/vacationActions';
import { verifyToken } from '../redux/actions/userActions';
class AddVacation extends Component {
  componentDidMount() {
    if (!this.props.user.isAdmin) {
      if (localStorage.hasOwnProperty('JWT')) {
        const token = localStorage.getItem('JWT');
        this.props.verifyToken({ token });
      } else {
        this.props.history.push('/');
      }
    }
  }

  componentDidUpdate() {
    if (!this.props.user.isAdmin) {
      this.props.history.push('/vacations');
    }
    if (this.props.user.unauthorized) {
      this.props.history.push('/vacations');
    }
  }
  render() {
    return (
      <Formik
        initialValues={{
          destination: '',
          description: '',
          price: '',
          start_date: '',
          end_date: '',
          image: null
        }}
        onSubmit={values => {
          const data = new FormData();
          Object.keys(values).forEach((val, index) =>
            data.append(val, Object.values(values)[index])
          );
          const token = this.props.user.token;
          this.props.addNewVacation(data, token);
          this.props.history.push('/vacations');
        }}
        validationSchema={Yup.object().shape({
          destination: Yup.string().required('This field is required'),
          description: Yup.string().required('This field is required'),
          price: Yup.string().required('This field is required'),
          start_date: Yup.string().required('This field is required'),
          end_date: Yup.string().required('This field is required'),
          image: Yup.mixed()
            .required('This field is required')
            .test(
              'fileFormat',
              'File type must be an image',
              value =>
                value &&
                ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'].includes(
                  value.type
                )
            )
        })}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            handleChange,
            setFieldValue,
            handleBlur,
            handleSubmit
          } = props;
          const addVacationDisplay = (
            <div id="add" className="container mt-4 border">
              <form onSubmit={handleSubmit}>
                <h1 className="text-center">Add Vacation</h1>
                <div className="form-group">
                  <label htmlFor="destination">Destination:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.destination &&
                      touched.destination &&
                      'border border-danger'}`}
                    id="destination"
                    placeholder="Enter Description"
                    name="destination"
                    values={values.destination}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.destination && touched.destination && (
                    <div className="text-danger">{errors.destination}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    type="text"
                    className={`form-control ${errors.description &&
                      touched.description &&
                      'border border-danger'}`}
                    id="description"
                    placeholder="Enter Destination"
                    name="description"
                    values={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.description && touched.description && (
                    <div className="text-danger">{errors.description}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="text"
                    className={`form-control ${errors.price &&
                      touched.price &&
                      'border border-danger'}`}
                    id="price"
                    placeholder="Enter Price"
                    name="price"
                    values={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.price && touched.price && (
                    <div className="text-danger">{errors.price}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="start_date">Start date:</label>
                  <input
                    type="date"
                    className={`form-control ${errors.start_date &&
                      touched.start_date &&
                      'border border-danger'}`}
                    id="start_date"
                    name="start_date"
                    values={values.start_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.start_date && touched.start_date && (
                    <div className="text-danger">{errors.start_date}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="end_date">End date:</label>
                  <input
                    type="date"
                    className={`form-control ${errors.end_date &&
                      touched.end_date &&
                      'border border-danger'}`}
                    id="end_date"
                    name="end_date"
                    values={values.end_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.end_date && touched.end_date && (
                    <div className="text-danger">{errors.end_date}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image: </label>
                  <input
                    type="file"
                    name="image"
                    className={`form-control ${errors.image &&
                      touched.image &&
                      'border border-danger'}`}
                    values={values.image}
                    onChange={e => setFieldValue('image', e.target.files[0])}
                  />
                  {errors.image && touched.image && (
                    <div className="text-danger">{errors.image}</div>
                  )}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mb-2 text">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-dark ml-1 mb-2"
                    onClick={() => this.props.history.push('/vacations')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          );

          return addVacationDisplay;
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
  { addNewVacation, verifyToken }
)(AddVacation);
