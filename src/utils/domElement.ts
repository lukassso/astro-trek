export function toggleClass(element: HTMLElement, className: string) {
  element.classList.toggle(className);
}
export function rootInDarkMode() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

// Note: this only works on the server side
export function getNetlifyContext() {
  return process.env.CONTEXT;
}
