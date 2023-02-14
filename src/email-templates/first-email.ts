import {v4 as uuid} from 'uuid';
import {IImageBlock} from '../components/ImageBlock';
import {ISectionBlock} from '../components/SectionBlock';
import {ITextBlock} from '../components/TextBlock';

const createImageBlock = (): IImageBlock => ({
  type: 'image',
  id: uuid(),
  styles: 'float: left;',
  src: 'https://picsum.photos/200/300',
  alt: 'image',
  height: 300,
  width: 400,
});

const createTextBlock = ({tag}: Partial<ITextBlock>): ITextBlock => ({
  type: 'text',
  id: uuid(),
  styles: '',
  value: 'Hello World',
  tag,
});

const createImageAndTextBlock = (): ISectionBlock => {
  return {
    type: 'section',
    id: uuid(),
    styles: 'margin-bottom: 20px;',
    flow: 'horizontal',
    items: [
      createImageBlock(),
      {
        type: 'section',
        id: uuid(),
        flow: 'vertical',
        items: [createTextBlock({tag: 'h2'}), createTextBlock({tag: 'p'})],
        styles: '',
      },
    ],
  };
};

const createTextAndImageBlock = (): ISectionBlock => {
  return {
    type: 'section',
    id: uuid(),
    styles: 'margin-bottom: 20px;',
    flow: 'horizontal',
    items: [
      {
        type: 'section',
        id: uuid(),
        flow: 'vertical',
        items: [createTextBlock({tag: 'h2'}), createTextBlock({tag: 'p'})],
        styles: '',
      },
      createImageBlock(),
    ],
  };
};

export const firstEmail: (ITextBlock | IImageBlock | ISectionBlock)[] = [
  createImageAndTextBlock(),
  createTextAndImageBlock(),
  createImageAndTextBlock(),
  createTextAndImageBlock(),
];
