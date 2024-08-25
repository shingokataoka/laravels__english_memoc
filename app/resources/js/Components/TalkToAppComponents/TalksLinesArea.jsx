import { useState, useRef, useEffect, useLayoutEffect, createContext, useContext } from 'react'


import {TalksLinesAreaContext} from '@/Pages/User/TalkToApp'

import {css} from '@emotion/react'
import {defaultTheme} from '@/Components/DefaultThemeProvider'
import LineOfApp from '@/Components/TalkToAppComponents/LineOfApp'
import LineOfUser from './LineOfUser'


// Line.jsxに渡す用のuseContext。
export const AreaToLineContext = createContext()



/** @jsxImportSource @emotion/react */
export default function TalksLinesArea({

}) {
    const palette = defaultTheme().palette

    // TalkToAppからの値を受け取る。
    const {ApiVoice, userVoicem, lines, linesAnimateStatus, setLinesAnimateStatus, checkTranslations, setCheckTranslations} = useContext(TalksLinesAreaContext)

    // lines[0]とlines[2]にアニメーション用。
    const dom0Ref = useRef(null)
    const dom2Ref = useRef(null)
    // アニメーションミリ秒。
    const slideMSec = 500

    // 初回レンダリングを管理。
    const [isFirstRender, setIsFirstRender] = useState(false)




    // 初回レンダリング時にlines[0]の高さを0にしておく。
    useEffect(() => {
        if (isFirstRender === false) dom0Ref.current.style.height = 0
    }, [isFirstRender])



    // linesのアニメが'playing'ならアニメーションをセットの処理。
    useLayoutEffect( () => {

        // linesAnimateStatusが 再生中 ならの処理。
        if (linesAnimateStatus === 'playing') {
            // 2にslideDown表示アニメをセットする。
            const dom2Height = dom2Ref.current.getBoundingClientRect().height
            dom2Ref.current.animate([
                {height: 0, overflowY: 'hidden'},
                {height: `${dom2Height}px`, overflowY: 'hidden'},
            ], slideMSec)

            // 0にslideUp非表示アニメをセットする。
            const dom0Height = dom0Ref.current.getBoundingClientRect().height
            const animation = dom0Ref.current.animate([
                {height: `${dom0Height}px`, overflowY: 'hidden'},
                {height: 0, overflowY: 'hidden'},
            ], slideMSec)

            // lines[0]のアニメ後に処理。
            animation.finished.then(() => {
                // lines[0]の高さを0にする。
                dom0Ref.current.style.height = 0
                // overflow-yのhiddenもする。
                dom0Ref.current.style.overflowY = 'hidden'
                // linesのアニメ状態を再生後にする。
                setLinesAnimateStatus('played')
            })
        }

        // linesAnimateStatusが 再生後 ならの処理。
        if (linesAnimateStatus === 'played') {
            // 0 1をここ0に入れる、つまり元0は消える。
            lines[0] = lines[1]
            lines[0].index = 0
            // 1 2をここ1に入れる。
            lines[1] = lines[2]
            lines[1].index = 1
            // 2 ここは空nullにする、（追加ボタン時に入れるスペース）
            lines[2] = {
                index: 2,
                who: 'none',
                englishLine: `null`,
                japaneseLine: `null`,
            }
            // lines[0]の高さを'auto'に戻す。
            dom0Ref.current.style.height = 'auto'
            // overflow-yも'visible'に戻す。
            dom0Ref.current.style.overflowY = 'visible'

            // lines[1]の 辞書にない英単語があればAIからもらう。
            setCheckTranslations(true)

            // linesAnimateStatusを 通常 に戻す。
            setLinesAnimateStatus('none')
        }

    }, [linesAnimateStatus])




    // 初回のレンダリングならisFirstRenderをtrueにする。
    useEffect(() => {
        if (isFirstRender === false) setIsFirstRender(true)
    }, [isFirstRender])





    return (<div
            css={css`
            position: relative;
            margin: 0 auto;
            max-width: 700px;
        `}
    >
        {/* lines[0] */}
        <div ref={dom0Ref}>
            { (lines[0].who === 'ai')? <LineOfApp line={lines[0]} /> : ''}
            { (lines[0].who === 'user')? <LineOfUser line={lines[0]} /> : ''}
        </div>
        {/* lines[1] */}
        <div>
            { (lines[1].who === 'ai')? <LineOfApp
                line={lines[1]}
                checkTranslations={checkTranslations}
                setCheckTranslations={setCheckTranslations}
            /> : ''}
            { (lines[1].who === 'user')? <LineOfUser
                line={lines[1]}
                checkTranslations={checkTranslations}
                setCheckTranslations={setCheckTranslations}
            /> : ''}
        </div>
        {/* lines[2] */}
        <div ref={dom2Ref}>
            { (lines[2].who === 'ai')? <LineOfApp line={lines[2]} /> : ''}
            { (lines[2].who === 'user')? <LineOfUser line={lines[2]} /> : ''}
        </div>

    </div>)
}
