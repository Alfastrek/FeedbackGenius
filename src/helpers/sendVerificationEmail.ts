import {resend} from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

import {ApiResponse} from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string,
): Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Your FeedbackMatters | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
        })
        return {success:true, message:"Verification Email Sent"};
    } catch (emailError){
        console.error("Error sending email", emailError);
        return {
            success:false,
            message:"Failed to send Verification Email",
        };

    }
}