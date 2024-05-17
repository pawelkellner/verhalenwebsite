export type StoryCardProps = {
    id: string
    title: string
    image?: string
    text: string | TrustedHTML
    author: string
    songName: string
    skeleton?: boolean
}

