import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllMemes } from '../services/data.js';

const memeCardTemplate = (meme) =>html`
                <div class="meme">
                    <div class="card">
                        <div class="info">
                            <p class="meme-title">${meme.title}</p>
                            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
                        </div>
                        <div id="data-buttons">
                            <a class="button" href=${`/details/${meme._id}`}>Details</a>
                        </div>
                    </div>
                </div>
`;


const allMemesTemplate = (data, isData) =>html`
        <section id="meme-feed">
            <h1>All Memes</h1>
            <div id="memes">
               ${isData ? data.map(memeCardTemplate) : 
                html`<p class="no-memes">No memes in database.</p>`} 
			</div>
        </section>
`;

export async function allMemesPage(ctx) {
    ctx.setUserNav();
    const data = await getAllMemes();
    const isData = data.length !== 0;
    ctx.render(allMemesTemplate(data, isData));
    
}