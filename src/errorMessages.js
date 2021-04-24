export function errorMessages(errorCode, selfVue) {
    switch (errorCode) {
        default:
            selfVue.errorTitle = "Communication error";
            selfVue.errorContent =
            '<p>There was a communication error with the server and/or the internet. Check your connection or try again later.</p><p style="opacity: 0.8">Error code: ' +
            errorCode +
            "</p>";
            selfVue.showErrorDialog();
            selfVue.sending = false;
    }
}