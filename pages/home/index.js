const baseUrl = 'https://m2-api-living.herokuapp.com/news';
const divObserver = document.querySelector('.observer');
let page = 1;
const postsList = document.querySelector('#posts-list')

let bttnsFilter = [...document.querySelectorAll('.bttn-filter')]

function setFilter() {
    let getFilter = ''
    if (localStorage.getItem("setFilter") != null) {
        getFilter = JSON.parse(localStorage.getItem("setFilter"))
    } else {
        getFilter = 'Todos'
    }
    return getFilter
}

function firstLoad() {
    let getFilter = setFilter()
    renderizaPosts(page, getFilter)
}
firstLoad()

async function requestPosts(currentPage) {
    const postsJSON = await fetch(`${baseUrl}?${currentPage}`)
    const posts = await postsJSON.json()
    return posts
}

async function renderizaPosts(currentPage, filter) {
    const posts = await requestPosts(currentPage)

    posts.news.forEach(post => {
        if (filter == 'Todos') {
            postsList.insertAdjacentHTML('beforeend', `
                <div class="card" id='post-${post.id}'>
                    <img class="card-img" src=${post.image} alt=Img representando: ${post.category}>
                    <span>
                        <h5 class="font3 card-title">${post.title}</h5>
                        <p class="font5 card-desc">${post.description}</p>
                        <a class="font4 green card-link" id='go-to-${post.id}'>Acessar Conteúdo</a>
                    </span>                    
                </div>
            `)
        } else if (post.category == filter) {
            postsList.insertAdjacentHTML('beforeend', `
                <div class="card" id='post-${post.id}'>
                    <img class="card-img" src=${post.image} alt=Img representando: ${post.category}>
                    <span>
                        <h5 class="font3 card-title">${post.title}</h5>
                        <p class="font5 card-desc">${post.description}</p>
                        <a class="font4 green card-link" id='go-to-${post.id}'>Acessar Conteúdo</a>
                    </span>  
                </div>
            `)
        }
    })    
    let cardsCount = document.querySelectorAll('.card')
    if(cardsCount.length < 6){
        let getFilter = setFilter()
        page++
        renderizaPosts(page, getFilter)
    }
    trackPostBttns()
    observer.observe(divObserver);
}

const footer = document.querySelector('footer')

const observer = new IntersectionObserver((entries) => {
    let getFilter = setFilter()
    if (entries.some((entry) => entry.isIntersecting)) {
        page++
        renderizaPosts(page, getFilter);
        if (getFilter != 'Todos') {   
            for (let i = 0; i < 5; i++) {             
                page++
                renderizaPosts(page, getFilter);            
            }        
        }
        footer.classList.remove('hide')
    }    
});

const bttnBackToStart = document.querySelector('#bttn-back-to-start')

bttnBackToStart.addEventListener('click', async () => {
    let getFilter = setFilter()
    footer.classList.add('hide')
    window.location.href = "#top";
    postsList.innerHTML = ''
    page = 1
    await renderizaPosts(page, getFilter)
})

const start = document.querySelector('#start')

const observerTOP = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
        footer.classList.add('hide')
    }
});
observerTOP.observe(start);

function destacBttn() {
    let getFilter = setFilter()
    bttnsFilter.map((bttn) => { bttn.classList.remove('selected') })
    let selected = bttnsFilter.find((bttn) => bttn.innerText == getFilter)
    selected.classList.add('selected')
    let selectedObserv = document.querySelector('.selected')
    let filtersBox = document.getElementById('category-filters')
    selectedObserv.scrollIntoView();
    if (getFilter != 'Todos') {
        filtersBox.scrollBy(120, 0);
    }
    window.scrollBy(0, -25)
    setTimeout(() => {
        footer.classList.add('hide')
    }, "300")
}

function trackPostBttns() {
    let openPostBttn = [...document.querySelectorAll('.card-link')]
    openPostBttn.map((bttn) => {
        bttn.addEventListener('click', () => {
            localStorage.setItem("selectedPost", JSON.stringify(bttn.id.slice(6)))
            window.location.href = "../post/index.html";
        })
    })
}

destacBttn()
