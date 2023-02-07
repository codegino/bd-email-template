import React from 'react';
import {Field} from 'formik';

const StyleBuilder = ({name}) => {
  return (
    <div className="col">
      <label htmlFor={`${name}.styles`} className="text-sm">
        Styles
      </label>
      <Field
        name={`${name}.styles`}
        className="w-full border-1 border"
        placeholder="Add some styles"
        type="text"
      />
    </div>
  );
};

export default StyleBuilder;
