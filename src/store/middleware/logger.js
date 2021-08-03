/* eslint-disable */
export default store => next => (action) => {
  const { type } = action;
  console.log(`action ===> ${type}===`);
  return next(action)
}