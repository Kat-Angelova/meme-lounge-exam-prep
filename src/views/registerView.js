import { html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../services/data.js';

const registerTemplate = (onSubmit) =>html`
        <section id="register">
            <form @submit=${onSubmit} id="register-form">
                <div class="container">
                    <h1>Register</h1>
                    <label for="username">Username</label>
                    <input id="username" type="text" placeholder="Enter Username" name="username">
                    <label for="email">Email</label>
                    <input id="email" type="text" placeholder="Enter Email" name="email">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <label for="repeatPass">Repeat Password</label>
                    <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                    <div class="gender">
                        <input type="radio" name="gender" id="female" value="female">
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="male" value="male" checked>
                        <label for="male">Male</label>
                    </div>
                    <input type="submit" class="registerbtn button" value="Register">
                    <div class="container signing">
                        <p>Already have an account?<a href="/login">Sign in</a>.</p>
                    </div>
                </div>
            </form>
        </section>
`;

const  errNotification = (error) =>html`
        <section id="notifications">
            <div id="errorBox" class="notification">
                <span>${error}</span>
            </div>
        </section>
`;

export async function registerPage(ctx) {
    //ctx.setUserNav();
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const username = formData.get('username').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repeatPass').trim();
        const gender = formData.get('gender');

        
        if ([username, email, password, repass, gender].map(Boolean).includes(false)) {
            return alert('All fields are required!');
        }

        if(password !== repass){
            return alert('Password do not match!');
        }
       
        await register(username, email, password, gender);
        e.target.reset();
        ctx.page.redirect('/all-memes');

    }
}