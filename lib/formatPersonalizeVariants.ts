import { PersonalizedVariant } from '@uniformdev/context';
import { Entry } from 'contentful';
import { PERSONALIZATION_CRITERIA_FIELD_ID } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatPersonalizeVariants<T extends Entry<any>>(variants: T[]): (T & PersonalizedVariant)[] {
  return variants.map((variant) => {
    const personalizedVariant: T & PersonalizedVariant = { ...variant, id: variant.sys.id };
    if (variant.fields[PERSONALIZATION_CRITERIA_FIELD_ID]) {
      personalizedVariant.pz = variant.fields[PERSONALIZATION_CRITERIA_FIELD_ID] as PersonalizedVariant['pz'];
    }

    return personalizedVariant;
  });
}
