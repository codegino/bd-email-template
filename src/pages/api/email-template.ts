import {promises as fs} from 'fs';
import Handlebars from 'handlebars';
import {NextApiResponse, NextApiRequest} from 'next';
import path from 'path';
import {ISectionBlock} from '../../components/SectionBlock';
import {ITextBlock} from '../../components/TextBlock';
import {IImageBlock} from './../../components/ImageBlock';

const layoutPath = path.resolve(
  process.cwd(),
  'src/static/templates/layout.html',
);
const headerPath = path.resolve(
  process.cwd(),
  'src/static/templates/header.html',
);
const footerPath = path.resolve(
  process.cwd(),
  'src/static/templates/footer.html',
);

async function registerPartials() {
  const headerSource = await fs.readFile(headerPath, 'utf-8');
  const footerSource = await fs.readFile(footerPath, 'utf-8');

  Handlebars.registerPartial('header', headerSource);
  Handlebars.registerPartial('footer', footerSource);

  Handlebars.registerHelper('textblock', function (data) {
    return `<table class="textblock" cellPadding="0"
    cellSpacing="0" border="0"><tr><td><${
      data.tag
    }  style="${data?.styles ?? ''}">${data.value}<${data.tag} /></td></tr></table>`;
  });
  Handlebars.registerHelper('imageblock', function (data) {
    return `<table class="imageblock" cellPadding="0"
    cellSpacing="0" border="0"><tr><td><img width="${
      data.width
    }" height="${data.height}" style="${data?.styles ?? ''}" src="${data.src}" /></td></tr></table>`;
  });
  Handlebars.registerHelper('multiblock', function (data) {
    return `<table cellPadding="0" cellSpacing="0" border="0"
      class="multiblock" style="${data?.styles ?? ''}"><tr>
      ${data.items
        .map(meta => {
          if (meta.type === 'text') {
            return `<td>${Handlebars.helpers.textblock(meta)}</td>`;
          } else if (meta.type === 'image') {
            return `<td>${Handlebars.helpers.imageblock(meta)}</td>`;
          } else if (meta.type === 'section') {
            if (meta.flow === 'vertical') {
              return `<td>${Handlebars.helpers.vmultiblock(meta)}</td>`;
            }
            return `<td>${Handlebars.helpers.multiblock(meta)}</td>`;
          }
        })
        .join('\n')}
      </tr></table>`;
  });

  Handlebars.registerHelper('vmultiblock', function (data) {
    return (
      `<table cellPadding="0"
      cellSpacing="0" border="0" class="multiblock" style="${
        data?.styles ?? ''
      }">` +
      data.items
        .map(meta => {
          if (meta.type === 'text') {
            return `<tr><td>${Handlebars.helpers.textblock(meta)}</td></tr>`;
          } else if (meta.type === 'image') {
            return `<tr><td>${Handlebars.helpers.imageblock(meta)}</td></tr>`;
          } else if (meta.type === 'section') {
            if (meta.flow === 'vertical') {
              return `<tr><td>${Handlebars.helpers.vmultiblock(
                meta,
              )}</td></tr>`;
            }
            return `<tr><td>${Handlebars.helpers.multiblock(meta)}</td></tr>`;
          }
        })
        .join('\n') +
      `</table>`
    );
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await registerPartials();
  const layoutSource = await fs.readFile(layoutPath, 'utf-8');

  const layoutTemplate = Handlebars.compile(layoutSource);

  const commonData = req.body as {
    contents: (ISectionBlock | ITextBlock | IImageBlock)[];
  };

  const contentSource = commonData.contents
    .map((meta, index: number) => {
      if (meta.type === 'text') {
        return `<tr><td>{{#textblock contents.[${index}] }} {{/textblock}}</td></tr>`;
      } else if (meta.type === 'image') {
        return `<tr><td>{{#imageblock contents.[${index}] }} {{/imageblock}}</td></tr>`;
      } else if (meta.type === 'section') {
        if (meta.flow === 'vertical') {
          return `<tr><td>{{#vmultiblock contents.[${index}] }} {{/vmultiblock}}</td></tr>`;
        }
        return `<tr><td>{{#multiblock contents.[${index}] }} {{/multiblock}}</td></tr>`;
      }
    })
    .join('\n');

  Handlebars.registerPartial('content', contentSource);

  var result = layoutTemplate(commonData);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.write(result, 'utf-8');
  res.end();
}
