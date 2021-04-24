export function errorMessages(errorCode, selfVue) {
    switch (errorCode) {
        case "json_with_error":
            selfVue.alertTitle = "Erro de transmissão";
            selfVue.alertContent =
            '<p>Houve um erro na transmissão, verifique o link que você recebeu e tente novamente.</p><p style="opacity: 0.8">Código de erro: ' +
            errorCode +
            "</p>";
            selfVue.showAlertDialog();
            selfVue.sending = false;
            break;
        case "user_not_found":
            selfVue.alertTitle = "Usuário não encontrado";
            selfVue.alertContent =
            '<p>Este usuário não foi encontrado em nosso sistema Verifique o link que você recebeu e tente novamente.</p><p style="opacity: 0.8">Código de erro: ' +
            errorCode +
            "</p>";
            selfVue.showAlertDialog();
            selfVue.sending = false;
            break;
        case "exception_empty_confid" || "wrong_confid":
            selfVue.alertTitle = "Erro com a chave de verificação";
            selfVue.alertContent =
            '<p>Houve um erro ao confirmar a chave de verificação, verifique o link que você recebeu e tente novamente.</p><p style="opacity: 0.8">Código de erro: ' +
            errorCode +
            "</p>";
            selfVue.showAlertDialog();
            selfVue.sending = false;
            break;
        default:
            selfVue.alertTitle = "Erro desconhecido";
            selfVue.alertContent =
            '<p>Ops! Você acabou de esbarrar em um erro que ainda não conhecemos, por favor, entre em contato conosco informando o código de erro abaixo para que possamos corrigí-lo.</p><p style="opacity: 0.8">Código de erro: ' +
            errorCode +
            "</p>";
            selfVue.showErrorDialog();
            selfVue.sending = false;
            break;
    }
}