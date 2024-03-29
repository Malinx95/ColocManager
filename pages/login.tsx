import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Card from "../components/Card";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageWrapper from "../components/PageWrapper";
import sha256 from "crypto-js/sha256";

const Login: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  useEffect(() => {
    if (router.query.username) {
      setUsername(router.query.username as string);
    }
    if (router.query.error) {
      setError(router.query.error as string);
      let username = router.query.error?.toString() as string;
      username = username?.substring(username.indexOf("for") + 4);
      setUsername(username ? username : "");
    }
  }, [router.query]);

  function handleSubmit() {
    signIn("credentials", {
      username: username,
      password: sha256(password),
      callbackUrl: "/dashboard",
    });
  }

  return (
    <PageWrapper title="Sign in" description="Sign in to Coloc Manager">
      <Title />
      <Card title="Sign In">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
          error={error ? true : false}
          errorMessage={error}
        />
        <Button text="Sign In" onClick={() => handleSubmit()} />
      </Card>
    </PageWrapper>
  );
};

export default Login;
