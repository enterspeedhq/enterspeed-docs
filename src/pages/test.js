import React from 'react';
import Layout from '@theme/Layout';
import Redoc from '@theme/Redoc';
import useBaseUrl from '@docusaurus/useBaseUrl';

const STATIC_SPEC = './_api-reference/openapi.yaml';

function CustomPage() {
  return (
    <Layout title="Open API Docs" description="Open API Reference Docs for API">
      <Redoc theme={ 
        {
          typography: {
            fontSize: '100px'
          }
        }
        } specUrl={useBaseUrl(STATIC_SPEC)} />
    </Layout>
  );
}

export default CustomPage;