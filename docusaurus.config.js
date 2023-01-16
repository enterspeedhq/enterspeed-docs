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
    organizationName: "enterspeedhq",
    projectName: "enterspeed-docs",
    plugins: [
      require.resolve("docusaurus-plugin-image-zoom"),
      [
        require.resolve("docusaurus-gtm-plugin"),
        {
          id: "GTM-N32R9R7",
        },
      ],
    ],
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
              route: "/api/",
            },
          ],
          theme: {
            options: {
              disableSearch: true,
            },
            theme: {
              typography: {
                fontSize: "17px",
                fontFamily:
                  '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
                headings: {
                  fontFamily:
                    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
                  fontWeight: "700",
                },
                links: {
                  color: "#1356fb",
                  visited: "#1356fb",
                  hover: "#1356fb",
                },
              },
              rightPanel: {
                textColor: "#ffffff",
              },
              colors: {
                primary: {
                  main: "#1c1e21",
                },
                responses: {
                  success: {
                    color: "#1c4532",
                    backgroundColor: "#c6f6d5",
                  },
                  error: {
                    color: "#63171b",
                    backgroundColor: "#fed7d7",
                  },
                  redirect: {
                    color: "#5f370e",
                    backgroundColor: "#fefcbf",
                  },
                },
                http: {
                  get: "#38a169",
                  post: "#5686fc",
                  delete: "#e53e3e",
                },
              },
            },
          },
        },
      ],
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */

      ({
        zoom: {
          selector: ".markdown :not(em) > img",
          background: {
            light: "rgb(255, 255, 255)",
            dark: "rgb(50, 50, 50)",
          },
          config: {},
        },
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
                "/(getting-started|ingest|transform|deliver|faq|key-concepts)/",
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
              docId: "tooling/cli/overview",
              label: "CLI",
              position: "left",
            },
            {
              type: "doc",
              docId: "integrations/overview",
              label: "Integrations",
              position: "left",
            },
            {
              type: "doc",
              docId: "tutorials/overview",
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
