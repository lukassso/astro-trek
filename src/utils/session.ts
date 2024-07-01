export function checkSession() {
  const sessionCookie = document.cookie
    .split("; ")
    .find(row => row.startsWith("__session="))
    ?.split("=")[1];

  if (!sessionCookie) {
    window.location.href = "/signin/";
  }
}
