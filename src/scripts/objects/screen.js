const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.style.padding = '40px'
        this.userProfile.innerHTML = `<div class="info">
                                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário />">
                                            <div class="data">
                                                <h1 class="titulo">${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                                <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                                <div class="followers">
                                                    <div>
                                                        <h3 class="titulo borda">Seguidores</h3>
                                                        <p>👥 ${user.followers}</p>
                                                    </div>
                                                    <div>
                                                        <h3 class="titulo">Seguindo</h3>
                                                        <p>👥 ${user.following}</p>
                                                    </div>
                                                </div>
                                            </div>
                                      </div>`
        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">
                                                                        <h4>${repo.name}</h4>
                                                                        <span>🍴 ${repo.forks_count}</span>
                                                                        <span>🌟 ${repo.stargazers_count}</span>
                                                                        <span>👀 ${repo.watchers_count}</span>
                                                                        <span>🎓 ${repo.language ?? "🔃"}
                                                                    </a>
                                                                </li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                           </div>`
        }

        this.userProfile.innerHTML += `<div class="events">
                                        <h2 class="titulo">Eventos</h2>
                                            <ul id="ul"></ul>
                                        </div>`

        const eventos = document.querySelector('#ul')

        let NumberOfEvents = 0

        user.events.forEach(event => {
            if(NumberOfEvents < 10){
                let eventsItens = ''
                if(event.type === 'PushEvent'){
                    eventsItens += `<li><span>${event.repo.name}</span>&nbsp&nbsp -${event.payload.commits[0].message}</li>`
                    eventos.innerHTML += `${eventsItens}`
                    NumberOfEvents ++;
                }else if(event.type === 'CreateEvent'){
                    eventsItens += `<li><span>${event.repo.name}</span>&nbsp&nbsp -Não possui mensagem</li>`
                    eventos.innerHTML += `${eventsItens}`
                    NumberOfEvents ++;
                }
            }else{
                return
            }
        })  
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontado</h3>"
    }
}

export { screen }
