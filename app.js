import page from './node_modules/page/page.mjs';
import { render } from './node_modules/lit-html/lit-html.js';

import { homePage } from './src/views/homeView.js';
import { logout } from './src/services/data.js';
import { allMemesPage } from './src/views/allMemesView.js';
import { loginPage } from './src/views/loginView.js';
import { registerPage } from './src/views/registerView.js';
import { createPage } from './src/views/createView.js';
import { detailsPage } from './src/views/detailsView.js';
import { editPage } from './src/views/editView.js';
import { profilePage } from './src/views/profilePageView.js';

const container = document.querySelector('main');

page('/', middleware, homePage);
page('/login', middleware, loginPage);
page('/register', middleware, registerPage);
page('/all-memes', middleware, allMemesPage);
page('/create', middleware, createPage);
page('/edit/:id', middleware, editPage);
page('/details/:id', middleware, detailsPage);
page('/my-profile', middleware, profilePage);

setUserNav();
page.start();


function middleware(ctx, next) {
    ctx.setUserNav = () => setUserNav(); //vkarvame funkciqta v konteksta za da moje da se izpolzva v drugite moduli
    ctx.render = (content) => render(content, container);
    
    next();
}

export function setUserNav() {
    const email = sessionStorage.getItem('email')
    const ownerId = sessionStorage.getItem('ownerId');
    

    if (ownerId !== null) {
        document.getElementById('welcome').textContent = `Welcome, ${email}`;
        [...document.querySelectorAll('.user')].forEach(l => l.style.display = 'block');
        [...document.querySelectorAll('.guest')].forEach(l => l.style.display = 'none');
    } else {
        [...document.querySelectorAll('.user')].forEach(l => l.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(l => l.style.display = 'block');
    }
}

//logout
document.getElementById('logout').addEventListener('click', async() => {
    await logout();
    page.redirect('/');
    setUserNav(); //updatvame navigaciqta
});






