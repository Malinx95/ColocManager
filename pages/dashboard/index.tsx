import { Coloc } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import NavBar from "../../components/NavBar";
import PageWrapper from "../../components/PageWrapper";

const HomeDashboard: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });

  const [colocs, setColocs] = useState<Coloc[]>([]);

  useEffect(() => {
    if (status === "authenticated") {
      console.log(session);
      fetch("api/coloc/getUserColoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id }),
      }).then((res) => {
        res.json().then((data) => {
          console.log(data);
          if (!data.hasColoc) {
            router.push("/coloc/createOrJoin");
          } else {
            setColocs(data.colocs);
          }
        });
      });
    }
  }, [status]);

  return (
    <PageWrapper title="Dashboard" description="Dashboard main page">
      <NavBar colocs={colocs} />
      <Card title="Dashboard" subtitle="Welcome to your dashboard">
        <p>Dashboard</p>
      </Card>
    </PageWrapper>
  );
};

export default HomeDashboard;
