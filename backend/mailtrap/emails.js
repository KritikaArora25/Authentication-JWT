import { mailtrapClient, sender } from "./mailtrap.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailsTemplates.js"
import { response } from "express";


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });

        console.log("Email Sent Successfully");
    } catch (error) {
        console.error(`Error sending verification`, error);
        throw new Error(`Error Sending verification email: ${error}`);
    }
}

export const sendWelcomenEmail = async (email, name) =>{
    const recipient = [{email}];
    try {
        const res = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid:"1595d560-c8a2-4cd4-881c-e1867515b718",
            template_variables: {
                "Company_info_name": "Auth Company",
                "name": name
            },
        });

        console.log("Welcome Email Sent Successfully", response);
        
    } catch (error) {
        console.log(`Error Sending Welcome Email`,error);
        throw new Error(`Error Sending Welcome Email: ${error}`)
    }
}

export const sendPasswordResetEmail = async(email, resetURL) => {
    const recipient = [{email}];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })
    } catch (error) {
        console.error(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{email}];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successfull",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });
        console.log("Password Reset Email Sent Successfully");
    } catch (error) {
        console.log(`Error sending password reset success email`);

        throw new Error(`Error sending password reset success email: ${error}`)
    }
}