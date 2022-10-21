import type { NextPage } from "next";
import Card from "../components/Card";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import PageWrapper from "../components/PageWrapper";
import { useRouter } from "next/router";
import { useState } from "react";

type checkUsernameResponse = {
  exists: boolean;
};

const Home: NextPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  return (
    <PageWrapper
      title="Coloc Manager"
      description="Coloc Manager main page"
      absolute
    >
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
    </PageWrapper>
  );
};

export default Home;
