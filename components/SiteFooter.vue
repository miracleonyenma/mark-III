<template>
  <footer class="site-footer site-section">
    <div class="wrapper">
      <section class="top-section">
        <div class="site-info">
          <SiteLogo class="active mb-2 !z-0">
            <template #logo-text>
              <h1 class="font-heading font-bold">Miracleio</h1>
            </template>
          </SiteLogo>

          Thanks for visiting!
          <br />
          Have a great {{ getTimeGreeting() }}
        </div>

        <SpotifyNow />
      </section>
      <section class="footer-section links-group">
        <div class="group site-group">
          <h3 class="heading">Site</h3>
          <ul class="links">
            <li class="link" title="Home">
              <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li class="link" title="Blog">
              <NuxtLink to="/blog">Blog</NuxtLink>
            </li>
          </ul>
        </div>
        <div class="group socials-group">
          <h3 class="heading">Socials</h3>
          <ul class="links">
            <li class="link" title="Twitter">
              <a
                class="icon"
                href="https://twitter.com/miracleio"
                target="twitter"
              >
                Twitter
              </a>
            </li>
            <li class="link" title="GitHub">
              <a
                class="icon"
                href="https://github.com/miracleonyenma"
                target="github"
              >
                GitHub
              </a>
            </li>
            <li class="link" title="Dribbble">
              <a
                class="icon"
                href="https://dribbble.com/miracleio"
                target="dribble"
              >
                Dribbble
              </a>
            </li>
          </ul>
        </div>
      </section>
      <p class="">Miracleio &copy; {{ new Date().getFullYear() }}</p>
    </div>
  </footer>
</template>
<style scoped>
@import url("~/assets/css/components/SiteFooter.css");
.site-footer {
  @apply bg-space-cadet-100 dark:bg-space-cadet-800 border-t border-space-cadet-200 dark:border-space-cadet-700;
}
.site-footer > .wrapper {
  @apply flex flex-col gap-4 lg:gap-8;
}
.top-section {
  @apply flex flex-col md:flex-row justify-between gap-4 w-full max-w-6xl m-auto;
}
</style>
