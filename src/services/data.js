import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// v data shte si napravim zaqvkite koito sa specialmo za tekushtoto prilojenie a ne sa universalni

export async function getAllMemes() {
    return await api.get(host + '/data/memes?sortBy=_createdOn%20desc');
}

export async function getMemeById(id){
    return await api.get(host + '/data/memes/' + id);
}

export async function createMeme(data){
    return await api.post(host + '/data/memes', data);
}
 
export async function editMeme(id, data){
    return await api.put(host + `/data/memes/${id}`, data);
}
 

export async function deleteMeme(id){
    return await api.del(host + `/data/memes/${id}`);
}

export async function getMyProfileMemes(ownerId) {
    return await api.get(host + `/data/memes?where=_ownerId%3D%22${ownerId}%22&sortBy=_createdOn%20desc`);
}