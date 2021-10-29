import { html } from '../../node_modules/lit-html/lit-html.js';
import { createMeme } from '../services/data.js';

const createTemplate = (onSubmit) =>html`
        <section id="create-meme">
            <form @submit=${onSubmit} id="create-form">
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>
`;

export async function createPage(ctx) {
    //ctx.setUserNav();
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const imageUrl = formData.get('imageUrl').trim();
        const createData = {title, description, imageUrl}

        if ([title, imageUrl, description].map(Boolean).includes(false)) {
            return alert('All fields are required!');
        }

        await createMeme(createData);
        //e.target.reset();
        ctx.page.redirect('/all-memes');
    }
}