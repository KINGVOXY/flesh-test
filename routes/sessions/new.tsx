/** @jsx h */
import { h } from "preact";
import {
  PageProps,
  Handlers
} from "$fresh/server.ts";
import { Head } from "$fresh/src/runtime/head.ts";
import BasicHead from '../../islands/BasicHead.tsx';
import BasicFooter from '../../islands/BasicFooter.tsx';


interface Data {
  /** バリデーションエラー情報 */
  error: {
    message: string;
  };
  /** 前回の入力値 */
  email?: string;
  pwd?: string;

}

/**
 * formをsubmitしたときにバリデーションを行い、セッション認証を行う
 */
export const handler: Handlers<Data> = {
  async POST(req, ctx) {
    // ログインフォームの取得
    const formData = await req.formData();
    const email = formData.get("email")?.toString();
    const pwd = formData.get("pwd")?.toString();

    // バリデーションチェック
    if (!email || !pwd) {
      return ctx.render({
        error: {
          message: "メールアドレス・パスワードを入力してください"
        },
        email: email,
        pwd: pwd,
      });
    }

    const sessionData = { email: email, pwd: pwd };

    let ok = true;
    
    // ok = await sessions.helper.check(sessionData);

    if (!ok) {
      return ctx.render({
        error: {
          message: "メールアドレス、パスワードに誤りがあります。"
        },
        email: email,
        pwd: pwd,
      }); 
    }

    return new Response("", {
      status: 303,
      headers: {
        Location: "/",
      },
    });
  }

}


export default function Login({data}: PageProps<Data | undefined>) {
  return (
    <div>
      <Head>
        <title>ログイン - Daruo</title>
        <BasicHead/>
        <link rel="stylesheet" href="/styles/basic.css" />
        <link rel="stylesheet" href="/styles/sessions/new.css" />
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
              <li class="nav-item">
                <a class="nav-link" href="/articles/">Index</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main class="container login-main">

        {data?.error?.message && (
          <div class="alert alert-danger fadeIn" role="alert">{data?.error?.message}</div>
        )}

        <form class="login-form" method="POST">
          <h3 class="login-cap"><i class="far fa-solid fa-user"></i> 管理者ログイン</h3>
          <div class="form-group">
            <label for="email"><i class="far fa-solid fa-envelope"></i> Email</label>
            <input type="email" name="email" id="email" class="form-control form-control-sm text-dark" placeholder="メールアドレスを入力" value={data?.email} />
          </div>

          <div class="form-group">
            <label for="pwd"><i class="far fa-solid fa-key"></i> Password</label>
            <input type="password" name="pwd" id="pwd" class="form-control form-control-sm text-dark" placeholder="パスワードを入力" value={data?.pwd} />
          </div>

          <button type="submmit" id="fbtn" class="btn btn-sm btn-primary d-block"><i class="far fa-solid fa-right-to-bracket"></i> ログイン</button>
        </form>
      </main>

      <footer>
        <BasicFooter/>
      </footer>

    </div>
  );
}