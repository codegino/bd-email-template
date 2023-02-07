import React from 'react';
import {Field, ErrorMessage} from 'formik';
import Image from 'next/image';
import StyleBuilder from './StyleBuilder';

export type IImageBlock = {
  src: string;
  type: 'image';
  styles: string;
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

      <Image src={value.src} alt="yow" width={300} height={300} />

      <div className="col">Type: Image</div>
    </div>
  );
};

export default ImageBlock;
