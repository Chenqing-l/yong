
import { getexamitation, getphaseslist } from '../../api/index';

export default {
 namespace: 'examination',
 state: {
  stlist: [],
  jdList: []
 },

 // 使用reduceres操作状态
 reducers: {
  setStlist(store, payload) {
   store.stlist = payload.data.stList.data.result;
   store.jdList = payload.data.jdList.data.result;
   return {
    ...store,
   };
  },
 },
 //使用effect管理异步状态
 effects: {
  *getSjlist(action, payload) {
   let { call, put } = payload;
   let stList = yield call(getexamitation);
   let jdList = yield call(getphaseslist);
   yield put({
    type: 'setStlist',
    data: { stList, jdList },
   });
  },
 },
};