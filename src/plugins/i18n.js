import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    pt: {
       "Welcome": "Bem-vindo(a)",
       "Welcome to RSS Reader, click on the top left corner to login or sign up so we can start":"Bem-vindo ao RSS Reader, clique no canto superior esquerdo para fazer o login ou cadastrar-se para que possamos começar",
       "Welcome to RSS Reader, click on the + button to add a new feed":"Bem-vindo ao RSS Reader, clique no botão + para adicionar um novo feed",
       "Welcome to RSS Reader, select a feed on the left to start":"Bem-vindo ao RSS Reader, selecione um feed à esquerda para começar",
       "Account settings":"Configurações de conta",
       "Cancel":"Cancelar",
       "Save":"Salvar",
       "Close":"Fechar",
       "RSS Reader": "RSS Reader",
       "About":"Sobre",
       "<div>App icon made by <a href=\"https://www.freepik.com\" title=\"Freepik\">Freepik</a> from <a href=\"https://www.flaticon.com/\" title=\"Flaticon\">www.flaticon.com</a></div>": "Ícone do aplicativo feito por <a href=\"https://www.freepik.com\" title=\"Freepik\">Freepik</a> de <a href=\"https://www.flaticon.com/\" title=\"Flaticon\">www.flaticon.com</a></div>",
       "Read full article":"Ler artigo completo",
       "Login":"Entrar",
       "Sign up":"Cadastrar-se",
       "Password":"Senha",
       "Repeat password":"Repetir senha",
       "Name":"Nome",
       "Login with Google":"Entre com Google",
       "Sign up with Google":"Cadastre-se com Google",
       "The passwords don't match":"As senhas não combinam",
       "This field is mandatory":"Este campo é obrigatório",
       "The password is to short":"A senha é muito curta",
       "Login or Sign Up":"Entre ou Cadastre-se",
       "Sign out":"Sair",
       "Search":"Pesquisar",
       "New feed":"Novo feed",
       "Account":"Conta",
       "Settings":"Configurações",
       "Home":"Início",
       "Link to share":"Link para compartilhar",
       "Are you sure?":"Tem certeza?",
       "Are you sure that you want to sign out?":"Tem certeza que deseja sair?",
       "Add a new feed":"Adicionar novo feed",
       "Order feeds list":"Ordenar lista de feeds",
       "Alphabetically":"Alfabeticamente",
       "Added date":"Ordem de adição",
       "Dark mode":"Modo escuro",
       "Reset":"Redefinir",
    }
}

export default new VueI18n({
    locale: navigator.languages[0].split("-")[0],
    fallbackLocale: "en",
    formatFallbackMessages: true,
    messages: messages,
})