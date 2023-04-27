import { getNowPlaying } from "../utils/spotify";

export default defineEventHandler(async (event) => {
  try {
    const data = await getNowPlaying();

    return {
      statusCode: 200,
      body: data,
    };
  } catch (error) {
    console.error("getNowPlayingFile", error);

    throw createError({
      statusCode: 500,
      message: error,
    });
  }
});
