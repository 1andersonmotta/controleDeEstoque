
import { Cxmsg } from "../../utils/cxmsg.js";

const dadosGrid = document.querySelector("#dadosGrid");
const btn_add = document.querySelector("#btn_add");
const novoFornecedor = document.querySelector("#novoFornecedor");
const btn_fecharPopup = document.querySelector("#btn_fecharPopup");
const btn_fecharPopupListaContatos = document.querySelector("#btn_fecharPopupListaContatos");
const btn_fecharPopupPesq = document.querySelector("#btn_fecharPopupPesq");
const btn_gravarPopup = document.querySelector("#btn_gravarPopup");
const btn_cancelarPopup = document.querySelector("#btn_cancelarPopup");
const telefones = document.querySelector("#telefones");
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
const listaContatosForn = document.querySelector("#listaContatosForn");
const btn_listarContatosForns = document.querySelector("#btn_listarContatosForns");
const dadosGrid_novosContatosForn = document.querySelector("#dadosGrid_novosContatosForn");
const dadosGrid_contatosFornAdd = document.querySelector("#dadosGrid_contatosFornAdd");

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
btn_fecharPopupListaContatos.addEventListener("click", (evt) => {
    listaContatosForn.classList.add("ocultarPopup")
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
        const endpointpesq = `${serv}/pesquisaforn/${tipo}/${f_pesq.value}`;
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
            texto: "Digite o nome ou ID",
            cor: "#00f",
            tipo: "ok",
            ok: () => { },
            sim: null,
            nao: null
        }
        Cxmsg.mostrar(config)
        f_pesq.focus();
    }
});

btn_listartudo.addEventListener("click", (evt) => {
    carregarTodosFornecedores(evt)
})

const carregarTodosFornecedores = () => {
    const endpoint = `${serv}/todosfornecedores`;
    fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            dadosGrid.innerHTML = ""
            res.forEach(e => {
                criarLinha(e)
            });
        });
}
carregarTodosFornecedores()

const criarLinha = (e) => {
    const divlinha = document.createElement("div");
    divlinha.setAttribute("class", "linhaGrid");

    const divc1 = document.createElement("div");
    divc1.setAttribute("class", "colunaLinhaGrid c1");
    divc1.innerHTML = e.n_fornecedor_fornecedor;
    divlinha.appendChild(divc1);

    const divc2 = document.createElement("div");
    divc2.setAttribute("class", "colunaLinhaGrid c2");
    divc2.innerHTML = e.s_desc_fornecedor;
    divlinha.appendChild(divc2);

    const divc3 = document.createElement("div");
    divc3.setAttribute("class", "colunaLinhaGrid c3");
    divc3.innerHTML = e.c_status_fornecedor;
    divlinha.appendChild(divc3);

    const divc4 = document.createElement("div");
    divc4.setAttribute("class", "colunaLinhaGrid c4");
    divlinha.appendChild(divc4);

    const img_status = document.createElement("img");
    if (e.c_status_fornecedor == "A") {

        img_status.setAttribute("src", "../../imagens/on.svg");
    } else {
        img_status.setAttribute("src", "../../imagens/off.svg");
    }
    img_status.setAttribute("data-idfornecedor", e.n_fornecedor_fornecedor);
    img_status.setAttribute("class", "icone_op");
    img_status.addEventListener("click", (evt) => {
        const idfornecedor = evt.target.dataset.idfornecedor;
        if (evt.target.getAttribute("src") == "../../imagens/on.svg") {
            const endpoint_mudarStatus = `${serv}/mudarStatusFornecedor/${idfornecedor}/I`
            fetch(endpoint_mudarStatus)
                .then(res => {
                    if (res.status == 200) {
                        evt.target.setAttribute("src", "../../imagens/off.svg");
                        evt.target.parentNode.parentNode.childNodes[2].innerHTML = "I"
                    }
                })
        } else {
            const endpoint_mudarStatus = `${serv}/mudarStatusFornecedor/${idfornecedor}/A`
            fetch(endpoint_mudarStatus)
                .then(res => {
                    if (res.status == 200) {
                        evt.target.setAttribute("src", "../../imagens/on.svg");
                        evt.target.parentNode.parentNode.childNodes[2].innerHTML = "A"
                    }
                })
        }
    });
    divc4.appendChild(img_status);

    const img_editar = document.createElement("img");
    img_editar.setAttribute("src", "../../imagens/edit.svg");
    img_editar.setAttribute("class", "icone_op");
    img_editar.addEventListener("click", (evt) => {
        const id = evt.target.parentNode.parentNode.firstChild.innerHTML
        modojanela = "e";
        document.getElementById("tituloPopup").innerHTML = "Editar Fornecedor";
        let endpoint = `${serv}/dadosforn/${id}`;
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                btn_gravarPopup.setAttribute("data-idfornecedor", id)
                f_nome.value = res[0].s_desc_fornecedor;
                f_status.value = res[0].c_status_fornecedor;
                img_foto.src = res[0].s_logo_fornecedor;
                novoFornecedor.classList.remove("ocultarPopup")
                if (res[0].s_logo_fornecedor == "") {
                    img_foto.classList.add("esconderElemento");
                } else {
                    img_foto.classList.remove("esconderElemento")
                }
            })
    })

    divc4.appendChild(img_editar);
    const img_remover = document.createElement("img");
    img_remover.setAttribute("src", "../../imagens/delete.svg");
    img_remover.setAttribute("class", "icone_op");
    divc4.appendChild(img_remover);
    dadosGrid.appendChild(divlinha);
};

const addContForn = (id, nome) => {
    const divlinha = document.createElement("div");
    divlinha.setAttribute("class", "linhaGrid");

    const divc1 = document.createElement("div");
    divc1.setAttribute("class", "colunaLinhaGrid c1_lcf");
    divc1.innerHTML = id;
    divlinha.appendChild(divc1);

    const divc2 = document.createElement("div");
    divc2.setAttribute("class", "colunaLinhaGrid c2_lcf");
    divc2.innerHTML = nome;
    divlinha.appendChild(divc2);

    const divc3 = document.createElement("div");
    divc3.setAttribute("class", "colunaLinhaGrid c3_lcf");
    divlinha.appendChild(divc3);

    const img_removeContForn = document.createElement("img");
    img_removeContForn.setAttribute("src", "../../imagens/delete.svg");
    img_removeContForn.setAttribute("class", "icone_op");
    img_removeContForn.addEventListener("click", (evt) => {
        evt.target.parentNode.parentNode.remove()
    })
    divc3.appendChild(img_removeContForn);

    dadosGrid_contatosFornAdd.appendChild(divlinha)
}

const mostrarTelefonesForn = () => {

}
const criarLinhaContForn = (e) => {
    const divlinha = document.createElement("div");
    divlinha.setAttribute("class", "linhaGrid");

    const divc1 = document.createElement("div");
    divc1.setAttribute("class", "colunaLinhaGrid c1_lcf");
    divc1.innerHTML = e.n_pessoa_pessoa;
    divlinha.appendChild(divc1);

    const divc2 = document.createElement("div");
    divc2.setAttribute("class", "colunaLinhaGrid c2_lcf");
    divc2.innerHTML = e.s_nome_pessoa;
    divlinha.appendChild(divc2);

    const divc3 = document.createElement("div");
    divc3.setAttribute("class", "colunaLinhaGrid c3_lcf");
    divlinha.appendChild(divc3);

    const img_addContForn = document.createElement("img");
    img_addContForn.setAttribute("src", "../../imagens/addContForn.svg");
    img_addContForn.setAttribute("class", "icone_op");
    img_addContForn.addEventListener("click", (evt) => {
        const linha = evt.target.parentNode.parentNode;
        const id = linha.childNodes[0].innerHTML
        const nome = linha.childNodes[1].innerHTML
        addContForn(id, nome)
    })
    divc3.appendChild(img_addContForn);

    const img_verFoneContForn = document.createElement("img");
    img_verFoneContForn.setAttribute("src", "../../imagens/verTelefones.svg");
    img_verFoneContForn.setAttribute("class", "icone_op");
    img_verFoneContForn.addEventListener("click", (evt) => {
        const id = evt.target.parentNode.parentNode.firstChild.innerHTML
        let endpoint = `${serv}/retornaTelefones/${id}`;
        fetch(endpoint)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                res.forEach(e => {
                    console.log(e.s_numero_telefone)
                })
            })

    })
    divc3.appendChild(img_verFoneContForn);

    dadosGrid_novosContatosForn.appendChild(divlinha);
};

btn_add.addEventListener("click", (evt) => {
    modojanela = "n";
    document.getElementById("tituloPopup").innerHTML = "Novo Fornecedor";
    novoFornecedor.classList.remove("ocultarPopup");
    img_foto.classList.add("esconderElemento");
    f_nome.value = "";
    f_status.value = "";
    f_foto.value = "";
    img_foto.setAttribute("src", "#");
})

btn_fecharPopup.addEventListener("click", (evt) => {
    novoFornecedor.classList.add("ocultarPopup")
})

btn_gravarPopup.addEventListener("click", (evt) => {
    const dados = {
        n_fornecedor_fornecedor: evt.target.dataset.idfornecedor,
        s_desc_fornecedor: f_nome.value,
        c_status_fornecedor: f_status.value,
        s_logo_fornecedor: img_foto.getAttribute("src"),
    }

    const cabecalho = {
        method: 'post',
        body: JSON.stringify(dados)
    }
    let endpoint = null;
    if (modojanela == "n") {
        endpoint = `${serv}/novoforn`
    } else {
        endpoint = `${serv}/editarforn`
    }

    fetch(endpoint, cabecalho)
        .then(res => {
            if (res.status == 200) {
                if (modojanela == "n") {
                    const config = {
                        titulo: "OK",
                        texto: "Novo Fornecedor gravado",
                        cor: "#0f0",
                        tipo: "ok",
                        ok: () => { },
                        sim: () => { },
                        nao: () => { }
                    }
                    Cxmsg.mostrar(config)
                    f_nome.value = "";
                    f_status.value = "";
                    f_foto.value = "";
                    img_foto.setAttribute("src", "#");
                    // carregarTodosFornecedores();
                } else {
                    const config = {
                        titulo: "OK",
                        texto: "Fornecedor editado com sucesso!",
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
                    texto: "Erro ao gravar Fornecedor",
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
            carregarTodosFornecedores()
        })
})

btn_cancelarPopup.addEventListener("click", (evt) => {
    novoFornecedor.classList.add("ocultarPopup")
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

btn_listarContatosForns.addEventListener("click", (evt) => {
    let mzi = maiorZIndex() + 1;
    listaContatosForn.classList.remove("ocultarPopup")
    listaContatosForn.setAttribute("style", `z-index:${mzi} !important`)
    dadosGrid_novosContatosForn.innerHTML = "";
    let endpoint = `${serv}/todasPessoasForn`;
    fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            res.forEach(e => {
                criarLinhaContForn(e)
            })
        })
})


