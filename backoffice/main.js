const serv = sessionStorage.getItem("servidor_nodered");

const verificarToken = () => {
    const token = sessionStorage.getItem("s_token_token");
    const endpoint = `${serv}/verificatoken/${token}`;
    fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            if (res.retorno == 200) {
                pagina()
            } else {
                alert("Token Inválido")
                window.location.href = "./index.html";
                sessionStorage.removeItem("n_pessoa_pessoa");
                sessionStorage.removeItem("s_nome_pessoa");
                sessionStorage.removeItem("n_token_token");
                sessionStorage.removeItem("s_token_token");
            }
        });
}
verificarToken()

const pagina = () => {

    if (sessionStorage.getItem("n_pessoa_pessoa") == "-1") {
        window.location.href = "./index.html";
    }

    const btn_menuPrincipal = document.querySelector("#btn_menuPrincipal")
    const menuPrincipal = document.querySelector("#menuPrincipal");
    const todosmenusprincipais = [...document.querySelectorAll(".btn_menuItem")]
    const divid = document.querySelector("#id");
    const divnome = document.querySelector("#nome");
    const btnlogoff = document.querySelector("#btnlogoff");


    btn_menuPrincipal.addEventListener("click", (evt) => {
        menuPrincipal.classList.toggle("ocultar");
    });

    todosmenusprincipais.forEach(e => {
        e.addEventListener("click", (evt) => {
            menuPrincipal.classList.add("ocultar");
        })
    })

    btnlogoff.addEventListener("click", (evt) => {
        sessionStorage.setItem("n_pessoa_pessoa", "-1")
        sessionStorage.setItem("s_nome_pessoa", "-1")
        window.location.href = "./index.html"
    });

    const n_pessoa_pessoa = sessionStorage.getItem("n_pessoa_pessoa");
    const s_nome_pessoa = sessionStorage.getItem("s_nome_pessoa");
    divid.innerHTML = `id: ${n_pessoa_pessoa}`;
    divnome.innerHTML = `nome:${s_nome_pessoa}`;

}
//animação
// gsap.set(".logo", {
//     background: "yellow",
//     x: -500,
//     repeat: -1,
// })
// gsap.to(".logo", {
//     background: "#005288",
//     x: 0,
//     duration: 2,
// })

// gsap.from(".logo", {
//     // background: "yellow",
//     color: "black",
//     opacity: 0,
//     x: -400,
//     repeat: -1,
//     duration: 5,
//     yoyo: true,
//     ease: "power2.out",
// })
// gsap.fromTo(".box", {
//     // background: "yellow",
//     // color: "black",
//     // opacity: 0,
//     x: -400,
// }, {
//     // background: "#005288",
//     // color: "white",
//     // opacity: 1,

//     x: 0,
//     repeat: -1,
//     duration: 5,

// })
// gsap.to(".box", {
//     duration: 1,
//     scale: 0.1,
//     y: 40,
//     ease: "power1.inOut",
//     stagger: {
//         grid: [7, 15],
//         from: "edges",
//         amount: 1.5,
//         repeat: -1
//     }
// });