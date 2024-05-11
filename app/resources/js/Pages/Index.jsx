import { usePage } from "@inertiajs/react"

import { defaultTheme, DefaultThemeProvider } from "@/Components/DefaultThemeProvider"
import {css} from '@emotion/react'


import {Stack} from "@mui/material"
import { Button } from "@mui/material"
import {Link} from '@inertiajs/react'


/** @jsxImportSource @emotion/react */
export default function Index({auth}) {
    const appName = usePage().props.config.name
    const palette = defaultTheme().palette



    const h2Css = css`
        padding-top: 16px;
        font-weight:bold;
        font-size: 1.1rem;
        :before { content: '- ' }
        :after { content: ' -' }
    `


    return (<DefaultThemeProvider><div css={css`
        box-sizing: border-box;
        min-height: 100vh;
        background: ${palette.bgBack};
        margin: 0;
        padding: 16px 8px;
    `}>

        <div css={css`
            max-width: 500px;
            margin: 0 auto;
            padding: 32px 12px 48px 12px;
            background: ${palette.bgMain};
            text-align:center;
            border-radius: 8px;
        `}>

            <h1 css={css`
                font-weight: bold;
                font-size: 1.4rem;
            `}>{appName}</h1>

            <h2 css={h2Css}>「英会話めもっく」とは</h2>
            <p>
                英会話をメモして<br />
                「英語を聞く」<br />
                「英語を言う」<br />
                「日本語を見る」<br />
                が簡単にできます。</p>

            <h2 css={h2Css}>覚えたい英会話をメモ</h2>
            <p>
                隙間時間で練習可能。<br />
                よって反復練習しやすい。<br />
                ぜひ、定着するまで使いましょう。<br />
            </p>

            <h2 css={h2Css}>主な使い方</h2>
            <p>
                シーンに合わせた「本」を追加する。<br />
                その本内に「セリフ」をメモする。<br />
                このセリフを練習する。
            </p>

            <hr />

            <h2 css={h2Css}>例：朝の会話を覚えたい場合</h2>

            <h2 css={h2Css}>本を追加する。</h2>
            <p>「朝の会話」という本を追加する。</p>

            <h2 css={h2Css}>2.この本の中に、セリフを追加する。</h2>
            <p>
                ・セリフ１　"Good morning."：「おはよう。」<br />
                ・セリフ２　"it's time to get up."：「起きる時間だよ。」<br />
                ・セリフ３　"Yes. I brush my teeth."：「はい。私は歯を磨くね。」<br />
            </p>

            <h2 css={h2Css}>3.英語を言えるように練習する</h2>
            <p>
                "Good morning."の音を聞く。<br />
                なるべく同じ音で言えるまで練習する。<br />
                音がなくても言えればOK.<br />
            </p>

            <h2 css={h2Css}>4.言いたい意味の感情を伴って言う練習をする</h2>
            <p>
                「おはよう」を言う時と、同じ感情で"Good morning."を言ってみる。<br />
                難しい場合は、1回でも「おはよう」の感情で言えればOK。<br />
                数日後など、慣れてきたら2回、3回に増やしていく。<br />
                簡単に「おはよう」の感情で"Good morning"が言えるようになれば習得OK。<br />
            </p>

            <h2 css={h2Css}>5.残りのセリフも練習する</h2>
            <p>
                3〜4の練習を、セリフ２〜３も並行してする。
            </p>

            <h2 css={h2Css}>6.一人英会話で練習する</h2>
            <p>
                1人でセリフ１〜３を順番に言えるように練習する。<br />
                これを全て感情で言えるように練習する。<br />
                簡単にできるようになれば習得OK。<br /><br />

                これで「朝の会話」シーンの習得OKです。<br /><br />

                英語<span css={css`text-decoration:underline;`}>習得者の多くが一人英会話で上達した</span>そうです。
            </p>

            <hr css={css` margin-top: 32px; `} />

            <h2 css={h2Css}>さあ、「英会話めもっく」使ってみよう！</h2>

                <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                spacing={2}
                css={css` margin-top: 32px; `}
                >
                    {/* 未ログイン状態でのアクションボタン */}
                    { (auth.user === null)? <>
                        <div>
                            <p>アカウントをお持ちの方はこちら。</p>
                            <Button variant="contained" color="info"
                                component={Link}
                                href={route('login')}
                            >ログインページ</Button>
                        </div>

                        <div>
                            <p>まだアカウントがない方はこちら。</p>
                            <Button variant="contained" color="info"
                                component={Link}
                                href={route('register')}
                            >新規ユーザー登録ページ</Button>
                        </div>
                    </>
                    // ログイン状態でのアクションボタン。
                    : <>
                        <div>
                            <Button variant="contained" color="info"
                                component={Link}
                                href={route('main.top')}
                            >
                                英会話めもっく<br />
                                メインページへ
                            </Button>
                        </div>

                    </> }

                </Stack>

        </div>

    </div></DefaultThemeProvider>)
}
