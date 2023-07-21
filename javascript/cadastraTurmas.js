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
        const option = new Option(mentor.nome, mentor.id)
        mentorSelect.options.add(option)
    })
}

const carregarSelectMentoria = async() => {
    const mentorias = await buscarMentorias()
    const mentoriaSelect = document.getElementById('mentoria')
    const optionEmpty = new Option('Selecione um mentoria...')
    mentoriaSelect.options.add(optionEmpty)
    
    mentorias.forEach(mentoria => {
        const option = new Option(mentoria.titulo, mentoria.id)
        mentoriaSelect.options.add(option)
    })
}

const cadastrarTurmas = async(turma) => {
    await fetch("https://api-projeto-mentorclass.onrender.com/turmas", {
        method: 'POST',
        headers: {
            "Accept": 'application/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(turma)
    })
    window.location = 'turmas.html'
}

form.addEventListener("submit", async (even) => {
    even.preventDefault()
    const mentoria = form.elements['mentoria'].value
    const mentor = form.elements['mentor'].value
    const data = form.elements['data'].value
    const dia = form.elements['dia'].value
    const horaInicio = form.elements['horaInicio'].value
    const horaFim = form.elements['horaFim'].value
    const codigo = form.elements['codigo'].value
    const link = form.elements['link'].value
    const encontros = form.elements['encontros'].value

    const mentoriaObjeto = await buscarMentoria(mentoria)
    const mentorObjeto = await buscarMentor(mentor)
    const turma ={
        mentoria: {
            id: mentoriaObjeto.id,
            titulo: mentoriaObjeto.titulo
        },
        mentor: {
            id: mentorObjeto.id,
            nome: mentorObjeto.nome,
        },
        data,
        dia,
        horaInicio,
        horaFim,
        codigo,
        link,
        encontros
    }
    cadastrarTurmas(turma)
})

carregarSelectMentor()
carregarSelectMentoria()

