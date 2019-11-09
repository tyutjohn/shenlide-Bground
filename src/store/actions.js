/*
 * @Author: johnwang
 * @since: 2019-11-02 16:21:32
 * @lastTime: 2019-11-09 08:59:07
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const actions ={
    setUser({commit},user){
        commit("userStatus",user)
    },
    setAdmin({commit},username){
        commit("usernameStatus",username)
    },
    setArticleTitle({commit},title){
        commit('titleStatus',title)
    },
    setArticleClass({commit},Class){
        commit('classStatus',Class)
    },
    setArticleName({commit},name){
        commit('nameStatus',name)
    },
    setArticleContent({commit},content){
        commit('contentStatus',content)
    },
    setArticleId({commit},id){
        commit('idStatus',id)
    }
}


export default actions;