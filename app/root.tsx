import { captureRemixErrorBoundaryError } from "@sentry/remix";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "@remix-run/react";
import { withSentry } from "@sentry/remix";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

// Sentry provides a type for Remix v2 MetaFunction parameters
// so you can access `data.sentryTrace` and `data.sentryBaggage` alongside other data from loader.
import type { SentryMetaArgs } from "@sentry/remix";

export const meta = ({ data }: SentryMetaArgs<MetaFunction<typeof loader>>) => {
  return [
    {
      name: "sentry-trace",
      content: data.sentryTrace,
    },
    {
      name: "baggage",
      content: data.sentryBaggage,
    },
  ];
};

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default withSentry(App);