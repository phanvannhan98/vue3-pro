import { defineStore } from 'pinia';

import { router } from '@/router';
import { AuthService, TLoginRequest, TUser } from '@/services/auth';
import { localStorageSet } from '@/utils/auth';

import { store } from '../index';

interface IState {
  userInfo: TUser | undefined;
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): IState => ({
    userInfo: undefined,
  }),
  getters: {
    myId({ userInfo }) {
      return userInfo?.id;
    },
  },
  actions: {
    async login(formData: TLoginRequest) {
      const { data } = await AuthService.login(formData);

      this.userInfo = data.user_info;
      router.push(router.currentRoute.value.query.path?.toString() || '/dashboard');
    },

    async logout() {
      this.userInfo = undefined;
      localStorageSet('access-token', '');
      router.replace({ name: 'login' });
    },
  },
});

export const useAuthStoreWithout = () => useAuthStore(store);
