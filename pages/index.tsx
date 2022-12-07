import type { NextPage } from "next";
import Card from "../components/Card";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import PageWrapper from "../components/PageWrapper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type checkUsernameResponse = {
  exists: boolean;
};

const Home: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session]);

  async function handleSubmit() {
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
  }

  return (
    <PageWrapper title="Coloc Manager" description="Coloc Manager main page">
      <Title />
      <Card title="Enter you username">
        <Input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <Button text="next" onClick={() => handleSubmit()} />
      </Card>
    </PageWrapper>
  );
};

export default Home;
