const formulario = document.querySelector('form')
let mentorId = null

const getIdUrl = () => {
    const paramString = window.location.search
    const params = new URLSearchParams(paramString)
    mentorId = params.get('id')
}

const buscarMentor = async () =>{
    const response = await fetch(`http://localhost:3000/mentores/${mentorId}`)
    const mentor = await response.json()
    return mentor
} 

formulario.addEventListener('submit', (even)=>{
    even.preventDefault()
    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value

    const mentor = {
        nome,
        email
    }
    editarMentor(mentor)
})

const preencherFormulario = async (mentor) => {
    document.getElementById('nome').value = mentor.nome
    document.getElementById('email').value = mentor.email
}


const editarMentor = async (mentor) => {
    await fetch(`http://localhost:3000/mentores/${mentorId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mentor)
    })
    window.location = 'mentores.html'
}

const carregarDados = async () => {
    getIdUrl()
    const mentor = await buscarMentor()
    preencherFormulario(mentor)
}

carregarDados()