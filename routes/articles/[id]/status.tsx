/** @jsx h */
import {
  h,
  Fragment
} from "preact";
import {
  PageProps,
  Handlers
} from "$fresh/server.ts";
import { Head } from "$fresh/src/runtime/head.ts";

import { marked } from "marked";
import * as ammonia from "ammonia/mod.ts";

import { findOne }        from "../../../utils/articles/helper.ts";
import { unixtimeToJST }  from "../../../utils/funcs/time.ts";

import BasicHead    from "../../../islands/BasicHead.tsx";
import BasicFooter  from "../../../islands/BasicFooter.tsx";
import Meta from '../../../islands/Meta.tsx';


interface Data {
  name: string;
  imageUrl: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}


export const handler: Handlers<Data> = {
  async GET(_, ctx) {
    const id = ctx.params.id;
    let data;
    try {
      data = await findOne(parseInt(id.toString()));
    } catch (error) {
      return new Response("", {
        status: 303,
        headers: {
          Location: "/articles/",
        },
      });
    }

    if (!data) {
      return new Response("", {
        status: 303,
        headers: {
          Location: "/articles/",
        },
      });
    }

    await ammonia.init();
    const parsed = marked(data.content);
    const content = ammonia.clean(parsed);
    
    return ctx.render({
      name: data.name,
      imageUrl: data.imageUrl? data.imageUrl : "/images/about.png",
      content: content,
      createdAt: unixtimeToJST(data.createdAt),
      updatedAt: unixtimeToJST(data.updatedAt)
    });
  },
};


export default function Neko(props: PageProps<Data>) {
  return (
    <Fragment>
      <Head>
        <BasicHead/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/github-dark-dimmed.min.css" />
        <link rel="stylesheet" href="/styles/basic.css" />
        <link rel="stylesheet" href="/styles/articles/status.css" />
        <title>{props.data.name} - Daruo</title>
        <Meta
          title={`${props.data.name} - Daruo`}
          type="article"
          url={`${props.url.href}`}
          image={`${props.data.imageUrl}`}
          description={(props.data.content.length>80)?
            props.data.content.substring(0, 80)+"...": props.data.content
          }
        />
      </Head>

      <header>
        <nav id="header" class="navbar navbar-expand-lg navbar-light bg-white">
          <a id="logoLink" class="navbar-brand" href="/">
            Daruo
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarDark"
            aria-controls="navbarDark" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarDark">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link" href="/">Portfolio</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/articles/">Index</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <div class="status container pb-5">
          <h2 class="name">{props.data.name}</h2>
          <div class="createdAt">{props.data.createdAt} 作成</div>
          {(props.data.createdAt==props.data.updatedAt)?undefined:<div class="updatedAt">{props.data.updatedAt} 更新</div>}

          <hr/>
  
  
          <div class="himg">
              <img src={`${props.data.imageUrl}`} />
          </div>
  
          {/* <div id="content" class="content container"></div> */}
          <div id="content" class="content container" dangerouslySetInnerHTML={{__html: props.data.content}}></div>
        </div>
      </main>
      <div class="divider divider-dashed"></div>

      <footer>
        <BasicFooter/>
      </footer>

      <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"></script>
      <script src="/scripts/avantui.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
      <script>
        hljs.initHighlightingOnLoad();
      </script>
      <script src="https://twemoji.maxcdn.com/v/latest/twemoji.min.js" crossorigin="anonymous"></script>
      <script>
          twemoji.parse(document.body);
      </script>
    </Fragment>
  );
}
