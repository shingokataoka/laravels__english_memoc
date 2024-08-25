import {memo, useEffect, useState, useRef, createContext} from 'react'
import { usePage } from '@inertiajs/react'

import {css} from '@emotion/react'


import TalkToAppHeader from '@/Components/TalkToAppComponents/TalkToAppHeader'
import TalksLinesArea from '@/Components/TalkToAppComponents/TalksLinesArea'
import TalkToInputFooter from '@/Components/TalkToAppComponents/TalkToInputFooter'
import StartTalkModal from '@/Components/TalkToAppComponents/StartTalkModal'

import UpBalloon2 from '@/Components/UpBalloon2'
import WebSpeachApiVoices from '@/Components/WebSpeachApiVoices'
import CommonProvider from '@/Components/CommonProvider'

import { DefaultThemeProvider } from '@/Components/DefaultThemeProvider'



// TalkToHeader.jsx以下に渡すuseContext。
export const TalkToHeaderContext = createContext()

// セリフ文の表示切り替えボタンShow3Button.jsxに渡すuseContext。
export const Show3ButtonContext = createContext()

// useContext。<TalksLinesArea />以下に値を渡す手段。
export const TalksLinesAreaContext = createContext()

// useContext。<TalkToInputFooter />以下に値を渡す手段。
export const TalkToInputFooterContext = createContext()



/** @jsxImportSource @emotion/react */
export default memo(TalkToApp)
function TalkToApp({
    appVoiceIndex,
    userVoiceIndex,
}) {

    // 変数を管理。
    const dataRef = useRef({
        // 会話を入れる配列。
        // {
        //     who: 'ai' or 'user' or 'none',
        //     index: 0 or 1 or 2 Lineコンポーネントの英文など表示のアニメをさせない管理で使う,
        //     englishLine: `英語セリフ`,
        //     japaneseLine: '日本語セリフ'
        // },
        lines: [
            {
                index: 0,
                who: 'none',
                englishLine: null,
                japaneseLine: null,
            },
            {
                index: 1,
                who: 'ai',
                englishLine: '英語でお話しをしよう！\r\n\r\n ボクはAIだから、たまに的外れなこと言うかもだけど許してね。\r\n\r\nそれと、個人情報などは絶対に書かないでね。\r\n（AIが情報として吸ってしまう可能性があるためです。）',
                japaneseLine: ``
            },
            {
                index: 2,
                who: 'none',
                englishLine: `null`,
                japaneseLine: `null`
            },
        ],
    })
    // 上記のエイリアス。
    const data = dataRef.current

    // dataRef.current.linesのエイリアス。
    const lines = data.lines

    // lines変更時のアニメーションの状態を管理。
    // 通常時='none'、アニメ中='playing'、アニメ後='played'
    const [linesAnimateStatus, setLinesAnimateStatus] = useState('none')



    // デフォのセリフ文の表示設定を管理。
    // 見た目は「設定：文の表示なし」、「設定：英文のみ表示」、「設定：英文と和文を表示」。
    // 'none'=全て非表示、'en'=英語のみ表示、'en+ja'=英語と日本語を表示。
    const [showLineStatus, setShowLineStatus] = useState('en')

    // api処理の状態を管理。
    // 'processing':ユーザーの英語をgeminiに送信中、
    // 'none':処理していない通常状態。
    const [fetchApiStatus, setFetchApiStatus] = useState('none')

    // 声の一覧。
    const [voices, setVoices] = useState([])


    const [upBalloonProps, setUpBalloonProps] = useState( {
        showStatus: 'none',   // 表示管理。'none'、'processing'=表示準備中(座標計算など)、'show'
        x: 110,   // 絶対座標。表示位置。矢印の先端がこの位置になる。
        y: 39,   // 絶対座標。表示位置。矢印の先端がこの位置になる。
        jsx: <></>,  // バルーン内に表示するSJXを指定。
    } )

    // 初回レンダリング判定のuseState。
    const [isFirstRender, setIsFirstRender] = useState(false)

    // フェードイン管理用のuseState。
    const [isShow, setIsShow] = useState(false)

    // ユーザーの声。
    const userVoice = voices[userVoiceIndex]
    // アプリの声。
    const apiVoice = voices[appVoiceIndex]

    // 「英語のセリフを入力」入力欄の値。ユーザーがセリフを入力するところ。
    const [inputValue, setInputValue] = useState('My name is Bob.')

    // 最初のモーダル画面で「Let's Talk♪」を押したならtrue、「Yes.」を押したならfalseを保存。
    const [isOnBgm, setIsOnBgm] = useState(false)

    // lines[1]の辞書にない英単語をAPIでAIに確認するか管理。(「...辞書にない英単語を確認中」)
    const [checkTranslations, setCheckTranslations] = useState(false)



    // useContextの値。TalkToHeader.jsx以下に渡す値。
    const TalkToHeaderProps = {isOnBgm}

    // useContextの値。セリフ文の表示切り替えボタンShow3Button.jsxに渡す値。
    const show3ButtonProps = {showLineStatus, setShowLineStatus, checkTranslations, setCheckTranslations}

    // useContextの値。Line.jsxに渡す値。
    const lineProps = {voices, apiVoice, upBalloonProps, setUpBalloonProps, showLineStatus, fetchApiStatus}

    // useContextの値。TalksLinesArea.jsxに渡す値。
    const talksLinesAreaProps = {apiVoice, userVoice, lines: data.lines, linesAnimateStatus, setLinesAnimateStatus, voices, setVoices, checkTranslations, setCheckTranslations}

    // useContextの値。TalkToInputContext.jsxに渡す値。
    const TalkToInputFooterProps = {voices, setVoices, userVoice, apiVoice, inputValue, setInputValue, lines: data.lines, setLinesAnimateStatus, fetchApiStatus, setFetchApiStatus, showLineStatus, setShowLineStatus, checkTranslations, setCheckTranslations}



    // 最初にフェードイン処理。
    useEffect( () => {
        // レンダリングされたら、表示に切り替える。するとcssによりフェードインされる。
        if (isFirstRender === true) setIsShow(true)
    }, [isFirstRender])





    // 初回レンダリングを管理。
    useEffect( () => {
        if (isFirstRender === false) setIsFirstRender(true)
    }, [])




    return (<DefaultThemeProvider>
    <CommonProvider>
        {/* 声を取得するためのJSX */}
        <WebSpeachApiVoices voices={voices} setVoices={setVoices} />

        {/* 「今日も会話を楽しもう！」モーダルウィンドウ。 */}
        <StartTalkModal
            isOnBgm={isOnBgm}
            setIsOnBgm={setIsOnBgm}
        />

        <div css={css`
            transition: opacity 0.25s;
            opacity: ${ (isShow)? 1 : 0 };
        `}>
            <UpBalloon2
                upBalloonProps={upBalloonProps}
                setUpBalloonProps={setUpBalloonProps}
            />

            {/* ヘッダー */}
            <TalkToHeaderContext.Provider value={TalkToHeaderProps} >
                <TalkToAppHeader />
            </TalkToHeaderContext.Provider>

            {/* 会話表示欄 */}
            <TalksLinesAreaContext.Provider value={{
                ...talksLinesAreaProps,
                ...lineProps,
            }}>
                <TalksLinesArea />
            </TalksLinesAreaContext.Provider>

            {/* 入力・送信ボタン欄 */}
            <TalkToInputFooterContext.Provider value={TalkToInputFooterProps}>
                <Show3ButtonContext.Provider value={show3ButtonProps}>
                    <TalkToInputFooter />
                </Show3ButtonContext.Provider>
            </TalkToInputFooterContext.Provider>
        </div>

    </CommonProvider>
    </DefaultThemeProvider>)
}



