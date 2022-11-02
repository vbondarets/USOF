import axios from "axios";
const authHeader = {
    'content-type': 'text/json',
    'Authorization': "Bearer "+ localStorage.getItem("token")
};
export default class PostSevice {
    static async getAll() {
        const response = await axios.get("http://localhost:5000/api/posts");
        return response;
    }
    static async getById(id) {
        const response = await axios.get("http://localhost:5000/api/posts/"+ id);
        return response;
    }
    static async createPost(body) {
        const response = await axios.post("http://localhost:5000/api/posts", body);
        return response;
    }
    static async getPostComments(id){

        const response = await axios.get("http://localhost:5000/api/posts/"+ id + "/comments");
        return response;
    }
    static async createPostComment(id, body){
        // console.log(body);
        const response = await axios.post("http://localhost:5000/api/posts/"+ id + "/comments", body)
        // console.log(response.data.body)
        // console.log(response.data.headers)

        // const response = await axios.post("http://localhost:5000/api/posts/"+ id + "/comments", body, {
        //     body: body,
        //     data: body,
        //     data2: body,
        //     headers: {
        //         'content-type': 'text/json',
        //         'Authorization': "Bearer "+ localStorage.getItem("token")
        //     }
            
    
        // });
        return response;
    }
    static async deletePost(id){
        const response = await axios.delete("http://localhost:5000/api/posts/"+ id);
        return response;
    }
    static async editPost(id, body){
        const response = await axios.patch("http://localhost:5000/api/posts/"+ id, body);
        return response;
    }
}
