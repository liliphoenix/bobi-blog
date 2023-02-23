const jwt = require('jsonwebtoken');
// promise化
const {promisify} =require('util')

// promise化jwt三个方法
exports.sign=promisify(jwt.sign)
exports.verify=promisify(jwt.verify)
exports.decode=promisify(jwt.decode)