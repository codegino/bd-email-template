import React from 'react';
import {Field, ErrorMessage, FieldArray} from 'formik';
import ImageBlock, {IImageBlock} from './ImageBlock';
import StyleBuilder from './StyleBuilder';
import TextBlock, {ITextBlock} from './TextBlock';

export type ISectionBlock = {
  type: 'section';
  flow: 'horizontal' | 'vertical';
  items: Array<ITextBlock | IImageBlock | ISectionBlock>;
  styles: string;
};

const SectionBlock = ({value, name}: {value: ISectionBlock; name: string}) => {
  const [blockType, setBlockType] = React.useState('text');

  const handleAddBlock = push => {
    if (blockType === 'section') {
      push({
        items: [
          {
            value: 'Some text',
            type: 'text',
          },
        ],
        flow: 'horizontal',
        type: 'section',
        styles: '',
      } as ISectionBlock);
    } else if (blockType === 'image') {
      push({
        src: 'https://drive.google.com/uc?export=view&id=1qDPt-6n2K0cwkCpScSjwq2eogVy3eFuN',
        type: 'image',
        styles: '',
      } as IImageBlock);
    } else if (blockType === 'text') {
      push({
        value: 'Some text',
        type: 'text',
        styles: '',
      } as ITextBlock);
    }
  };

  return (
    <div>
      <div className="col">
        <FieldArray name={`${name}.items`}>
          {({remove, push}) => {
            return (
              <div>
                {value.items.map((_, index) => {
                  const currentValue = value.items[index];
                  return (
                    <div className="row mb-2 border px-4 py-2" key={index}>
                      {currentValue.type === 'text' && (
                        <TextBlock name={`${name}.items.${index}`} />
                      )}
                      {currentValue.type === 'image' && (
                        <ImageBlock
                          value={value.items[index] as IImageBlock}
                          name={`${name}.items.${index}`}
                        />
                      )}
                      {currentValue.type === 'section' && (
                        <SectionBlock
                          value={value.items[index] as ISectionBlock}
                          name={`${name}.items.${index}`}
                        />
                      )}
                      <div className="col">
                        <button
                          type="button"
                          className="bg-red-500 text-white px-2 py-1"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  );
                })}

                <div>
                  <div className="col">
                    <label htmlFor="new-block-type" className="text-sm">
                      Type
                    </label>

                    <select
                      className="border-1 border"
                      onChange={e => setBlockType(e.target.value)}
                    >
                      <option value="text">Text</option>
                      <option value="image">Image</option>
                      <option value="section">Section</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="px-2 py-1 bg-blue-700 text-blue-100"
                    onClick={() => handleAddBlock(push)}
                  >
                    + Add block
                  </button>
                </div>

                <div className="col">
                  <label htmlFor={name} className="text-sm">
                    Flow direction
                  </label>
                  <Field
                    name={`${name}.flow`}
                    as="select"
                    className="w-full border-1 border"
                    placeholder="Some text"
                    type="text"
                  >
                    <option value="horizontal">Horizontal</option>
                    <option value="vertical">Vertical</option>
                  </Field>
                  <ErrorMessage
                    name={`${name}.flow`}
                    component="div"
                    className="field-error"
                  />
                </div>
                <StyleBuilder name={name} />
              </div>
            );
          }}
        </FieldArray>
      </div>

      <div className="col">Type: Section</div>
    </div>
  );
};

export default SectionBlock;
