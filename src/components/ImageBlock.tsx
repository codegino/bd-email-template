import React from 'react';
import {Field, ErrorMessage} from 'formik';
import Image from 'next/image';

export type IImageBlock = {
  value: string;
  type: 'image';
};

const ImageBlock = ({value, name}: {value: IImageBlock; name: string}) => {
  return (
    <div>
      <div className="col">
        <label htmlFor={name} className="text-sm">
          Value
        </label>
        <Field
          name={name}
          className="w-full border-1 border"
          placeholder="Some text"
          type="text"
        />
        <ErrorMessage name={name} component="div" className="field-error" />
      </div>

      <Image src={value.value} alt="yow" width={300} height={300} />

      <div className="col">Type: Image</div>
    </div>
  );
};

export default ImageBlock;
