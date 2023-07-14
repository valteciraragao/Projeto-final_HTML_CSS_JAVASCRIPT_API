const form = document.querySelector("form")
form.addEventListener("submit", (even) => {
    even.preventDefault()
    const nome = form.elements['nome'].value
    const email = form.elements['email'].value
    const mentor ={
        nome,
        email
    }
    cadastrarMentor(mentor)
})

const cadastrarMentor = async(mentor) => {
    await fetch("http://localhost:3000/mentores", {
        method: 'POST',
        headers: {
            "Accept": 'application/json, text/plain, */*',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(mentor)
    })
    window.location = 'mentores.html'
}