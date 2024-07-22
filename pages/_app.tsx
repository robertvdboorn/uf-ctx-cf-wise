import { UniformContext } from "@uniformdev/context-react";
import type { UniformAppProps } from "@uniformdev/context-next";
import { createUniformContext } from "../lib/uniformContext";
import "../styles/globals.css";

const clientContext = createUniformContext();

function UniformContextApp({
  Component,
  pageProps,
  serverUniformContext,
}: UniformAppProps) {

  const outputType = process.env.VERCEL_URL ? "edge" : "standard";
  return (
    <UniformContext
      context={serverUniformContext ?? clientContext}
      outputType={outputType}
    >
      <Component {...pageProps} />
    </UniformContext>
  );
}

export default UniformContextApp;
