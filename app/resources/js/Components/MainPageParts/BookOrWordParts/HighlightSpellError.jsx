import spellWords from '@/../../public/dictionaries/ejdic-hand-json/ejdict.json'

import React from 'react'
import { useRef, useEffect } from 'react'
import { css } from '@emotion/react'
import {defaultTheme} from '@/Components/DefaultThemeProvider'

import { Stack } from '@mui/material'

import DefaultSpeakingIconButton from "@/Components/MainPageParts/BookOrWordParts/DefaultSpeakingIconButton"
import SlowSpeakingIconButton from "@/Components/MainPageParts/BookOrWordParts/SlowSpeakingIconButton"




/** @jsxImportSource @emotion/react */
export default function HighlightSpellError({
    bookOrWordIndex,
    upBalloonProps,
    setUpBalloonProps,
    text,
    voices,
}) {
    const palette = defaultTheme().palette

    useEffect( () => {
        spellWords["Gundam"] = `白い高性能モビルスーツ。
            初代は連邦軍が開発した。/
            漫画やアニメなどの空想上の存在だが、現実には等身大の巨大模型が製作された過去がある。`
        spellWords["bored"] = '退屈'
        spellWords["n't"] = 'notの省略系'
        spellWords["'s"] = "has, is, us,(疑問詞のあとの) doesの短縮形/"
            + "Tom's : トムの｜Marie's : マリーの"

        spellWords["Vikram"] = 'ヴィクラム（人の名前）'
    }, [])

    // BookOrWordのid + バルーンのidが必要だからそれ用。
    let BalloonId = 0
    // 和訳を見れるようにして返す、の共通処理。
    const returnJapaneseTranslation = (
            searchWord, // 辞書にあった英単語。
            word,       // 元の英単語、普通に表示される。
            sWord=null, // 元が複数系の英単語なら元の英単語を入れる。
            color=null, // 前文字か先頭文字を大文字に変換した検索なら、オレンジ色を入れる。
        ) => {
        // 再生ボタンのJSX。
        const SpeakIconsJsx = <>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0.8}
            >
            {voices.map((voiceObj, index) => (voiceObj === null)? '' :
                <DefaultSpeakingIconButton
                    key={index}
                    englishWord={ (sWord)? sWord : searchWord }
                    voice={voiceObj.voice}
                    voicePitch={voiceObj.voicePitch}
                    color={voiceObj.color}
                />
            )}
            </Stack>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0.8}
                css={css`margin: 5px 0 3px 0;`}
            >
            {voices.map((voiceObj, index) => (voiceObj === null)? '' :
                <SlowSpeakingIconButton
                    key={index}
                    englishWord={ (sWord)? sWord : searchWord }
                    voice={voiceObj.voice}
                    voicePitch={voiceObj.voicePitch}
                    color={voiceObj.color}
                />
            )}
            </Stack>
        </>
        // 和訳を<hr />改行に変換。
        const hrJsx = <hr css={css`border-color:#888b;`} />
        const japaneseTranslation = spellWords[searchWord].split(/(\/)/).map((row, index2) => {
            return (
                <React.Fragment key={index2}>
                { row.match(/(\/)/)? hrJsx : row }
                </React.Fragment>
            )
        })

        const japaneseTranslationJsx = (<>
            <div css={css`text-align:center;`}>
                { (sWord)? `${sWord}（原形：${searchWord}）` : searchWord }
                {SpeakIconsJsx}
            </div>
            {hrJsx}
            {japaneseTranslation}
        </>)

        return <EnglishWordAndJapaneseTranslation
            upBalloonProps={upBalloonProps}
            setUpBalloonProps={setUpBalloonProps}
            wordIndex={ `${bookOrWordIndex}-${BalloonId++}` }
            englishWord={ (color)? <span css={css`color:${color};`}>{word}</span> : word }
            japaneseTranslation={japaneseTranslationJsx}
        />
    }



    // 単語をフォーカスで和訳バルーン表示するbuttonタグに変えて返す処理。
    // 辞書にないなら、nullを返す。
    const balloonShowButtonforWord = (word) => {
        // アルファベットを含まないなら、そのまま返す（改行もそのまま返す）。
        if ( !word.match(/[a-zA-Z]/i) ) return word

        // 辞書に存在するなら、和訳が見れるようにして返す。
        if (word in spellWords) {
            return returnJapaneseTranslation(
                /* searchWord */ word,  // 辞書にあった英単語。
                word,       // 元の英単語、普通に表示される。
                // sWord=null, // 元が複数系の英単語なら元の英単語を入れる。
                // color=null, // 前文字か先頭文字を大文字に変換した検索なら、オレンジ色を入れる。
            )
        }

        // 全て小文字したのが辞書に存在するなら、和訳が見れるようにして返す。
        const lowerWord = word.toLowerCase()
        if (lowerWord in spellWords) {
            return returnJapaneseTranslation(
                /* searchWord */ lowerWord,  // 辞書にあった英単語。
                word,       // 元の英単語、普通に表示される。
                // sWord=null, // 元が複数系の英単語なら元の英単語を入れる。
                // color=null, // 前文字か先頭文字を大文字に変換した検索なら、オレンジ色を入れる。
            )
        }

        // 全て大文字したのが辞書に存在するなら、和訳が見れるようにして返す。
        const uperWord = word.toUpperCase()
        if (uperWord in spellWords) {
            return returnJapaneseTranslation(
                /* searchWord */ uperWord,  // 辞書にあった英単語。
                word,       // 元の英単語、普通に表示される。
                null, // sWord=null, // 元が複数系の英単語なら元の英単語を入れる。
                palette.warning.main, // color=null, // 前文字か先頭文字を大文字に変換した検索なら、オレンジ色を入れる。
            )
        }

        // 先頭を大文字したのが辞書に存在するなら、和訳が見れるようにして返す。
        const topUperWord = lowerWord.slice(0,1).toUpperCase() + lowerWord.slice(1)
        if (topUperWord in spellWords) {
            return returnJapaneseTranslation(
                /* searchWord */ topUperWord,  // 辞書にあった英単語。
                word,       // 元の英単語、普通に表示される。
                null, // sWord=null, // 元が複数系の英単語なら元の英単語を入れる。
                palette.warning.main, // color=null, // 前文字か先頭文字を大文字に変換した検索なら、オレンジ色を入れる。
            )
        }

        // 最後のiesをyに変えて辞書に存在するなら、和訳が見れるようにして返す。
        if ( lowerWord.endsWith('ies') ) {
            const endYWord = lowerWord.slice(0, -3) + 'y'
            if (endYWord in spellWords) {
                return returnJapaneseTranslation(endYWord, word, lowerWord,
                    endYWord,   // searchWord,   // 辞書にあった英単語。
                    word,       // 元の英単語、普通に表示される。
                    lowerWord, // sWord=null, // 元が複数系の英単語なら元の英単語を入れる。
                    // color=null, // 前文字か先頭文字を大文字に変換した検索なら、オレンジ色を入れる。
                )
            }
        }

        // 最後のsを消して辞書に存在するなら、和訳が見れるようにして返す。
        if ( lowerWord.endsWith('s') ) {
            const endNotSWord = lowerWord.slice(0, -1)
            if (endNotSWord in spellWords) {
                return returnJapaneseTranslation(
                    endNotSWord,   // searchWord,   // 辞書にあった英単語。
                    word,       // 元の英単語、普通に表示される。
                    lowerWord, // sWord=null, // 元が複数系の英単語なら元の英単語を入れる。
                    // color=null, // 前文字か先頭文字を大文字に変換した検索なら、オレンジ色を入れる。
                )
            }
        }

        // 辞書に存在しないなら、nullを返す。
        return null
    }



    // 辞書に存在しない英単語を、赤文字・赤ラインのcssと文字を返す。
    const toRedWord = (word) => {
        const cssObj = css`
            color: red;
            border-color: red;
        `
        const englishWord = word

        const japaneseTranslation = (<>
            "{word.toLowerCase()}" は当サイト利用の辞書にありません。<br />
            固有名詞（名前）などなら気にしないでください。
        </>)

        return <EnglishWordAndJapaneseTranslation
            key={'index'}
            upBalloonProps={upBalloonProps}
            setUpBalloonProps={setUpBalloonProps}
            wordIndex={ `${bookOrWordIndex}-${'バルーンid'}` }
            englishWord={englishWord}
            japaneseTranslation={japaneseTranslation}
            cssObj={cssObj}
        />
    }


    // 単語を短縮系で分割して返す。分割不可ならfalseを返す。
    const wordSplitToContractions = (word) => {
        const splitWords = [
            /(n't)/g,
            /('ll)/g,
            /('ve)/g,
            /('d)/g,
            /('t)/g,
            /('s)/g,
        ]

        const resultWords = []
        // 各区切り記号で分割可能か見ていく。
        for(let i=0; i<splitWords.length; i++) {
            const arr = word.split(splitWords[i])
            // 分解できたなら、各単語を追加する。
            if (arr.length >= 2) {
                arr.map(row2 => {
                    resultWords.push(row2)
                })
                return resultWords
            }
        }

        // 分割不可能ならfalseを返す。
        return false
    }



    // テキストを分割して配列にする（'とアルファベット以外の文字で区切る）。
    const words = text.split(/([^'a-zA-Z])/g)



    // ループで各英単語をバルーン表示ボタンにできるならしていく。
    let newText = words.map((word, index) => {
        // 単語をフォーカスで和訳バルーン表示するbuttonタグに変えて返す処理。
        const resultWord = balloonShowButtonforWord(word)

        //  和訳ボタンにできたなら、それを返す。
        if (resultWord !== null) return <React.Fragment key={index}>{resultWord}</React.Fragment>

        // 辞書にないから、短縮系で分解してみる。
        // 関数、単語を短縮系で分割して返す。分割不可ならfalseを返す。
        const splitWords = wordSplitToContractions(word)
        // 分割できなかったなら、そのまま返す。
        if (splitWords === false) return <React.Fragment key={index}>{toRedWord(word)}</React.Fragment>

        const resultSplitWords = []
        // 分割後の各単語を、和訳バルーン表示ボタンか赤色単語にする。
        splitWords.map(row => {
            // 和訳バルーン表示ボタンに変更する。
            const resultRow = balloonShowButtonforWord(row)
            // 和訳がないなら、単語を赤色表示にする。

            // 変換後（無理なら赤色にしたrow）を配列に入れる。
            resultSplitWords.push( (resultRow === null)
                // 赤色にした英単語。
                ? toRedWord(row)
                // 和訳バルーン表示ボタン。
                : resultRow
            )
        })

        // 分解した単語を一つのinline-block要素に入れて返す。
        return (<span key={index} css={css`display:inline-block;`}>{
            resultSplitWords.map( (row2, index2) => {
                return <React.Fragment key={index2}>{row2}</React.Fragment>
            })
        }</span>)


    })



    return (<div css={css`
        white-space: pre-wrap;  // 改行と半角スペースを消さない。
    `}>
        {newText}
    </div>)
}




// 英単語コンポーネント。
// フォーカスすると和訳バルーンが表示される。
const EnglishWordAndJapaneseTranslation = ({
    upBalloonProps,
    setUpBalloonProps,
    wordIndex,
    englishWord,
    japaneseTranslation,
    cssObj = null,
}) => {
    const palette = defaultTheme().palette
    const buttonDomRef = useRef(null)


    const japaneseText = (<>
        {japaneseTranslation}
        <hr css={css` border-color: ${palette.text.disabled} `} />
        <a
            target="_blank"
            href="https://kujirahand.com/web-tools/EJDictFreeDL.php"
            css={css`
                color: ${palette.info.main};
                font-size: 0.8rem;
                text-decoration: underline;
                &:hover{ background: #29b6a633; }
            `}
        >利用辞書「ejdict-hand」（パブリックドメイン）</a>
        <span css={css`font-size: 0.8rem;`}>と当サイトが追加した単語集</span>
        。
    </>)


    // 英単語をクリック（フォーカス）したら、バルーンを表示の用意。
    const setShowUpBalloon = (e) => {
        // 対象バルーンすでに表示状態なら処理しない。
        // （表示状態で押すとバグるから）
        if (
            upBalloonProps.isShow === true
            && upBalloonProps.wordIndex === wordIndex
        ) return

        // サイズ・座標情報を取得。
        const rect = buttonDomRef.current.getBoundingClientRect()

        setUpBalloonProps(row => {
            return {
                isBalloonHover: false,
                hoverWordIndex: wordIndex,
                dummyW: 0,
                isShow: false,
                x: rect.left + rect.width / 2,
                y: rect.bottom + window.scrollY,
                wordIndex: wordIndex,
                text: japaneseText,
            }
        })
    }



    // 英単語をホバーしたら
    const handleMouseEnter = () => {
        setUpBalloonProps(value => {
            return {
                ...value,
                hoverWordIndex: wordIndex,
            }
        })
    }



    // 英単語のホバーを外したら
    const handleMouseLeave = () => {
        setUpBalloonProps(value => {
            return {
                ...value,
                hoverWordIndex: null,
            }
        })
    }


    return (
        <button
            ref={buttonDomRef}
            onClick={ setShowUpBalloon }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            css={css`
                margin: 0;
                padding: 0;
                line-height: 1.2;
                border-bottom: 1px #888 solid;
                ${cssObj}
            `}
        >{englishWord}</button>
    )
}
