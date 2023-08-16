import { Cxmsg } from "../../utils/cxmsg.js";

const f_email = document.querySelector("#f_email");
const f_senha = document.querySelector("#f_senha");
const btn_login = document.querySelector("#btn_login");
const primeiroAcesso = document.querySelector("#primeiroAcesso");
const login = document.querySelector("#login");

let serv = null;
const endpoint_config = `../config.txt`;
fetch(endpoint_config)
    .then(res => res.json())
    .then(res => {
        sessionStorage.setItem("servidor_nodered", res.servidor_nodered);
        sessionStorage.setItem("versao", res.versao);
        serv = res.servidor_nodered;
    })



btn_login.addEventListener('click', (evt) => {
    if (serv != null) {
        const email = f_email.value;
        let senha = f_senha.value;
        if (senha == "") {
            senha = "-1"
        }
        const endpoint = `${serv}/login/${email}/${senha}`
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                if (res.retorno == 200) {
                    window.location.href = "main.html"
                    console.log("OK");

                } else if (res.retorno == 208) {
                    console.log("senha errada");
                    const config = {
                        titulo: "Erro",
                        texto: "Senha incorreta",
                        cor: "#00f",
                        tipo: "ok",
                        ok: () => { },
                        sim: null,
                        nao: null
                    }
                    Cxmsg.mostrar(config)

                } else if (res.retorno == 205) {
                    console.log("primeiro acesso");
                    primeiroAcesso.classList.remove("ocultarPopup")
                    login.classList.add("ocultarPopup")
                }
            })

    }
})