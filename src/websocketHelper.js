const wssUrl = "wss://rssreader.aplikoj.com/wss/";
const wssProtocol = ["PDRAUM"];

function onError(error, selfVue) {
    selfVue.errorTitle = "Communication error";
    selfVue.errorContent =
    '<p>There was a communication error with the server and/or the internet. Check your connection or try again later.</p><p style="opacity: 0.8">Error code: ' +
    "w_" +
    error.type +
    "</p>";
    selfVue.showErrorDialog();
}

export default {wssUrl, wssProtocol, onError};