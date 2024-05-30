'use client'
import {createContext, useContext, useEffect, useState} from 'react';
import {SiteContent} from "../../utils";

interface SiteContentType {
    content: {
        id: string;
        homeHeading: string;
        homeText: string;
        homeButton: string;
        writeContent: string;
        writeCheckboxText: string;
        aboutContent: string;
    };
}

const SiteContext = createContext<SiteContentType>({
    content: {
        id: '',
        homeHeading: '',
        homeText: '',
        homeButton: '',
        writeContent: '',
        writeCheckboxText: '',
        aboutContent: '',
    }
});

export default function SiteContentProvider({children}) {
    const [content, setContent] = useState<SiteContentType['content']>(
        {
                id: '',
                homeHeading: '',
                homeText: '',
                homeButton: '',
                writeContent: '',
                writeCheckboxText: '',
                aboutContent: ''
            }
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_FETCH_API_LINK}/api/site-content`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setContent(data.body[0]);
                setLoading(false);
            });
    }, []);

    return (
        <SiteContext.Provider value={{ content }}>
            {children}
        </SiteContext.Provider>
    );
}

export function useSiteContent() {
    return useContext(SiteContext)
}