// https://www.youtube.com/watch?v=WgAw_QN0aTA
// https://www.youtube.com/watch?v=_b4-jWVZtg8

const dadosGrid = document.querySelector("#dadosGrid");
const btn_add = document.querySelector("#btn_add");
const novoColaborador = document.querySelector("#novoColaborador");
const btn_fecharPopup = document.querySelector("#btn_fecharPopup");
const btn_gravarPopup = document.querySelector("#btn_gravarPopup");
const btn_cancelarPopup = document.querySelector("#btn_cancelarPopup");
const telefones = document.querySelector("#telefones");
const f_fone = document.querySelector("#f_fone");
const f_tipoColab = document.querySelector("#f_tipoColab");
const f_nome = document.querySelector("#f_nome");
const f_status = document.querySelector("#f_status");
const f_foto = document.querySelector("#f_foto");
const img_foto = document.querySelector("#img_foto");

//n novo colaborator | e Editar colaborator
let modojanela = "n";

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
            const endpoint = `http://127.0.0.1:1880/deltelefone/${idtel}`
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
    const endpoint = `http://127.0.0.1:1880/todosusuarios`;
    fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            dadosGrid.innerHTML = ""
            res.forEach(e => {
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

                // const img_status = document.createElement("img");
                // img_status.setAttribute("src", "../../imagens/on.svg");
                // img_status.setAttribute("class", "icone_op");
                // divc5.appendChild(img_status);

                const img_editar = document.createElement("img");
                img_editar.setAttribute("src", "../../imagens/edit.svg");
                img_editar.setAttribute("class", "icone_op");
                img_editar.addEventListener("click", (evt) => {
                    const id = evt.target.parentNode.parentNode.firstChild.innerHTML
                    modojanela = "e";
                    document.getElementById("tituloPopup").innerHTML = "Editar Colaborador";
                    let endpoint = `http://127.0.0.1:1880/dadoscolab/${id}`;
                    fetch(endpoint)
                        .then(res => res.json())
                        .then(res => {
                            btn_gravarPopup.setAttribute("data-idcolab", id)
                            f_nome.value = res[0].s_nome_pessoa;
                            f_tipoColab.value = res[0].n_tipopessoa_tipopessoa;
                            f_status.value = res[0].c_status_pessoa;
                            img_foto.src = res[0].s_foto_pessoa;
                            novoColaborador.classList.remove("ocultarPopup")
                        })

                    endpoint = `http://127.0.0.1:1880/telefonescolab/${id}`;
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
            });
        });
}
carregarTodosColabs()

const endpointTipoColab = `http://127.0.0.1:1880/tipousuarios`;
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
    document.getElementById("tituloPopup").innerHTML = "Novo Colaborador";
    novoColaborador.classList.remove("ocultarPopup");
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
        endpointnovoeditarcolab = `http://127.0.0.1:1880/novocolab`
    } else {
        endpointnovoeditarcolab = `http://127.0.0.1:1880/editarcolab`
    }

    fetch(endpointnovoeditarcolab, cabecalho)
        .then(res => {
            if (res.status == 200) {
                if (modojanela == "n") {
                    alert("Novo colaborador gravado")
                    f_nome.value = "";
                    f_tipoColab.value = "";
                    f_status.value = "";
                    f_foto.value = "";
                    img_foto.setAttribute("src", "#");
                    telefones.innerHTML = "";
                    carregarTodosColabs();
                } else {
                    alert("Colaborador editado com sucesso!");
                }


            } else {
                alert("Erro ao gravar colaborador")
            }
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
            alert(`Número de telefone inválido! ex:15997897412`)
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