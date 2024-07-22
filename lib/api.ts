import { createClient } from 'contentful';
import { IPage, ITalk } from '../@types/generated/contentful';

if (!process.env.CONTENTFUL_SPACE_ID) {
  throw new Error('CONTENTFUL_SPACE_ID env not set.');
}

if (!process.env.CONTENTFUL_CDA_ACCESS_TOKEN) {
  throw new Error('CONTENTFUL_CDA_ACCESS_TOKEN env not set.');
}

if (!process.env.CONTENTFUL_CPA_PREVIEW_TOKEN) {
  throw new Error('CONTENTFUL_CPA_PREVIEW_TOKEN env not set.');
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CDA_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT ? process.env.CONTENTFUL_ENVIRONMENT : 'master',
});

const previewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_CPA_PREVIEW_TOKEN,
  host: 'preview.contentful.com',
  environment: process.env.CONTENTFUL_ENVIRONMENT ? process.env.CONTENTFUL_ENVIRONMENT : 'master',
});

const getClient = (preview: boolean) => (preview ? previewClient : client);

export const getPageBySlug = async (preview: boolean, slug: string): Promise<IPage | undefined> => {
  const entries = await getClient(preview).getEntries({
    content_type: 'page',
    'fields.slug': slug,
    include: 5,
  });

  const [first] = entries.items;
  return first as IPage | undefined;
};

export const getAllPages = async (preview = false): Promise<IPage[]> => {
  const entries = await getClient(preview).getEntries({
    content_type: 'page',
    include: 5,
  });

  return entries.items as IPage[];
};

export const getAllTalks = async (preview: boolean): Promise<ITalk[] | undefined> => {
  const entries = await getClient(preview).getEntries({
    content_type: 'talk',
    select: 'fields',
  });

  return entries.items as ITalk[] | undefined;
};
