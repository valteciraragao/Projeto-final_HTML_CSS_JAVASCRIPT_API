const form = document.getElementById("form")

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
    console.log(turmas)
    turmas.forEach(turma => {
        const option = new Option(turma.codigo, turma.id)
        turmaSelect.options.add(option)
    })
}



const cadastrarAluno = async(aluno) => {
    await fetch("http://localhost:3000/alunos", {
        method: 'POST',
        headers: {
            "Accept": 'application/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(aluno)
    })
    window.location = 'alunos.html'
}

form.addEventListener("submit", async (even) => {
    even.preventDefault()
    console.log(form.elements['email'])
    const nome = form.elements['nome'].value
    const email = form.elements['email'].value
    const turma = form.elements['turma'].value

    const turmaObjeto = await buscarTurma(turma)
    const aluno ={
        nome,
        email,
        turma: {
            id: turmaObjeto.id,
            codigo: turmaObjeto.codigo
        }
    }
    cadastrarAluno(aluno)
})

carregarSelect()

