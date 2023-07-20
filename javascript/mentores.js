const pesquisa = document.getElementById("pesquisa")

const renderMentores = (mentores) => {
    const table = document.querySelector("tbody")
    table.innerHTML = ''
    mentores.forEach(mentor => {
        const mentorHtml = `<tr>
        <td>${mentor.nome}</td>
        <td>${mentor.email}</td>
        <td><button onclick = 'editarMentor(${mentor.id})'>Alterar</button><button onclick = 'excluirMentor(${mentor.id})'>Excluir</button></td>
        </tr>`
        table.innerHTML = table.innerHTML + mentorHtml;
        })

}

pesquisa.addEventListener('keyup', (even) => {
    const texto = pesquisa.value
    console.log(texto)
    if(texto === ''){
        getMentores()
    } else if(even.key === 'Enter'){
        getMentores(texto)
    }
})

const getMentores = async(pesquisa = null) => {
    let texto = ''
    if(pesquisa){
        texto = `?q=${pesquisa}`
    }
    
    const response = await fetch(`http://localhost:3000/mentores${texto}`)
    const mentores = await response.json()
    renderMentores(mentores)
}


const excluirMentor = async (id) =>{
    await fetch(`http://localhost:3000/mentores/${id}`,{
        method: 'DELETE'
    })
    getMentores()
}

const cadastrarMentor = () => {
    window.location = 'cadastroMentor.html'
}

const editarMentor = (id) => {
    window.location = `editarMentor.html?id=${id}`
}

getMentores()