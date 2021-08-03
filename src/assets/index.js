// const req = require.context('./svg', false, /\.svg$/);
// const requireAll = requireContext => {
//   // const requireAll = requireContext => requireContext.keys().map(requireContext);
//   const keys = requireContext.keys();
//   const len = keys ? keys.length : 0;
//   for (let i = 0; i < len; i++){
//     const item = keys[i];
//     return requireContext(item);
//   }
// };
// requireAll(req);
const requireAll = requireContext => requireContext.keys().map(requireContext);
const svgs = require.context('./svg', false, /\.svg$/);
requireAll(svgs);