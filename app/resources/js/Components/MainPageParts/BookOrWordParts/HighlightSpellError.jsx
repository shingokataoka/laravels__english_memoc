import spellWords from '@/../../public/dictionaries/ejdic-hand-json/ejdict.json'

import React from 'react'
import { useRef, useEffect } from 'react'
import { css } from '@emotion/react'
import {defaultTheme} from '@/Components/DefaultThemeProvider'




/** @jsxImportSource @emotion/react */
export default function HighlightSpellError({
    bookOrWordIndex,
    upBalloonProps,
    setUpBalloonProps,
    text
}) {
    const palette = defaultTheme().palette

    useEffect( () => {
        spellWords["n't"] = 'notの省略系'
        spellWords["'s"] = "has, is, us,(疑問詞のあとの) doesの短縮形/"
            + "Tom's : トムの｜Marie's : マリーの"
    }, [])

    // 和訳を見れるようにして返す、の共通処理。
    const returnJapaneseTranslation = (searchWord, word, index, sWord=null, color=null) => {
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
                {searchWord}
                { (sWord)? `（複数系：${sWord}）` : '' }
            </div>
            {hrJsx}
            {japaneseTranslation}
        </>)

        return <EnglishWordAndJapaneseTranslation
            key={index}
            upBalloonProps={upBalloonProps}
            setUpBalloonProps={setUpBalloonProps}
            wordIndex={ `${bookOrWordIndex}-${index}` }
            englishWord={ (color)? <span css={css`color:${color};`}>{word}</span> : word }
            japaneseTranslation={japaneseTranslationJsx}
        />

    }



    // テキストを分割して配列にする（'とアルファベット以外の文字で区切る）。
    const words1 = text.split(/([^'a-zA-Z])/g)
    // さらに、訳せない省略形があれば分割した配列にする。
    const words = []
    const splitWords = [
        /(n't)/g,
        /('ll)/g,
        /('ve)/g,
        /('d)/g,
        /('t)/g,
        /('s)/g,
    ]
    words1.map(row => {
        // その単語があれば、そのまま入れる。
        if (row in spellWords) {
            words.push(row)
            return
        }

        // 区切り記号で分割して入れる。
        for(let i=0; i<splitWords.length; i++) {
            const arr = row.split(splitWords[i])
            // 分解されたなら、各単語を追加する。
            if (arr.length >= 2) {
                arr.map(row2 => {
                    words.push(row2)
                })
                return
            }
            // 分解されないなら次のループに進む。
            continue
        }

        // 分解がなければ、そのまま入れる。
        words.push(row)
    })

    // ループでチェックしていく。
    let newText = words.map((word, index) => {
        // 改行なら<br />にする。
        if ( word === `\r` || word === `\n` ) return <br key={index} />

        // アルファベットを含まないなら、そのまま。
        if ( !word.match(/[a-zA-Z]/i) ) return word

        // 辞書に存在するなら、和訳が見れるようにして返す。
        if (word in spellWords) {
            return returnJapaneseTranslation(word, word, index)
        }

        // 全て小文字したのが辞書に存在するなら、和訳が見れるようにして返す。
        const lowerWord = word.toLowerCase()
        if (lowerWord in spellWords) {
            return returnJapaneseTranslation(lowerWord, word, index)
        }

        // 全て大文字したのが辞書に存在するなら、和訳が見れるようにして返す。
        const uperWord = word.toUpperCase()
        if (uperWord in spellWords) {
            return returnJapaneseTranslation(uperWord, word, index, null, palette.warning.main)
        }

        // 先頭を大文字したのが辞書に存在するなら、和訳が見れるようにして返す。
        const topUperWord = lowerWord.slice(0,1).toUpperCase() + lowerWord.slice(1)
        if (topUperWord in spellWords) {
            return returnJapaneseTranslation(topUperWord, word, index, null, palette.warning.main)
        }



        // 最後のiesをyに変えて辞書に存在するなら、和訳が見れるようにして返す。
        if ( lowerWord.endsWith('ies') ) {
            const endYWord = lowerWord.slice(0, -3) + 'y'
            if (endYWord in spellWords) {
                return returnJapaneseTranslation(endYWord, word, index, lowerWord)
            }
        }

        // 最後のsを消して辞書に存在するなら、和訳が見れるようにして返す。
        if ( lowerWord.endsWith('s') ) {
            const endNotSWord = lowerWord.slice(0, -1)
            if (endNotSWord in spellWords) {
                return returnJapaneseTranslation(endNotSWord, word, index, lowerWord)
            }
        }

        // 辞書に存在しないなら、赤文字・赤ラインのcssと文字を返す。
        const cssObj = css`
            color: red;
            border-color: red;
        `
        const englishWord2 = word

        const japaneseTranslation2 = (<>
            "{lowerWord}" は当サイト利用の辞書にありません。<br />
            固有名詞（名前）などなら気にしないでください。
        </>)

        return <EnglishWordAndJapaneseTranslation
            key={index}
            upBalloonProps={upBalloonProps}
            setUpBalloonProps={setUpBalloonProps}
            wordIndex={ `${bookOrWordIndex}-${index}` }
            englishWord={englishWord2}
            japaneseTranslation={japaneseTranslation2}
            cssObj={cssObj}
        />

    })

    return (<div>
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
            href="https://kujirahand.com/web-tools/EJDictFreeDL.php"
            css={css`
                color: ${palette.info.main};
                font-size: 0.8rem;
                text-decoration: underline;
                &:hover{ background: #29b6a633; }
            `}
        >利用辞書「ejdict-hand」（パブリックドメイン）</a>
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
                line-height: 1.2;
                border-bottom: 1px #888 solid;
                ${cssObj}
            `}
        >{englishWord}</button>
    )
}
