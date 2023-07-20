const pesquisa = document.getElementById("pesquisa")

const renderAlunos = (mentores) => {
    const table = document.querySelector("tbody")
    table.innerHTML = ''
    mentores.forEach(aluno => {
        const alunoHtml = `<tr>
        <td>${aluno.nome}</td>
        <td>${aluno.email}</td>
        <td><button onclick = 'editarAluno(${aluno.id})'>Alterar</button><button onclick = 'excluirAluno(${aluno.id})'>Excluir</button></td>
        </tr>`
        table.innerHTML = table.innerHTML + alunoHtml;
        })

}

pesquisa.addEventListener('keyup', (even) => {
    const texto = pesquisa.value
    console.log(texto)
    if(texto === ''){
        getAlunos()
    } else if(even.key === 'Enter'){
        getAlunos(texto)
    }
})

const getAlunos = async(pesquisa = null) => {
    let texto = ''
    if(pesquisa){
        texto = `?q=${pesquisa}`
    }
    
    const response = await fetch(`http://localhost:3000/alunos${texto}`)
    const alunos = await response.json()
    renderAlunos(alunos)
}


const excluirAluno = async (id) =>{
    await fetch(`http://localhost:3000/alunos/${id}`,{
        method: 'DELETE'
    })
    getAlunos()
}

const cadastrarAluno = () => {
    window.location = 'cadastroAluno.html'
}

const editarAluno = (id) => {
    window.location = `editarAluno.html?id=${id}`
}

getAlunos()