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
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
    }
})