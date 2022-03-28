import React, { useMemo } from "react";
import Layout from "@theme/Layout";

import { usePluginData } from "@docusaurus/useGlobalData";
import {useColorMode} from '@docusaurus/theme-common';
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
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    headings: {
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
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
};

const darkThemeOverride = {
  typography: {
    fontSize: "17px",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    headings: {
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontWeight: "700",
    },
    links: {
      color: "#99b6fd",
      visited: "#99b6fd",
      hover: "#99b6fd",
    },
  },
  rightPanel: {
    textColor: "#ffffff",
  },
  colors: {
    primary: {
      main: "#ffffff",
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
};

function Redoc(props) {
  const { isDarkTheme } = useColorMode();

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
