const express = require('express');

const validateSignupPayload = (req, res, next) => {
  const { name, number, password} = req.body;

  if (!name || !number || !password) {
    return res.status(400).send({
      error: 'Missing fields'
    });
  }
  next();
}

const validateSigninPayload = (req, res, next) => {
  const { name, number, password} = req.body;

  if (!number || !password) {
    return res.status(400).send({
      error: 'Missing fields'
    });
  }
  next();
}

module.exports = {
  validateSignupPayload,
  validateSigninPayload
};