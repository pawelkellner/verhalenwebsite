import React, { useState, useEffect } from 'react';
import './styles.css';
import styles from "./spotify-search-module.scss";



function SpotifyApp() {
    // Variables that do not need state (always the same)
    const clientId = '7dc0428f34154a42a4e4a26571e8b410';
    const clientSecret = '5b33db7a5ee84ca5893cac234137cda9';

    // Variables that need state
    const [accessToken, setAccessToken] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedResult, setSelectedResult] = useState([]);
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [artistSongs, setArtistSongs] = useState([]);


    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("https://accounts.spotify.com/api/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        "grant_type": "client_credentials",
                        "client_id": clientId,
                        "client_secret": clientSecret
                    })
                });

                if (!response.ok) {
                    throw new Error("Failed to get access token");
                }

                const data = await response.json();
                setAccessToken(data.access_token);

            } catch (error) {
                console.error("Error:", error.message);
            }
        })();
    }, [clientId, clientSecret]);

    async function searchArtist() {
        try {

            if (searchQuery.trim() === '') {
                setSelectedResult(null);
                setSearchResults([]);
                return;
            }

            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=artist,track&limit=15`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to search for artist or track");
            }

            const data = await response.json();

            const artists = data.artists ? data.artists.items.map(item => ({
                id: item.id,
                type: 'Artist',
                name: item.name,
                profileImage: item.images.length > 0 ? item.images[0].url : null
            })) : [];

            const tracks = data.tracks ? data.tracks.items.map(item => ({
                id: item.id,
                type: 'Track',
                name: item.name,
                artist: item.artists[0].name,
                album: item.album.name,
                albumImage: item.album.images.length > 0 ? item.album.images[0].url : null
            })) : [];

            setSearchResults([...artists, ...tracks]);

            console.log([...artists, ...tracks])

        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    async function resultSelected(result) {
        console.log(result)
        if (result.type === 'Artist') {
            setArtistAlbums([]);
            setArtistSongs([]);
            try {
                const response = await fetch(`https://api.spotify.com/v1/artists/${result.id}/albums`, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch artist albums");
                }

                const data = await response.json();

                const albums = data.items.map(item => ({
                    id: item.id,
                    name: item.name,
                    image: item.images[0]?.url
                }));

                setArtistAlbums(albums);
                setSelectedResult([{ type: result.type, name: result.name }]);

            } catch (error) {
                console.error("Error:", error.message);
            }
        } else {
            setSelectedResult([result]);
        }
    }

    async function getAlbumSongs(album) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch artist albums");
            }

            const data = await response.json();

            console.log(data)

            const tracks = data.items.map(item => ({
                id: item.id,
                type: "Track",
                name: item.name,
                artist: item.artists[0].name,
                album: album.name,
                albumImage: album.image,
            }));

            setArtistAlbums([album]);
            setArtistSongs(tracks);
            console.log(tracks)

        } catch (error) {
            console.error("Error:", error.message);
        }
    }
    


    return (
        <div className=''>
            {/* Search bar */}
            <div className="">
                <input
                    className="search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            searchArtist();
                        }
                    }}
                    placeholder="Search for an artist or song"
                />
                {/* <button className="search-button" onClick={searchArtist}>Search</button> */}
            </div>

            {/* Search results */}
            <div className="search_results-container">
                {selectedResult && selectedResult.length > 0 ? (
                    selectedResult[0].type === 'Track' ? (
                        <div className='result-list'>
                            <img src={selectedResult[0].profileImage || selectedResult[0].albumImage} alt={selectedResult[0].id} className='result-image' />
                            <div className='result-text'>
                                <p>{selectedResult[0].name}</p>
                                <p className='grey'>{selectedResult[0].artist}</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p>{selectedResult[0].type}</p>
                            <p>{selectedResult[0].name}</p>


                            {/* Display artist albums */}

                            <div className='albums-container'>
                                {artistAlbums.map(album => (
                                    <div key={album.id} className='album-item' onClick={() => getAlbumSongs(album)}>
                                        <img src={album.image} alt={album.name} className='album-image' />
                                        <p className='album-name'>{album.name}</p>
                                    </div>
                                ))}
                            </div>

                            {artistSongs.length > 0 ? (
                                <div className='songs-container'>
                                    {artistSongs.map(song => (
                                        <div key={song.id} className='song-item' onClick={() => resultSelected(song)}>
                                            <p>{song.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : null}

                        </>
                    )
                ) : searchResults.length > 0 ? (
                    <ul>
                        {searchResults.map(result => (
                            <li key={result.id} className='result-list' onClick={() => resultSelected(result)}>
                                <img src={result.profileImage || result.albumImage} alt={result.id} className='result-image' />
                                <div className='result-text'>
                                    <p>{result.name}</p>
                                    <p className='grey'>{result.type}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    // <p>No results</p>
                    <></>
                )}
            </div>

        </div>
    );
}

export default SpotifyApp;