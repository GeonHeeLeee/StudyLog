import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface LoginState {
  isLogin: boolean;
  signIn: () => void;
  signOut: () => void;
}
const useLoginState = create<LoginState>()(
  devtools(
    persist(
      (set) => ({
        isLogin: false,
        loginState: {
          id: '',
          name: '',
        },
        signIn: () => set({ isLogin: true }),
        signOut: () => set({ isLogin: false }),
      }),
      { name: '' }
    )
  )
);

export default useLoginState;
