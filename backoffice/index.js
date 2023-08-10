import { Cxmsg } from "../../utils/cxmsg.js";

const f_email = document.querySelector("#f_email");
const f_senha = document.querySelector("#f_senha");
const btn_login = document.querySelector("#btn_login");

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
        const senha = f_senha.value;
        const endpoint = `${serv}/login/${email}/${senha}`
        fetch(endpoint)
            .then(res => {
                if (res.status == 200) {
                    console.log("OK");
                    console.log(res.status);

                } else if (res.status == 208) {
                    console.log("senha errada");
                    console.log(res.status);

                    const config = {
                        titulo: "Erro",
                        texto: "Senha incorreta",
                        cor: "#00f",
                        tipo: "ok",
                        ok: () => {

                        },
                        sim: null,
                        nao: null
                    }
                    Cxmsg.mostrar(config)

                } else if (res.status == 205) {
                    console.log("primeiro acesso");
                    console.log(res.status);


                }
            })

    }
})