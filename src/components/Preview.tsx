/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {IBuilderElements} from './EmailBuilderForm';
import {IImageBlock} from './ImageBlock';
import {ISectionBlock} from './SectionBlock';
import {ITextBlock} from './TextBlock';

const TextBlockPreview = ({value}: {value: ITextBlock}) => {
  return (
    <table className="textblock">
      <tbody>
        <tr>
          <td>
            <p>{value.value}</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const ImageBlockPreview = ({value}: {value: IImageBlock}) => {
  return (
    <table className="textblock">
      <tbody>
        <tr>
          <td>
            <img src={value.src} alt={value.alt} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const SectionBlockPreview = ({value}: {value: ISectionBlock}) => {
  if (value.flow === 'vertical') {
    return (
      <table className="multiblock">
        <tbody>
          {value.items.map(item => {
            return (
              <tr key={item.id}>
                <td>
                  {item.type === 'image' && <ImageBlockPreview value={item} />}
                  {item.type === 'text' && <TextBlockPreview value={item} />}
                  {item.type === 'section' && (
                    <SectionBlockPreview value={item} />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  } else {
    return (
      <table className="multiblock">
        <tbody>
          <tr>
            {value.items.map(item => {
              return (
                <td key={item.id}>
                  {item.type === 'image' && <ImageBlockPreview value={item} />}
                  {item.type === 'text' && <TextBlockPreview value={item} />}
                  {item.type === 'section' && (
                    <SectionBlockPreview value={item} />
                  )}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    );
  }
};

const Preview = ({values}: {values: IBuilderElements}) => {
  return (
    <div className="w-full h-full">
      <table
        width="100%"
        border={0}
        cellPadding="0"
        cellSpacing="0"
        bgcolor="#f0f0f0"
      >
        <tr>
          <td>
            <table
              align="center"
              width="600"
              border={0}
              cellPadding="0"
              cellSpacing="0"
            >
              <tbody>
                {values.contents.items.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        {item.type === 'image' && (
                          <ImageBlockPreview value={item} />
                        )}
                        {item.type === 'text' && (
                          <TextBlockPreview value={item} />
                        )}
                        {item.type === 'section' && (
                          <SectionBlockPreview value={item} />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Preview;
