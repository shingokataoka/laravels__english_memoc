import { useEffect, useRef, useState } from "react"


// 配列をシャッフルして返す関数。
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        // 0からiの範囲でランダムなインデックスを取得
        const j = Math.floor(Math.random() * (i + 1));

        // 要素を交換
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}





export default function AudioControls({
    bgmStatus,
    setBgmStatus,
    sliderValue,
}) {

    // フェード時間Sec。
    const fadeSec = 9

    // 最大音量(0〜1で指定だが、英会話の邪魔にならない0.1ぐらい？)。
    const maxVolume = 0.1

    // 曲のURLパス一覧。
    const bgmUrls = [
        '/musics/1.mp3',
        '/musics/2.mp3',
        '/musics/3.mp3',
        '/musics/4.mp3',
        '/musics/5.mp3',
        '/musics/6.mp3',
        '/musics/7.mp3',
        '/musics/8.mp3',
        '/musics/9.mp3',
        '/musics/10.mp3',
        '/musics/11.mp3',
        '/musics/12.mp3',
        '/musics/13.mp3',
        '/musics/14.mp3',
        '/musics/15.mp3',
        '/musics/16.mp3',
        '/musics/17.mp3',
        '/musics/18.mp3',
        '/musics/19.mp3',
        '/musics/20.mp3',
        '/musics/21.mp3',
        '/musics/22.mp3',
    ]

    const dataRef = useRef({
        audioContext: null, // audioContextをここに保存する。
        volume: maxVolume,
        index: 0,
        beforeAudioDatas: [],
        audioDatas: [],
        timeoutObjs: [],
        audioData: null,
        timeoutObj: null,
        startTime: 0,
        pauseTime: 0,
        // bgmUrls: shuffleArray(bgmUrls),
        currentBgmUrl: null,
        bgmUrls: shuffleArray(bgmUrls),
    })
    // 上記のエイリアス。
    const data = dataRef.current


    // 初回レンダリングならtrue。
    const [isFirstRender, setIsFirstRender] = useState(true)



    // 音楽ファイルを読み込む関数。バッファというのを返している。
    const loadAudio = async (bgmUrl, index) => {
        const response = await fetch(bgmUrl);
        const arrayBuffer = await response.arrayBuffer();
        return await data.audioContext.decodeAudioData(arrayBuffer);
    };



    // 現在の曲にフェードインをセットする。
    const setFadeIn = () => {
        const currentTimeSec = data.audioContext.currentTime

        const gainNode = currentAudioData().gainNode

        // 開始音量=0, 再生音量=data.volume, フェード時間2秒。
        gainNode.gain.setValueAtTime(0, currentTimeSec);
        gainNode.gain.linearRampToValueAtTime(data.volume, currentTimeSec + fadeSec);
    }



    // 現在の曲にフェードアウトをセットする。
    const setFadeOut = () => {
        const currentTimeSec = data.audioContext.currentTime

        const audioData = currentAudioData()

        // フェードアウトをセットする。
        const endTimeSec = currentTimeSec + audioData.source.buffer.duration
        audioData.gainNode.gain.setValueAtTime(data.volume, endTimeSec - fadeSec)
        audioData.gainNode.gain.linearRampToValueAtTime(0, endTimeSec)
    }



    // 一曲を再生する。
    const startBgm = async (bgmUrl) => {
        // 再生管理のオブジェクトを生成。
        const source = data.audioContext.createBufferSource()
        // 生成管理Objに音楽ファイルのバッファを入れる。
        source.buffer = await loadAudio(bgmUrl)

        // この曲用に、gainNode（音量操作オブジェクト）を作成。
        const gainNode = data.audioContext.createGain();
        // この音量操作Objをdata.audioContextのdestinationに繋ぐ。
        gainNode.connect(data.audioContext.destination);

        // そして音量操作Objに再生管理Objを繋ぐ。
        source.connect(gainNode)

        // この曲のsourceやgainNodeやendTimeSecなどをuseRefにセット。
        const audioData = {source, gainNode, endTImeSec: source.buffer.duration - data.pauseTime}

        data.audioDatas.push(audioData)

        // 音量を設定する。
        const currentTimeSec = data.audioContext.currentTime
        gainNode.gain.setValueAtTime(data.volume, currentTimeSec)

        // 再生開始。
        source.start(0, data.pauseTime)
        // 曲の始まりの開始時刻を保存。
        data.startTime = data.audioContext.currentTime - data.pauseTime

    }



    // 次の曲にインデックスを進める関数。
    const indexToNext = () => {
        const nextIndex = data.index + 1
        const maxIndex = data.bgmUrls.length - 1

        const currentbgmUrls = [...data.bgmUrls]
        // 次の曲がなければ、data.bgmUrlsをシャッフルして、data.index=-1にする。
        if (nextIndex > maxIndex) {
            // 現在の最後の曲と次の最初の曲が同じならシャッフルし直す。
            for (let i=0; i<30; i++) {
                data.bgmUrls = shuffleArray(bgmUrls)
                data.index = -1
                // 同じじゃないならループ終了。
                if (currentbgmUrls[maxIndex] !== data.bgmUrls[0]) break
            }
        }

        // indexを次の曲に進める。
        data.index += 1
        // 開始時間や停止時間など初期化。
        data.startTime = 0
        data.pauseTime = 0

    }



    // 全てのaudioDataを再生停止して接続解除してsetTimeoutも消す。
    // 第一引数で最新何個を残すか自然数で指定。
    const clearAllAudio = (numberLeft = 0) => {
        // audioDataの最大indexを取得。numberLeft=2なら最大index-2になる。
        const audioDatasMaxIndex = data.audioDatas.length - 1 - numberLeft
        // timeoutオブジェクトの最大indexを取得。numberLeft=2なら最大index-2になる。
        const timeoutMaxIndex = data.timeoutObjs.length - 1 - numberLeft

        // 全てのsetTimeoutを取り消す。
        for (let i=0; i <= timeoutMaxIndex; i++) {
            clearTimeout(data.timeoutObjs[i])
        }
        // 全てのtimeoutオブジェクトを消す。
        data.timeoutObjs = data.timeoutObjs.filter((row, index) => index > timeoutMaxIndex)

        // 全ての曲を再生停止して接続解除してオブジェクトを消す。
        for (let i=0; i <= audioDatasMaxIndex; i++) {
            // 再生を停止する。
            data.audioDatas[i].source.stop()
            // 接続を解除する。
            data.audioDatas[i].source.disconnect(data.audioDatas[i].gainNode)
            data.audioDatas[i].gainNode.disconnect(data.audioContext.destination)
        }
        // 全てのaudioDataを消す。
        data.audioDatas = data.audioDatas.filter((row, index) => {
            return index > audioDatasMaxIndex
        })
    }



    // 現在のaudioDataを返す。
    const currentAudioData = () => {
        return data.audioDatas[data.audioDatas.length - 1]
    }



    // 再生する。
    // 一曲目の再生実行と二曲目の再生をセットをする。
    const play = async () => {
        // 最新再生の1曲以外は完全に消す。
        clearAllAudio(1)

        // １曲目を再生する。
        await startBgm(data.bgmUrls[data.index])
        // 最初から再生ならフェードインをセットする。
        if (data.pauseTime === 0) setFadeIn()
        // フェードアウトをセットする。
        setFadeOut()

        // １曲目のフェードアウト直前の時間に、２曲目の再生をセットする。
        const timeoutObj = setTimeout(() => {
            // 次の曲にインデックスを進める。
            indexToNext()
            // 再生する。
            play()
        }, (currentAudioData().endTImeSec - fadeSec) * 1000 )

        // timeoutオブジェクトをuseRefに保存。
        data.timeoutObj = timeoutObj
        data.timeoutObjs.push(timeoutObj)
    }



    // 次へを押した処理。
    const skipNextBgm = () => {
        // 全ての再生を停止して消す。
        clearAllAudio()
        // 次の曲にインデックスを進める。
        indexToNext()
        // フェードインしないように停止位置をずらす。
        data.pauseTime = 0.1
    }



    // 「一時停止」を押した処理。
    const paused = e => {
        // まだaudioContextがないなら処理しない。
        if (data.audioContext === null) return

        // 曲の始まりの開始時刻から何秒後に停止したかを取得。
        data.pauseTime = data.audioContext.currentTime - data.startTime

        // 全てのオーディオを消す。
        clearAllAudio()
    }



    // スライダーの値が変わったら処理。
    useEffect(() => {
        // 音量を算出してuseRefに保存。
        let tmpVolume = sliderValue * 0.01 * maxVolume
        if (tmpVolume > maxVolume) tmpVolume = maxVolume
        data.volume = tmpVolume

        // audioDataがないなら処理しない。
        if (data.audioDatas.length === 0) return

        // 現在の曲以外を停止して消す。
        clearAllAudio(1)

        const currentTimeSec = data.audioContext.currentTime
        const gainNode = currentAudioData().gainNode

        // 念の為、音量変更系のスケジューラーを全て消す。
        gainNode.gain.cancelScheduledValues(currentTimeSec)
        // 音量の変更をする。
        gainNode.gain.setValueAtTime(data.volume, currentTimeSec);
        // フェードアウトをセットし直す。
        setFadeOut()
    }, [sliderValue])



    // bgmStatusが切り替わったら処理。
    useEffect(() => {

        // 初回レンダリングなら処理しない。
        if (isFirstRender === true) return

        // paused以外でまだ未作成なら、audioContextを生成してuseRefに保存しておく。
        if (
            bgmStatus !== 'paused'
            && data.audioContext === null
        ) {
            data.audioContext = new AudioContext()
        }

        // bgmStatusが'paused'になった時の処理。
        if (bgmStatus === 'paused') paused()

        // bgmStatusが'playing'になった時の処理。
        if (bgmStatus === 'playing') play()

        // bgmStatusが'skipNext'になった時の処理。
        if (bgmStatus === 'skipNext') {
            skipNextBgm()
            setBgmStatus('playing')
        }

    }, [bgmStatus])



    // 初回レンダリングを管理。
    useEffect(() => {
        if (isFirstRender === true) setIsFirstRender(false)
    }, [isFirstRender])



    // アンマウント時（他ページに行く時）にクリーンアップ処理。
    useEffect(() => {

        return () => {
            // audioContextを停止する。
            if (data.audioContext !== null) data.audioContext.close()
            // 全てのtimeout系とaudioData系を完全に消す。
            clearAllAudio()
        }
    }, [])


    return ''

}
