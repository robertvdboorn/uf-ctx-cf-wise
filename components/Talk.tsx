import React from 'react';
import { ITalk } from '../@types/generated/contentful';
import { RichText } from './RichText';

export type TalkProps = ITalk;

export const Talk = (props: any) => {
  const { personalizationResult } = props;
  const { variation } = personalizationResult || {};
  const { fields } = variation || {};
  const { title, description, audience } = fields || {};

  const forEveryone = audience && audience.length > 1;

  return (
    <div className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
      <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow space-y-2 pt-2">
        <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden">
          <div className="mt-3 mb-3 flex items-center justify-start">
            { forEveryone ? <AudienceLabel audienceName='Everyone' /> : <AudienceLabel audienceName={audience?.[0] ?? 'Everyone'} /> }
          </div>
        </div>
        <a href="#" className="flex flex-wrap no-underline hover:no-underline">
          <div className="w-full font-bold text-xl text-gray-800 px-6">{title}</div>
        </a>
        <div className="text-gray-800 px-6 pb-6 text-sm">
          <RichText content={description} />
        </div>
      </div>
    </div>
  );
};

export interface AudienceLabelProps {
  audienceName?: string;
}

const AudienceLabel: React.FC<AudienceLabelProps> = ({ audienceName }) => {
  let labelStyle = 'bg-red-100 text-red-800';
  if (audienceName === 'Developers') {
    labelStyle = 'bg-green-100 text-green-800';
  } else if (audienceName === 'Marketers') {
    labelStyle = 'bg-indigo-800 text-white';
  }
  return (
    <span className={`ml-6 px-6 inline-flex text-xs leading-5 font-semibold rounded-full ${labelStyle}`}>
      {audienceName}
    </span>
  );
};
