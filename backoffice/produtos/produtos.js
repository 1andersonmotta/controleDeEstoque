import { Cxmsg } from "../../utils/cxmsg.js";

const dadosGrid = document.querySelector("#dadosGrid");
const btn_add = document.querySelector("#btn_add");
const novoColaborador = document.querySelector("#novoColaborador");
const btn_fecharPopup = document.querySelector("#btn_fecharPopup");
const btn_fecharPopupPesq = document.querySelector("#btn_fecharPopupPesq");
const btn_gravarPopup = document.querySelector("#btn_gravarPopup");
const btn_cancelarPopup = document.querySelector("#btn_cancelarPopup");
const telefones = document.querySelector("#telefones");
const f_fone = document.querySelector("#f_fone");
const f_tipoColab = document.querySelector("#f_tipoColab");
const f_nome = document.querySelector("#f_nome");
const f_status = document.querySelector("#f_status");
const f_foto = document.querySelector("#f_foto");
const img_foto = document.querySelector("#img_foto");
const f_filtragem = document.querySelector("#f_filtragem");
const pesquisa = document.querySelector("#pesquisa");
const btn_pesq = document.querySelector("#btn_pesq");
const f_pesqId = document.querySelector("#f_pesqId");
const f_pesqNome = document.querySelector("#f_pesqNome");
const btn_pesquisar = document.querySelector("#btn_pesquisar");
const btn_listartudo = document.querySelector("#btn_listartudo");

//n novo colaborator | e Editar colaborator
let modojanela = "n";
const serv = sessionStorage.getItem("servidor_nodered");

f_filtragem.addEventListener("keyup", (evt) => {
    const linhas = [...document.querySelectorAll(".linhaGrid")];
    let input, texto, filtragem;
    input = evt.target;
    filtragem = input.value.toUpperCase();
    for (let i = 0; i < linhas.length; i++) {
        texto = linhas[i].children[1].innerHTML;
        if (texto.toUpperCase().indexOf(filtragem) > -1) {
            linhas[i].classList.remove("ocultarLinhaGrid")
        } else {
            linhas[i].classList.add("ocultarLinhaGrid")
        }
    }
})
btn_fecharPopupPesq.addEventListener("click", (evt) => {
    pesquisa.classList.add("ocultarPopup")
})
btn_pesq.addEventListener("click", (evt) => {
    pesquisa.classList.remove("ocultarPopup")
    f_pesq.value = '';
    f_pesq.focus()
});
f_pesqId.addEventListener("click", (evt) => {
    f_pesq.value = '';
    f_pesq.focus()
});
f_pesqNome.addEventListener("click", (evt) => {
    f_pesq.value = '';
    f_pesq.focus()
});
btn_pesquisar.addEventListener("click", (evt) => {
    let tipo = null;
    if (f_pesqId.checked) {
        tipo = "id"
    } else {
        tipo = "nome"
    }
    if (f_pesq.value != "") {
        const endpointpesq = `${serv}/pesquisacolab/${tipo}/${f_pesq.value}`;
        fetch(endpointpesq)
            .then(res => res.json())
            .then(res => {
                dadosGrid.innerHTML = ""
                res.forEach(e => {
                    criarLinha(e)
                });
            })
        pesquisa.classList.add("ocultarPopup")
    } else {
        const config = {
            titulo: "Alerta",
            texto: "Digite o nome ou ID da Pessoa",
            cor: "#00f",
            tipo: "ok",
            ok: () => {

            },
            sim: null,
            nao: null
        }
        Cxmsg.mostrar(config)
        // alert("Preencha o campo de pesquisa");
        f_pesq.focus();
    }
});

btn_listartudo.addEventListener("click", (evt) => {
    carregarTodosColabs(evt)
})
const criarCxTelefone = (fone, idtel, tipo) => {
    const divTel = document.createElement("div")
    divTel.setAttribute("class", "tel")

    const numTel = document.createElement("div")
    if (tipo == "n") {
        numTel.setAttribute("class", "numTel novoTel")
    } else {
        numTel.setAttribute("class", "numTel editarTel")
    }

    numTel.innerHTML = fone;
    divTel.appendChild(numTel)

    const delTel = document.createElement("img")
    delTel.setAttribute("src", "../../imagens/delete.svg")
    delTel.setAttribute("class", "delTel")
    delTel.setAttribute("data-idtel", idtel)
    delTel.addEventListener("click", (evt) => {
        if (idtel != "-1") {
            const objTel = evt.target
            const idtel = objTel.dataset.idtel;
            const endpoint = `${serv}/${idtel}`
            fetch(endpoint)
                .then(res => {
                    if (res.status == 200) {
                        evt.target.parentNode.remove()
                    }
                })

        } else {
            evt.target.parentNode.remove()
        }

    })
    divTel.appendChild(delTel)

    telefones.appendChild(divTel)
}

const carregarTodosColabs = () => {
    const endpoint = `${serv}/todosusuarios`;
    fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            dadosGrid.innerHTML = ""
            res.forEach(e => {
                criarLinha(e)
            });
        });
}
carregarTodosColabs()

const criarLinha = (e) => {
    const divlinha = document.createElement("div");
    divlinha.setAttribute("class", "linhaGrid");

    const divc1 = document.createElement("div");
    divc1.setAttribute("class", "colunaLinhaGrid c1");
    divc1.innerHTML = e.n_pessoa_pessoa;
    divlinha.appendChild(divc1);

    const divc2 = document.createElement("div");
    divc2.setAttribute("class", "colunaLinhaGrid c2");
    divc2.innerHTML = e.s_nome_pessoa;
    divlinha.appendChild(divc2);

    const divc3 = document.createElement("div");
    divc3.setAttribute("class", "colunaLinhaGrid c3");
    divc3.innerHTML = e.n_tipopessoa_tipopessoa;
    divlinha.appendChild(divc3);

    const divc4 = document.createElement("div");
    divc4.setAttribute("class", "colunaLinhaGrid c4");
    divc4.innerHTML = e.c_status_pessoa;
    divlinha.appendChild(divc4);

    const divc5 = document.createElement("div");
    divc5.setAttribute("class", "colunaLinhaGrid c5");
    divlinha.appendChild(divc5);

    const img_status = document.createElement("img");
    if (e.c_status_pessoa == "A") {

        img_status.setAttribute("src", "../../imagens/on.svg");
    } else {
        img_status.setAttribute("src", "../../imagens/off.svg");
    }
    img_status.setAttribute("data-idcolab", e.n_pessoa_pessoa);
    img_status.setAttribute("class", "icone_op");
    img_status.addEventListener("click", (evt) => {
        const idcolab = evt.target.dataset.idcolab;
        if (evt.target.getAttribute("src") == "../../imagens/on.svg") {
            const endpoint_mudarStatus = `${serv}/mudarStatusColab/${idcolab}/I`
            fetch(endpoint_mudarStatus)
                .then(res => {
                    if (res.status == 200) {
                        evt.target.setAttribute("src", "../../imagens/off.svg");
                    }
                })
        } else {
            const endpoint_mudarStatus = `${serv}/mudarStatusColab/${idcolab}/A`
            fetch(endpoint_mudarStatus)
                .then(res => {
                    if (res.status == 200) {
                        evt.target.setAttribute("src", "../../imagens/on.svg");
                    }
                })
        }
    });
    divc5.appendChild(img_status);

    const img_editar = document.createElement("img");
    img_editar.setAttribute("src", "../../imagens/edit.svg");
    img_editar.setAttribute("class", "icone_op");
    img_editar.addEventListener("click", (evt) => {
        const id = evt.target.parentNode.parentNode.firstChild.innerHTML
        modojanela = "e";
        document.getElementById("tituloPopup").innerHTML = "Editar Pessoa";
        let endpoint = `${serv}/dadoscolab/${id}`;
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                btn_gravarPopup.setAttribute("data-idcolab", id)
                f_nome.value = res[0].s_nome_pessoa;
                f_tipoColab.value = res[0].n_tipopessoa_tipopessoa;
                f_status.value = res[0].c_status_pessoa;
                img_foto.src = res[0].s_foto_pessoa;
                novoColaborador.classList.remove("ocultarPopup")
                if (img_foto.src == "" || img_foto.src == "#") {
                    img_foto.classList.add("esconderElemento");
                } else {
                    img_foto.classList.remove("esconderElemento")
                }
            })

        endpoint = `${serv}/telefonescolab/${id}`;
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                telefones.innerHTML = ""
                res.forEach(e => {
                    criarCxTelefone(e.s_numero_telefone, e.n_telefone_telefone, "e")
                });
            })

    })

    divc5.appendChild(img_editar);

    const img_remover = document.createElement("img");
    img_remover.setAttribute("src", "../../imagens/delete.svg");
    img_remover.setAttribute("class", "icone_op");
    divc5.appendChild(img_remover);

    dadosGrid.appendChild(divlinha);
};

const endpointTipoColab = `${serv}/tipousuarios`;
fetch(endpointTipoColab)
    .then(res => res.json())
    .then(res => {
        f_tipoColab.innerHTML = "";
        res.forEach(e => {
            const opt = document.createElement("option");
            opt.setAttribute("value", e.n_tipopessoa_tipopessoa)
            opt.innerHTML = e.s_desc_tipopessoa;
            f_tipoColab.appendChild(opt);
        })

    })

btn_add.addEventListener("click", (evt) => {
    modojanela = "n";
    document.getElementById("tituloPopup").innerHTML = "Nova Pessoa";
    novoColaborador.classList.remove("ocultarPopup");
    img_foto.classList.add("esconderElemento");
    f_nome.value = "";
    f_tipoColab.value = "";
    f_status.value = "";
    f_foto.value = "";
    img_foto.setAttribute("src", "#");
    telefones.innerHTML = "";
})

btn_fecharPopup.addEventListener("click", (evt) => {
    novoColaborador.classList.add("ocultarPopup")
})

btn_gravarPopup.addEventListener("click", (evt) => {
    const tels = [...document.querySelectorAll(".novoTel")];
    let numTels = [];
    tels.forEach((t) => {
        numTels.push(t.innerHTML);
    })

    const dados = {
        n_pessoa_pessoa: evt.target.dataset.idcolab,
        s_nome_pessoa: f_nome.value,
        n_tipopessoa_tipopessoa: f_tipoColab.value,
        c_status_pessoa: f_status.value,
        numtelefones: numTels,
        s_foto_pessoa: img_foto.getAttribute("src"),
    }

    const cabecalho = {
        method: 'post',
        body: JSON.stringify(dados)
    }
    let endpointnovoeditarcolab = null;
    if (modojanela == "n") {
        endpointnovoeditarcolab = `${serv}/novocolab`
    } else {
        endpointnovoeditarcolab = `${serv}/editarcolab`
    }

    fetch(endpointnovoeditarcolab, cabecalho)
        .then(res => {
            if (res.status == 200) {
                if (modojanela == "n") {
                    const config = {
                        titulo: "OK",
                        texto: "Nova pessoa gravada",
                        cor: "#0f0",
                        tipo: "ok",
                        ok: () => { },
                        sim: () => { },
                        nao: () => { }
                    }
                    Cxmsg.mostrar(config)
                    f_nome.value = "";
                    f_tipoColab.value = "";
                    f_status.value = "";
                    f_foto.value = "";
                    img_foto.setAttribute("src", "#");
                    telefones.innerHTML = "";
                    carregarTodosColabs();
                } else {
                    const config = {
                        titulo: "OK",
                        texto: "Pessoa editada com sucesso!",
                        cor: "#0f0",
                        tipo: "ok",
                        ok: () => { },
                        sim: () => { },
                        nao: () => { }
                    }
                    Cxmsg.mostrar(config)
                }


            } else {
                const config = {
                    titulo: "ERRO",
                    texto: "Erro ao gravar a pessoa",
                    cor: "#f00",
                    tipo: "ok",
                    ok: () => { },
                    sim: () => { },
                    nao: () => { }
                }
                Cxmsg.mostrar(config)
            }
        }).finally(() => {
            img_foto.classList.add("esconderElemento");
        })

})

btn_cancelarPopup.addEventListener("click", (evt) => {
    novoColaborador.classList.add("ocultarPopup")
})

f_fone.addEventListener("keyup", (evt) => {
    if (evt.key == "Enter") {
        if (evt.target.value.length >= 8) {
            criarCxTelefone(evt.target.value, "-1", "n")
            evt.target.value = "";
        } else {
            const config = {
                titulo: "OK",
                texto: "Número de telefone inválido! ex:15997897412",
                cor: "#f00",
                tipo: "ok",
                ok: () => { },
                sim: () => { },
                nao: () => { }
            }
            Cxmsg.mostrar(config)
        }
    }
})

const convert_image_b64 = (localDestino, arquivoimg) => {
    const obj = arquivoimg;
    const reader = new FileReader();
    reader.addEventListener("load", (evt) => {
        const res = reader.result;
        localDestino.src = res;
    });
    if (obj) {
        reader.readAsDataURL(obj);
    }
}

f_foto.addEventListener("change", (evt) => {
    convert_image_b64(img_foto, evt.target.files[0])
})