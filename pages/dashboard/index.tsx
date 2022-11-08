import { Coloc } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
      <div className="flex flex-col justify-center text-center">
        <select
          name="coloc"
          id="coloc"
          className="bg-[#d9d9d9] rounded-lg focus:outline-none text-center text-4xl py-5 font-bold"
        >
          {colocs.map((coloc, index) => (
            <option key={coloc.id} value={index}>
              {coloc.name}
            </option>
          ))}
        </select>
      </div>
    </PageWrapper>
  );
};

export default HomeDashboard;
