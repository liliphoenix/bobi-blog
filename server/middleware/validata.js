const express = require('express');
const { validationResult, ValidationChain,buildCheckFunction  } = require('express-validator');
const { isValidObjectId}=require("mongoose")
// can be reused by many routes

// parallel processing
exports=module.exports=validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  };
};

// 封装validate统一中间件
exports.isVlaueObjId=(loaction,field)=>{
  console.log(1);
  return  buildCheckFunction(loaction)(field).custom(val=>{
    if(!isValidObjectId(val)){
      return Promise.reject("请输入合法的Id")
    }
  })
}