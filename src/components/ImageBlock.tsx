import React from 'react';
import {Field, ErrorMessage} from 'formik';
import StyleBuilder from './StyleBuilder';

export type IImageBlock = {
  id: string;
  src: string;
  type: 'image';
  styles: string;
  height: number | '100%';
  width: number | '100%';
  alt?: string;
};

const ImageBlock = ({value, name}: {value: IImageBlock; name: string}) => {
  return (
    <div>
      <div className="col">
        <label htmlFor={`${name}.src`} className="text-sm">
          Source
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
      <div className="col">
        <label htmlFor={`${name}.height`} className="text-sm">
          Height
        </label>
        <Field
          name={`${name}.height`}
          className="w-full border-1 border"
          placeholder="Some text"
          type="number"
        />
        <ErrorMessage
          name={`${name}.height`}
          component="div"
          className="field-error"
        />
      </div>
      <div className="col">
        <label htmlFor={`${name}.width`} className="text-sm">
          Width
        </label>
        <Field
          name={`${name}.width`}
          className="w-full border-1 border"
          placeholder="Some text"
          type="number"
        />
        <ErrorMessage
          name={`${name}.width`}
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
