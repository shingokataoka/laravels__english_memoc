import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateEmailForm from './Partials/UpdateEmailForm';
import { Head, usePage } from '@inertiajs/react';

import {css}  from '@emotion/react'
import { defaultTheme, DefaultThemeProvider } from '@/Components/DefaultThemeProvider';

import AllPageComponent from '@/Components/AllPageComponent'

import {Link} from '@inertiajs/react'
import { Button } from '@mui/material';
import UpdatedEmailModal from '@/Pages/Profile/Partials/UpdatedEmailModal'





/** @jsxImportSource @emotion/react */
export default function Edit({ auth, mustVerifyEmail, status }) {

    const appName = usePage().props.config.name
    const palette = defaultTheme().palette





    return (<DefaultThemeProvider>
    <AllPageComponent />

    <UpdatedEmailModal />

    <h1
        css={css`
            margin-top: 12px;
            text-align: center;
        `}
    >
        <Button variant="outlined"
            component={Link}
            href="/"
            css={css` font-size: 1.2rem; `}
        >{appName}</Button>
    </h1>

    <div css={css` text-align:center; padding-top:16px;`}>プロフィール編集</div>

    <div className="py-12">

        <Head title="プロフィール編集" />

        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 shadow sm:rounded-lg"
                css={css` background: ${palette.bgMain}; `}
            >
                <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                    className="max-w-xl"
                />
            </div>


            <div className="p-4 sm:p-8 shadow sm:rounded-lg"
                css={css` background: ${palette.bgMain}; `}
            >
                <UpdateEmailForm className="max-w-xl" />
            </div>


            <div className="p-4 sm:p-8 shadow sm:rounded-lg"
                css={css` background: ${palette.bgMain}; `}
            >
                <UpdatePasswordForm className="max-w-xl" />
            </div>

            <div className="p-4 sm:p-8 shadow sm:rounded-lg"
                css={css` background: ${palette.bgMain}; `}
            >
                <DeleteUserForm className="max-w-xl" />
            </div>
        </div>
    </div>
    </DefaultThemeProvider>);
}
