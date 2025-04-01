import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist'


const { persistAtom } = recoilPersist()

export const userInfoState = atom({
    key: 'userInfoState',
    default: {id:null,name:null},
  });

  export const templateInfo = atom({
    default: "",
    key: 'templateCode',
  effects_UNSTABLE: [persistAtom],
  });


  export const templateInfoType = atom({
    default: "",
    key: 'templateInfoType',
  effects_UNSTABLE: [persistAtom],
  });
