const pesquisa = document.getElementById("pesquisa")

const renderMentorias = (mentorias) => {
    const table = document.querySelector("tbody")
    table.innerHTML = ''
    mentorias.forEach(mentoria => {
        const mentoriaHtml = `<tr>
        <td>${mentoria.titulo}</td>
        <td>${mentoria.mentor.nome}</td>
        <td>${mentoria.status}</td>
        <td><button onclick = 'editarMentoria(${mentoria.id})'>Alterar</button><button onclick = 'excluirMentoria(${mentoria.id})'>Excluir</button></td>
        </tr>`
        table.innerHTML = table.innerHTML + mentoriaHtml;
        })

}

pesquisa.addEventListener('keyup', (even) => {
    const texto = pesquisa.value
    console.log(texto)
    if(texto === ''){
        getMentorias()
    } else if(even.key === 'Enter'){
        getMentorias(texto)
    }
})

const getMentorias = async(pesquisa = null) => {
    let texto = ''
    if(pesquisa){
        texto = `?q=${pesquisa}`
    }
    
    const response = await fetch(`https://api-projeto-mentorclass.onrender.com/mentorias${texto}`)
    const mentorias = await response.json()
    renderMentorias(mentorias)
}


const excluirMentoria = async (id) =>{
    await fetch(`https://api-projeto-mentorclass.onrender.com/mentorias/${id}`,{
        method: 'DELETE'
    })
    getMentorias()
}

const cadastrarMentoria = () => {
    window.location = 'cadastroMentoria.html'
}

const editarMentoria = (id) => {
    window.location = `editarMentoria.html?id=${id}`
}

getMentorias()