import axios from "axios";

export default class UserSevice {
    static async login(login, password) {
        const body = {login: login, password: password};
        const response = await axios.post("http://localhost:5000/api/auth/login", body);
        return response;
    }
    static async register(body) {
        const response = await axios.post("http://localhost:5000/api/auth/register", body);
        return response;
    }
    static async logout(){
        const response = await axios.get("http://localhost:5000/api/auth/logout");
        return response;
    }
    static async getUserById(id){
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        return response;
    }
    static async getAll(){
        const response = await axios.get(`http://localhost:5000/api/users`);
        return response;
    }
    static async changeUserById(body, id){
        const response = await axios.patch(`http://localhost:5000/api/users/${id}`, body);
        return response;
    }
    static async deleteUser(id){
        const response = await axios.delete(`http://localhost:5000/api/users/${id}`);
        return response;
    }
}