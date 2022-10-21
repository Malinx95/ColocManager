import type { NextPage } from "next";
import Head from "next/head";
import Card from "../components/Card";
import Title from "../components/Title";
import Input from "../components/Input";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useRouter } from "next/router";
import { useState } from "react";

type checkUsernameResponse = {
  exists: boolean;
};

const Home: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  return (
    <div className="lg:flex md:flex flex-col m-0 p-0 items-center relative h-screen w-screen">
      <Head>
        <title>Coloc Manager</title>
        <meta name="description" content="Coloc Manager main page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="lg:w-1/2 md:w-3/4">
        <Title />
        <Card title="Enter you username">
          <Input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            text="next"
            onClick={async () => {
              let res = await fetch("/api/auth/checkUsername", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username }),
              });
              let decoded: checkUsernameResponse = await res.json();
              let exists = decoded.exists;
              if (exists) {
                router.push({
                  pathname: "/login",
                  query: { username: username },
                });
              } else {
                router.push({
                  pathname: "/register",
                  query: { username: username },
                });
              }
            }}
          />
        </Card>
      </main>

      <Footer absolute />
    </div>
  );
};

export default Home;
