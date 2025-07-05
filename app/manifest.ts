import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Wang Ye - Senior Software Engineer",
    short_name: "Wang Ye",
    description:
      "Senior Software Engineer at Red Hat specializing in AI-powered applications",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0e1a",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "32x32",
        type: "image/svg+xml",
      },
    ],
  };
}
