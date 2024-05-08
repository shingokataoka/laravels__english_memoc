import React from 'react'
import {useState, useRef, useEffect, useLayoutEffect} from 'react'

import nl2br from '@/Functions/Nl2br'

export default function Test() {
    const [toggle, setToggle] = useState(true)

    // 今回の移動は配列の値を変えるだけ。
    // よってFirst（移動前の位置）とLast（移動後の位置）は以下となる。

    // First                    Last
    // items[0] 値０ 切り替え後  items[0] 値１（last[0]の位置とする）
    // items[1] 値１             items[1] 値０（Last[1]の位置とする）

    // つまり
    // Last[0]の元の位置は、First[0]=items[1]元位置。
    // Last[1]の元の位置は、First[1]=items[0]元位置。



    // [ 0 => item[1]の移動前の位置, 1 => item[0]の移動前の位置 ]を入れる。
    const firstRectsRef = useRef([])
    // [ 0 =>  item[0]の移動後の位置, 1 => item[1]の移動後の位置 ]を入れる。
    const lastRectsRef = useRef([]) /*  */

    const [items, setItems] = useState([
        'word1',
        "word2\r\nword2word2"
    ])

    const itemsRef = useRef([])
    items.map( (item, index) => {
        itemsRef.current[index] = useRef(null)
    } )


    // 配列が入れ替わって描画前の処理
    useLayoutEffect( () => {
        if (firstRectsRef.current.length === 0) return

        // Lastの矩形情報を取得する用意。
        const item0Dom = itemsRef.current[0].current
        const item1Dom = itemsRef.current[1].current
        // Lastの矩形情報を取得する。
        lastRectsRef.current[0] = item0Dom.getBoundingClientRect()
        lastRectsRef.current[1] = item1Dom.getBoundingClientRect()

        // 各itemRefにアニメーションをセット
        itemsRef.current.map( (itemRef, i) => {
            const firstRect = firstRectsRef.current[i]
            const lastRect = lastRectsRef.current[i]
            // transformで使う移動距離pxをを取得
            const diffX = firstRect.x - lastRect.x
            const diffY = firstRect.y - lastRect.y

            // 移動アニメーションを設定する。
            // これがWeb Animation API。
            itemRef.current.animate([
                { transform: `translate(${diffX}px, ${diffY}px)`},
                { transform: `translate(0px, 0px)` }
            ], 100)
        } )
    }, [items] )


    return (<>

        { items.map( (item, i ) => (
            <p
                key={i}
                ref={ itemsRef.current[i] }
                style={{
                    width: '300px',
                    border:'3px grey solid',
                    margin: '8px',
                }}
            >{ nl2br(item) }</p>
        ) ) }

        <button
            onClick={ e => {
                // Firstの矩形情報を取得する用意。
                const item0Dom = itemsRef.current[0].current
                const item1Dom = itemsRef.current[1].current

                // Firstの矩形情報を取得する。
                // Last[0]の元の位置は、First[0]=items[1]元位置。
                firstRectsRef.current[0] = item1Dom.getBoundingClientRect()
                // Last[1]の元の位置は、First[1]=items[0]元位置。
                firstRectsRef.current[1] = item0Dom.getBoundingClientRect()

                // itemsの値の入れ替えをする。
                const newItems = [...items]
                setItems( [ newItems[1], newItems[0]] )
            } }
        >「入れ替え」</button>


    </>)



}
