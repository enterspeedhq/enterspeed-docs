import React, { useMemo } from 'react';
import Layout from '@theme/Layout';

import { usePluginData } from '@docusaurus/useGlobalData';
import useThemeContext from '@theme/hooks/useThemeContext';
import { Redoc as RedocComponent, RedocStandalone, AppStore } from 'redoc';

function ApiDoc({ layoutProps, spec: propSpec }) {
  const {
    title = 'API Docs',
    description = 'Open API Reference Docs for the API',
  } = layoutProps || {};

  const spec =
    propSpec.type === 'object' ? propSpec.content : undefined;
  const specUrl =
    propSpec.type === 'url' ? propSpec.content : undefined;

  return (
    <Layout {...layoutProps} title={title} description={description}>
      <Redoc spec={spec} specUrl={specUrl || propSpec.specUrl} />
    </Layout>
  );
}

export default ApiDoc;

const lightThemeOverride = {
  typography: {

  }
}

const darkThemeOverride = {
  typography: {

  }
}

function Redoc(props) {
  const { isDarkTheme } = useThemeContext();

  const { lightTheme, darkTheme, redocOptions } = usePluginData(
    'docusaurus-theme-redoc'
  );

  const theme = isDarkTheme ? { ...darkTheme, ...darkThemeOverride } : { ...lightTheme, ...lightThemeOverride };
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
