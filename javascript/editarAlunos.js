const formulario = document.querySelector('form')
let alunoId = null

const buscarTurma = async(id) => {
    const response = await fetch(`http://localhost:3000/turmas/${id}`)
    const turma = await response.json()
    return turma
}

const buscarTurmas = async() => {
    const response = await fetch('http://localhost:3000/turmas')
    const turmas = response.json()
    return turmas
}

const carregarSelect = async() => {
    const turmas = await buscarTurmas()
    const turmaSelect = document.getElementById('turma')
    const optionEmpty = new Option('Selecione uma turma')
    turmaSelect.options.add(optionEmpty)
    
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
    const response = await fetch(`http://localhost:3000/alunos/${alunoId}`)
    const aluno = await response.json()
    return aluno
} 

formulario.addEventListener('submit', async (even)=>{
    even.preventDefault()
    const nome = formulario.elements['nome'].value
    const email = formulario.elements['email'].value
    const turma = formulario.elements['turma'].value

    const turmaObjeto = await buscarTurma(turma)
    const aluno = {
        nome,
        email,
        turma:{
            id: turmaObjeto.id,
            codigo: turmaObjeto.codigo
        }
    }
    editarAluno(aluno)
})

const preencherFormulario = async (aluno) => {
    let turma = ''
    if (aluno.turma.id) {
        turma = aluno.turma.id
    } else {
        turma = aluno.turma
    }
    document.getElementById('nome').value = aluno.nome
    document.getElementById('email').value = aluno.email
    document.getElementById('turma').value = turma
}


const editarAluno = async (aluno) => {
    await fetch(`http://localhost:3000/alunos/${alunoId}`, {
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
    await carregarSelect()
    preencherFormulario(aluno)
}

carregarDados()