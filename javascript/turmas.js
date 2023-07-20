const pesquisa = document.getElementById("pesquisa")

const renderTurmas = (turmas) => {
    const table = document.querySelector("tbody")
    table.innerHTML = ''
    turmas.forEach(turma => {
        const turmaHtml = `<tr>
        <td>${turma.codigo}</td>
        <td>${turma.mentor.nome}</td>
        <td>${turma.mentoria.titulo}</td>
        <td>${turma.data}</td>
        <td>${turma.diaSemana}</td>
        <td>${turma.horario}</td>
        <td>${turma.encontros}</td>
        <td><button onclick = 'editarTurma(${turma.id})'>Alterar</button><button onclick = 'excluirTurma(${turma.id})'>Excluir</button></td>
        </tr>`
        table.innerHTML = table.innerHTML + turmaHtml;
        })

}

pesquisa.addEventListener('keyup', (even) => {
    const texto = pesquisa.value
    if(texto === ''){
        getTurmas()
    } else if(even.key === 'Enter'){
        getTurmas(texto)
    }
})

const getTurmas = async(pesquisa = null) => {
    let texto = ''
    if(pesquisa){
        texto = `?q=${pesquisa}`
    }
    
    const response = await fetch(`http://localhost:3000/turmas${texto}`)
    const turmas = await response.json()
    renderTurmas(turmas)
}


const excluirTurma = async (id) =>{
    await fetch(`http://localhost:3000/turmas/${id}`,{
        method: 'DELETE'
    })
    getTurmas()
}

const cadastrarAluno = () => {
    window.location = 'cadastroTurma.html'
}

const editarAluno = (id) => {
    window.location = `editarTurma.html?id=${id}`
}

getTurmas()