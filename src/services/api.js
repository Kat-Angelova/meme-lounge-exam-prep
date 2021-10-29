export const settings = {
    host: ''
}

async function request(url, options) {
    try {
        const response = await fetch(url, options)

        if(response.ok == false){
            const err = await response.json();
            throw new Error(err.message);
        }

        try {
            const data = await response.json();
            return data;
            
        } catch (error) {
            return response;
        }
        
    } catch (error) {
        alert(error.message);
        throw error;
        
    }
}

function getOptions(method = 'get' ,body){ //body-to e ako imame put ili post zaqvka
    const options = {
        method,
        headers: {},
        body
    }
    const token = sessionStorage.getItem('authToken');

    if(token != null) {
        options.headers['X-Authorization'] = token;
    }

    if(body){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body)
    }

    return options;
}

export async function get(url) {
    return await request(url, getOptions());
}

export async function post(url, data){
    return await request(url, getOptions('post', data));
}

export async function put(url, data){
    return await request(url, getOptions('put', data));
}

export async function del(url){
    return await request(url, getOptions('delete'));
}

export async function login(email, password){
    const result = await post(settings.host + '/users/login', {email, password});

    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('ownerId', result._id);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('gender', result.gender);
    
    return result;
}

export async function register(username, email, password, gender){
    const result = await post(settings.host + '/users/register', {username, email, password, gender});

    sessionStorage.setItem('authToken', result.accessToken);
    sessionStorage.setItem('email', result.email);
    sessionStorage.setItem('ownerId', result._id);
    sessionStorage.setItem('username', result.username);
    sessionStorage.setItem('gender', result.gender);
    return result;
}

export async function logout(){
    const result = await get(settings.host + '/users/logout');

    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('ownerId');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('gender');
    return result;
}