import React, { useMemo } from "react";
import Layout from "@theme/Layout";

import { usePluginData } from "@docusaurus/useGlobalData";
import useThemeContext from "@theme/hooks/useThemeContext";
import { Redoc as RedocComponent, RedocStandalone, AppStore } from "redoc";

function ApiDoc({ layoutProps, spec: propSpec }) {
  const {
    title = "API Docs",
    description = "Open API Reference Docs for the API",
  } = layoutProps || {};

  const spec = propSpec.type === "object" ? propSpec.content : undefined;
  const specUrl = propSpec.type === "url" ? propSpec.content : undefined;

  return (
    <Layout {...layoutProps} title={title} description={description}>
      <Redoc spec={spec} specUrl={specUrl || propSpec.specUrl} />
    </Layout>
  );
}

export default ApiDoc;

const lightThemeOverride = {
  typography: {
    fontSize: "17px",
    fontFamily: "Barlow",
    headings: {
      fontFamily: "EB Garamond",
      fontWeight: "700",
    },
    links: {
      color: "#0b0f89",
      visited: "#0b0f89",
      hover: "#0b0f89",
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
        color: "rgba(38, 222, 129, 1)",
        backgroundColor: "rgba(38,222,129,0.1)",
      },
      error: {
        color: "rgba(255, 136, 136, 1)",
        backgroundColor: "rgba(255,136,136,0.1)",
      },
      redirect: {
        color: "rgba(241, 196, 15, 1)",
        backgroundColor: "rgba(241,196,15,0.1)",
      },
    },
    http: {
      get: "rgba(21, 137, 78, 1)",
      post: "rgba(70, 63, 229, 1)",
      delete: "rgba(255, 85, 85, 1)",
    },
  },
};

const darkThemeOverride = {
  typography: {
    fontSize: "17px",
    fontFamily: "Barlow",
    headings: {
      fontFamily: "EB Garamond",
      fontWeight: "700",
    },
    links: {
      color: "#7175ef",
      visited: "#7175ef",
      hover: "#7175ef",
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
        color: "rgba(38, 222, 129, 1)",
        backgroundColor: "rgba(38,222,129,0.1)",
      },
      error: {
        color: "rgba(255, 136, 136, 1)",
        backgroundColor: "rgba(255,136,136,0.1)",
      },
      redirect: {
        color: "rgba(241, 196, 15, 1)",
        backgroundColor: "rgba(241,196,15,0.1)",
      },
    },
    http: {
      get: "rgba(21, 137, 78, 1)",
      post: "rgba(70, 63, 229, 1)",
      delete: "rgba(255, 85, 85, 1)",
    },
  },
};

function Redoc(props) {
  const { isDarkTheme } = useThemeContext();

  const { lightTheme, darkTheme, redocOptions } = usePluginData(
    "docusaurus-theme-redoc"
  );

  const theme = isDarkTheme
    ? { ...darkTheme, ...darkThemeOverride }
    : { ...lightTheme, ...lightThemeOverride };
  const { spec, specUrl } = props;

  const store = useMemo(() => {
    if (!spec) return null;

    return new AppStore(spec, specUrl, {
      ...redocOptions,
      theme,
    });
  }, [spec, specUrl, redocOptions, theme]);

  return (
    <div className="redocusaurus">
      {store ? (
        <RedocComponent store={store} />
      ) : (
        <RedocStandalone
          spec={spec}
          specUrl={specUrl}
          options={{
            ...redocOptions,
            theme,
          }}
        />
      )}
    </div>
  );
}
