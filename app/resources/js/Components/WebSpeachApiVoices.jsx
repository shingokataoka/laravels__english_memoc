import { useState, useEffect } from "react"





// webSpeachApiの声を返すためのコンポーネント。
// useStateで以下の引数を渡すと、voicesに声が入ります。
export default function WebSpeachApiVoices({
    /* useStateの空オブジェクト{} */ voices,
    /* 上記apiVoicesのセットuseState */ setVoices,
}){
    const [isFirstRender, setIsFirstRender] = useState(true)

    const [apiVoices, setApiVoices] = useState({})



    // 初回、voicesが{}なら[]null, null, null, null]にする。
    useEffect( () => {
        if (voices.length === 0) setApiVoices([null, null, null, null])
    }, [])



    // web speach apiの英語の声一覧を取得する処理の関数。
    const appendVoices = () => {
        const tmpApiVoices = speechSynthesis.getVoices()
        const tmpVoices = {}
        tmpApiVoices.map(voice => {
            if (voice.lang === 'en-US') tmpVoices[voice.name] = voice
        })
        setApiVoices(tmpVoices)
    }


    // web上から声一覧を読み込む。
    useEffect( () => {
        // web speach apiの英語の声一覧を取得する。
        appendVoices()
        // 一つの声読み込み後にさらに声を読み込む（GoogleChromeの場合は一つずつ読み込みから必要。）
        speechSynthesis.onvoiceschanged = e => {
            appendVoices()
        }
    }, [])



    useEffect( () => {

        const colors = ['green', 'blue', 'indigo', 'purple']
        const tmpVoices = [...voices]
        let tmpIndex = 2;

        const pushVoice = (voiceName) => {
            if ( !(voiceName in apiVoices) ) return
            if( tmpIndex >= 4) tmpIndex = 0

            const row = {
                voice: apiVoices[voiceName],
                voicePitch: null,
                color: colors[tmpIndex],
            }
            tmpVoices[tmpIndex] = row
            tmpIndex++
        }

        // 初回レンダリング時のみ。isFirstRender
        if (isFirstRender) {
            // 最初にデフォの高い音を追加しておく。
            tmpVoices[0] = {
                voice: null,
                voicePitch: 1.4,
                color: colors[0],
            }
            // デフォルトの音も追加しておく。
            tmpVoices[1] = {
                voice: null,
                voicePitch: null,
                color: colors[1],
            }
        }

        // Macの良い声を取得し追加する。
        pushVoice('Aaron');
        pushVoice('Samantha');
        pushVoice('Nicky');

        // googleChromeの良い声を取得し追加する。
        pushVoice('Google US English');

        // Microsoft Edgeの良い声を取得し追加する。

        // この二つはMultilinagual(多分他言語対応)だから再生までが遅い。
        // pushVoice('Microsoft AvaMultilingual Online (Natural) - English (United States)');
        // pushVoice('Microsoft AndrewMultilingual Online (Natural) - English (United States)');

        // 上記と同じ声で、英語のみだから遅くないのが以下二つの声。
        pushVoice('Microsoft Ava Online (Natural) - English (United States)');
        pushVoice('Microsoft Andrew Online (Natural) - English (United States)');

        pushVoice('Microsoft Christopher Online (Natural) - English (United States)');
        pushVoice('Microsoft Ana Online (Natural) - English (United States)');

        setVoices(tmpVoices)
    }, [apiVoices] )



    useEffect(() => { setIsFirstRender(false) }, [isFirstRender])


}
