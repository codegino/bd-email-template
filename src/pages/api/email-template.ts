import {promises as fs} from 'fs';
import Handlebars from 'handlebars';
import {NextApiResponse} from 'next';
import path from 'path';

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
    return `<table class="textblock"><tr><td style="${
      data?.styles ?? ''
    }"><p>${data.value}</p></td></tr></table>`;
  });
  Handlebars.registerHelper('imageblock', function (data) {
    return `<table class="imageblock" style="${
      data?.styles ?? ''
    }"><tr><td style=""><img width="100%" src="${data.src}" /></td></tr></table>`;
  });
  Handlebars.registerHelper('multiblock', function (data) {
    return (
      `<table class="multiblock" style="${data?.styles ?? ''}"><tr>` +
      data.items
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
        .join('\n') +
      `</tr></table>`
    );
  });

  Handlebars.registerHelper('vmultiblock', function (data) {
    return (
      `<table class="multiblock"  style="${data?.styles ?? ''}">` +
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

export default async function handler(req, res: NextApiResponse) {
  await registerPartials();
  const layoutSource = await fs.readFile(layoutPath, 'utf-8');

  const layoutTemplate = Handlebars.compile(layoutSource);

  const commonData = req.body;

  const contentSource = commonData.contents
    .map((meta, index) => {
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
