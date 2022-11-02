import axios from "axios";

export default class CommentSevice {
    static async deleteComment(id, body) {
        const response = await axios.delete("http://localhost:5000/api/comments/" + id);
        return response;
    }
}