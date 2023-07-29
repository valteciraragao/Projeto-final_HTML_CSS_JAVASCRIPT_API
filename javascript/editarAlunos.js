const formulario = document.querySelector('form')
let alunoId = null

const buscarTurma = async(id) => {
    const response = await fetch(`https://api-projeto-mentorclass.onrender.com/turmas/${id}`)
    const turma = await response.json()
    return turma
}

const buscarTurmas = async() => {
    const response = await fetch('https://api-projeto-mentorclass.onrender.com/turmas')
    const turmas = response.json()
    return turmas
}

const carregarSelect = async() => {
    const turmas = await buscarTurmas()
    const turmaSelect = document.getElementById('turma')
    const optionEmpty = new Option('Selecione uma turma')
    turmaSelect.options.add(optionEmpty)
    console.log(turmas)
    turmas.forEach(turma => {
        const option = new Option(turma.codigo, turma.id)
        turmaSelect.options.add(option)
    })
}


const getIdUrl = () => {
    const paramString = window.location.search
    const params = new URLSearchParams(paramString)
    alunoId = params.get('id')
}

const buscarAluno = async () =>{
    const response = await fetch(`https://api-projeto-mentorclass.onrender.com/alunos/${alunoId}`)
    const aluno = await response.json()
    return aluno
} 

formulario.addEventListener('submit', (even)=>{
    even.preventDefault()
    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value

    const aluno = {
        nome,
        email,
        turma: {
            id: turmaObjeto.id,
            codigo: turmaObjeto.codigo
        }
    }
    editarAluno(aluno)
})

const preencherFormulario = async (aluno) => {
    document.getElementById('nome').value = aluno.nome
    document.getElementById('email').value = aluno.email
}


const editarAluno = async (aluno) => {
    await fetch(`https://api-projeto-mentorclass.onrender.com/alunos/${alunoId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aluno)
    })
    window.location = 'alunos.html'
}

const carregarDados = async () => {
    getIdUrl()
    const aluno = await buscarAluno()
    preencherFormulario(aluno)
}

carregarSelect()
carregarDados()