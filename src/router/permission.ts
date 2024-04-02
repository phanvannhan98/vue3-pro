// import { AuthService } from '@/services/auth';
// import { useAuthStoreWithout } from '@/store/modules/auth';
// import { localStorageGet } from '@/utils/auth';

// import { router } from '.';
// import { publicRoutes } from './router.config';

// const exceptRoute = publicRoutes.map(({ name }) => name).filter((name) => name !== 'login');

// router.beforeEach(async (to, _, next) => {
//   if (to.name && exceptRoute.includes(to.name.toString())) {
//     return next();
//   }

//   const accessToken = localStorageGet('access-token');
//   if (!accessToken) {
//     if (to.name === 'login') return next();

//     return next('login');
//   }

//   const authStore = useAuthStoreWithout();

//   if (!authStore.myId) {
//     const { data } = await AuthService.getInfo();
//     authStore.userInfo = data.user_info;
//   }

//   if (to.name === 'login') {
//     return next({ name: 'dashboard' });
//   }

//   next();
// });
