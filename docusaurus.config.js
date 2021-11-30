const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: "Enterspeed Docs",
    tagline: "Documentation for Enterspeed",
    url: "https://docs.enterspeed.com",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.png",
    organizationName: "enterspeedhq", // Usually your GitHub org/user name.
    projectName: "enterspeed-docs", // Usually your repo name.
    presets: [
      [
        "redocusaurus",
        {
          specs: [
            {
              spec: "./_api-reference/openapi.yml",
              routePath: "/api/",
              apiDocComponent: "../src/components/redoc/ApiDoc.js",
            },
          ],
          theme: {
            redocOptions: {
              disableSearch: true,
            },
          },
        },
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        algolia: {
          apiKey: "0332d636b5100c042414e8625668f55a",
          indexName: "enterspeed_docs",

          // Optional: see doc section below
          contextualSearch: true,

          // Optional: see doc section below
          appId: "T0NG7A39KM",

          // Optional: Algolia search parameters
          searchParameters: {},

          //... other Algolia params
        },
        navbar: {
          title: "Docs",
          logo: {
            alt: "Enterspeed Docs Logo",
            src: "img/logo.svg",
            srcDark: "img/logo_dark.svg",
          },
          items: [
            {
              to: "/",
              docId: "home",
              label: "Home",
              position: "left",
              activeBaseRegex:
                "/(getting-started|ingest|transform|deliver|general)",
            },
            {
              to: "/api",
              label: "API",
              position: "left",
              activeBasePath: "api",
            },
            {
              type: "doc",
              docId: "integrations/overview",
              label: "Integrations",
              position: "left",
            },
            {
              type: "doc",
              docId: "tutorials/umbraco-nextjs/intro",
              label: "Tutorials",
              position: "left",
            },
            {
              href: "https://www.enterspeed.com/",
              label: "Enterspeed.com",
              position: "right",
            },
            {
              href: "https://app.enterspeed.com/",
              label: "Log in",
              position: "right",
            },
            {
              href: "https://github.com/enterspeedhq",
              position: "right",
              className: "header-github-link",
              "aria-label": "GitHub repository",
            },
          ],
        },
        footer: {
          style: "light",
          copyright: `Copyright © ${new Date().getFullYear()} Enterspeed.`,
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme,
        },
        announcementBar: {
          id: "support_header",
          content:
            'Need help? Feel free to drop us an email at <a href="mailto:support@enterspeed.com">support@enterspeed.com</a>',
          backgroundColor: "#0b0f89",
          textColor: "#fff",
          isCloseable: true,
        },
        prism: {
          additionalLanguages: ["csharp"],
        },
      }),
  }
);
