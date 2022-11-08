import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";

const HomeDashboard: NextPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });
  const router = useRouter();

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
        });
      });
    }
  }, [status]);

  if (status === "authenticated") {
    return (
      <PageWrapper title="Dashboard" description="Dashboard main page">
        <h1>Dashboard</h1>
      </PageWrapper>
    );
  } else {
    return (
      <PageWrapper title="Dashboard" description="Dashboard main page">
        <h1>Loading</h1>
      </PageWrapper>
    );
  }
};

export default HomeDashboard;
