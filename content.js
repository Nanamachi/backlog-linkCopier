const BASE_URL = 'https://' + window.location.host;

function copyLinkToClipboard(event) {
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
}

const constructTicketUrl    = text => `${BASE_URL}/view/${text.match(/([A-Z]+-[0-9]+)/)[0]}`;
const constructMarkdownText = text => `[${text}](${constructTicketUrl(text)})`;
const constructHtmlText     = text => `<a href="${constructTicketUrl(text)}">${text}</a>`;

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

function addEventListenerByQuerySelector(selector, event, fn) {
    var list = document.querySelectorAll(selector);
    if (list.length > 0) {
        Array.from(list).forEach(function(el) {
            el.addEventListener(event, fn);
        });
    }
}

function main() {
    // 一覧ページでのコピーボタン
    addEventListenerByQuerySelector('.copy-trigger > ._trigger-text', 'click', copyLinkToClipboard);

    // 詳細ページでのコピーボタン
    addEventListenerByQuerySelector('.copy-key-btn', 'click', copyLinkToClipboard);

    // 新しいエレメントに付いて監視する
    setTimeout(main, 1000);
}

main();