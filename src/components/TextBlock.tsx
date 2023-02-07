import {ErrorMessage, Field} from 'formik';
import StyleBuilder from './StyleBuilder';

export type ITextBlock = {
  value: string;
  type: 'text';
  styles: string;
};

const TextBlock = ({name}: {name: string}) => {
  return (
    <div>
      <div className="col">
        <label htmlFor={name} className="text-sm">
          Value
        </label>
        <Field
          name={`${name}.value`}
          className="w-full border-1 border"
          placeholder="Some text"
          type="text"
        />
        <ErrorMessage
          name={`${name}.value`}
          component="div"
          className="field-error"
        />
      </div>
      <StyleBuilder name={`${name}`} />

      <div className="col">Type: Text</div>
    </div>
  );
};

export default TextBlock;
