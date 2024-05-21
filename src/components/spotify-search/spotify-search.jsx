import React, { useState, useEffect } from "react";
import "./styles.css";
import Paragraph from "../typography/paragraph";
import { theme } from "../../theme";
import inputStyle from "../text-input/text-input.module.scss";
import Button from "../button";

function SpotifyApp({
  getSong,
  setSong,
  searchQuery,
  setSearchQuery,
  searchResults,
  setSearchResults,
  selectedResult,
  setSelectedResult,
  artistAlbums,
  setArtistAlbums,
  artistSongs,
  setArtistSongs,
}) {
  // Variables that do not need state (always the same)
  const clientId = "7dc0428f34154a42a4e4a26571e8b410";
  const clientSecret = "5b33db7a5ee84ca5893cac234137cda9";

  // Variables that need state
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
          }),
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

  useEffect(() => {
    searchArtist();
  }, [searchQuery]);

  async function searchArtist() {
    try {
      if (searchQuery.trim() === "") {
        setSelectedResult(null);
        setSearchResults([]);
        return;
      }

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchQuery
        )}&type=artist,track&limit=15`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to search for artist or track");
      }

      const data = await response.json();

      const artists = data.artists
        ? data.artists.items.map((item) => ({
            id: item.id,
            type: "Artist",
            name: item.name,
            profileImage: item.images.length > 0 ? item.images[0].url : null,
          }))
        : [];

      const tracks = data.tracks
        ? data.tracks.items.map((item) => ({
            id: item.id,
            type: "Track",
            name: item.name,
            artist: item.artists[0].name,
            album: item.album.name,
            albumImage:
              item.album.images.length > 0 ? item.album.images[0].url : null,
          }))
        : [];

      setSearchResults([...artists, ...tracks]);

      console.log([...artists, ...tracks]);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async function resultSelected(result) {
    console.log(result);
    if (result.type === "Artist") {
      setArtistAlbums([]);
      setArtistSongs([]);
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${result.id}/albums`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch artist albums");
        }

        const data = await response.json();

        const albums = data.items.map((item) => ({
          id: item.id,
          name: item.name,
          image: item.images[0]?.url,
        }));

        console.log(albums);

        setArtistAlbums(albums);
        setSelectedResult([{ type: result.type, name: result.name }]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      setSong(result);
      setSelectedResult([result]);
      getSong(result);
    }
  }

  async function getAlbumSongs(album) {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/albums/${album.id}/tracks`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch artist albums");
      }

      const data = await response.json();

      console.log(data);

      const tracks = data.items.map((item) => ({
        id: item.id,
        type: "Track",
        name: item.name,
        artist: item.artists[0].name,
        album: album.name,
        albumImage: album.image,
      }));

      setArtistAlbums([album]);
      setArtistSongs(tracks);
      console.log(tracks);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  return (
    <div className={inputStyle.input__group} style={{ gap: 0 }}>
      <label htmlFor={"spotify"} style={{ fontSize: 18, paddingBottom: 6 }}>
        Het liedje*
      </label>
      {/* Conditional rendering of the search bar */}
      {!(
        selectedResult &&
        selectedResult.length > 0 &&
        selectedResult[0].type === "Track"
      ) && (
        <div
          style={{
            width: "100%",
          }}
        >
          <input
            id="spotify"
            className="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Zoek de artiest van het lied"
            style={
              searchResults.length > 0
                ? {
                    borderBottomStyle: "none",
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,
                  }
                : {}
            }
          />
        </div>
      )}

      {/* Search results */}
      <div
        style={{
          width: "100%",
          backgroundColor: theme.grey[100],
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderTopLeftRadius:
            selectedResult &&
            selectedResult.length > 0 &&
            selectedResult[0].type === "Track"
              ? 10
              : 0,
          borderTopRightRadius:
            selectedResult &&
            selectedResult.length > 0 &&
            selectedResult[0].type === "Track"
              ? 10
              : 0,
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: theme.grey[200],
        }}
      >
        {selectedResult && selectedResult.length > 0 ? (
          selectedResult[0].type === "Track" ? (
            <div className="result-list" style={{ position: "relative" }}>
              <img
                src={
                  selectedResult[0].profileImage || selectedResult[0].albumImage
                }
                alt={selectedResult[0].id}
                className="result-image"
              />
              <div className="result-text">
                <Paragraph>{selectedResult[0].name}</Paragraph>
                <Paragraph className="grey">
                  {selectedResult[0].artist}
                </Paragraph>
              </div>
              <Button
                variant="unstyled"
                style={{ position: "absolute", right: 0, top: 0 }}
                onClick={() => {
                  setSong("");
                  setSearchResults([]);
                  setSearchQuery("");
                  setSelectedResult([]);
                  setArtistAlbums([]);
                  setArtistSongs([]);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 26 26"
                  fill={theme.grey[400]}
                >
                  <path d="M 21.734375 19.640625 L 19.636719 21.734375 C 19.253906 22.121094 18.628906 22.121094 18.242188 21.734375 L 13 16.496094 L 7.761719 21.734375 C 7.375 22.121094 6.746094 22.121094 6.363281 21.734375 L 4.265625 19.640625 C 3.878906 19.253906 3.878906 18.628906 4.265625 18.242188 L 9.503906 13 L 4.265625 7.761719 C 3.882813 7.371094 3.882813 6.742188 4.265625 6.363281 L 6.363281 4.265625 C 6.746094 3.878906 7.375 3.878906 7.761719 4.265625 L 13 9.507813 L 18.242188 4.265625 C 18.628906 3.878906 19.257813 3.878906 19.636719 4.265625 L 21.734375 6.359375 C 22.121094 6.746094 22.121094 7.375 21.738281 7.761719 L 16.496094 13 L 21.734375 18.242188 C 22.121094 18.628906 22.121094 19.253906 21.734375 19.640625 Z"></path>
                </svg>
              </Button>
            </div>
          ) : (
            <>
              <div
                style={{
                  paddingLeft: 12,
                  paddingRight: 12,
                  paddingTop: 6,
                  paddingBottom: 6,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <Paragraph>
                  Selecteer nu een van de albums van{" "}
                  <span style={{ fontWeight: "400" }}>
                    {selectedResult[0].name}
                  </span>
                </Paragraph>
              </div>
              {/* Display artist albums */}
              <div
                className="albums-container"
                style={{
                  maxHeight: 300,
                  overflow: "scroll",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                }}
              >
                {artistAlbums.map((album) => (
                  <div
                    key={album.id}
                    className="album-item hover_effect"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      getAlbumSongs(album), setSong(album);
                    }}
                  >
                    <img
                      src={album.image}
                      alt={album.name}
                      className="album-image"
                    />
                    <Paragraph className="album-name">{album.name}</Paragraph>
                  </div>
                ))}
              </div>
              {artistSongs.length > 0 ? (
                <div
                  className="songs-container"
                  style={{
                    maxHeight: 200,
                    overflow: "scroll",
                    paddingLeft: 8,
                    paddingRight: 8,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {artistSongs.map((song) => (
                    <div
                      style={{
                        cursor: "pointer",
                        paddingTop: 3,
                        paddingBottom: 3,
                      }}
                      key={song.id}
                      className="song-item hover_effect"
                      onClick={() => resultSelected(song)}
                    >
                      <Paragraph>{song.name}</Paragraph>
                    </div>
                  ))}
                </div>
              ) : null}
            </>
          )
        ) : searchResults.length > 0 ? (
          <ul
            style={{
              background: theme.grey[100],
              maxHeight: 300,
              overflow: "scroll",
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderStyle: "solid",
              borderTopStyle: "none",
              borderTop: "none",
              borderWidth: 1,
              borderColor: theme.grey[200],
            }}
          >
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="result-list hover_effect"
                onClick={() => {
                  resultSelected(result), setSong(result);
                }}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={result.profileImage || result.albumImage}
                  alt={result.id}
                  className="result-image"
                />
                <div className="result-text">
                  <Paragraph fontWeight={400}>{result.name}</Paragraph>
                  <Paragraph color={theme.grey[400]}>{result.type}</Paragraph>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          // <Paragraph>No results</Paragraph>
          <></>
        )}
      </div>
    </div>
  );
}

export default SpotifyApp;
