<script setup>
import { PauseIcon, PlayIcon, QueueListIcon } from "@heroicons/vue/24/solid";
const isPreviewPlaying = ref(false);

const { data } = useAsyncData("now-playing", async () => {
  try {
    const res = await $fetch("/api/getNowPlaying");
    console.log({ res });

    return res.body
      ? {
          isPlaying: res.body.is_playing,
          artists: res.body.item.artists,
          albumImage: res.body.item.album.images[0].url,
          name: res.body.item.name,
          previewURL: res.body.item.preview_url,
          trackURL: res.body.item.external_urls.spotify,
          playlistURL: res.body.context.external_urls.spotify,
          durationLeftMs: res.body.item.duration_ms - res.body.progress_ms,
        }
      : null;
  } catch (error) {
    return null;
  }
});
console.log({ data: data.value });

const audio = ref(null);
console.log({ audio });

const togglePreview = () => {
  if (isPreviewPlaying.value) {
    audio.value.pause();
    isPreviewPlaying.value = false;
  } else {
    audio.value.play();
    isPreviewPlaying.value = true;
  }
};

const refresh = () => {
  refreshNuxtData("now-playing");
};

// function to refresh data after durationLeftMs, retry each time data does not change, maximum of 5 retries
const refreshData = async () => {
  if (data.value) {
    console.log(
      "refreshing data in",
      data.value.durationLeftMs / 1000,
      "seconds"
    );
    await new Promise((resolve) =>
      setTimeout(resolve, data.value.durationLeftMs)
    );
    console.log("refreshing data");
    refreshNuxtData("now-playing");
    if (data.value) {
      refreshData();
    }
  }
};

onMounted(() => {
  if (data.value) {
    refreshData();
  }
});

onBeforeUnmount(() => {
  audio.value.pause();
});
</script>
<template>
  <article class="spotify-now">
    <div class="wrapper">
      <div class="playing-cover">
        <IconsSpotifyIcon
          @click="refresh"
          v-if="!data"
          class="w-12 h-12 cursor-pointer"
        />
        <a
          v-else
          :href="data.trackURL"
          title="View track on Spotify"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div class="img-cont">
            <img
              :src="data.albumImage"
              alt="Spotify Now Playing"
              class="cover-image"
            />
          </div>
        </a>
      </div>
      <div v-if="data" class="album-details">
        <h3 class="song-title font-semibold leading-none">
          <span>
            {{ data.name }}
          </span>
        </h3>
        <p class="flex gap-1 text-xs">
          <a
            v-for="(artist, i) in data.artists"
            :key="artist.id"
            :href="artist.external_urls.spotify"
            target="_blank"
            class="underline"
          >
            {{ artist.name }}{{ i < data.artists.length - 1 ? "," : "" }}
          </a>
        </p>
        <div class="mini-controls flex items-center gap-2 pt-2">
          <button @click="togglePreview" class="cta">
            <PlayIcon v-if="!isPreviewPlaying" class="icon w-4 h-4" />
            <PauseIcon v-else class="icon w-4 h-4" />
            <span class="text text-sm">
              {{ isPreviewPlaying ? "Pause" : "Preview" }}
            </span>
          </button>
          <a
            :href="data.playlistURL"
            title="View playlist"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button class="cta">
              <QueueListIcon class="icon w-4 h-4" />
            </button>
          </a>
          <IconsSpotifyIcon @click="refresh" class="w-6 h-6 cursor-pointer" />
          <audio ref="audio" :src="data.previewURL"></audio>
        </div>
      </div>
      <p class="px-4" v-else>Not Playing <span>&ndash; Spotify</span></p>
    </div>
  </article>
</template>
<style scoped>
.spotify-now {
  @apply w-fit bg-space-cadet-50 dark:bg-space-cadet-800 border border-slate-200 dark:border-space-cadet-700 max-w-md rounded-full;
  @apply overflow-auto;
}
.spotify-now > .wrapper {
  @apply flex items-center p-3 h-full;
}
.playing-cover {
  @apply relative shrink-0;
}

.cover-image {
  @apply grow shrink-0 w-24 h-24 rounded-full;
}

.album-details {
  @apply flex flex-col gap-1 px-4;
}

.song-title {
  @apply flex items-center gap-2;
}
</style>
