import translationWords from "@/Components/TranslationButtonsAreaComponents/translationWords"

import {usePage} from '@inertiajs/react'




// 和訳バルーン用の連想配列を返す。
/* 以下を返す。
    const balloonWordData = {
        word: , // 元テキストの英単語、つまりボタンのテキスト。
        balloonWord:,   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
        discription: , // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
        japaneseText: ,    // 辞書にある日本語訳。なければ''にする。
        color: ,   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
    }
 */
export default function getBalloonWordEnToJa(
    /* DBからの辞書データ */ enTranslations,
    /* string */ enWord,
    /* numeric */ position = null // 先頭の単語なら0 二番目なら1。
) {


    // 小文字化した英単語。
    const lowerWord = enWord.toLowerCase()

    // ボタン表示用の文字の色。
    let showTextColor = ''



    // 先頭文字を小文字化する関数。
    const lowerCaseFirst = str => {
        return str.charAt(0).toLowerCase() + str.slice(1)
    }


    // 英単語が辞書にある場合。小文字同士で判定。
    if ( lowerWord in enTranslations ) {
        // 単語の辞書の行を取得。
        const enTranslation = enTranslations[lowerWord]

        // 単語Aaa 辞書aaaかつ先頭の単語なら文字色'normal'。
        if (
            lowerCaseFirst(enWord) === enTranslation.en
            && position === 0
        ) showTextColor = 'normal'
        // 単語aaa 辞書aaa なら文字色'normal'。
        // 単語Aaa 辞書Aaa なら文字色'normal'。
        // 単語AAA 辞書AAA なら文字色'normal'。
        if (enWord === enTranslation.en) showTextColor = 'normal'

        // この時点で'normal'でないなら文字色'orange'。
        if (showTextColor !== 'normal') showTextColor = 'orange'

        // 和訳バルーン用の連想配列を返す。
        return {
            word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
            balloonWord: enTranslation.en,   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
            discription: '', // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
            japaneseText: enTranslation.ja,    // 辞書にある日本語訳。なければ''にする。
            color: showTextColor,   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
        }

    }



    // 辞書に存在しないなら、nullを返す。
    return null

}
