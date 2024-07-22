import React from 'react';
import type { Entry } from 'contentful';
import { resolveRenderer } from './index';
import { IPageFields } from '../@types/generated/contentful';

type PageComponentsListProps = {
  components: IPageFields['components'];
};

export const PageComponentsList: React.FC<PageComponentsListProps> = ({ components }) => {
  return (
    <div>
      {components?.map((entry) => {
        const Component = resolveRenderer(entry) as React.ComponentType<Entry<unknown>>;
        return <Component key={entry.sys.id} {...entry} />;
      })}
    </div>
  );
};
