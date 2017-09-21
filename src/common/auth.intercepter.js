import { store } from '@/main';
import { PENDING_ERROR } from '@/store/types/pending.types';

const AuthResponseInterceptor = async (response) => {
  console.log('Interceptor response =========', response);
  const resObj = await response.json();
  switch (response.status) {
    case 400:
    case 422:
      store.commit(PENDING_ERROR, resObj.data);
      break;
    default:
      store.commit(PENDING_ERROR, ['Something went wrong']);
  }
  return response;
};

export default (request, next) => {
  console.log('Interceptor request =========', request);
  next(AuthResponseInterceptor);
};
