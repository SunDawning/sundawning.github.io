/**
 * 在node 17和node 18里需要设置
 * NODE_OPTIONS=--openssl-legacy-provider
 */
module.exports = function () {
  const version = process.version;
  if (version < "v17") {
    return "";
  }
  if (version > "v19") {
    return "";
  }
  return `NODE_OPTIONS=--openssl-legacy-provider`;
};
