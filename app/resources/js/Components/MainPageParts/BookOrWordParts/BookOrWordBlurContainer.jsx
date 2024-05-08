import {forwardRef} from 'react'

import {css} from '@emotion/react'


/** @jsxImportSource @emotion/react */
const BookOrWordBlurContainer = forwardRef( (props, ref) => {
    const {className, index, replacementIndex0, replacementIndex1, setReplacementIndex0, setReplacementIndex1, bookOrWordDomRefs, bookOrWords, bookOrWord} = props





    return (<div
        ref={ref}
        className={className}
        css={css`
            margin: 0;
            madding: 0;
            position: absolute;
            top: 0;
            bottom: 0;
            left: -16px;
            right: 0;
            background: #8886;
            backdrop-filter: blur(0.7px);
        `}
    >
        { props.children }
    </div>)
} )
export default BookOrWordBlurContainer
