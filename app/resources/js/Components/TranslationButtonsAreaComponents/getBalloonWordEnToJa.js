import translationWords from "@/Components/TranslationButtonsAreaComponents/translationWords"



// 母音かを判定する関数。下記で使っている。
function isVowel(char) {
  return ["a", "e", "i", "o", "u"].includes(char.toLowerCase());
}





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
export default function getBalloonWordEnToJa(/* string */ enWord) {

    // アルファベットを含まないなら、そのまま返す（改行もそのまま返す）。
    // if ( !word.match(/[a-zA-Z]/i) ) return word

    const lowerWord = enWord.toLowerCase()

    // 先頭以外が全て小文字ならカラー'normal'、違うなら'orange'を返す。
    const colorToAllLower = word => {
    return (word.slice(1) === lowerWord.slice(1))? 'normal' : 'orange'

    }



    // 和訳あるなら、カラー'normal'で和訳バルーン用の連想配列を返す。
    if (enWord in translationWords) {
        return {
            word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
            balloonWord: enWord,   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
            discription: '', // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
            japaneseText: translationWords[enWord],    // 辞書にある日本語訳。なければ''にする。
            color: 'normal',   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
        }
    }

    // 全て小文字化して和訳あるなら、カラー'normal'で和訳バルーン用の連想配列を返す。
    if (lowerWord in translationWords) {
        // 先頭以外が全て小文字ならカラー'normal'、違うなら'orange'を返す。
        const color = colorToAllLower(enWord)

        return {
            word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
            balloonWord: lowerWord,   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
            discription: '', // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
            japaneseText: translationWords[lowerWord],    // 辞書にある日本語訳。なければ''にする。
            color: color,   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
        }
    }

    // 全て大文字化がして和訳あるなら、カラー'orange'で和訳バルーン用の連想配列を返す。
    const uperWord = enWord.toUpperCase()
    if (uperWord in translationWords) {
        return {
            word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
            balloonWord: uperWord,   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
            discription: '', // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
            japaneseText: translationWords[uperWord],    // 辞書にある日本語訳。なければ''にする。
            color: 'orange',   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
        }
    }

    // 先頭を大文字化がして和訳あるなら、カラー'orange'で和訳バルーン用の連想配列を返す。
    const topUperWord = lowerWord.slice(0,1).toUpperCase() + lowerWord.slice(1)
    if (topUperWord in translationWords) {
        return {
            word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
            balloonWord: topUperWord,   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
            discription: '', // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
            japaneseText: translationWords[topUperWord],    // 辞書にある日本語訳。なければ''にする。
            color: 'orange',   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
        }
    }

    // 最後のiesをyに変えて辞書に存在するなら、和訳バルーン用の連想配列を返す。
    if ( lowerWord.endsWith('ies') ) {
        const endYWord = lowerWord.slice(0, -3) + 'y'
        if (endYWord in translationWords) {
            // 先頭以外が全て小文字ならカラー'normal'、違うなら'orange'を返す。
            const color = colorToAllLower(enWord)

            return {
                word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
                balloonWord: lowerWord,   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
                discription: `原形（${endYWord}）`, // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
                japaneseText: translationWords[endYWord],    // 辞書にある日本語訳。なければ''にする。
                color: color,   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
            }
        }
    }

    // 最後のesを消して辞書に存在するなら、和訳バルーン用の連想配列を返す。
    if ( lowerWord.endsWith('es') ) {
        const endNotEsWord = lowerWord.slice(0, -2)
        if (endNotEsWord in translationWords) {
            // 先頭以外が全て小文字ならカラー'normal'、違うなら'orange'を返す。
            const color = colorToAllLower(enWord)

            return {
                word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
                balloonWord: lowerWord,   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
                discription: `原形（${endNotEsWord}）`, // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
                japaneseText: translationWords[endNotEsWord],    // 辞書にある日本語訳。なければ''にする。
                color: color,   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
            }
        }
    }

    // 最後のsを消して辞書に存在するなら、和訳バルーン用の連想配列を返す。
    if ( lowerWord.endsWith('s') ) {
        const endNotSWord = lowerWord.slice(0, -1)
        if (endNotSWord in translationWords) {
            // 先頭以外が全て小文字ならカラー'normal'、違うなら'orange'を返す。
            const color = colorToAllLower(enWord)

            return {
                word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
                balloonWord: lowerWord,   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
                discription: `原形（${endNotSWord}）`, // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
                japaneseText: translationWords[endNotSWord],    // 辞書にある日本語訳。なければ''にする。
                color: color,   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
            }
        }
    }



    // 末尾がingなら、原形の単語にしてみて辞書に存在するなら和訳バルーンを返す。
    if ( lowerWord.endsWith('ing') ) {
        // まずingを消した単語にする。
        const notIngWord = lowerWord.slice(0, -3)

        // ingを消した単語が、末尾が母音+子音なら、存在しない〇〇ingは単語だからnullを返す。
        // 例えばget（母音+子音）だからgetingは存在しない。存在するのはgetting。
        // get + ing = geting(実在しない単語)だったらnullを返す。
        // get+ ing = getting（実在しうる単語）の可能性があれば処理せず下記で判断。
        const lastChar = notIngWord.charAt(notIngWord.length - 1)
        const secondLastChar = notIngWord.charAt(notIngWord.length - 2)
        const thirdLastChar = notIngWord.charAt(notIngWord.length - 3)
        if (isVowel(secondLastChar) && !isVowel(lastChar)) {
            // 末尾が母音+子音なら、存在しない〇〇ingは単語だからnullを返す。
            return null
        }
console.log('どう', notIngWord)

        // ingを消した単語が、末尾が母音+子音1+子音1と同じ でかつ、辞書に存在するなら和訳バルーンを返す。存在しないならnullを返す。
        // 例えばget（母音+子音）だからgetingは存在しない。存在するのはgetting。
        // getting(実在しうる)ならgetが辞書にあれば和訳バルーンを返す。なければnullを返す。
        if (isVowel(thirdLastChar) && !isVowel(secondLastChar) && lastChar === secondLastChar) {
            const notIngWord2 = lowerWord.slice(0, -4)
            // 辞書にあるなら和訳バルーンを返す。
            if (notIngWord2 in translationWords) {
                // 先頭以外が全て小文字ならカラー'normal'、違うなら'orange'を返す。
                const color = colorToAllLower(enWord)

                return {
                    word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
                    balloonWord: lowerWord,   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
                    discription: `（${notIngWord2} + ingの形）`, // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
                    japaneseText: translationWords[notIngWord2],    // 辞書にある日本語訳。なければ''にする。
                    color: color,   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
                }
            }

        }

        // 次に、ingを消した単語に末尾eを加えて、辞書にあるなら和訳バルーンを返す。
        // 英語ルールで 単語〇〇e + ing = 〇〇ing（末尾e消えてる）だから。
        // 例えば、date + ing = dating（dateingではない、末尾eが消えている）
        const lastEAddWord = notIngWord + 'e'
        if (lastEAddWord in translationWords) {
            // 先頭以外が全て小文字ならカラー'normal'、違うなら'orange'を返す。
            const color = colorToAllLower(enWord)

            return {
                word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
                balloonWord: lowerWord,   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
                discription: `（${lastEAddWord} + ingの形）`, // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
                japaneseText: translationWords[lastEAddWord],    // 辞書にある日本語訳。なければ''にする。
                color: color,   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
            }
        }

        // 最後にingを消した単語が辞書にあるなら和訳バルーンを返す。
        if (notIngWord in translationWords) {
            // 先頭以外が全て小文字ならカラー'normal'、違うなら'orange'を返す。
            const color = colorToAllLower(enWord)

            return {
                word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
                balloonWord: lowerWord,   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
                discription: `（${notIngWord } + ingの形）`, // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
                japaneseText: translationWords[notIngWord],    // 辞書にある日本語訳。なければ''にする。
                color: color,   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
            }
        }

    }



    // 末尾がed（過去形）なら、原形の単語にしてみて辞書に存在するなら和訳バルーンを返す。

    // 〜子音+iedのiedをyに変えると原形の場合、原形があるなら和訳バルーンを返す。
    if ( lowerWord.endsWith('ied') ) {
        const notEdWord2 = lowerWord.slice(0, -3) + 'y'
        if (
            notEdWord2 in translationWords
            // 〜○iedの○が母音なら。
            && !isVowel( lowerWord.slice(-4, -3) )
        ) {

            // 先頭以外が全て小文字ならカラー'normal'、違うなら'orange'を返す。
            const color = colorToAllLower(enWord)

            return {
                word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
                balloonWord: notEdWord2 + 'の意味',   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
                discription: `（${lowerWord}は過去形）`, // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
                japaneseText: translationWords[notEdWord2],    // 辞書にある日本語訳。なければ''にする。
                color: color,   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
            }
        }
    }

    // 母音+母音+edの母音+edを消すと原形の場合、原形があるなら和訳バルーンを返す。
    // step + ed = stepped。
    // つまり、step(eが子音) + p(子音) + ed
    const notEdWord3 = lowerWord.slice(0, -3)   // 原形。例：step
    const lastChar0 = notEdWord3.slice(-2, -1)  // 例：stepのe。
    const lastChar1 = notEdWord3.slice(-1)   // 例：stepのp。
    const lastChar1Dash = lowerWord.slice(0-3, -2)   // 原形。例：steppedのped側のp。

    if (
        lowerWord.endsWith('ed')    // 最後が'ed'か。
        && isVowel(lastChar0)   // '〜○□ed'の□が母音か。
        && !isVowel(lastChar1)   // '〜○□ed'の○が子音か。
        && lastChar1 === lastChar1Dash  // ste'p'と'p'edがp同士か。
    ) {
        if (notEdWord3 in translationWords) {
            // 先頭以外が全て小文字ならカラー'normal'、違うなら'orange'を返す。
            const color = colorToAllLower(enWord)

            return {
                word: enWord, // 元テキストの英単語、つまりボタンのテキスト。
                balloonWord: notEdWord3 + 'の意味',   // バルーン内の英単語。tickets(原形：ticket)のtickets側。大文字違いならHalloweenがこれ。
                discription: `（${lowerWord}は過去形）`, // バルーン内の単語の右の説明文。(原形：ticket)など。ないなら''。
                japaneseText: translationWords[notEdWord3],    // 辞書にある日本語訳。なければ''にする。
                color: color,   // カラー。元テキストの英単語の色、'normal'か'orange'(大文字違い)か'red'（訳なし）。
            }
        }

    }



    // 辞書に存在しないなら、nullを返す。
    return null

}
