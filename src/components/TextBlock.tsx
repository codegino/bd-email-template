import {ErrorMessage, Field} from 'formik';

export type ITextBlock = {
  value: string;
  type: 'text';
};

const TextBlock = ({name}: {name: string}) => {
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

      <div className="col">Type: Text</div>
    </div>
  );
};

export default TextBlock;
