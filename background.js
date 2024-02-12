(async () => {
  const src = chrome.extension.getURL('js/entrypoint.js');
  const contentScript = await import(src);
})();
messenger.composeScripts.register({
  js: [{ file: "js/code_compose.js"}]
});
// nav:true,home:false,type:0,user_id:0,game_id:6063,advfilt:true,include_adult:true,show_game_filter:false,page_size:20,open:true,search[description]:Win64\Mods,search_description:Win64\Mods