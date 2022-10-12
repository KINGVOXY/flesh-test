/** @jsx h */
import { Fragment, h } from "preact";
import { asset } from "$fresh/runtime.ts";


interface OgpProps {
    title: string;
    type?: string;
    url: string;
    image?: string;
    description: string;
}

export default function Meta(props: OgpProps) {
  const hostname = Deno.env.get("DOMAIN");
  const type = (props.type)? props.type: "website";
  let image = (props.image)? props.image: asset("/images/ogp.png");
  if(image?.startsWith("/")) {
    image = hostname + image;
  }

  return (
    <Fragment>
      <meta property="og:title" content={` ${ props.title } `} />
      <meta property="og:type" content={` ${ type } `} />
      <meta property="og:url" content={` ${ props.url } `} />
      <meta property="og:image" content={` ${ image } `} />
      <meta property="og:site_name" content="Daruo" />
      <meta property="og:description" content={` ${ props.description } `} />
      <meta property="hostname" content={` ${ hostname } `} />

      <meta property="twitter:site" content="@daruoUni" />
      <meta property="twitter:title" content={` ${ props.title } `} />
      <meta property="twitter:description" content={` ${ props.description } `} />
      <meta property="twitter:image:src" content={`${image}`} />

    </Fragment>
  );
}
