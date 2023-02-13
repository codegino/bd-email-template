import {ErrorMessage, Field} from 'formik';
import StyleBuilder from './StyleBuilder';

export type ITextBlock = {
  id: string;
  value: string;
  type: 'text';
  styles: string;
  tag: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const TextBlock = ({name}: {name: string}) => {
  return (
    <div>
      <div className="col">
        <label htmlFor={`${name}.value`} className="text-sm">
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
      <div className="col">
        <label htmlFor={`${name}.tag`} className="text-sm">
          Value
        </label>
        <Field
          name={`${name}.tag`}
          as="select"
          className="w-full border-1 border"
          placeholder="Some text"
          type="text"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
        </Field>
        <ErrorMessage
          name={`${name}.tag`}
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
