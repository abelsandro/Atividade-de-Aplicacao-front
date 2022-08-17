const modal = document.querySelector('.modal-container') //Retorna o primeiro elemento dentro do documento
const tbody = document.querySelector('tbody') // ou seja retorna o elemento que refencia a area
const sNomeDoProprietario = document.querySelector('#m-nomedoproprietario')
const sTipoDeImovel = document.querySelector('#m-tipodeimovel')
const sPrecoDoImovel = document.querySelector('#m-precodoimovel')
const sAreaDoImovel = document.querySelector('#m-areadoimovel')
const sEnderecoDoImovel = document.querySelector('#m-enderecodoimovel')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active') //classListpropriedade retorna os nomes de classe CSS de um element

  //Uma referência ao objeto que enviou o evento.
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNomeDoProprietario.value = itens[index].nomedoproprietario
    sTipoDeImovel.value = itens[index].tipodeimovel
    sPrecoDoImovel.value = itens[index].precodoimovel
    sAreaDoImovel.value = itens[index].AreaDoImovel
    sEnderecoDoImovel.value = itens[index].EnderecoDoImovel
    id = index
  } else {
    sNomeDoProprietario.value = ''
    sTipoDeImovel.value = ''
    sPrecoDoImovel.value = ''
    sAreaDoImovel.value = ''
    sEnderecoDoImovel.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nomedoproprietario}</td>
    <td>${item.tipodeimovel}</td>
    <td>R$ ${item.precodoimovel}</td>
    <td>${item.areadoimovel}</td>
    <td>${item.enderecodoimovel}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr) //Adiciona um nó ao final da lista de filhos de um nó pai especificado.
  // Se o nó já existir no documento, ele é removido de seu nó pai atual antes de ser adicionado ao novo pai.

  //<tbody>elemento é usado em conjunto com os elementos <thead> e <tfoot> para especificar cada parte de uma tabela (corpo, cabeçalho, rodapé).
}

btnSalvar.onclick = e => {
  
  if (sNomeDoProprietario.value == '' || sTipoDeImovel.value == '' || sPrecoDoImovel.value == '' || sAreaDoImovel.value == '' || sEnderecoDoImovel.value == '') {
    return
  }

  e.preventDefault(); // cancela o evento

  if (id !== undefined) {
    itens[id].nomedoproprietario = sNomeDoProprietario.value
    itens[id].tipodeimovel = sTipoDeImovel.value
    itens[id].precodoimovel = sPrecoDoImovel.value
    itens[id].areadoimovel = sAreaDoImovel.value
    itens[id].enderecodoimovel = sEnderecoDoImovel.value
  } else {
    itens.push({'nomedoproprietario': sNomeDoProprietario.value, 'tipodeimovel': sTipoDeImovel.value, 'precodoimovel': sPrecoDoImovel.value, 'areadoimovel': sAreaDoImovel.value, 'enderecodoimovel': sEnderecoDoImovel.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}
// localStorage consiste em salvar, adicionar, recuperar ou excluir dados 
// localmente em um navegador Web, esta informação é 
// guardada na forma de pares de chave-valor e os valores podem ser apenas strings.
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
