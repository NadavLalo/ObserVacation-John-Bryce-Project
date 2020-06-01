import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import {
  fetchSingleVacation,
  editVacation
} from '../redux/actions/vacationActions';
import { verifyToken } from '../redux/actions/userActions';

class EditPage extends Component {
  componentDidMount() {
    if (!this.props.user.isAdmin) {
      if (localStorage.hasOwnProperty('JWT')) {
        const token = localStorage.getItem('JWT');
        this.props.verifyToken({ token });
      } else {
        this.props.history.push('/');
      }
    } else {
      const { token } = this.props.user;
      const id = this.props.match.params.id;
      this.props.fetchSingleVacation(id, token);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.isAdmin !== prevProps.user.isAdmin) {
      const { token } = this.props.user;
      const id = this.props.match.params.id;
      this.props.fetchSingleVacation(id, token);
    }
    if (!this.props.user.isAdmin) {
      this.props.history.push('/vacations');
    }
    if (this.props.user.unauthorized) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          vacation_id: this.props.vacation.vacation_id,
          destination: this.props.vacation.destination,
          description: this.props.vacation.description,
          price: this.props.vacation.price,
          start_date: this.props.vacation.start_date,
          end_date: this.props.vacation.end_date,
          image: null
        }}
        onSubmit={values => {
          //Get an object that contains changed inputs only
          const formKeys = Object.keys(values);
          const oldVals = Object.values(this.props.vacation);
          const newVals = Object.values(values);
          const changedValues = {};
          newVals.forEach((val, index) => {
            if (val === null) {
              val = this.props.vacation.img;
            }
            if (val !== oldVals[index]) {
              var key = formKeys[index];
              changedValues[key] = val;
            }
          });

          // If no fields were changed, redirect to homepage
          if (
            Object.entries(changedValues).length === 0 &&
            changedValues.constructor === Object
          ) {
            this.props.history.push('/vacations');
          } else {
            // Send changed fields to server
            // const followers =
            const data = new FormData();
            Object.keys(changedValues).forEach((val, index) =>
              data.append(val, Object.values(changedValues)[index])
            );
            const token = this.props.user.token;
            this.props.editVacation(data, values.vacation_id, token);
            this.props.history.push('/vacations');
          }
        }}
        validationSchema={Yup.object().shape({
          destination: Yup.string()
            .required('This field is required')
            .trim(),
          description: Yup.string()
            .required('This field is required')
            .trim(),
          price: Yup.string()
            .required('This field is required')
            .trim(),
          start_date: Yup.string()
            .required('This field is required')
            .trim(),
          end_date: Yup.string()
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
            handleSubmit,
            setFieldValue
          } = props;
          // const addVacationDisplay = this.props.user.isAdmin ? (
          const addVacationDisplay = (
            <div id="edit" className="container mt-4 border">
              <form onSubmit={handleSubmit}>
                <h1 className="text-center">Edit Vacation</h1>
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.destination || ''}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description || ''}
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
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price || ''}
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
                    value={values.start_date || ''}
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
                    value={values.end_date || ''}
                  />
                  {errors.end_date && touched.end_date && (
                    <div className="text-danger">{errors.end_date}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="image">
                    Edit Image: (Leave blank to keep current image){' '}
                  </label>
                  <input
                    type="file"
                    name="image"
                    className={`form-control ${errors.image &&
                      touched.image &&
                      'border border-danger'}`}
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
  user: state.user,
  vacation: state.vacations.singleVacation
});
export default connect(
  mapStateToProps,
  { fetchSingleVacation, editVacation, verifyToken }
)(EditPage);
