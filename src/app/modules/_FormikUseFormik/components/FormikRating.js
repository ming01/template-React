/* eslint-disable no-restricted-imports */
import React from 'react';
import PropTypes from 'prop-types'
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';

function FormikRating(props) {
    return (
        <>
        <Typography component="legend">{props.label}</Typography>
        <Rating
          name="simple-controlled"
          onBlur={() => {
            props.formik.setFieldTouched([`${props.name}`], true, true) 
          }}
          onChange={(event, value) => {
            props.formik.setFieldValue(props.name, value);
          }}
          value={props.formik.values[`${props.name}`]}
          disabled={props.disabled}
        />
      </>
    )
}

FormikRating.propTypes = {
    formik: PropTypes.object,
    name: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
}

FormikRating.defaultProps = {
    formik: {},
    name:'Do not forget to set name',
    label: 'Do not forget to set label',
    disabled: false
}

export default FormikRating
