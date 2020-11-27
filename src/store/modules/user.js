import {
  login,
  logout,
  getInfo,
  QueryUserRole,
  refresh_token
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import router, {
  resetRouter
} from '@/router'
import {
  baseURL,
  token
} from "@/api/globaldata.js"

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}
let refreshToken;

function job(){
  debugger;
    try {
      //先清理
      clearTimeout(refreshToken);
    } catch (e) {
      //TODO handle the exception
      console.log("清理定时任务失败", refreshToken)
    }
    refresh_token({
      refresh_token: sessionStorage.getItem('refreshToken'),
      client_id: 'web',
      client_secret: 'secret',
      grant_type: 'refresh_token',
      scope: 'all'
    }).then(response => {
      sessionStorage.setItem('accessToken', response.data.access_token)
      sessionStorage.setItem('refreshToken', response.data.refresh_token)
      jobRefreshToken(response.data.expires_in);
    }).catch(error => {
      reject(error)
    })

}

//刷新token定时任务
const jobRefreshToken = function(expires_in) {
  if (!expires_in) {
    console.log("刷新token失败")
    return;
  }
  //下定时任务 定时刷新token
  let time = (expires_in - 10) *1000;
  if(time > 1728000000 ){
    time = 1728000000;
  }
  if(time < 0){
    time = 10000;
  }
  refreshToken = setTimeout(function(){
    job();
  }, time )
};
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}
const actions = {
  // user login
  login({
    commit
  }, userInfo) {
    const {
      username,
      password
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        password: password,
        client_id: 'web',
        client_secret: 'secret',
        grant_type: 'password',
        scope: 'all'
      }).then(response => {
        const {
          data
        } = response
        commit('SET_TOKEN', data.access_token)
        // setToken(data.access_token)
        setToken(data.access_token);
        sessionStorage.setItem('role', data.token_type)
        localStorage.setItem('accessToken', data.access_token)

        //记录刷新token的key
        sessionStorage.setItem('refreshToken', data.refresh_token)
        try {
          //先清理
          clearTimeout(refreshToken);
        } catch (e) {
          //TODO handle the exception
          console.log("清理定时任务失败", refreshToken)
        }
        //再下任务
        jobRefreshToken(data.expires_in)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  GetInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      QueryUserRole().then(response => {
        commit('SET_ROLES', [sessionStorage.getItem('role')])
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({
    commit,
    state,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()

        try {
          //先清理
          clearTimeout(refreshToken);
        } catch (e) {
          //TODO handle the exception
          console.log("清理定时任务失败", refreshToken)
        }

        // resetRouter()
        sessionStorage.removeItem('role');
        localStorage.removeItem('accessToken');
        sessionStorage.removeItem('hasRouter');
        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, {
          root: true
        })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({
    commit,
    dispatch
  }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    // const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true
    })
    //dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, {
      root: true
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  refreshToken
}
