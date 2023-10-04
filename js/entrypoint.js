import * as highlight from "./highlight.mjs"

browser.menus.create(
    {
        id: "paste-code",
        title: "Paste Code",
        contexts: ["compose_body"],
    }
);

browser.menus.onClicked.addListener(async (info, tab) => {
    switch (info.menuItemId) {
        case "paste-code":
            let details = await browser.compose.getComposeDetails(tab.id);

            navigator.clipboard.readText().then((text) => {
                if (details.isPlainText) {
                    let body = details.plainTextBody;
                    body += "\n\ntext\n\n";
                    browser.compose.setComposeDetails(tab.id, { plainTextBody: body });
                } else {
                    let document = new DOMParser().parseFromString(details.body, "text/html");

                    const table = document.createElement("table");
                    table.setAttribute("border", "0");
                    table.setAttribute("bgcolor", "#f3f3f3");
                    table.setAttribute("cellpadding", "0");
                    table.setAttribute("cellspacing", "10");
                    table.setAttribute("width", "100%")
                    table.setAttribute("style", "box-shadow: 0px 10px 5px -5px #bbbbbb; border-radius: 5px;")

                    const tr = document.createElement("tr");
                    const td = document.createElement("td");
                    let code = document.createElement("code");

                    text = highlight.highlight(text.replaceAll(/</g, "&lt;"))
                    text = text.replaceAll("  ", "&nbsp;&nbsp;").replace(/\r?\n/g, "<br>\n");
                    code.innerHTML = text

                    table.appendChild(tr);
                    tr.appendChild(td);
                    td.appendChild(code);

                    document.body.appendChild(table);

                    // adding line break at the end, otherwise it is not possible to get the cursor below the code table
                    document.body.appendChild(document.createElement("br"));

                    let html = new XMLSerializer().serializeToString(document);
                    browser.compose.setComposeDetails(tab.id, { body: html });
                }
            });
            break;
    }
});
