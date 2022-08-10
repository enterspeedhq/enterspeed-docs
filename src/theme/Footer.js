import OriginalFooter from "@theme-original/Footer";
import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function Footer(props) {
  return (
    <>
      <OriginalFooter {...props} />
      <BrowserOnly>
        {() => {
          const AnnounceKit = require("announcekit-react").default;
          return (
            <AnnounceKit
              widget="https://announcekit.app/widgets/v2/3uXAs"
              {...props}
            />
          );
        }}
      </BrowserOnly>
    </>
  );
}
