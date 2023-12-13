import type {LoaderFunction, MetaFunction} from "@remix-run/node";
import {useLoaderData} from "react-router";
import { Link } from "@remix-run/react";

export const loader : LoaderFunction = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos')
  await new Promise(resolve => setTimeout(resolve, 5000))
  const data = await res.json()
  
  return {
    list: data,
  };
}

export default function Index() {
  
  const data = useLoaderData()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
          <Link to="/dashboard">Dashboard</Link>;
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
