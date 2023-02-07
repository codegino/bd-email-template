import React from 'react';
import {Field, ErrorMessage} from 'formik';
import StyleBuilder from './StyleBuilder';

export type IImageBlock = {
  id: string;
  src: string;
  type: 'image';
  styles: string;
  alt?: string;
};

const ImageBlock = ({value, name}: {value: IImageBlock; name: string}) => {
  return (
    <div>
      <div className="col">
        <label htmlFor={`${name}.src`} className="text-sm">
          Link
        </label>
        <Field
          name={`${name}.src`}
          className="w-full border-1 border"
          placeholder="Some text"
          type="text"
        />
        <ErrorMessage
          name={`${name}.src`}
          component="div"
          className="field-error"
        />
      </div>
      <StyleBuilder name={name} />

      <div className="col">Type: Image</div>
    </div>
  );
};

export default ImageBlock;
