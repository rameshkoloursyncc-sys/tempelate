import { useEffect } from "react";

export default function SEO({ title, description, name, type }) {
  useEffect(() => {
    if (title) document.title = title;

    const setMeta = (attr, key, value) => {
      if (!value) return;

      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", value);
    };

    setMeta("name", "description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:creator", name);
    setMeta("name", "twitter:card", type);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

  }, [title, description, name, type]);

  return null;
}