/*
 * @Author: johnwang
 * @since: 2019-11-02 16:21:40
 * @lastTime: 2019-11-09 09:00:40
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const getters={
    currentUser(state){
        return state.currentUser
    },
    isLogin(state){
        return state.isLogin
    },
    getUsername(state){
        return state.username
    },
    getTitle(state){
        return state.article.title
    },
    getClass(state){
        return state.article.class
    },
    getName(state){
        return state.article.name
    },
    getContent(state){
        return state.article.content
    },
    getId(state){
        return state.article.id
    },
    getSynopsis(state){
        return state.article.synopsis
    }
}

export default getters