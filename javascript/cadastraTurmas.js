const form = document.getElementById("form")

const buscarMentoria = async(id) => {
    const response = await fetch(`https://api-projeto-mentorclass.onrender.com/mentorias/${id}`)
    const mentoria = await response.json()
    return mentoria
}

const buscarMentorias = async() => {
    const response = await fetch('https://api-projeto-mentorclass.onrender.com/mentorias')
    const mentorias = response.json()
    return mentorias
}

const buscarMentor = async(id) => {
    const response = await fetch(`https://api-projeto-mentorclass.onrender.com/mentores/${id}`)
    const mentor = await response.json()
    return mentor
}

const buscarMentores = async() => {
    const response = await fetch('https://api-projeto-mentorclass.onrender.com/mentores')
    const mentores = response.json()
    return mentores
}

const carregarSelectMentor = async() => {
    const mentores = await buscarMentores()
    const mentorSelect = document.getElementById('mentor')
    const optionEmpty = new Option('Selecione um mentor...')
    mentorSelect.options.add(optionEmpty)
    
    mentores.forEach(mentor => {
        const option = new Option(mentor.nome, mentor.email, mentor.id)
        mentorSelect.options.add(option)
    })
}

const carregarSelectMentoria = async() => {
    const mentores = await buscarMentores()
    const mentorSelect = document.getElementById('mentor')
    const optionEmpty = new Option('Selecione um mentor...')
    mentorSelect.options.add(optionEmpty)
    
    mentores.forEach(mentor => {
        const option = new Option(mentor.nome, mentor.email, mentor.id)
        mentorSelect.options.add(option)
    })
}

const cadastrarMentoria = async(mentoria) => {
    await fetch("https://api-projeto-mentorclass.onrender.com/mentorias", {
        method: 'POST',
        headers: {
            "Accept": 'application/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(mentoria)
    })
    window.location = 'mentoria.html'
}

form.addEventListener("submit", async (even) => {
    even.preventDefault()
    const titulo = form.elements['titulo'].value
    const mentor = form.elements['mentor'].value
    const status = form.elements['status'].value

    const mentorObjeto = await buscarMentor(mentor)
    const mentoria ={
        titulo,
        mentor: {
            id: mentorObjeto.id,
            nome: mentorObjeto.nome,
            email: mentorObjeto.email
        },
        status
    }
    cadastrarMentoria(mentoria)
})

carregarSelect()

