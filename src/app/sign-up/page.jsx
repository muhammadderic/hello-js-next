"use client"

import Link from "next/link"
import { initialSignUpFormData, userSignUpFormControl } from "../../constants/constants"
import { useState } from "react"
import { registerUserAction } from "../actions/userActions"
import { useRouter } from "next/navigation"

const SignUp = () => {
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const router = useRouter();

  const handleSignUp = async () => {
    const result = await registerUserAction(signUpFormData);

    if (result?.success) {
      setSignUpFormData(initialSignUpFormData);
      router.push("/");
    }
  }

  return (
    <div>
      <h1>Register</h1>

      <form action={handleSignUp}>
        {
          userSignUpFormControl.map((controlItem) => (
            <div key={controlItem.name}>
              <label>{controlItem.label}</label>
              <input
                name={controlItem.name}
                placeholder={controlItem.placeholder}
                type={controlItem.type}
                value={signUpFormData[controlItem.name]}
                onChange={(e) => setSignUpFormData(
                  { ...signUpFormData, [e.target.name]: e.target.value }
                )}
              />
            </div>
          ))
        }
        <button type="submit">Sign Up</button>
      </form>

      <p>you have an account?</p>
      <Link href="/sign-in">Log in Now!</Link>
    </div>
  )
}

export default SignUp
