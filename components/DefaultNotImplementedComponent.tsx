import { Entry } from 'contentful';
import React from 'react';

/**
 * Default component displayed when a specific component implementation is not found.
 * Useful for model-first workflows where frontend development comes later.
 * Should be returned from the resolveRenderer() function when the component is unknown.
 **/
export function DefaultNotImplementedComponent({ sys, fields }: Entry<unknown>) {
  const componentType = sys.contentType.sys.id;

  if (!componentType) {
    return null;
  }

  const containerStyle: React.CSSProperties = {
    borderLeft: '10px solid #e42535',
    padding: '0.01em 16px 16px',
    borderRadius: '16px',
    backgroundColor: 'rgba(122, 215, 218, 0.3)',
    color: '#1d3557',
  };

  return (
    <div style={containerStyle}>
      <h2>Component: {componentType}</h2>
      <p>
        <strong>{componentType}</strong> has no React implementation. It may need to be added to your{' '}
        <code>resolveRenderer()</code> function.
      </p>
      <details>
        <summary>Props</summary>
        <pre>{JSON.stringify({ sys, fields }, null, 2)}</pre>
      </details>
    </div>
  );
}
