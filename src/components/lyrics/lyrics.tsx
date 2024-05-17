import React from 'react';

const Lyrics = () => {

    const apiURL = 'https://api.lyrics.ovh';

    const getLyrics = async (artist, title) => {
        console.log("here")
        const response = await fetch(`${apiURL}/v1/${artist}/${title}`);
        const data = await response.json();
        console.log(data.lyrics)
    }
    return(
        <>
        <p onClick={() => getLyrics("Kendrick Lamar", "Money Trees")} >hi</p>
        </>
    )
}
  

export default Lyrics;
