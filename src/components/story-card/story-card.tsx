'use client'
import "./story-card.scss";
import Image from 'next/image';
import Heading from "../typography/heading";
import Paragraph from "../typography/paragraph";
import NoteSvg from "../svg/NoteSvg";
import {useEffect, useState} from "react";

const StoryCard = () => {
    const [ textData, setTextData ] = useState('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi esse laboriosam officia quae. Architecto aut debitis distinctio dolorum error fuga id, illo laboriosam minus, necessitatibus quod repudiandae sequi veritatis vero?');
    const [ introText, setIntroText ] = useState('')
    const [ screenWidth, setScreenWidth ] = useState(0);
    const [ listenerSet, setListenerSet ] = useState(false);

    useEffect(() => {
        if ( !listenerSet ) {
            window.addEventListener('resize', (e: Event) => {
                if ( e.target instanceof Window) {
                    setScreenWidth(e.target.innerWidth)
                }
            })

            setScreenWidth(window.innerWidth);
            setListenerSet(true);
        }

        shortText();
    }, [screenWidth]);

    function shortText(){
        let wordsArray = textData.match(/[\w\S]+/g);
        let newIntroText: string;
        let stringIndex = 0
        let amountOfWords;

        switch (true) {
            case screenWidth >= 768:
                amountOfWords = 29;
                break;
            case screenWidth >= 510:
                amountOfWords = 20;
                break;
            case screenWidth >= 400:
                amountOfWords = 15;
                break;
            default:
                amountOfWords = 10;
                break;
        }

        wordsArray && wordsArray.forEach( (word, index) => {
           if ( index === amountOfWords ) {
               stringIndex = textData.indexOf(word) + word.length;
           }
        });

        newIntroText = textData.slice(0, stringIndex);

        if ( newIntroText.slice(-1) === ',' || newIntroText.slice(-1) === '.' ) {
            newIntroText = newIntroText.slice(0, newIntroText.length - 1);
        }

        newIntroText += '...';

        setIntroText(newIntroText);
    }

    return (
        <div className='storycard'>
            <div className='storycard__imageWrapper'>
                <Image
                fill
                src={'https://picsum.photos/200'}
                alt={'Image'}
                />
            </div>
            <div className='storycard__content'>
                <div>
                    <div className='storycard__imageWrapperMobile'>
                        <Image
                        fill
                        src={'https://picsum.photos/200'}
                        alt={'Image'}
                        />
                    </div>
                    <div className='storycard__textWrapper'>
                        <Heading>Peter en de PowerPoint</Heading>
                        <Paragraph>
                            {introText}
                            <a href='#' className='storycard__readmore'>  Lees verder</a>
                        </Paragraph>
                    </div>
                </div>
                <Paragraph><span>Geschreven door </span>Marjolein (gastschrijver)</Paragraph>
                <span className='storycard__song'>
                    <Paragraph>The Doors - People Are Strange</Paragraph>
                    <NoteSvg/>
                </span>
            </div>
        </div>
    );
};

export default StoryCard;