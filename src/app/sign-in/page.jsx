"use client"

import { initialSignInFormData, userSignInFormControls } from "@/constants/constants";
import Link from "next/link"
import { useState } from "react";
import { loginUserAction } from "../actions/userActions";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const router = useRouter();

  const handleSignIn = async () => {
    const result = await loginUserAction(signInFormData);

    if (result?.success) {
      setSignInFormData(initialSignInFormData);
      router.push("/");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form action={handleSignIn}>
        {
          userSignInFormControls.map((controlItem) => (
            <div key={controlItem.name}>
              <label>{controlItem.label}</label>
              <input
                name={controlItem.name}
                placeholder={controlItem.placeholder}
                type={controlItem.type}
                value={signInFormData[controlItem.name]}
                onChange={(e) => setSignInFormData({ ...signInFormData, [e.target.name]: e.target.value })}
              />
            </div>
          ))
        }
        <button type="submit">Login</button>
      </form>

      <p>Don't have account?</p>
      <Link href="/sign-up">Register!</Link>
    </div>
  )
}

export default SignIn
