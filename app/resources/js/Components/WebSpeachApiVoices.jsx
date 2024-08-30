import { useRef, useState, useEffect } from "react"





// webSpeachApiの声を返すためのコンポーネント。
// useStateで以下の引数を渡すと、voicesに声が入ります。
export default function WebSpeachApiVoices({
    /* useStateの空オブジェクト{} */ voices,
    /* 上記apiVoicesのセットuseState */ setVoices,
}){

    // web speech APIから取得したvoiceを全て入れる配列。
    const [fetchVoices, setFetchVoices] = useState([])

    // 変数。
    const valsRef = useRef({
        // アプリに渡す声を入れる配列。
        apiVoices: [null, null, null, null],
        // 上記apiVoicesのどこに入れるかのインデックス。
        apiVoicesIndex: 0,
        // fetchVoicesのnameを入れておく配列。
        fetchVoicesNames: [],
        // fetchVoicesの数を入れておく変数。
        fetchVoicesLength: fetchVoices.length,
    })
    // 上記のエイリアス。
    const vals = valsRef.current



    // web speach apiの英語の声一覧を取得するしてfetchVoicesに入れる関数。
    const appendVoices = () => {
        const resultVoices = speechSynthesis.getVoices()
        const tmpVoices = [...fetchVoices]
        resultVoices.map(voice => {
            if (voice.name in vals.fetchVoicesNames) return
            if (voice.lang === 'en-US') tmpVoices.push(voice)
        })
        // apiからの声一覧をfetchVoicesにセットする。
        setFetchVoices([...tmpVoices])
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



    // 引数のvoiceをapiVoicesに追加する関数。
    const addApiVoices = (voice, voicePitch = null ) => {
        const colors = ['green', 'blue', 'indigo', 'purple']

        // インデックスが4以上なら0に戻す。
        if( vals.apiVoicesIndex >= 4) vals.apiVoicesIndex = 0

        // vals.apiVoicesに入れる。
        vals.apiVoices[vals.apiVoicesIndex] = {
            name: voice.name,
            voice: voice,
            voicePitch: voicePitch,
            color: colors[vals.apiVoicesIndex],
        }

        // 入れたからインデックスを進める。
        vals.apiVoicesIndex += 1
    }



    // 指定のnameの声があればapiVoicesに追加する関数。
    const pushVoice = (voiceName) => {

        // apiVoicesをループして、すでに同名の声があれば処理しない。
        let voiceExists = false
        vals.apiVoices.map(apiVoice => {
            if (
                apiVoice !== null
                && apiVoice.name === voiceName
            ) {
                voiceExists = true;
                return;
            }
        })
        if (voiceExists === true) return

        // fetchVoicesをループして、voiceNameのがあれば処理する。
        for (let i=0; i < fetchVoices.length; i++) {
            const fetchVoice = fetchVoices[i]

            // 同名のfetchVoiceでないなら次に飛ばす。
            if (fetchVoice.name !== voiceName) continue

            // apiVoicesに入れる。
            addApiVoices(fetchVoice)

            // 入れたから処理を終了。
            return
        }
    }



    // fetchVoicesが更新された時の処理。
    useEffect( () => {
        // 前回のfetchVoicesの数以下なら処理しない。
        if (vals.fetchVoicesLength >= fetchVoices.length) return

        // fetchVoices[0]があってapiVoices[0]がnullなら、apiVoicesの[0]と[1]にpitch違いで入れる。
        if (fetchVoices.length >= 1 && vals.apiVoices[0] === null) {
            // 最初に最初の'en-US'の高い音を追加しておく。
            addApiVoices(fetchVoices[0], /* voicePitch */ 1.4)

            // 次に最初の'en-US'の普通の高さの音も追加しておく。
            addApiVoices(fetchVoices[0])
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

        // voicesに渡す事でアプリに渡す。
        setVoices([...vals.apiVoices])

        // 変数にfetchVoicesの数を入れておく。次回レンダリング時に声が増えてなければ処理しないための、判定用。
        vals.fetchVoicesLength = fetchVoices.length
    }, [fetchVoices] )




}
