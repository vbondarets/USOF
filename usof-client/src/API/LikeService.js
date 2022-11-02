import axios from "axios";

export default class LikeSevice {
    static async getAll(id) {
        const response = await axios.get("http://localhost:5000/api/posts/" + id + "/like");
        return response;
    }
    static async getAllbyComment(id) {
        const response = await axios.get("http://localhost:5000/api/comments/" + id + "/like");
        return response;
    }
    static async createPostLike(id, body) {
        const response = await axios.post("http://localhost:5000/api/posts/" + id + "/like", body);
        return response;
    }
    static async createCommentLike(id, body) {
        const response = await axios.post("http://localhost:5000/api/comments/" + id + "/like", body);
        return response;
    }
    static async deleteLike(id, body) {
        console.log(body)
        const response = await axios.delete("http://localhost:5000/api/comments/" + id + "/like/", {data: body});
        return response;
    }
}