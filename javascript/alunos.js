const pesquisa = document.getElementById("pesquisa")

const renderAlunos = (mentores) => {
    const table = document.querySelector("tbody")
    table.innerHTML = ''
    mentores.forEach(aluno => {
        const alunoHtml = `<tr>
        <td>${aluno.nome}</td>
        <td>${aluno.email}</td>
        <td><a onclick = 'editarAluno(${aluno.id})'><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="19.5" fill="white" stroke="#E0E0E0"/><path fill-rule="evenodd" clip-rule="evenodd" d="M25.204 18.796L27 17C27.5453 16.4548 27.8179 16.1821 27.9636 15.888C28.2409 15.3285 28.2409 14.6715 27.9636 14.112C27.8179 13.8179 27.5453 13.5453 27 13C26.4548 12.4548 26.1821 12.1821 25.888 12.0364C25.3285 11.7591 24.6715 11.7591 24.112 12.0364C23.8179 12.1821 23.5453 12.4548 23 13L21.1814 14.8187C22.1452 16.4693 23.5314 17.8448 25.204 18.796ZM19.7269 16.2731L12.8564 23.1436C12.4313 23.5687 12.2188 23.7812 12.0791 24.0423C11.9393 24.3034 11.8804 24.5981 11.7625 25.1876L11.1471 28.2646C11.0806 28.5972 11.0473 28.7635 11.1419 28.8581C11.2365 28.9527 11.4028 28.9194 11.7355 28.8529L14.8124 28.2375C15.4019 28.1196 15.6966 28.0607 15.9577 27.9209C16.2188 27.7812 16.4313 27.5687 16.8564 27.1436L23.7458 20.2542C22.1241 19.2386 20.7524 17.8763 19.7269 16.2731Z" fill="#004CE8"/></svg></a><a onclick = 'excluirAluno(${aluno.id})'><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="19.5" fill="white" stroke="#E0E0E0"/><path fill-rule="evenodd" clip-rule="evenodd" d="M11.75 13C11.75 12.5858 12.0858 12.25 12.5 12.25H27.5C27.9142 12.25 28.25 12.5858 28.25 13V30C28.25 30.4142 27.9142 30.75 27.5 30.75H12.5C12.0858 30.75 11.75 30.4142 11.75 30V13ZM13.25 13.75V29.25H26.75V13.75H13.25Z" fill="#FF3333"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18 17.25C18.4142 17.25 18.75 17.5858 18.75 18V24.5C18.75 24.9142 18.4142 25.25 18 25.25C17.5858 25.25 17.25 24.9142 17.25 24.5V18C17.25 17.5858 17.5858 17.25 18 17.25Z" fill="#FF3333"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 17.25C22.4142 17.25 22.75 17.5858 22.75 18V24.5C22.75 24.9142 22.4142 25.25 22 25.25C21.5858 25.25 21.25 24.9142 21.25 24.5V18C21.25 17.5858 21.5858 17.25 22 17.25Z" fill="#FF3333"/><path fill-rule="evenodd" clip-rule="evenodd" d="M9.25 13C9.25 12.5858 9.58579 12.25 10 12.25H30C30.4142 12.25 30.75 12.5858 30.75 13C30.75 13.4142 30.4142 13.75 30 13.75H10C9.58579 13.75 9.25 13.4142 9.25 13Z" fill="#FF3333"/><path fill-rule="evenodd" clip-rule="evenodd" d="M16.9868 9.63949C17.1185 9.39931 17.3706 9.25 17.6445 9.25H22.3885C22.6647 9.25 22.9186 9.40179 23.0493 9.6451L24.6607 12.6451C24.7856 12.8775 24.7791 13.1585 24.6437 13.3849C24.5083 13.6114 24.2638 13.75 24 13.75H16C15.735 13.75 15.4897 13.6102 15.3547 13.3822C15.2197 13.1542 15.215 12.8718 15.3423 12.6395L16.9868 9.63949ZM18.0887 10.75L17.2664 12.25H22.7458L21.9401 10.75H18.0887Z" fill="#FF3333"/></svg></a></td>
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
    
    const response = await fetch(`https://api-projeto-mentorclass.onrender.com/alunos${texto}`)
    const alunos = await response.json()
    renderAlunos(alunos)
}


const excluirAluno = async (id) =>{
    await fetch(`https://api-projeto-mentorclass.onrender.com/alunos/${id}`,{
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