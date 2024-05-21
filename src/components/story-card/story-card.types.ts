import {StaticImport} from "next/dist/shared/lib/get-img-props";

export type StoryCardProps = {
    id: string
    title: string
    image?: string | StaticImport
    text: string | TrustedHTML
    author: string
    songName: string
    skeleton?: boolean
    customUrl?: string
}

