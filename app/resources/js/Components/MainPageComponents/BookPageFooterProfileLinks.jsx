import React, {useEffect, useLayoutEffect, useState, useRef } from "react"
import { css } from "@emotion/react"

import { Stack } from "@mui/material"

import ProfileLinkButton from "@/Components/MainPageParts/FooterProfileLinksParts/ProfileLinkButton"
import LogoutButton from "@/Components/MainPageParts/FooterProfileLinksParts/LogoutButton"


/** @jsxImportSource @emotion/react */
export default function BookPageFooterProfileLinks() {





    return (
    <Stack
    direction="column"
    justifyContent="flex-start"
    alignItems="center"
    spacing={2}
    css={css`
        margin: 0 auto;
        width: 100%;
        max-width: 500px;
        border-top: 1px grey solid;
        padding: 6px;
    `}
    >



        <ProfileLinkButton />
        <LogoutButton />

    </Stack>)
}
