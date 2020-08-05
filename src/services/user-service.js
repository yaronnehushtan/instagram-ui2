import config from '../config'

export class UserService {

    static async get(){
        try {
            const res = await fetch(config.apiUrl + '/users/me', {
                credentials: 'include'
            });
            if (res.status === 403) {
                return null;
            }
            const user = await res.json();
            return user;
        } catch (e){
            return null;
        }
        
    }

}