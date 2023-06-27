import { KeypAuth } from "@usekeyp/js-sdk";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions =  KeypAuth({
    clientId: process.env.KEYP_CLIENT_ID, // From dev portal
    secret: process.env.KEYP_COOKIE_SECRET, // Random string
    redirectUrl: "http://localhost:3000/api/auth/callback/keyp",
})


export default NextAuth(authOptions as any as NextAuthOptions);