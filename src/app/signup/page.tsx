"use client"

import { useState } from "react";
import Footer from "../components/Footer";
import Link from "next/link";
import { createAccountWithEmail, signInWithGoogle } from "../firebase";

const button_styles = "my-4 p-2 rounded-md text-md transition duration-200 ease-in hover:scale-105 mx-2 w-48 shadow-lg";
const input_styles = "p-2 rounded-md mt-4 border-2 border-gray-300";

export default function Signup() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSignUp = () => {
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            return;
        }
        createAccountWithEmail(email, password);
    }

    const handleGoogleSignUp = () => {
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            return;
        }
        signInWithGoogle();
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className='flex-grow mt-16'>
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center">
                        <h4 className="text-2xl mt-4">Sign up with email and password</h4>
                        <input
                            type="email"
                            placeholder="Email"
                            className={input_styles}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className={input_styles}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className={input_styles}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            className={`${button_styles} bg-blue-500 text-white`}
                            onClick={handleSignUp}>Sign up
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-xl">Or sign up with your Google account to continue.</p>
                        <button
                            className={`${button_styles} bg-blue-500 text-white`}
                            onClick={handleGoogleSignUp}>Sign up with Google
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        <h4 className="text-sm mt-4">Already have an account?
                            <Link href={'/login'}> Login</Link>
                        </h4>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}