import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

import {defaultTheme, DefaultThemeProvider } from '@/Components/DefaultThemeProvider';
import { css } from '@emotion/react';

/** @jsxImportSource @emotion/react */
export default function Guest({ children }) {
    const palette = defaultTheme().palette

    return (<DefaultThemeProvider>
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0"
            css={css`
                padding: 32px 0;
                background: ${ palette.bgBack };
                * {
                    color: ${palette.text.primary};
                }
                input {
                   background: ${ palette.bgSub };
                }
                .text-red-600 {
                    color:red;
                }
                .link {
                    color: ${ palette.text.disabled };
                    &:hover { color: ${ palette.text.primary }; }
                }
                input[type=checkbox] { color: ${ palette.primary.main }; }
                .submit_button {
                    background: ${palette.primary.main};
                    color: ${palette.bgMain};
                }
            `}
        >
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 shadow-md overflow-hidden sm:rounded-lg"
                css={css`
                    background: ${palette.bgMain};
                `}
            >
                {children}
            </div>
        </div>
    </DefaultThemeProvider>);
}
