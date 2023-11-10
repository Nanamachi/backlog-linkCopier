var BASE_URL = 'https://' + window.location.host;

function addOnClickEvent(el) {
    if (el.__mdlinker_injected) return;
    el.addEventListener('click', function(event) {
        // Altキーが押されてない場合は無視
        if (!event.altKey) {
            return;
        }
        navigator.clipboard.readText().then(function(text){
            ticketKey = text.match(/([A-Z]+-[0-9]+)/)[0];

            parsed = '['+text+'](' + BASE_URL + '/view/' + ticketKey + ')';

            // クリップボードにコピー
            navigator.clipboard.writeText(parsed);
        });
    });
    el.__mdlinker_injected = true;
}

function main() {
    // .ticket__key-copy のクリック時に、クリップボードにコピーする
    var trigElems = document.getElementsByClassName('copy-trigger');
    if (trigElems.length > 0) {
        Array.from(trigElems).forEach(addOnClickEvent);
    }
    trigElems = document.getElementsByClassName('copy-key-btn');
    if (trigElems.length > 0) {
        Array.from(trigElems).forEach(addOnClickEvent);
    }
    setTimeout(main, 1000);
}

main();