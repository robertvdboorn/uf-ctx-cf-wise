import { Context, ContextPlugin, enableContextDevTools, enableDebugConsoleLogDrain, ManifestV2 } from '@uniformdev/context';
import { NextCookieTransitionDataStore } from '@uniformdev/context-next';
import type { NextPageContext } from 'next';
import manifest from './manifest.json';

export function createUniformContext(serverContext?: NextPageContext) {
  const plugins: ContextPlugin[] = [enableContextDevTools(), enableDebugConsoleLogDrain('debug')];

  return new Context({
    defaultConsent: true,
    manifest: manifest as ManifestV2,
    transitionStore: new NextCookieTransitionDataStore({
      serverContext,
    }),
    plugins,
  });
}
