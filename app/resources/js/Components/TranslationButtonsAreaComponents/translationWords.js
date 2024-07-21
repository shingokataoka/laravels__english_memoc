import spellWords from '@/../../public/dictionaries/ejdic-hand-json/ejdict.json'


// パブリックドメイン辞書に追加したオブジェクト(連想配列)。
export default {
    ...spellWords,
    Gundam: `白い高性能モビルスーツ。
        初代は連邦軍が開発した。/
        漫画やアニメなどの空想上の存在だが、現実には等身大の巨大模型が製作された過去がある。`,
    bored: '退屈',
    ATM: 'ATM、お金を下ろしたりできる機械のこと。',
    email: '電子メール。スマホやパソコンなどコンピューター上のメール。',
    ing: '主語+ingで現在進行形/〇〇ing：〇〇している',
    "n't": 'notの省略系',
    "'s": "has, is, us,(疑問詞のあとの) doesの短縮形/"
        + "Tom's : トムの｜Marie's : マリーの",
    d: "過去形の語尾。例　move + ed（単語の語尾がeならdのみ） で moved など。/move：移動する/moved：移動した/アルファベットのd。",
    ed: "過去形の語尾。例　say + ed で sayed など。/say：言う/sayed：言った",
    Vikram: 'ヴィクラム（人の名前）',
    AI: 'AI（人工知能）/コンピュータや機械が人間の知能を模倣し、学習、推論、問題解決、言語理解などの知的作業を行う技術。/主に機械学習や深層学習を用いて、データからパターンを学び、予測や判断を行う。'
}
