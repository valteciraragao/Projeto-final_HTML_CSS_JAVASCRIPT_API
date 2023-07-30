const formulario = document.querySelector('form')
let mentoriaId = null

const toggle = document.querySelector('.toggle input')
toggle.addEventListener('click', () => {
    let ativoInativo = toggle.parentNode.querySelector('.ativoInativo')
    ativoInativo.textContent = toggle.checked ? 'Ativo' : 'Inativo'
})

const buscarMentor = async (id) => {
    const response = await fetch(`https://api-projeto-mentorclass.onrender.com/mentores/${id}`)
    const mentor = await response.json()
    return mentor
}

const buscarMentores = async () => {
    const response = await fetch('https://api-projeto-mentorclass.onrender.com/mentores')
    const mentores = response.json()
    return mentores
}

const carregarSelect = async () => {
    const mentores = await buscarMentores()
    const mentorSelect = document.getElementById('mentor')
    const optionEmpty = new Option('Selecione um mentor...')
    mentorSelect.options.add(optionEmpty)
    
    mentores.forEach(mentor => {
        const option = new Option(mentor.nome, mentor.email, mentor.id)
        mentorSelect.options.add(option)
    })
}

const getIdUrl = () => {
    const paramString = window.location.search
    const params = new URLSearchParams(paramString)
    mentoriaId = params.get('id')
}

const buscarMentoria = async () =>{
    const response = await fetch(`https://api-projeto-mentorclass.onrender.com/mentorias/${mentoriaId}`)
    const mentoria = await response.json()
    return mentoria
} 

form.addEventListener("submit", async (even) => {
    even.preventDefault()
    const titulo = form.elements['titulo'].value
    const mentor = form.elements['mentor'].value
    const status = ativoInativo.textContent
    console.log(status)

    const mentorObjeto = await buscarMentor(mentor)
    const mentoria ={
        titulo,
        mentor: {
            id: mentorObjeto.id,
            nome: mentorObjeto.nome
        },
        status
    }
    editarMentoria(mentoria)
})

const preencherFormulario = async (mentoria) => {
    document.getElementById('titulo').value = mentoria.titulo
    document.getElementById('mentor').value = mentoria.mentor.id
    document.getElementById('ativoInativo').value = mentoria.status
}


const editarMentoria = async (mentoria) => {
    await fetch(`https://api-projeto-mentorclass.onrender.com/mentorias/${mentoriaId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentoria)
    })
    window.location = 'mentoria.html'
}

const carregarDados = async () => {
    getIdUrl()
    const mentoria = await buscarMentoria()
    preencherFormulario(mentoria)
}

carregarSelect()
carregarDados()