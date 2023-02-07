import React from 'react';
import {Formik, Form} from 'formik';
import {IImageBlock} from './ImageBlock';
import SectionBlock, {ISectionBlock} from './SectionBlock';
import {ITextBlock} from './TextBlock';

type BlockElements = {
  contents: {items: Array<ITextBlock | IImageBlock | ISectionBlock>};
};

const initialValues: BlockElements = {
  contents: {
    items: [
      {
        src: 'https://drive.google.com/uc?export=view&id=1qDPt-6n2K0cwkCpScSjwq2eogVy3eFuN',
        type: 'image',
        styles: '',
      },
    ],
  },
};

const EmailBuilderForm = () => {
  const handleSubmit = async values => {
    const responseHtml = await fetch('/api/email-template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        header: {
          title: `Hello World`,
        },
        contents: values.contents.items,
      }),
    }).then(res => res.text());

    const myWindow = window.open('', 'response', 'resizable=yes');
    myWindow.document.write(responseHtml);
  };

  return (
    <div>
      <h1>Email Builder</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({values}) => (
          <Form>
            <SectionBlock value={values.contents} name="contents" />
            <div className="mt-4">
              <button
                type="submit"
                className="px-3 py-2 bg-blue-700 text-blue-100"
              >
                Generate
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EmailBuilderForm;
