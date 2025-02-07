import { atom, selector } from 'recoil';

export const userInfoState = atom({
    key: 'userInfoState',
    default: {id:null,name:null},
  });