export const useSiteNavLinks = () =>
  useState("site-nav-links", () => [
    {
      path: "/",
      text: "Home",
    },
    {
      path: "/blog",
      text: "Blog",
    },
    {
      path: "/snippets",
      text: "Snippets",
    },
    {
      path: "/work",
      text: "Work",
    },
  ]);
