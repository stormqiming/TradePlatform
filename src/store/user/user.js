import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogOut } from '@/api/index.js'
import { setToken, getToken, removeToken } from '@/utils/token.js'
// 登录与注册的模块
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    // 清除本地数据
    CLEAR(state) {
        // 把仓库中有关用户信息清空
        state.token = '';
        state.userInfo = {};
        // 本地存储token清空
        removeToken();
    }
}
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 获取验证码的接口，把验证码返回了，但是正常情况下，后台验证码发到用户手机上
        let result = await reqGetCode(phone);
        if (result.code === 200) {
            commit('GETCODE', result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 登录业务【token】
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data);
        // 服务器下发的token：用户唯一标识符
        // 将来经常通过带token找服务器要用户信息进行展示
        if (result.code === 200) {
            commit('USERLOGIN', result.data.token);
            // 持久化存储token
            setToken(result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo();
        if (result.code === 200) {
            commit('GETUSERINFO', result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }

    },
    // 退出登录
    async userLogOut({ commit }) {
        // 只是向服务器发起一次请求，通知服务器清除token
        let result = await reqLogOut();
        // action里面不能操作state，必须提交mutation修改state
        if (result.code === 200) {
            commit('CLEAR');
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    }

}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}