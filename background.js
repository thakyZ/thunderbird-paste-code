(async () => {
  const src = chrome.extension.getURL('js/entrypoint.js');
  const contentScript = await import(src);
})();
messenger.composeScripts.register({
  js: [{ file: "js/code_compose.js"}]
});
