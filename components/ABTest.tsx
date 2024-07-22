import {
  IAbTest,
  IAbTestVariantFields,
} from "../@types/generated/contentful";
import {
  Test as UniformTest,
  useScores,
  useUniformContext,
} from "@uniformdev/context-react";
import {
  PersonalizedVariant,
  VariantMatchCriteria,
} from "@uniformdev/context";
import { useMemo } from "react";
import mappings from ".";

type ContentfulTestVariant = {
  id: string;
  testDistribution: number;
  type: string;
  fields: Record<string, any>;
};

export function ABTest({
  fields: { name, unfrmAbTest, variants, unfrmOptPersonalizationCriteria },
}: IAbTest) {
  const { context } = useUniformContext();
  const scores = useScores();

  const testVariants: ContentfulTestVariant[] = useMemo(() => {
    return variants?.map((data) => {
      const fields = data.fields as IAbTestVariantFields;

      return {
        id: fields.component!.sys.id!,
        testDistribution: fields.distribution ?? 50,
        type: fields.component!.sys.contentType.sys.id,
        fields: fields.component!.fields,
      };
    }) || [];
  }, [variants]);

  const isVisible = useMemo(() => {
    if (!unfrmOptPersonalizationCriteria) return true;

    const personalizedVariants: PersonalizedVariant[] = [
      {
        id: unfrmAbTest.id,
        pz: unfrmOptPersonalizationCriteria as VariantMatchCriteria,
      },
    ];

    const result = context.personalize({
      name,
      variations: personalizedVariants,
    });

    return result.variations.length > 0;
  }, [context, scores, unfrmAbTest.id, name, unfrmOptPersonalizationCriteria]);

  if (!isVisible) {
    return null;
  }

  return (
    <UniformTest<ContentfulTestVariant>
      name={unfrmAbTest.id}
      component={(variant) => {
        const VariantComponent = mappings[variant.type];
        if (!VariantComponent) {
          return null;
        }

        return <VariantComponent {...variant} />;
      }}
      variations={testVariants}
    />
  );
}
