const baseUrl = 'https://m2-api-living.herokuapp.com/news';

function setPost() {
    let selectedPost = ''
    if (localStorage.getItem("selectedPost") != null) {
        selectedPost = JSON.parse(localStorage.getItem("selectedPost"))
    }
    return selectedPost
}

async function requestPost() {
    let selectedPost = setPost()
    const postJSON = await fetch(`${baseUrl}/${selectedPost}`)
    const post = await postJSON.json()
    return post
}

let postSection = document.querySelector('#post-section')

async function renderizaPost() {
    const post = await requestPost()
    postSection.insertAdjacentHTML('afterbegin', `    
        <h1 class="font1" id="expanded-post-title">${post.title}</h1>
        <h6 class="font5" id="expanded-post-desc">${post.description}</h6>
        <img id="expanded-post-img" src="${post.image}" alt="">
        <p class="font5" id="expanded-post-text">${post.content}</p> 
    `)
}

renderizaPost()