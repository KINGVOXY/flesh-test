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
import BasicHead from '../../islands/BasicHead.tsx';
import BasicFooter from '../../islands/BasicFooter.tsx';
import Meta from '../../islands/Meta.tsx';
import { getAllNew } from "../../utils/articles/helper.ts";


interface Article {
  id: number;
  name: string;
  imageUrl: string;
  time: string;
}


export const handler: Handlers<Article[]> = {
  async GET(_, ctx) {
    const articles = await getAllNew();
    return ctx.render(articles);
  },
};


export default function BlogIndex(props: PageProps<Article[] | null>) {
  if (!props.data) {
    return <div>Not Found</div>;
  }

  return (
    <Fragment>
      <Head>
        <title>記事一覧 - Daruo</title>
        <BasicHead/>
        <link rel="stylesheet" href="/styles/anime.css" />
        <link rel="stylesheet" href="/styles/basic.css" />
        <link rel="stylesheet" href="/styles/articles/index.css"></link>
        <Meta
          title="記事一覧 - Daruo"
          url={`${props.url.href}`}
          description="だるおのブログ記事一覧です。"
        />
      </Head>
      
      <header>
        <nav id="header" class="navbar navbar-expand-lg navbar-light bg-transparent">
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
              <li class="nav-item active">
                <a class="nav-link" href="/articles/">Index</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <h2 class="cap">Articles</h2>
        <div class="articles container fadeRight">
            {props.data.map((article) => (
              <a href={`/articles/${article.id}/status`} class="article card">
                <div class="d-flex">
                  <div class="col-md-4">
                    <img src={`${article.imageUrl}`} class="card-img rounded-0" alt="image" />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{article.name}</h5>
                        <p class="card-text"><small class="text-muted">{article.time}</small></p>
                    </div>
                  </div>
                </div>
              </a>  
            ))}
        </div>

        
      </main>
      <div class="divider divider-dashed"></div>

      <footer>
        <BasicFooter/>
      </footer>

      <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"></script>
      <script src="/scripts/avantui.js"></script>
    </Fragment>
    );

}
