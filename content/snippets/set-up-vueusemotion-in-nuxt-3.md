---
title: Set up @vueuse/motion in Nuxt 3
tags: [Nuxt 3, vueuse/motion]
---


[`@vueuse/motion`](https://motion.vueuse.org/) is a Vue Composable available via [VueUse](https://vueuse.org/) that helps add animations to Vue applications with a simple yet powerful API.

To set up motion in Nuxt 3 application, as at the time of writing, you need to install the beta version of the package:

```shell
npm install @vueuse/motion@beta
```

This installed version `2.0.0-beta.27`:

```json
// ./package.json

{
  ...
  "devDependencies": {
    "nuxt": "^3.2.3"
  },
  "dependencies": {
    "@vueuse/motion": "^2.0.0-beta.27"
  }
}
```

Now, motion has a specific implementation that makes the declaration of custom directives even easier in [Nuxt](https://motion.vueuse.org/nuxt.html). It is shipped with `@vueuse/motion` and is importable via `@vueuse/motion/nuxt`.

To use it in Nuxt, you have to add `@vueuse/motion/nuxt` to the `modules` section of `nuxt.config.ts`:

```javascript
// ./nuxt.config.ts

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@vueuse/motion/nuxt'],
});
```

With that, you can start adding animations to your Nuxt app, you can follow the [motion guide to learn](https://motion.vueuse.org/directive-usage.html#your-first-v-motion) better.

For example, to create a simple fade-in effect when an element is visible using the `useMotion` [core composable](https://motion.vueuse.org/composable-usage.html):

```vue
<!-- ./app.vue -->
<script setup>
import { useMotion } from "@vueuse/motion";
const specialGreeting = useSpecialGreeting();

const headerContent = ref();

const heroContentMotionInstance = useMotion(heroContent, {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
  },
});

</script>
<template>
  <main>
    <header>
      <div ref="headerContent" class="hero-content">
        <h1>
          Hey there
    </h1>
        <p>
          This is a simple animation
    </p>
     </div>
    </header>
  </main>
</template>
```

The `useMotion` function takes two arguments: the first is a reference to the DOM element to be animated, and the second is an object that defines `variants` for the animation, which in this case are the `initial` and `enter` variants of the animation.

You can [check it out on StackBlitz](https://stackblitz.com/edit/nuxt-starter-nknph9?file=app.vue).

I hope you found this useful! Cheers 🍻
