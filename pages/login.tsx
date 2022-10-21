import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import Head from "next/head";
import Card from "../components/Card";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
    <div className="lg:flex md:flex flex-col m-0 p-0 items-center relative h-screen w-screen">
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Coloc Manager Sign In page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="lg:w-1/2 md:w-3/4">
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
                password: password,
                callbackUrl: "/success",
              });
            }}
          />
        </Card>
      </main>
    </div>
  );
};

export default Login;
