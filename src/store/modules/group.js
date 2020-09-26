import axios from "../../axios"
const state = {
    groupList: [],
    groupInfo: {},
    memberList: [],
    characterList: [],
    count: 0
}
const mutations = {
    setGroupList(state, payload) {
        state.groupList = payload.list
        state.count = payload.count
    },
    setHistoricalList(state, payload) {
        state.historicalList = payload
    },
    setGroupInfo(state, payload) {
        state.groupInfo = payload
    },
    setMemberList(state, payload) {
        state.memberList = payload
    },
    setCharacterList(state, payload) {
        state.characterList = payload
    },
}
const actions = {
    getGroupList({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'group',
                method: 'get',
                params: {
                    page: payload.page,
                    pageSize: payload.pageSize
                }
            })
                .then(response => {
                    if (response.data.code === 0) {
                        commit('setGroupList', response.data.data)
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    searchGroup(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: `group/search?keyword=${payload.keyword}&page=${payload.page}&pageSize=${payload.pageSize}`,
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve(response.data.data)
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    createGroup(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'group',
                method: 'post',
                data: {
                    group_name: payload.group_name,
                    join_password: payload.join_password,
                    attendable: String(payload.attendable)
                }
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    deleteCharacter(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'character/' + payload,
                method: 'delete'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    getGroupInfo({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'group/' + payload,
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        commit('setGroupInfo', response.data.data)
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    groupJoin(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'group/join',
                method: 'post',
                data: {
                    id: payload.id,
                    join_password: payload.join_password
                }
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    getGroupMember({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'memberlist/' + payload,
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        commit('setMemberList', response.data.data)
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    getGroupCharacter({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'membercharacter/' + payload,
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        commit('setCharacterList', response.data.data)
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    updateGroup(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'group/' + payload.id,
                method: 'put',
                data: {
                    group_name: payload.group_name,
                    join_password: payload.join_password,
                    attendable: String(payload.attendable)
                }
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    deleteGroup(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'group/' + payload,
                method: 'delete'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    quitGroup(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'member/' + payload,
                method: 'delete'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    deleteMember(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'member/' + payload.groupID + '/' + payload.userID,
                method: 'delete'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    transferAdmin(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'transferadmin/' + payload.groupID + '/' + payload.userID,
                method: 'put'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    },
    updatePassword(content, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'group/password/' + payload.id,
                method: 'put',
                data: {
                    join_password: payload.join_password
                }
            })
                .then(response => {
                    if (response.data.code === 0) {
                        resolve()
                    } else {
                        reject(response.data.msg)
                    }
                })
                .catch(() => {
                    reject("网络连接错误或服务器无响应！")
                })
        })
    }


}
const getters = {}

export default { state, mutations, actions, getters, namespaced: true }