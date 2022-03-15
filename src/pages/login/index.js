import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
const LoginPage = () => {
  const { data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data, router]);

  return (
    <div>
      <button onClick={() => signIn("github")}>init with github</button>
      <button onClick={() => signIn("auth0")}>init with email</button>
    </div>
  );
};

export default LoginPage;
