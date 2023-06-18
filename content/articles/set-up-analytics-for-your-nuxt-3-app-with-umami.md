---
title: Set up Umami analytics for your Nuxt 3 app
description: Learn how to integrate Umami analytics, an open-source and privacy-focused platform, into your Nuxt 3 application to gain valuable insights into user behavior and optimize your website or application.
tags: [Umami analytics, Nuxt 3, data analytics, user behavior, website optimization]
createdAt: 2023-06-18T00:00:00.000Z
updatedAt: 2023-06-18T00:00:00.000Z
---

Utilizing data analytics is crucial when developing and managing websites because it helps understand user behavior, content strategy, and growth measurement.

As a developer and technical writer, I try to create user-friendly interfaces in my projects and write helpful articles. With analytics, I can gain valuable insights into how users interact with my website and what content is making more impact.
With that information, I can make changes that improve user experience and create content that performs better with the audience.

With this in mind, I did some research to find out which analytics platform would work best for me.
I've tried out Google Analytics, and it's pretty cool. But it's Google. I was looking for a privacy-focused alternative.

I've checked out Plausible it's widely used and looks great. It has a 30-day free trial, but for a personal portfolio site that isn't generating any revenue, that's a bit overkill.

Umami is free and self-hosted. I checked it out further and saw that it's pretty straightforward to set up. So, it seemed like the obvious choice. Did I mention it was free?

## Overview

Umami is an open-source, lightweight, privacy-focused analytics platform. With Umami, you can track page views, user interactions, and other custom events, enabling you to make data-driven decisions to enhance user experience and optimize your Nuxt 3 app.
In this article, I'll briefly walk you through how you can set up Umami and start tracking user analytics for your Nuxt 3 app.

## Prerequisites

Here are a few things you should have to follow along:

- A Nuxt 3 application set up
- A Netlify account. We'll need this to deploy our Umami application, you can use other hosting platforms like Digital Ocean, Vercel, Railway, etc.
- A Supabase account. We'll be using the Postgres database provided by Supabase for Umami
- A computer 🙂

## Setting up the Database

To create the database for Umami, we'll [set up a Supabase Postgres database](https://umami.is/docs/running-on-supabase).
[Sign into your Supabase](https://supabase.com/dashboard/sign-in) account, and create a new project in your selected organization. Give it a **Name**, specify a **Database Password**, and select a region closest to where you'll be hosting your Umami application.

:img-cont{src="/assets/img/articles/set-up-analytics-for-your-nuxt-3-app-with-umami/Pasted image 20230618195140.png"}

Once created, obtain the database connection string from **Database** page in **Settings**. Scroll down to **Connection String > URI** or **Connection Pooling** and copy the value.

:img-cont{src="/assets/img/articles/set-up-analytics-for-your-nuxt-3-app-with-umami/Pasted image 20230618200342.png"}

Now, add `?pgbouncer=true` to the end of the connection to give you something like this:

```
postgres://postgres:[YOUR-PASSWORD]@db.gmjomfkwbzesnuycezyi.supabase.co:6543/postgres?pgbouncer=true
```

This would be the value of our `DATABASE_URL` in our `.env` file. This means our `.env` file would look something like this:

```
# .env

DATABASE_URL=postgres://postgres:[YOUR-PASSWORD]@db.gmjomfkwbzesnuycezyi.supabase.co:6543/postgres?pgbouncer=true
```

Now, we can get started with Umami.

## Setting up Umami

There's an [installation guide](https://umami.is/docs/install) that shows how to get install, set up and run Umami locally and on Docker.
Luckily, we can quickly set up and deploy Umami in a matter of minutes by following these steps:

### Fork the project repo

Fork the <https://github.com/umami-software/umami> project to your GitHub account.

### Deploy to Netlify

First, you'll have to **Add a new site** by importing an existing project from your GitHub account.

:img-cont{src="/assets/img/articles/set-up-analytics-for-your-nuxt-3-app-with-umami/Pasted image 20230618203208.png"}

Pick the forked repository.

:img-cont{src="/assets/img/articles/set-up-analytics-for-your-nuxt-3-app-with-umami/Pasted image 20230618203307.png"}

In the advanced options, add a new environment variable for the `DATABASE_URL`.

:img-cont{src="/assets/img/articles/set-up-analytics-for-your-nuxt-3-app-with-umami/Pasted image 20230618203612.png"}

Once that's done, click on **Deploy Site**.

### Login to Umami

Once the deployment is successful, you can visit the live URL and log in with the following credentials:
**Username**: `admin`
**Password**: `umami`

:img-cont{src="/assets/img/articles/set-up-analytics-for-your-nuxt-3-app-with-umami/Pasted image 20230618204310.png"}

> Don't forget to change these details later

### Add website

Now that you're logged in, navigate to **Settings > Websites** and click on **Add website**.

:img-cont{src="/assets/img/articles/set-up-analytics-for-your-nuxt-3-app-with-umami/Pasted image 20230618204911.png"}

Here, I'm adding my currently deployed Nuxt application at <https://v3.miracleio.me> and giving it the name Mark-III.
Once that's done, Umami provides us with a tracking ID we can add to our site.

:img-cont{src="/assets/img/articles/set-up-analytics-for-your-nuxt-3-app-with-umami/Pasted image 20230618205704.png"}

If we go to **Tracking code**, we'll get a `<script>` tag we can add to our site to start tracking data.

:img-cont{src="/assets/img/articles/set-up-analytics-for-your-nuxt-3-app-with-umami/Pasted image 20230618205812.png"}

Awesome. Now, let's implement it in our Nuxt app.

## Add Umami to Nuxt 3

To add Umami to Nuxt 3, we'll be using the [Umami module](https://nuxt.com/modules/umami) by [@ijkml](https://twitter.com/ijk_ml) which helps Integrate **Umami Analytics** into your Nuxt  3 websites/applications.

Now, we'll navigate to our Nuxt project so we can get started.

### Set up Nuxt Umami module

In your project directory, install the module:

```bash
npm install nuxt-umami
```

Once installed, we can add `nuxt-umami` to our `extends` array in `nuxt.config.ts`:

```typescript
defineNuxtConfig({ 
 extends: ['nuxt-umami'] 
});
```

Next, we'll provide configuration options using the `app.config.ts` file:

```typescript
// app.config.ts

export default defineAppConfig({
  umami: {
    version: 2,
  },
});
```

We'll also have to provide the following environment variables for the `host` and `id` config:

```
NUXT_PUBLIC_UMAMI_HOST="https://umami.miracleio.me/"
NUXT_PUBLIC_UMAMI_ID="enter ID here"
```

With that, we can run our application and start tracking:

```bash
npm run dev
```

Now, if we check out our Umami dashboard, we should be seeing some data when we visit our Nuxt app:

:img-cont{src="/assets/img/articles/set-up-analytics-for-your-nuxt-3-app-with-umami/Pasted image 20230618221837.png"}

### Tracking events

Umami also allows us to track custom events, you can learn all about that in [their docs](https://umami.is/docs/track-events). Implementing this in our Nuxt app is also made easy with the `umTrackView()` and `umTrackEvent()` [functions](https://nuxt.com/modules/umami#available-methods) provided by the Nuxt Umami modules.
You can visit the links to the documentation provided to learn all about that.

## Conclusion

In this article, we explored the importance of leveraging data analytics for website development and content strategy. As a developer and technical writer, understanding user behavior and measuring the impact of our work is crucial. We considered various analytics platforms and ultimately chose Umami due to its open-source nature, lightweight design, and privacy focus.

We walked through the process of setting up Umami analytics for a Nuxt 3 app. We discussed how to set up the database using Supabase and proceeded to deploy Umami on Netlify.

After the deployment, we logged into Umami and added our Nuxt app as a website to track. We obtained the Umami tracking code and saw how to implement it in our Nuxt app.

Finally, we integrated Umami into our Nuxt 3 app using the Nuxt Umami module, providing configuration options and environment variables.

By following the steps outlined in this article, you can harness the power of Umami analytics to gain valuable insights into user behavior and optimize your Nuxt 3 app accordingly.

## Further Reading and Resources

To delve deeper into Umami analytics and related topics, consider exploring the following resources:

- [Umami Documentation](https://umami.is/docs/): The official documentation for Umami, offering detailed information on installation, configuration, and usage.
- [Nuxt Umami Module](https://nuxt.com/modules/umami): The Nuxt Umami module documentation, providing guidance on integrating Umami analytics into Nuxt 3 projects.
- [Supabase Documentation](https://supabase.io/docs): The official documentation for Supabase, the hosting platform for Umami's database. Learn more about setting up and managing Supabase databases.
- [Netlify Documentation](https://docs.netlify.com/): The documentation for Netlify, a popular hosting platform used in this article. Explore further details on deploying applications and managing environment variables on Netlify.

### Resources

- [Umami Project repository](https://github.com/umami-software/umami)
- [My website project repository](https://github.com/miracleonyenma/mark-III), where I implemented Umami

By exploring these resources, you can expand your knowledge and make the most out of Umami analytics to improve user experiences and drive the success of your web projects. Happy tracking!
