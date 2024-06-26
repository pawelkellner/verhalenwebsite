import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface SiteContent {
    id: string;
    homeHeading: string;
    homeText: string;
    homeButton: string;
    writeContent: string | TrustedHTML;
    writeCheckboxText: string;
    aboutContent: string;
}

export interface Verhaal {
    id: string;
    name: string;
    email: string;
    storyTitle: string;
    storyText: string | TrustedHTML;
    storyFileUrl?: string;
    author: string;
    song: {
        album: string;
        albumImage: string | StaticImport;
        artist: string;
        id: string;
        name: string;
        type: string;
        url: string;
    };
    songTitle: string;
    songText: string | TrustedHTML;
    songImage?: string | StaticImport;
    songOrigin: string;
    linkToSong: string;
    quoteAuthor: string;
    quoteText: string;
    originText: string;
    number: number;
    underReview: boolean;
    createdAt: {
        seconds: number,
        nanoseconds: number
    };
}

export const sortStories = (stories, underReview) => {
    return stories?.sort((a, b) => {
        const dateA = new Date(
            a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000
        ).getTime();
        const dateB = new Date(
            b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000
        ).getTime();
        return dateB - dateA;
    }).filter((item) => item.underReview === underReview)
}

export const getFileExtensionFromUrl = (url: string | undefined | null): string => {
    try {
        if (!url) {
            throw new Error("URL is undefined or null");
        }
        const fileName = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
        const decodedFileName = decodeURIComponent(fileName);
        return decodedFileName.split(".").pop()?.toLowerCase() || "";
    } catch (error) {

        console.error("Error extracting file extension:", error);
        return "";
    }
};
