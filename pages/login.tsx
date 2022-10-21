import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
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
  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      setUsername(router.query.username as string);
    }
  }, []);

  return (
    <PageWrapper
      title="Sign in"
      description="Sign in to Coloc Manager"
      absolute
    >
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
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="Sign In"
          onClick={() => {
            signIn("credentials", {
              username: username,
              password: sha256(password),
              callbackUrl: "/success",
            });
          }}
        />
      </Card>
    </PageWrapper>
  );
};

export default Login;
