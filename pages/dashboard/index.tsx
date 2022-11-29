import { Coloc } from "@prisma/client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import NavBar from "../../components/NavBar";
import PageWrapper from "../../components/PageWrapper";
import { useCurrentUserContext } from "../../provider/CurrentUserContext";
import { TrashIcon } from "@heroicons/react/24/outline";

const HomeDashboard: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });
  const { selectedColoc } = useCurrentUserContext();

  const [colocs, setColocs] = useState<Coloc[]>([]);
  const [colocSpendings, setColocSpendings] = useState<any>([]);

  const [colocTodo, setColocTodo] = useState<any>([]);
  const [todoTitle, setTodoTitle] = useState<string>("");

  useEffect(() => {
    if (status === "authenticated" && selectedColoc) {
      fetch("/api/todo/getColocTodos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colocId: selectedColoc?.id }),
      }).then((res) => {
        res.json().then((data) => {
          console.log("colocTodo", data);
          setColocTodo(data);
        });
      });
    }
  }, [session, selectedColoc]);

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

  useEffect(() => {
    if (status === "authenticated" && selectedColoc) {
      fetch("/api/spendings/getColocSpendings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colocId: selectedColoc?.id }),
      }).then((res) => {
        res.json().then((data) => {
          console.log("colocSpendings", data);
          setColocSpendings(data);
        });
      });
    }
  }, [session, selectedColoc]);

  return (
    <PageWrapper title="Dashboard" description="Dashboard main page">
      <div className="flex flex-col">
        <NavBar />
        <div className="w-full bg-red-400">
          <Card title="Dashboard" subtitle="Welcome to your dashboard">
            <p>Dashboard</p>
          </Card>

          <Card title="Balance">
            {colocSpendings?.balance?.map(
              (b: { user: string; balance: string }) => {
                return (
                  <p key={b.user}>
                    {b.user}{" "}
                    <b
                      className={
                        parseFloat(b.balance) < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {" "}
                      {parseFloat(b.balance).toFixed(2)} BTC{" "}
                    </b>
                  </p>
                );
              }
            )}
          </Card>

          <Card title="Todø">
            {colocTodo?.map(
              (t: { title: string; description: string; id: string }) => {
                return (
                  <div className="flex flex-row justify-between" key={t.id}>
                    <p>
                      {t.title} {t.description}
                    </p>
                    <TrashIcon
                      className="w-6 h-6 text-purple-500"
                      onClick={() => {
                        fetch("/api/todo/delete", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ todoId: t.id }),
                        }).then((res) => {
                          res.json().then((data) => {
                            setTodoTitle("");
                            fetch("/api/todo/getColocTodos", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                colocId: selectedColoc?.id,
                              }),
                            }).then((res) => {
                              res.json().then((data) => {
                                console.log("colocTodo", data);
                                setColocTodo(data);
                              });
                            });
                          });
                        });
                      }}
                    />
                  </div>
                );
              }
            )}
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomeDashboard;
