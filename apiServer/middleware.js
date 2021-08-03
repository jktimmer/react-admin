
function middleware(baseObj) {
  return (req, res, next) =>{
    let { baseData={} } = baseObj || {};
    let { path, method } = req;
    if (baseData[path]) {
      res.send(baseData[path]);
      return;
    };
    res.send({
      errno: 500,
      errmsg: 'no such api'
    });
  };
}
module.exports = middleware;