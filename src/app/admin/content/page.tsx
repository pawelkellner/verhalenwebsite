"use client"
import React, {useState} from "react";

import styles from "./page.module.scss";

import MainLayout from "../../../components/main-layout/main-layout";
import PageTitle from "../../../components/page-title/page-title";
import StoryCard from "../../../components/story-card/story-card";
import {useStories} from "../../../components/posts-provider/postsProvider";
import TextEditor from "../../../components/editor/editor";
import TextInput from "../../../components/text-input/text-input";
import Button from "../../../components/button";
import {isUserLoggedIn, submitContent} from "../../actions";

export default function Page() {
    const { reviewedStories, notReviewedStories, loading } = useStories();
    const [ about, setAbout ] = useState('');
    const [ write, setWrite ] = useState('');
    const [ homeHeading, setHomeHeading ] = useState('');
    const [ homeText, setHomeText ] = useState('');
    const [ homeButton, setHomeButton ] = useState('');
    const [ writeCheckbox, setWriteCheckbox ] = useState('');
    const [ contentId, setContentId ] = useState('')

    const isAboutText = about ? about?.length > 1 : false
    const isWriteText = write ? write?.length > 1 : false

    const parseData = (formData) => {
        console.log(formData.get('homeHeading'))
        const parsedObj = {
            homeHeading: formData.get('homeHeading'),
            homeText: formData.get('homeText'),
            homeButton: formData.get('homeButton'),
            writeContent: write,
            writeCheckboxText: formData.get('writeCheckbox'),
            aboutContent: about
        }

        return parsedObj;
    }

    const editContent = async (e) => {
        e.preventDefault();

        const data = new FormData(e.target)
        const dataObj = parseData(data);

        console.log('hallo')

        try {
            const isLoggedIn = await isUserLoggedIn();

            if ( isLoggedIn ) {
                await submitContent(dataObj, contentId);

                console.log('hllo')
            } else {
                console.log('Not logged in')
            }
        } catch (e) {
            console.error(e)
        }
    }

    const setWriteData = (data) => {
        setWrite(data);
    }

    const setAboutData = (data) => {
        setAbout(data);
    }

    return (
        <>
            <MainLayout>
                <PageTitle title="Content beheer" />
                <form onSubmit={editContent}>
                    <TextInput name={'homeHeading'} type={'text'} label={'Home heading'} value={homeHeading || ''} onChange={(e) => { setHomeHeading(e.target.value) }}/>
                    <TextInput name={'homeText'} type={'text'} label={'Home tekst'} value={homeText || ''} onChange={(e) => { setHomeText(e.target.value) }}/>
                    <TextInput name={'homeButton'} type={'text'} label={'Home button'} value={homeButton || ''} onChange={(e) => { setHomeButton(e.target.value) }}/>
                    <TextEditor placeholder={'...'} label={'Over ons'} value={about || ''} onChange={setAboutData}/>
                    <TextInput name={'writeCheckbox'} type={'text'} label={'Schrijven - checkbox'} value={writeCheckbox || ''} onChange={(e) => { setWriteCheckbox(e.target.value) }}/>
                    <TextEditor placeholder={'...'} label={'Schrijven - omschrijving'} value={write || ''} onChange={setWriteData}/>
                    <Button
                        variant={
                            homeHeading === "" || homeText === "" || homeButton === "" || writeCheckbox === "" || !isAboutText || !isWriteText
                                ? "disabled"
                                : "secondary"
                        }
                        style={{ width: "100%" }}
                    >
                        Pas content aan
                    </Button>
                </form>
            </MainLayout>
        </>
    );
}
