import { app, router, store } from '@/main';
import { CLEAR_PENDING } from '@/store/types/pending.types';

const AuthResponseInterceptor = async (response) => {
  let resObj = {};
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    resObj = await response.json();
  }
  const message = resObj.message || (resObj.data && resObj.data.map(error => error.message).join(',\n'));
  switch (response.status) {
    case 400:
    case 422:
      app.$notify({ type: 'error', title: 'Error', text: message || 'Something went wrong' });
      break;
    case 401:
      app.$notify({ type: 'error', title: 'Error', text: message || 'Please log in' });
      router.push({
        path: '/login',
        query: { redirect: router.currentRoute.path },
      });
      break;
    case 200:
    case 201:
      app.$notify({ text: resObj.message, title: 'Success' });
      break;
    default:
      app.$notify({ type: 'error', title: 'Error', text: message || 'Something went wrong' });
  }
  store.commit(CLEAR_PENDING);
  if (/[23]../.test(response.status)) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
};

export default (request, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  console.log('Interceptor request =========', request);
  next(AuthResponseInterceptor);
};
