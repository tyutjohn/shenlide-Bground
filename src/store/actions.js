/*
 * @Author: johnwang
 * @since: 2019-11-02 16:21:32
 * @lastTime: 2019-11-06 10:00:05
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 */
const actions ={
    setUser({commit},user){
        commit("userStatus",user)
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