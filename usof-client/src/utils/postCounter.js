export const getPostsFromPage = (limit, page, posts) => {
    // let start = 1 + (limit * (page - 1));
    // let end = limit * page;
    let newArr = [];
    for(let i = (limit * (page - 1)); i < limit * page; i++){
        if(posts[i]){
            newArr.push(posts[i]);
        }
    }
    return newArr;
}