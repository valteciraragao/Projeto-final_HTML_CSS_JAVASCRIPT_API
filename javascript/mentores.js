const renderMentores = (mentores) => {
    const table = document.querySelector("tbody")
    mentores.forEach(mentor => {
        table.innerHTML = table.innerHTML + 
        `<tr>
            <td>${mentor.nome}</td>
            <td>${mentor.email}</td>
            <td><button>Alterar</button><button>Excluir</button></td>
        </tr>`})
}

const getMentores = async() => {
    const response = await fetch("http://localhost:3000/mentores")
    const mentores = await response.json()
    renderMentores(mentores)
}

getMentores()

const cadastrarMentor = () => {
    window.location = 'cadastroMentor.html'
}