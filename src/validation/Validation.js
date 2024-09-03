/* eslint-disable no-unused-vars */
import * as Yup from 'yup';

export const signUp = Yup.object({
    name: Yup.string().min(4).max(15).required("Please fill up your name"),
    email: Yup.string().email().required("Please fill up your email"),
    password: Yup.string().min(8).matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "Please provide at least 1 special character").required("Please fill up your password")
})

export const signIn = Yup.object({
    email: Yup.string().email().required("Please fill up your email"),
    password: Yup.string().required("Please fill up your password")
})

export const passwordReset = Yup.object({
    email: Yup.string().email().required("Please fill up your email"),
})