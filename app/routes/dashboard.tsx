import type {LoaderFunction, MetaFunction} from "@remix-run/node";
import {useLoaderData} from "react-router";
import * as Sentry from "@sentry/remix";
import { Link } from "@remix-run/react";



// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

export const loader : LoaderFunction = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  await new Promise(resolve => setTimeout(resolve, 5000))
  const data = await res.json()
  
  return {
    list: data,
  };
}

export default function Dashboard() {
  
  const data = useLoaderData()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Dashboard</h1>
      <Link to="/">Index</Link>;
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
      {JSON.stringify(data)}
    </div>
  );
}
