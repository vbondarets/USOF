import axios from "axios";

export default class CategoriesSevice {
    static async getAll() {
        const response = await axios.get("http://localhost:5000/api/categories");
        return response;
    }
    static async getById(id) {
        const response = await axios.get("http://localhost:5000/api/categories/" + id);
        return response;
    }
    static async getByIdPosts(id) {
        const response = await axios.get("http://localhost:5000/api/categories/" + id + "/posts");
        return response;
    }
    static async createCategory(body) {
        const response = await axios.post("http://localhost:5000/api/categories/", body);
        return response;
    }
    static async deleteCategory(id) {
        const response = await axios.delete("http://localhost:5000/api/categories/" + id);
        return response;
    }
}