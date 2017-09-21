const AuthResponseIntercepter = (response) => {
  console.log(response);
};

export default (request, next) => {
  console.log(request);
  next(AuthResponseIntercepter);
};
