import { NextPage } from "next";
import Card from "../../components/Card";
import PageWrapper from "../../components/PageWrapper";
import Title from "../../components/Title";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Page: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });

  const [colocName, setColocName] = useState("");
  const [colocId, setColocId] = useState("");
  const [error, setError] = useState(false);

  async function handleCreateColoc() {
    console.log("create");
    console.log(session?.user.id);
    console.log(colocName);
    const res = await fetch("/api/coloc/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user.id, colocName: colocName }),
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      router.push("/dashboard");
    }
  }

  async function handleJoinColoc() {
    const res = await fetch("/api/coloc/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user.id, colocId: colocId }),
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      router.push("/dashboard");
    } else {
      setError(true);
    }
  }

  return (
    <PageWrapper
      title="Create or join a coloc"
      description="Create or join a coloc"
    >
      <Title />
      <Card title="Create a coloc">
        <Input
          type="text"
          placeholder="Coloc name"
          value={colocName}
          onChange={(e) => setColocName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCreateColoc();
          }}
        />
        <Button text="Create" onClick={handleCreateColoc} />
      </Card>
      <p className="text-center text-lg font-bold">Or</p>
      <Card title="Join a coloc">
        <Input
          type="text"
          placeholder="Coloc join code"
          value={colocId}
          onChange={(e) => {
            setColocId(e.target.value);
            setError(false);
          }}
          error={error}
          errorMessage="Invalid code"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleJoinColoc();
          }}
        />
        <Button text="Join" onClick={handleJoinColoc} />
      </Card>
    </PageWrapper>
  );
};

export default Page;
