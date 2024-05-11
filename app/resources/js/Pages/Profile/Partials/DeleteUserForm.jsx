import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

import { css } from '@emotion/react';
import {defaultTheme} from '@/Components/DefaultThemeProvider'



/** @jsxImportSource @emotion/react */
export default function DeleteUserForm({ className = '' }) {

    const palette = defaultTheme().palette

    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium">
                    Delete Account<br />
                    アカウントを削除する
                </h2>

                <p className="mt-1 text-sm opacity-[0.9]">
                    When you delete your account, all data will be deleted.<br />
                    アカウントを削除すると、全てのデータが消えます。
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Delete Account<br />
                アカウントを削除する
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}
                css={css`
                    form { background:${palette.bgMain}; }
                `}
            >
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium">
                        Are you sure you want to delete your account?<br />
                        アカウントを削除してもよろしいですか?
                    </h2>

                    <p className="mt-1 text-sm opacity-[0.9]">
                        When you delete your account, all data will be deleted.<br />
                        Please enter your password to confirm you would like to permanently delete your account.<br />
                        アカウントを削除すると、全てのデータが消えます。<br />
                        アカウントを完全に削除することを確認するため、パスワードを入力してください。
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="パスワード" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="パスワード"
                            css={css` background:${palette.bgSub}; `}
                        />

                        <InputError message={errors.password} className="mt-2"
                            css={css` color:${palette.error.main}; `}
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel<br />
                            キャンセル
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account<br />
                            アカウントを削除する
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
