const btn_menuPrincipal = document.querySelector("#btn_menuPrincipal")
const menuPrincipal = document.querySelector("#menuPrincipal");
const todosmenusprincipais = [...document.querySelectorAll(".btn_menuItem")]

const endpoint_config = `../config.txt`;
fetch(endpoint_config)
    .then(res => res.json())
    .then(res => {
        sessionStorage.setItem("servidor_nodered", res.servidor_nodered);
        sessionStorage.setItem("versao", res.versao);
    })

btn_menuPrincipal.addEventListener("click", (evt) => {
    menuPrincipal.classList.toggle("ocultar");
});

todosmenusprincipais.forEach(e => {
    e.addEventListener("click", (evt) => {
        menuPrincipal.classList.add("ocultar");
    })
})

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