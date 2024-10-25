"use client"

import { useState } from "react";
import Footer from "../components/Footer";
import Link from "next/link";
import { signInWithEmail, signInWithGoogle } from "../firebase";
import { useRouter } from "next/navigation";

const button_styles = "my-4 p-2 rounded-md text-md transition duration-200 ease-in hover:scale-105 mx-2 w-48 shadow-lg";
const input_styles = "p-2 rounded-md mt-4 border-2 border-gray-300";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    const handleSignIn = () => {
        signInWithEmail(email, password);
        router.push('/');
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle();
        router.push('/');
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className='flex-grow mt-16'>
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center">
                        <h4 className="text-2xl mt-4">Login with email and password</h4>
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
                        <button
                            className={`${button_styles} bg-blue-500 text-white`}
                            onClick={handleSignIn}>Sign in
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-xl">Or sign in with your Google account to continue.</p>
                        <button
                            className={`${button_styles} bg-blue-500 text-white`}
                            onClick={handleGoogleSignIn}>Sign in with Google
                        </button>
                    </div>
                    <div className="flex flex-col items-center">
                        <h4 className="text-sm mt-4">Don&apos;t have an account?
                            <Link href={'/signup'}> Sign up</Link>
                        </h4>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
