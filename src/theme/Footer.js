import OriginalFooter from '@theme-original/Footer';
import React from 'react';
import AnnounceKit from 'announcekit-react';

export default function Footer(props) {
  return (
    <>
      <OriginalFooter {...props} />
      <AnnounceKit widget="https://announcekit.app/widgets/v2/3uXAs" />
    </>
  );
}