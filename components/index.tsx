import { ComponentType } from 'react';
import { Entry } from 'contentful';
import { DefaultNotImplementedComponent } from './DefaultNotImplementedComponent';
import { Hero } from './Hero';
import { TalkList } from './TalkList';
import { WhyAttend } from './WhyAttend';
import { Talk } from './Talk';
import { RegisterForm } from './RegisterForm';
import Navbar from './Navbar';
import Footer from './Footer';
import { PersonalizedHeroList } from './PersonalizedHeroList';
import type {
  IAbTest,
  IAbTestVariant,
  IHero,
  I3ZPkEj1KqeSn4QdsdnNko3,
  IPage,
  IRegistrationForm,
  ITalk,
  ITalksList,
  IWhyAttend,
} from '../@types/generated/contentful';
import { ABTest } from './ABTest';

// Union type for all possible contentful entry types
export type EntryUnionType =
  | IAbTest
  | IAbTestVariant
  | IHero
  | IPage
  | I3ZPkEj1KqeSn4QdsdnNko3
  | IRegistrationForm
  | ITalk
  | ITalksList
  | IWhyAttend;

// Component mapping type
type ComponentMapping = Record<string, ComponentType<any>>;

// Mapping contentful content types to React components
const mappings: ComponentMapping = {
  ABTest: ABTest,
  hero: Hero,
  talksList: TalkList,
  personalizedTalkList: TalkList,
  talk: Talk,
  whyAttend: WhyAttend,
  registrationForm: RegisterForm,
  header: Navbar,
  footer: Footer,
  '3zPkEj1KqeSn4QdsdnNKO3': PersonalizedHeroList,
};

/**
 * Resolve the renderer for a given contentful entry.
 * Returns a corresponding React component or the default not implemented component.
 * @param contentfulEntry - The contentful entry to resolve
 * @returns The React component to render
 */
export function resolveRenderer(contentfulEntry: Entry<any>): ComponentType<Entry<any>> {
  const componentImpl = mappings[contentfulEntry.sys.contentType.sys.id];
  return componentImpl ?? DefaultNotImplementedComponent;
}

export default mappings;
