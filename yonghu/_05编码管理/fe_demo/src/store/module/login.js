/*
 * @Author: Jasen
 * @Date: 2019-11-26 17:44:43
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-15 13:57:39
 *
 * login
 *
 */

import { Login } from '../../api';

export default {
    namespace: 'login',
    state: {
        isLogin: '未登录',
    },
    // 使用reduceres操作状态
    reducers: {
        settoken(store, payload) {
            let { data } = payload;
            if (data.code == 1) {
                document.cookie = `token${data.token}`;
                store.isLogin = data.rank;
            } else {
                store.isLogin = data.msg;
            }
            return {
                ...store,
            };
        },
    },
    //使用effect管理异步状态
    effects: {
        *LoginUser(action, payload) {
            let { call, put } = payload;
            let { userData } = action;
            let logindata = yield call(Login, userData);
            yield put({
                type: 'settoken',
                data: logindata,
            });
        },
    },
};
