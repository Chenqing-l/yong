import { getzuoa } from '../../api/index';
export default {
    namespace: 'food',
    state: {
        getzuos: [],
    },
    reducers: {
        shuzu(store, payload) {
            store.getzuos = payload.data.data.result;
            return {
                ...store,
            };
        },
    },
    effects: {
        *getzuo(action, payload) {
            let { call, put } = payload;

            let zuobian = yield call(getzuoa);

            yield put({ type: 'shuzu', data: zuobian });
        },
    },
};
