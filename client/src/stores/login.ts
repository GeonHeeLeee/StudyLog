import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type UserInfo = {
  userId: string;
  name: string;
};
type LoginState = {
  isLogin: boolean;
  signIn: (userInfo: UserInfo) => void;
  signOut: () => void;
  userInfo: UserInfo;
};

const initialLoginInfo = {
  userId: '',
  name: '',
};

const useLoginState = create<LoginState>()(
  devtools(
    persist(
      (set) => ({
        isLogin: false,
        userInfo: initialLoginInfo,
        signIn: (userInfo) => set({ isLogin: true, userInfo: userInfo }),
        signOut: () => set({ isLogin: false, userInfo: initialLoginInfo }),
      }),
      { name: 'login' }
    )
  )
);

export default useLoginState;
