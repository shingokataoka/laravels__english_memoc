// 単語を短縮系で分割して返す。分割不可ならfalseを返す。
// 分解できたペアを全て含む配列を返す。
export default function splitWord(word) {
    // const splitWords = [
    //     /(n't)/g,
    //     /('ll)/g,
    //     /('ve)/g,
    //     /('d)/g,
    //     /('t)/g,
    //     /('s)/g,
    //     // 過去形〜edやdで分解。
    //      /(d)/g,
    //      /(ed)/g,
    // ]
    const splitWords = [
        "n't",
        "'ll",
        "'ve",
        "'d",
        "'t",
        "'s",
        // 過去形〜edやdで分解。
         "d",
         "ed",
    ]

    // 分解できた[単語の前側,単語の後側]を全て格納するする配列。
    const splittedWords = []

    // 各区切り記号で分割可能か見ていく。
    splitWords.map(splitWord => {
        // 語尾が一致すれば、分解して配列に格納。
        if ( word.endsWith(splitWord) ) {
            splittedWords.push( [
                word.slice(0, -1 * splitWord.length),
                splitWord,
            ] )

        }
    })

    // for(let i=0; i<splitWords.length; i++) {
    //     const arr = word.split(splitWords[i])
    //     // 分解できたなら、前部分と後ろ部分を配列に格納。
    //     if (arr.length >= 2) {
    //         splittedWords.push( [
    //             arr[0],
    //             arr[1],
    //         ] )
    //     }
    // }

    // 分解できた単語があれば返す。
    return splittedWords

    // 分割不可能ならfalseを返す。
    return false
}
