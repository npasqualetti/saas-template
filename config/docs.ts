import { DocsConfig } from "types"

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
        },
      ],
    },
    {
      title: "Dashboard",
      items: [
        {
          title: "Introduction",
          href: "/docs/dashboard/introduction",
        },
        {
          title: "Dashboard Tab",
          href: "/docs/dashboard/dashboard",
        },
        {
          title: "Watchlist Tab",
          href: "/docs/dashboard/watchlist",
        },
        {
          title: "News Tab",
          href: "/docs/dashboard/news",
        },
        {
          title: "Reading the Charts",
          href: "/docs/dashboard/charts",
        },
        {
          title: "Glossary",
          href: "/docs/dashboard/glossary",
        },
      ],
    },
  ],
}
