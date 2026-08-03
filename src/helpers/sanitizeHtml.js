const BLOCKED_TAGS = [
  "script",
  "style",
  "iframe",
  "object",
  "embed",
  "link",
  "meta",
  "base",
  "form",
  "input",
  "textarea",
  "button",
  "svg",
  "math",
];

const BLOCKED_ATTRS = [
  "onload",
  "onerror",
  "onclick",
  "onmouseover",
  "onmouseout",
  "onmouseenter",
  "onmouseleave",
  "onmousedown",
  "onmouseup",
  "onmousemove",
  "ondblclick",
  "oncontextmenu",
  "onkeydown",
  "onkeyup",
  "onkeypress",
  "onsubmit",
  "onreset",
  "onchange",
  "oninput",
  "onblur",
  "onfocus",
  "oncopy",
  "oncut",
  "onpaste",
  "ontoggle",
  "onscroll",
  "onresize",
  "onwheel",
];

function isBlockedAttr(name) {
  const lower = (name || "").toLowerCase();
  if (BLOCKED_ATTRS.includes(lower)) return true;
  if (lower.startsWith("on")) return true;
  return false;
}

export const sanitizeHtml = (dirty) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return String(dirty || "");
  }
  if (dirty == null) return "";
  const dirtyStr = String(dirty);
  const doc = new DOMParser().parseFromString(dirtyStr, "text/html");

  BLOCKED_TAGS.forEach((tag) => {
    doc.querySelectorAll(tag).forEach((el) => el.remove());
  });

  doc.querySelectorAll("*").forEach((el) => {
    Array.from(el.attributes).forEach((attr) => {
      if (isBlockedAttr(attr.name)) {
        el.removeAttribute(attr.name);
        return;
      }
      const nameLower = attr.name.toLowerCase();
      const value = (attr.value || "").trim();
      if (
        (nameLower === "href" || nameLower === "src" || nameLower === "xlink:href") &&
        /^(javascript:|data:text\/html|vbscript:)/i.test(value)
      ) {
        el.removeAttribute(attr.name);
      }
      if (nameLower === "style") {
        if (/expression\(|@import|url\(\s*['"]?\s*javascript:/i.test(value)) {
          el.removeAttribute(attr.name);
        }
      }
    });
  });

  return doc.body ? doc.body.innerHTML : "";
};

export default sanitizeHtml;
