import { Personalize } from "@uniformdev/context-react";
import { Hero } from "./Hero";
import { formatPersonalizeVariants } from "../lib/formatPersonalizeVariants";
import { LIST_FIELD_ID } from "../lib/constants";
import { I3ZPkEj1KqeSn4QdsdnNko3Fields } from "../@types/generated/contentful";

type PersonalizedHeroListProps = {
  fields: I3ZPkEj1KqeSn4QdsdnNko3Fields;
};

export function PersonalizedHeroList({ fields }: PersonalizedHeroListProps) {
  const listField = fields?.[LIST_FIELD_ID];

  if (!listField || listField.length === 0) {
    return null;
  }

  return (
    <Personalize
      name={fields.name ?? "Default name for Personalized list of Heros"}
      variations={formatPersonalizeVariants(listField)}
      component={Hero}
    />
  );
}
