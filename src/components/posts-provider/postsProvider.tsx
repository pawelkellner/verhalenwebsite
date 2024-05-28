'use client'
import {createContext, useContext, useEffect, useState} from 'react';
import {sortStories, Verhaal} from "../../utils";

interface StoriesContextType {
    stories: Verhaal[];
    notReviewedStories: Verhaal[];
    reviewedStories: Verhaal[];
    loading: boolean;
    limitedStories: Verhaal[];
}

const StoriesContext = createContext<StoriesContextType>({
    stories: [],
    notReviewedStories: [],
    reviewedStories: [],
    loading: true,
    limitedStories: []
});

export default function PostsProvider({children}) {
    const [stories, setStories] = useState<Verhaal[]>([]);
    const [notReviewedStories, setNotReviewedStories] = useState<Verhaal[]>([]);
    const [reviewedStories, setReviewedStories] = useState<Verhaal[]>([]);
    const [limitedStories, setLimitedStories] = useState<Verhaal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_FETCH_API_LINK}/api`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setStories(data.body);
                setReviewedStories(sortStories(data.body, false));
                setNotReviewedStories(sortStories(data.body, true));
                setLimitedStories(sortStories(data.body, false).slice(0, 7));
                setLoading(false);
            });
    }, []);

    return (
        <StoriesContext.Provider value={{ stories, notReviewedStories, reviewedStories, loading, limitedStories }}>
            {children}
        </StoriesContext.Provider>
    );
}

export function useStories() {
    return useContext(StoriesContext)
}