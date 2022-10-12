/** @jsx h */
import { h } from "preact";
import {
  PageProps,
  Handlers
} from "$fresh/server.ts";
import { Head } from "$fresh/src/runtime/head.ts";
import BasicHead from '../islands/BasicHead.tsx';
import BasicFooter from '../islands/BasicFooter.tsx';
import Meta from '../islands/Meta.tsx';
import { getLimitNew } from "../utils/articles/helper.ts";


interface Article {
  id: number;
  name: string;
  imageUrl: string;
  time: string;
}


export const handler: Handlers<Article[]> = {
  async GET(req, ctx) {
    const articles = await getLimitNew(3);
    return ctx.render( articles);
  },
};


export default function Home(props: PageProps< Article[] | null>) {
  if (!props.data) {
    return <div>Not Found</div>;
  }

  return (
    <div>
      <Head>
        <title>Daruo</title>
        <BasicHead/>
        <link rel="stylesheet" href="/styles/anime.css" />
        <link rel="stylesheet" href="/styles/basic.css" />
        <link rel="stylesheet" href="/styles/home/index.css" />
        <link rel="stylesheet" href="/styles/home/index.res.css" />
        <Meta
          title="Daruo"
          url={`${props.url.href}`}
          description="こんにちは、だるおです。"
        />
      </Head>
      
      <header>
        <nav id="header" class="navbar navbar-expand-lg navbar-dark bg-transparent">
                <a id="logoLink" class="navbar-brand" href="#top">
                    Daruo
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarDark" aria-controls="navbarDark"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarDark">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#top">Top <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#about">About <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#works">Works</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#blog">Blog</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>
                    <ul class="nav mb-3 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link py-0" href="https://twitter.com/DaruoUni" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter nav-icon text-light"></i></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link py-0" href="https://github.com/KINGVOXY" target="_blank" rel="noopener noreferrer"><i class="fab fa-github nav-icon text-light"></i></a>
                        </li>
                    </ul>
                </div>
            </nav>
      </header>

      <main>
        {/* Top トップ */}
        <section id="top">
          <div id="carouselTopCaptions" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselTopCaptions" data-slide-to="0" class="active"></li>
              <li data-target="#carouselTopCaptions" data-slide-to="1"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                  <img src="/images/top1.png" class="d-block w-100 h-100" alt="..." />
              </div>
                <div class="carousel-item">
                  <img src="/images/top2.png" class="d-block w-100 h-100" alt="..." />
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselTopCaptions" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselTopCaptions" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

          <a href="#about" id="greet" class="fadeIn op-0">
            <p>こんにちは、だるおです。<br />
            <span>Hi, I'm Daruo.</span></p>
          </a>
        </section>
        
        {/* About 自己紹介 */}
        <section id="about">
          <h2 class="cap">about</h2>
            <div id="introBox" class="intro-box container op-0">
              <div class="img-box">
                  <img src="/images/about.png" alt="" />
              </div>
              <div class="intro-text">
                  <p>こんにちは、だるおです。<br/>
                      近畿大学 理工学部情報学科 システムコース4年生です。<br/>
                      ゲーム開発やWebサービス、IoT開発に興味があります。<br/>
                      使用言語はJavaやRuby、Python、C#、TypeScript/JavaScriptなど。<br/>
                      趣味はRaspberryPiで遊んだり、絵を描いたりすることです。<br/>
                  </p>
                  <div class="link-icons">
                      <a href="https://twitter.com/DaruoUni" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
                      <a href="https://github.com/KINGVOXY" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i></a>
                  </div>
              </div>
            </div>
        </section>
        <div class="divider divider-dashed"></div>

        {/* Works 作品紹介 */}
        <section id="works">
          <h2 class="cap">Works</h2>
                
            <div id="worksList" class="works container op-0">
              <a href="https://github.com/PuddleServer/Puddle" class="work card"  target="_blank" rel="noopener noreferrer">
                <div class="boxbackground"></div>
                <img src="https://github.com/PuddleServer/Artwork/raw/main/logo/PuddleLogo.png" class="card-img" alt="image" />
                <div class="card-img-overlay text-white">
                  <h5 class="card-title">Web Framework</h5>
                  <p class="card-text">Denoを使用したWebフレームワークです。<br/>
                  友人と2人で製作しました。</p>
                </div>
              </a>

              <a href="https://github.com/KINGVOXY/webRemoteCon" class="work card" target="_blank" rel="noopener noreferrer">
                <div class="boxbackground"></div>
                <img src="https://raw.githubusercontent.com/KINGVOXY/webRemoteCon/main/doc/screen.png" class="card-img" alt="image" />
                <div class="card-img-overlay text-white">
                  <h5 class="card-title">Remote Controller</h5>
                  <p class="card-text">RaspberryPiを使用したリモコンアプリです。<br/>Puddleを使用しています。</p>
                </div>
              </a>

              <div class="work card">
                <div class="boxbackground"></div>
                <img src="/images/work3.png" class="card-img" alt="image" />
                <div class="card-img-overlay text-white">
                  <h5 class="card-title">Portfolio Site</h5>
                  <p class="card-text">このページです。<br/>Ruby on RailsからPuddleにリプレイスしました。</p>
                </div>
              </div>

            </div>
        </section>
        <div class="divider divider-dashed"></div>

        {/* Blog ブログ記事 */}
        <section id="blog" style="position:relative;">
          <h2 class="cap">Blog</h2>
            {/* <h3 style={`
            position: absolute;
            top: 50%;
            left:50%;
            opacity:.6;
            transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            `}>工事中 <i class="far fa-solid fa-person-digging"></i></h3> */}
          <div id="articleBox" class="articles container op-0">
            {/* 記事が最大3件表示される */}
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

          <div class="wr-show container">
            <a class="show-more" href="/articles/">show more</a>
          </div>
        </section>
        <div class="divider divider-dashed"></div>
        
        {/* Contact 問い合わせ */}
        <section id="contact">
          <h2 class="cap">Contact</h2>
          <div id="twicon" class="link-box">
              <a href="https://twitter.com/DaruoUni" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
          </div>
        </section>

      </main>
      <div class="divider divider-dashed"></div>

      <footer>
        <BasicFooter />
      </footer>

      <script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"></script>
      <script src="/scripts/avantui.js"></script>
      <script src="/scripts/home/index.js"></script>

    </div>
  );
}
