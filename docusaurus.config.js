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
    trailingSlash: "false",
    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.svg",
    organizationName: "enterspeedhq", // Usually your GitHub org/user name.
    projectName: "enterspeed-docs", // Usually your repo name.
    presets: [
      [
        "@docusaurus/preset-classic",
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            routeBasePath: "/",
            sidebarPath: require.resolve("./sidebars.js"),
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
        }),
      ],
      [
        "redocusaurus",
        {
          specs: [
            {
              spec: "./_api-reference/openapi.yaml",
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
                "/(getting-started|ingest|transform|deliver)",
            },
            {
              to: "/reference/fields",
              label: "Schema reference",
              position: "left",
              activeBasePath: "reference",
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
          backgroundColor: "#ebf8ff",
          textColor: "#1a202c",
          isCloseable: true,
        },
        prism: {
          additionalLanguages: ["csharp"],
        },
      }),
  }
);
