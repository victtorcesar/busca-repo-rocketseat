/* 
// Classes em JS

class List {
    constructor(){
        this.data = []
    }
    add(data){
        this.data.push(data)
        console.log(this.data)
    }
}
class TodoList extends List {
    constructor(){
        super()

        this.usuario = 'Victor'
    }
    mostrarUsuario(){
        console.log(this.usuario)
    }
}

const minhaLista = new TodoList()
document.getElementById('novotodo').onclick = () => {
    minhaLista.add('Novo Todos')
}

minhaLista.mostrarUsuario()


// Operações em Array

let arr = [1, 3, 4, 5, 8, 9]
let newArr = arr.map( (item, index) => item + index)
console.log(newArr)

let soma = arr.reduce( (total, next) => total + next)
console.log(soma)

let filtro = arr.filter( (item) => item % 2 ===0 )
console.log(filtro)

let find = arr.find( (item) => item === 4)
console.log(find)


//Desestrutruração

const usuario = {
    nome: 'Victor',
    idade: 21,
    endreco: {
        cidade:'SBO',
        estado: 'SP'
    }
}

function dadosUser({ nome, idade }) {
    console.log(nome, idade)
}

dadosUser(usuario)

//Rest && Sprend

//Rest

const usuario = {
    nome: 'Victor',
    idade: 21,
    empresa: 'Studio Czar'
}

const { nome, ...resto} = usuario
console.log(nome)
console.log(resto)

const arr = [1, 2, 3, 4]

const [ a, b, ...c] = arr
console.log(a)
console.log(b)
console.log(c)

function soma(a, b,...params){
    return params.reduce((total, next) => total + next)
}
console.log(soma(1, 2, 3, 4))

//Spread

const arr1 = [1,2,3]
const arr2 = [4,5,6]

const arr3 = [...arr1, ...arr2]

console.log(arr3)

const user = {
    nome: 'Victor',
    idade: 21
}yarn
const user2 = {...user, nome: 'Lisandra'}
console.log(user2)


import { soma, sub } from '../function'

console.log(soma(1, 5))
console.log(sub(5, 2))
*/

const myPromise = () => new Promise((res, rej) =>{
    setTimeout(() => { res('Ok') }, 2000)
})
/* 
// Classes em JS

class List {
    constructor(){
        this.data = []
    }
    add(data){
        this.data.push(data)
        console.log(this.data)
    }
}
class TodoList extends List {
    constructor(){
        super()

        this.usuario = 'Victor'
    }
    mostrarUsuario(){
        console.log(this.usuario)
    }
}

const minhaLista = new TodoList()
document.getElementById('novotodo').onclick = () => {
    minhaLista.add('Novo Todos')
}

minhaLista.mostrarUsuario()


// Operações em Array

let arr = [1, 3, 4, 5, 8, 9]
let newArr = arr.map( (item, index) => item + index)
console.log(newArr)

let soma = arr.reduce( (total, next) => total + next)
console.log(soma)

let filtro = arr.filter( (item) => item % 2 ===0 )
console.log(filtro)

let find = arr.find( (item) => item === 4)
console.log(find)


//Desestrutruração

const usuario = {
    nome: 'Victor',
    idade: 21,
    endreco: {
        cidade:'SBO',
        estado: 'SP'
    }
}

function dadosUser({ nome, idade }) {
    console.log(nome, idade)
}

dadosUser(usuario)

//Rest && Sprend

//Rest

const usuario = {
    nome: 'Victor',
    idade: 21,
    empresa: 'Studio Czar'
}

const { nome, ...resto} = usuario
console.log(nome)
console.log(resto)

const arr = [1, 2, 3, 4]

const [ a, b, ...c] = arr
console.log(a)
console.log(b)
console.log(c)

function soma(a, b,...params){
    return params.reduce((total, next) => total + next)
}
console.log(soma(1, 2, 3, 4))

//Spread

const arr1 = [1,2,3]
const arr2 = [4,5,6]

const arr3 = [...arr1, ...arr2]

console.log(arr3)

const user = {
    nome: 'Victor',
    idade: 21
}yarn
const user2 = {...user, nome: 'Lisandra'}
console.log(user2)


import { soma, sub } from '../function'

console.log(soma(1, 5))
console.log(sub(5, 2))


const minhaPromise = () => new Promise((resolve, reject) =>{
    setTimeout(() => { resolve('Hello') }, 2000 )
})

async function executar(){
    const response = await minhaPromise()

    console.log(response)

}
executar()


import axios from 'axios'

class Api {
    static async getUserInfo(username){
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`)
            console.log(response)
            
        } catch (error) {
            console.log('Usuario não encontrado')
        }
    }
}

Api.getUserInfo('victtorcesar')
Api.getUserInfo('diego3g')
*/

import api from './api'

class App{
    constructor(){
        this.repositories = []

        this.formElement = document.querySelector('#repo-form')
        this.listElement = document.querySelector('#repo-list')
        this.inputElement = document.querySelector('input[name=repositorio]')
        
        this.registerHandlers()
    }
    registerHandlers(){
        this.formElement.onsubmit = e => this.addResipotory(e)
    }

    setLoading(loading = true){
        if(loading === true){

        let loadingElement = document.createElement('IMG')
        loadingElement.src ='https://camo.githubusercontent.com/b924cbb7e3477ddebd28850481722f5a2cebd822/68747470733a2f2f656e74657270726973652e6769746875622e636f6d2f6173736574732f7370696e6e6572732f6f63746f6361742d7370696e6e65722d3132382d323661343433333339313738353463363739346435356561633934376231323737666365643534663166363063356466356439333433316462383735336263352e676966'
        loadingElement.style.width = '60px'
        loadingElement.style.height = '60px'
        loadingElement.setAttribute('id', 'loading')

        this.formElement.appendChild(loadingElement)
        }else{
            document.querySelector('#loading').remove()
        }
    }
    async addResipotory(){
        event.preventDefault()

        const repoInput = this.inputElement.value

        if (repoInput.length === 0)
            return

            this.setLoading()
        try{
            const response = await api.get(`/repos/${repoInput}`)
            const { name, description, html_url, owner: { avatar_url}} = response.data
    
            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            })
    
            this.inputElement.value = ''
            
            this.render()
        }catch(error){
            alert('Repositorio não existe! Tente novamente.')
        }
        this.setLoading(false)
        }
       
    render(){
        this.listElement.innerHTML = ''
         this.repositories.forEach(repo =>{
             let imgElement = document.createElement('img')
             imgElement.setAttribute('src', repo.avatar_url)
             
             let titleElement = document.createElement('strong')
             titleElement.appendChild(document.createTextNode(repo.name))

             let discrptionElement = document.createElement('p')
             discrptionElement.appendChild(document.createTextNode(repo.description))

             let linkElement = document.createElement('a')
             linkElement.setAttribute('href', repo.html_url)
             linkElement.setAttribute('target', '_blank')
             linkElement.appendChild(document.createTextNode('Acessar'))

             let listItemElement = document.createElement('li')
             listItemElement.appendChild(imgElement)
             listItemElement.appendChild(titleElement)
             listItemElement.appendChild(discrptionElement)
             listItemElement.appendChild(linkElement)

             this.listElement.appendChild(listItemElement)
             
         })
    }
}

new App()

