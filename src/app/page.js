import Link from "next/link";
import { fetchAuthUserAction } from "./actions/userActions";
import Logout from "@/components/Logout";

export default async function Home() {
  const currentUser = await fetchAuthUserAction();

  return (
    <div>
      {
        currentUser?.success ? (
          <div>
            <h1>Welcome</h1>
            <Logout />
          </div>
        ) : (
          <div>
            <h1>Who are you? I don't know you!</h1>
            <Link href="/sign-in">
              Login
            </Link>
          </div>
        )
      }
    </div>
  );
}
