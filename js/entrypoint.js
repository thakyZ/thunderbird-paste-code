import * as highlight from "./highlight.mjs"

browser.menus.create(
    {
        id: "paste-code-block",
        title: "Paste Code Block",
        contexts: ["compose_body"],
    }
);
browser.menus.create(
    {
        id: "paste-code-inline",
        title: "Paste Code Inline",
        contexts: ["compose_body"],
    }
);

const isDarkMode = true;
const noShadow = true;
// nav:true,home:false,type:0,user_id:0,game_id:6063,advfilt:true,include_adult:true,show_game_filter:false,page_size:20,open:true,search[description]:Win64\Mods,search_description:Win64\Mods
browser.menus.onClicked.addListener(async (info, tab) => {
    let details = await messenger.compose.getComposeDetails(tab.id);
    let text = await navigator.clipboard.readText();
    switch (info.menuItemId) {
        case "paste-code-block":
            if (details.isPlainText) {
                let body = details.plainTextBody;
                body += "\n\ntext\n\n";
                await messenger.tabs.sendMessage(tab.id, { text: body });
            } else {
                // HTML
                let document = new DOMParser().parseFromString(details.body, "text/html");

                const table = document.createElement("table");
                table.setAttribute("border", "0");
                table.setAttribute("bgcolor", isDarkMode ? "#181818" : "#f3f3f3");
                table.setAttribute("cellpadding", "0");
                table.setAttribute("cellspacing", "10");
                table.setAttribute("width", "100%")
                table.setAttribute("style", (noShadow ? "" : "box-shadow:0px 10px 5px -5px #bbbbbb;") + "border-radius:5px;")

                const tr = document.createElement("tr");
                const td = document.createElement("td");
                let code = document.createElement("code");

                text = highlight.highlight(text.replaceAll(/</g, "&lt;"))
                text = text.replaceAll("  ", "&nbsp;&nbsp;").replace(/\r?\n/g, "<br>\n");
                code.innerHTML = text

                table.appendChild(tr);
                tr.appendChild(td);
                td.appendChild(code);

                var html = table.outerHTML;

                // adding line break at the end, otherwise it is not possible to get the cursor below the code table
                await messenger.tabs.sendMessage(tab.id, { html });
            }
            break;
        case "paste-code-inline":
            if (details.isPlainText) {
                let body = details.plainTextBody;
                body += "\n\ntext\n\n";
                await messenger.tabs.sendMessage(tab.id, { text: body });
            } else {
                // HTML
                let document = new DOMParser().parseFromString(details.body, "text/html");

                const code = document.createElement("code");
                code.setAttribute("style", "border:0;padding:.2em;.4em;margin:0;white-space:break-spaces;background-color:" + (isDarkMode ? "#181818" : "#f3f3f3") + ";" + (noShadow ? "" : "box-shadow:0px 10px 5px -5px #bbbbbb;") + "border-radius:5px;")

                text = highlight.highlight(text.replaceAll(/</g, "&lt;"))
                text = text.replaceAll(" ", "&nbsp;").replace(/\r?\n/g, "<br>\n");
                code.innerHTML = text

                var html = code.outerHTML;

                // adding line break at the end, otherwise it is not possible to get the cursor below the code table
                await messenger.tabs.sendMessage(tab.id, { html });
            }
            break;
    }
});
