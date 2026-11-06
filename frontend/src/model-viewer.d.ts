import "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        loading?: string;
        "shadow-intensity"?: string;
        "environment-preset"?: string;
        "camera-orbit"?: string;
        "interaction-prompt"?: string;
      };
    }
  }
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "model-viewer": React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLElement>,
          HTMLElement
        > & {
          src?: string;
          alt?: string;
          loading?: string;
          "shadow-intensity"?: string;
          "environment-preset"?: string;
          "camera-orbit"?: string;
          "interaction-prompt"?: string;
        };
      }
    }
  }
}

export {};