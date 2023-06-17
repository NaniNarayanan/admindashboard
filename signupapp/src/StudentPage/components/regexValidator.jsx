// /^\S+@\S+\.\S+$/
// new Regex("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")


import React from 'react';

export  const regexValidator = email => {
    const emailRegex = /^[\S+@]+[\S+@]\S+\.\S+$/
  return emailRegex.test(email)
}

export const passwordValidator = password =>{
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    return passwordRegex.test(password)
}

export default regexValidator;
