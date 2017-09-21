import { router, store } from '@/main';
import { PENDING_ERROR } from '@/store/types/pending.types';

const AuthResponseInterceptor = async (response) => {
  let resObj;
  try {
    resObj = await response.json();
  } catch (err) {
    resObj = { data: [] };
  }
  switch (response.status) {
    case 400:
    case 422:
      store.commit(PENDING_ERROR, resObj.data);
      break;
    case 401:
      store.commit(PENDING_ERROR, [{ message: 'Please log in' }]);
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.path,
        },
      });
      break;
    default:
      store.commit(PENDING_ERROR, [{ message: 'Something went wrong' }]);
  }
  return response;
};

export default (request, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  console.log('Interceptor request =========', request);
  next(AuthResponseInterceptor);
};
