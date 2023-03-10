const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  try {
    const res = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=refresh_token&refresh_token=" + refresh_token,
    });

    const data = await res.json();
    return data.access_token;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getNowPlaying = async () => {
  try {
    const accessToken = await getAccessToken();
    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // if (res.status !== 200) {
    //   return null;
    // }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getNowPlayingError", error);

    throw error;
  }
};
