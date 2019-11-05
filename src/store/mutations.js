/*
 * @Author: johnwang
 * @since: 2019-11-02 16:21:52
 * @lastTime: 2019-11-06 00:03:05
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const mutations={
    userStatus(state,user){
        if(user){
            state.currentUser=user
            state.isLogin=true
        }else if(user==null){
            sessionStorage.setItem("userName",null);
            sessionStorage.setItem("userToken","");
            state.currentUser=null;
            state.isLogin=false;
            state.token="";
        }
    },
    titleStatus(state,title){
        state.article.title=title
    },
    classStatus(state,Class){
        state.article.class=Class
    },
    nameStatus(state,name){
        state.article.name=name
    },
    contentStatus(state,content){
        state.article.content=content
    }
}

export default mutations