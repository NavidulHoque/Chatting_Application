/* eslint-disable no-unused-vars */
import * as Yup from "yup";

export const signUp = Yup.object({
    name: Yup.string().min(4).max(12).required("Please fill up your name"),

    email: Yup.string().email().required("Please fill up your email"),

    password: Yup.string()
        .min(8)
        .matches(
            /^(?=.*[!@#$%^&*])/,
            "Please provide at least 1 special character"
        )
        .matches(
            /^(?=.*[0-9])/,
            "Please enter at least one number"
        )
        .required("Please fill up your password"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password do not match")
        .required("Please confirm your password"),
});

export const signIn = Yup.object({
    email: Yup.string().email().required("Please fill up your email"),
    password: Yup.string().required("Please fill up your password"),
});

export const passwordReset = Yup.object({
    email: Yup.string().email().required("Please fill up your email"),
});
