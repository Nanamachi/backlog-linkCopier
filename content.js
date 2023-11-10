var BASE_URL = 'https://' + window.location.host;

function addOnClickEvent(el) {
    if (el.__mdlinker_injected) return;
    el.addEventListener('click', function(event) {
        // Altキーが押されてない場合は無視
        if (!event.altKey) {
            return;
        }

        if (event.ctrlKey || event.metaKey) {
            // Alt + Ctrl (Win) または Alt + Cmd (Mac) の場合はHTML形式でコピー
            navigator.clipboard.readText()
            .then(formatToHtmlLink)
            .then(writeText);
        } else {
            // Alt単体の場合はMarkDown形式でコピー
            navigator.clipboard.readText()
            .then(formatToMarkdownLink)
            .then(writeText);
        }
    });
    el.__mdlinker_injected = true;
}

function constructTicketUrl(text) {
    return BASE_URL + '/view/' + text.match(/([A-Z]+-[0-9]+)/)[0];
}

function constructHtmlText(text) {
    var ticketUrl = constructTicketUrl(text);
    return '<a href="' + ticketUrl + '">' + text + '</a>';
}

function constructMarkdownText(text) {
    var ticketUrl = constructTicketUrl(text);
    return '[' + text + '](' + ticketUrl + ')';
}

function formatToMarkdownLink(copyText) {
    return {
        'text/html': new Blob([constructHtmlText(copyText)],{type: 'text/html'}),
        'text/plain': new Blob([constructMarkdownText(copyText)],{type: 'text/plain'}),
    };
}

function formatToHtmlLink(copyText) {
    var text = constructHtmlText(copyText);
    return {
        'text/html': new Blob([text], {type: 'text/html'}),
        'text/plain': new Blob([text], {type: 'text/plain'}),
    };
}

function writeText(data) {
    navigator.clipboard.write([new ClipboardItem(data)]);
}

function main() {
    // 一覧ページでのコピーボタン
    var trigElems = document.querySelectorAll('.copy-trigger > ._trigger-text');
    if (trigElems.length > 0) {
        Array.from(trigElems).forEach(addOnClickEvent);
    }
    // 詳細ページでのコピーボタン
    trigElems = document.getElementsByClassName('copy-key-btn');
    if (trigElems.length > 0) {
        Array.from(trigElems).forEach(addOnClickEvent);
    }
    setTimeout(main, 1000);
}

main();