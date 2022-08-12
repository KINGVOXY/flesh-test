/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/src/runtime/head.ts";

export default function Neko(props: PageProps) {
  return (
    <div>
        <Head><title>neko</title></Head>
        <div>Hello neko</div>
    </div>
  );
}
