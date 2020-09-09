import axios from "../../axios"
const state = {
    groupList: [],
    historicalList: [],
    groupInfo: {},
    memberList: [],
    characterList: [],
    memberSort: [],
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
    setMemberSort(state, payload) {
        let map = new Map()
        let member = []
        for (let i in payload) {
            member = []
            if (map.has(payload[i].user_id)) {
                member = map.get(payload[i].user_id)
                member.push(payload[i])
                map.set(payload[i].user_id, member)
            } else {
                member.push(payload[i])
                map.set(payload[i].user_id, member)
            }
        }
        let result = []
        map.forEach(function (value) {
            result.push(value)
        })
        state.memberSort = result
    },
}
const actions = {
    getGroupList(context, payload) {
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
                        context.commit('setGroupList', response.data.data)
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
    searchGroup(context, payload) {
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
    getCharacterHistorical(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'character/' + payload,
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        context.commit('setHistoricalList', response.data.data)
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
    createGroup(context, payload) {
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
    deleteCharacter(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'character/' + payload,
                method: 'delete'
            })
                .then(response => {
                    console.log(response.data)
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
    getGroupInfo(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'group/' + payload,
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        context.commit('setGroupInfo', response.data.data)
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
    groupJoin(context, payload) {
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
                        console.log(response.data.data)
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
    getGroupMember(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'memberlist/' + payload,
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        context.commit('setMemberList', response.data.data)
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
    getGroupCharacter(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'membercharacter/' + payload,
                method: 'get'
            })
                .then(response => {
                    if (response.data.code === 0) {
                        context.commit('setCharacterList', response.data.data)
                        context.commit('setMemberSort', response.data.data)
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
    updateGroup(context, payload) {
        console.log(String(payload.attendable))
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
    deleteGroup(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'group/' + payload,
                method: 'delete'
            })
                .then(response => {
                    console.log(response.data)
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
    quitGroup(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'member/' + payload,
                method: 'delete'
            })
                .then(response => {
                    console.log(response.data)
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
    deleteMember(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'member/' + payload.groupID + '/' + payload.userID,
                method: 'delete'
            })
                .then(response => {
                    console.log(response.data)
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
    transferAdmin(context, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: 'transferadmin/' + payload.groupID + '/' + payload.userID,
                method: 'put'
            })
                .then(response => {
                    console.log(response.data)
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
    updatePassword(context, payload) {
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