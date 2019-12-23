/*
 * @Author: Jasen
 * @Date: 2019-11-26 17:44:43
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-12-11 21:30:22
 *
 * 主页仓库
 *
 */

import { getSj } from '../../api';

export default {
    namespace: 'home',
    state: {
        sjlist: [],
    },

    // 使用reduceres操作状态
    reducers: {
        setSjlist(store, payload) {
            store.sjlist = payload.data;
            return {
                ...store,
            };
        },
    },
    //使用effect管理异步状态
    effects: {
        *getSjlist(action, payload) {
            let { call, put } = payload;
            let sjList = yield call(getSj);
            yield put({
                type: 'setSjlist',
                data: sjList,
            });
        },
    },
};
