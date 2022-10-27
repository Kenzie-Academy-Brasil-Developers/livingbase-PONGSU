let bttnsFilter = [...document.querySelectorAll('.bttn-filter')]
let nextFilterBttn = document.querySelector('.next-icon')
let filtersBox = document.getElementById('category-filters')

nextFilterBttn.addEventListener('click', () => {
    let x = 1
    setInterval(function () {
        if (x < 50) {
            filtersBox.scrollBy(x, 0);
            x = x + 5;
        }
    }, 45);
})

let allFilterBttn = document.querySelector('.bttn-primary')
let previousFilterBttn = document.querySelector('.previous-icon')

let firstFiltersMark = document.querySelector('.first-filters-marker')
const observerPrevious = new IntersectionObserver((entries) => {
    if (entries.some((entry) => (entry.isIntersecting == false))) {
        previousFilterBttn.classList.remove('hide')
    } else if (entries.some((entry) => entry.isIntersecting)) {
        previousFilterBttn.classList.add('hide')
    }
});

observerPrevious.observe(firstFiltersMark);

previousFilterBttn.addEventListener('click', () => {
    let x = 1
    setInterval(function () {
        if (x < 50) {
            filtersBox.scrollBy(-x, 0);
            x = x + 5;
        }
    }, 45);
})

let lastFiltersMark = document.querySelector('.last-filters-marker')

const observerNext = new IntersectionObserver((entries) => {
    if (entries.some((entry) => (entry.isIntersecting == false))) {
        nextFilterBttn.classList.remove('hide')
    } else if (entries.some((entry) => entry.isIntersecting)) {
        nextFilterBttn.classList.add('hide')
    }
});

observerNext.observe(lastFiltersMark);

bttnsFilter.map((botao) => {
    botao.addEventListener('click', async () => {
        localStorage.setItem("setFilter", JSON.stringify(botao.innerText))

        window.location.href = "../home/index.html";
        postsList.innerHTML = ''
        page = 1
        await renderizaPosts(page, botao.innerText)
        footer.classList.add('hide')
        destacBttn()
    })
})