export function errorMessages(errorCode, selfVue) {
    switch (errorCode) {
        case "json_with_error":
            selfVue.errorTitle = "Erro de transmissão";
            selfVue.errorContent =
            '<p>Houve um erro na transmissão, verifique o link que você recebeu e tente novamente.</p><p style="opacity: 0.8">Código de erro: ' +
            errorCode +
            "</p>";
            selfVue.showAlertDialog();
            selfVue.sending = false;
            break;
        case "user_not_found":
            selfVue.errorTitle = "Usuário não encontrado";
            selfVue.errorContent =
            '<p>Este usuário não foi encontrado em nosso sistema Verifique o link que você recebeu e tente novamente.</p><p style="opacity: 0.8">Código de erro: ' +
            errorCode +
            "</p>";
            selfVue.showAlertDialog();
            selfVue.sending = false;
            break;
        case "exception_empty_confid" || "wrong_confid":
            selfVue.errorTitle = "Erro com a chave de verificação";
            selfVue.errorContent =
            '<p>Houve um erro ao confirmar a chave de verificação, verifique o link que você recebeu e tente novamente.</p><p style="opacity: 0.8">Código de erro: ' +
            errorCode +
            "</p>";
            selfVue.showAlertDialog();
            selfVue.sending = false;
            break;
        default:
            selfVue.errorTitle = "Erro desconhecido";
            selfVue.errorContent =
            '<p>Ops! Você acabou de esbarrar em um erro que ainda não conhecemos, por favor, entre em contato conosco informando o código de erro abaixo para que possamos corrigí-lo.</p><p style="opacity: 0.8">Código de erro: ' +
            errorCode +
            "</p>";
            selfVue.showErrorDialog();
            selfVue.sending = false;
            break;
    }
}