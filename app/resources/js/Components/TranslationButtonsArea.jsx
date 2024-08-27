
import getBalloonWordEnToJa from '@/Components/TranslationButtonsAreaComponents/getBalloonWordEnToJa'

import React, { useContext, useRef, useEffect, useLayoutEffect, useState, } from 'react'
import { css } from '@emotion/react'
import {defaultTheme} from '@/Components/DefaultThemeProvider'

// 全てで共通の値 一覧。
import {CommonContext} from '@/Components/CommonProvider'

import TranslationJsxInBalloon from './TranslationButtonsAreaComponents/TranslationJsxInBalloon'
import NoneJsxInBalloon from './TranslationButtonsAreaComponents/NoneJsxInBalloon'
import ShowUpBalloon2Button from './ShowUpBalloon2Button'
import LoadingIcon from '@/Components/LoadingIcon'

import axios from 'axios'




/** @jsxImportSource @emotion/react */
export default function TranslationButtonsArea({
    setUpBalloonProps = null,
    text,
    voices = null,
    checkTranslations = false,  // ない英単語があるかチェックして、あればAPIから取得してDB保存をON。
    setCheckTranslations = null,
}) {
    // 全てで共通の値を取り出す。
    const common = useContext(CommonContext)
    // 辞書データを取得。
    const enTranslations = common.vals.enTranslations
    // 表示管理に使う定数の一覧。
    const SHOW_STATUS = common.SHOW_STATUS

    // 上記の辞書にない単語を入れる、{en: 全て小文字のen}を入れるオブジェクト。
    const noneTranslationWords = {}

    const palette = defaultTheme().palette


    // 変数を入れる用のuseRef。
    const valsRef = useRef({
        // 「...英単語を確認中」の表示切り替え管理。
        showLoadingStatus: SHOW_STATUS.TRANSLATIONS_LOADING.HIDDEN,
    })
    // 上記のエイリアス。
    const vals = valsRef.current

    // 初回レンダリングを管理する。
    const [isFirstRender, setIsFirstRender] = useState(true)

    // 「...英単語を確認中」を囲むdivのDOM用のuseRef。
    const loadingDivDomRef = useRef(null)
    // 「...英単語を確認中」の中身であるspanのDOM用のuseRef。
    const loadingSpanDomRef = useRef(null)
    // フェードインとフェードアウトの時間ミリ秒。
    const fadeMSec = 500



    // バルーン表示ボタンのcss
    const cssList = {
        normal: css``,
        orange: css`color: ${palette.warning.main};`,
        red: css`color: red; border-color: red;css`,
    }


    // テキストを分割して配列にする（'とアルファベット以外の文字で区切る）。
    const tmpWords = text.split(/([^'’a-zA-Z0-9é])/g)
    const tmpWords2 = tmpWords.filter(word => word !== '')
    const words = tmpWords2.map( word => word.replace(/’/g, "'") )


    // バルーン表示ボタンjsxやその他の文字を入れる配列を作成。
    const buttonsAndWords = []


   // 各単語ごとにループ。
    words.map((word, index) => {

        // 数字のみなら、数字用のバルーンを返す。
        if ( !isNaN(word) && !isNaN(parseFloat(word)) ) {

            // eを含むならそのまま配列に入れる。
            // 理由は、Web Speech API が読み上げ対応していないから。
            if ( word.toLowerCase().includes('e') ) {
                 // このボタンを配列に入れる。
                buttonsAndWords.push(word)
                // 次の単語ループへ。
                return
            }

            // 数字のみなら、数字用のバルーンを返す。
            const translationJsx = <TranslationJsxInBalloon
                voices={voices}
                balloonWordData={{
                    word, // 元テキストの英単語、つまりボタンのテキスト。
                    balloonWord: word,  // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
                    discription: '', // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
                    japaneseText: '数字、数値',    // 辞書にある日本語訳。なければ''にする。
                    color: 'normal',   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
                }}
            />
            const buttonJsx = <ShowUpBalloon2Button
                setUpBalloonProps={setUpBalloonProps}
                jsxInBalloon={translationJsx}
                cssObj={'normal'}
            >{word}</ShowUpBalloon2Button>
            // このボタンを配列に入れる。
            buttonsAndWords.push(buttonJsx)
            // 次の単語ループへ。
            return

        }


        // アルファベットを含まないなら、そのまま配列に入れる。（改行もそのまま入れる）。
        if ( !word.match(/[a-zA-Z]/i) ) {
            buttonsAndWords.push(word)
            // 次の単語ループへ。
            return
        }

        // 前の単語が「.」と「 (半角スペース)」なら渡すpositionを0にする。
        let position = index
        if (
            buttonsAndWords[index - 2] !== undefined
            && buttonsAndWords[index - 2] === '.'
            && buttonsAndWords[index - 1] !== undefined
            && buttonsAndWords[index - 1] === ' '
        ) {
            position = 0
        }
        // バルーン内JSX用の和訳データを取得。
        const balloonWordData = getBalloonWordEnToJa(enTranslations, word, position)

        // 和訳があれば、和訳バルーンjsx表示のボタンを配列に入れる。
        if (balloonWordData !== null) {
            // バルーン内用の和訳JSXを取得。
            const translationJsx = <TranslationJsxInBalloon
                voices={voices}
                balloonWordData={balloonWordData}
            />
            // 和訳jsxのバルーンを表示するボタンjsxを取得する。
            const buttonJsx = <ShowUpBalloon2Button
                setUpBalloonProps={setUpBalloonProps}
                jsxInBalloon={translationJsx}
                cssObj={cssList[balloonWordData.color]}
            >{word}</ShowUpBalloon2Button>
            // このボタンを配列に入れる。
            buttonsAndWords.push(buttonJsx)
            // 次の単語ループへ。
            return
        }



        // ---和訳がなかったなら ---


        // 単語の和訳なしバルーン用のjsxを取得。
        const noneJsx0 = <NoneJsxInBalloon word={word} />
        // 和訳なしバルーン表示のボタンのjsxを取得。
        const buttonJsx0 = <ShowUpBalloon2Button
            setUpBalloonProps={setUpBalloonProps}
            jsxInBalloon={noneJsx0}
            cssObj={cssList.red}
        >{word}</ShowUpBalloon2Button>
        // 配列に入れる。
        buttonsAndWords.push(buttonJsx0)


        // 和訳なしの単語を入れる。
        noneTranslationWords[word] = word.toLowerCase()

    })



    // checkTranslations=trueの時の処理。
    // ない英単語があるかチェックして、あればAPIから取得してDB保存をON。
    useEffect( () => {
        // checkTranslationsがfalseなら処理しない。
        if (checkTranslations === false) return

        // 辞書にない単語がないなら処理しない。
        if ( Object.keys(noneTranslationWords).length === 0 ) {
            setCheckTranslations(false)
            return
        }
        // 「英単語を確認中」をフェードイン表示。
        vals.showLoadingStatus = SHOW_STATUS.TRANSLATIONS_LOADING.FADE_IN



        // ない単語を半角スペースで繋いだ文にする。
        const noneTranslationsText = Object.values(noneTranslationWords).join(' ')

        // 非同期通信で、APIから単語の和訳をもらう。
        axios({
            method: 'post',
            url: route('api.translations.en'),
            data: { enLine: noneTranslationsText },

        // 正常にレスポンスが返ってきた時の処理。
        }).then(response => {
            // AIからもらった辞書データがあるなら。
            if (
                response.data !== undefined && response.data !== null
                || Object.keys(response.data).length > 0
            ) {
                // 辞書に、AIから貰った辞書データを追加する。
                for (let key in response.data) {
                    enTranslations[key] = response.data[key]
                }
            }
            // 単語の辞書チェックをfalseに戻す。
            setCheckTranslations(false)
            // 「英単語を確認中」をフェードアウトで消す。
            vals.showLoadingStatus = SHOW_STATUS.TRANSLATIONS_LOADING.FADE_OUT

        // エラー時の場合。
        }).catch(error => {
            console.log(error)
            // アラートにエラーの主旨を表示する。
            alert('英単語チェック中にエラーが発生しました。\r\n「英語編集」を押してから、それを解除してみてください。')
            // 単語の辞書チェックをfalseに戻す。
            setCheckTranslations(false)
            // 「英単語を確認中」を消す。
            vals.showLoadingStatus = SHOW_STATUS.TRANSLATIONS_LOADING.HIDDEN
        })

    }, [checkTranslations])




    // 「...英単語を確認中」をフェード点滅させるアニメーションをセットする。
    useLayoutEffect(() => {
        // 初回レンダリング以外なら処理しない。
        if (isFirstRender === false) return

        loadingSpanDomRef.current.animate([
            {opacity: 0.7},
            {opacity: 1},
            {opacity: 0.7},
        ], {
            duration: 1000,
            iterations: Infinity,
        })

    }, [isFirstRender])



    // vals.showLoadingStatusの値が変わった時の処理。
    // フェードイン、表示、フェードアウトなどアニメーションを実行する。
    useLayoutEffect(() => {
        // 初回レンダリングがまだなら処理しない。
        if (isFirstRender === true) return

        // フェードインならアニメーションをセットする。
        if (vals.showLoadingStatus === SHOW_STATUS.TRANSLATIONS_LOADING.FADE_IN) {
            loadingDivDomRef.current.animate([
                {opacity: 0, display: 'flex'},
                {opacity: 1, display: 'flex'},
            ], fadeMSec)
            // アニメーション後は表示にする。
            loadingDivDomRef.current.style.opacity = 1
            loadingDivDomRef.current.style.display = 'flex'
            vals.showLoadingStatus = SHOW_STATUS.TRANSLATIONS_LOADING.VISIBLE
        }
        // フェードアウトならアニメーションをセットする。
        if (vals.showLoadingStatus === SHOW_STATUS.TRANSLATIONS_LOADING.FADE_OUT) {
            loadingDivDomRef.current.animate([
                {opacity: 1, display: 'flex'},
                {opacity: 0, display: 'flex'},
            ], fadeMSec)
            // アニメーション後は非表示にする。
            // loadingDivDomRef.current.style.opacity = 0
            loadingDivDomRef.current.style.display = 'none'
            vals.showLoadingStatus = SHOW_STATUS.TRANSLATIONS_LOADING.HIDDEN
        }
    }, [vals.showLoadingStatus])





    // 初回レンダリング済みかを管理。
    useEffect(() => {
        // 初回レンダリングをしたら、「初回レンダリングじゃない」にする。
        if (isFirstRender === true) setIsFirstRender(false)
    }, [isFirstRender])





    return (<div css={css`
        position: relative;
        height: 100%;
    `}>

        {/* 英単語を和訳表示ボタンにして表示。 */}
        <div css={css`
            text-align: left;
            white-space: pre-wrap;
        `}>
            { buttonsAndWords.map( (buttonAndWord, index) => (<React.Fragment key={index}>
                {buttonAndWord}
            </React.Fragment>) ) }
        </div>

        {/* 辞書にない英単語のチェック中に表示するローディングアイコン。 */}
        <div
            ref={loadingDivDomRef}
            css={css`
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                display: ${(vals.showLoadingStatus === SHOW_STATUS.TRANSLATIONS_LOADING.VISIBLE)? 'flex' : 'none'};
                justify-content: center;
                align-items: center;
                background: #0006;
                color: #fff;
                text-shadow:
                    2px 2px 3px #000,
                    -2px 2px 3px #000,
                    2px -2px 3px #000,
                    -2px -2px 3px #000;
            `}
        >
            <span
                ref={loadingSpanDomRef}
                css={css`
                    display:flex;
                    justify-content: center;
                    align-content: center;
                `}
            >
                <LoadingIcon />...辞書にない英単語を確認中
            </span>
        </div>
    </div>)
}
