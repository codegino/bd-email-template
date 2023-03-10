import React from 'react';
import {Formik, Form} from 'formik';
import dynamic from 'next/dynamic';
import {v4 as uuid} from 'uuid';
import {firstEmail} from '../email-templates/first-email';
import SectionBlock, {ISectionBlock} from './SectionBlock';

const Preview = dynamic(() => import('./Preview'), {ssr: false});

export type IBuilderElements = {
  contents: ISectionBlock;
};

const initialValues: IBuilderElements = {
  contents: {
    flow: 'vertical',
    type: 'section',
    styles: '',
    id: uuid(),
    items: firstEmail,
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({values}) => (
        <div className="flex gap-4">
          <div>
            <h1>Email Builder</h1>
            <Form>
              <div className="max-h-[90vh] overflow-auto">
                <SectionBlock value={values.contents} name="contents" />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-700 text-blue-100"
                >
                  Generate
                </button>
              </div>
            </Form>
          </div>
          <Preview values={values} />
        </div>
      )}
    </Formik>
  );
};

export default EmailBuilderForm;
