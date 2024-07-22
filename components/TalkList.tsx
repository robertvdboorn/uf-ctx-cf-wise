import React from 'react';
import { Personalize } from '@uniformdev/context-react';
import { ITalk, ITalksList } from '../@types/generated/contentful';
import TalksContext from '../lib/talksContext';
import { Talk } from './Talk';
import { PersonalizedVariant } from '@uniformdev/context/*';
import { PERSONALIZATION_CRITERIA_FIELD_ID } from '../lib/constants';
import { useScores } from '@uniformdev/context-react';

export type TalkListProps = ITalksList;

export function TalkList({ fields: { title, count } }: TalkListProps) {
  const talks = React.useContext(TalksContext);
  const scores = useScores();
  const techiesScore = scores.techies || 0;
  const nonTechiesScore = scores.nonTechies || 0;
  const hasScores = techiesScore > 0 || nonTechiesScore > 0;

  let headerTitle = title;

  if (techiesScore > 0 && techiesScore === nonTechiesScore) {
    headerTitle += ' for you';
  } else if (techiesScore > 0 && techiesScore > nonTechiesScore) {
    headerTitle += ' for developers';
  } else if (nonTechiesScore > 0 && nonTechiesScore > techiesScore) {
    headerTitle += ' for marketers';
  }

  return (
    <fieldset>
      <section className="bg-white border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            {headerTitle}
          </h1>
          <Personalize
            name={title}
            count={count}
            variations={formatPersonalizeVariants(talks!, hasScores)}
            component={Talk}
          />
        </div>
      </section>
    </fieldset>
  );
}

export function formatPersonalizeVariants<T extends ITalk | undefined>(
  variants: T[],
  hasScores: boolean
): (T & PersonalizedVariant)[] {
  const mappedVariants = variants.map((variant) => {
    const personalizedVariant: T & PersonalizedVariant = { ...variant, id: variant?.sys.id } as T &
      PersonalizedVariant;
    if (variant?.fields[PERSONALIZATION_CRITERIA_FIELD_ID]) {
      personalizedVariant.pz = variant.fields[PERSONALIZATION_CRITERIA_FIELD_ID] as PersonalizedVariant['pz'];
    }
    return personalizedVariant;
  });

  if (hasScores) {
    return mappedVariants.filter((v) => v.pz);
  }

  return mappedVariants;
}
