import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import NavBar from "../../components/NavBar";
import PageWrapper from "../../components/PageWrapper";
import { useCurrentUserContext } from "../../provider/CurrentUserContext";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Todo() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });
  const { selectedColoc } = useCurrentUserContext();

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

  return (
    <PageWrapper title="Todø" description="Todø">
      <div>
        <NavBar />

        <Card title="Create a new todo">
          <Input
            type="text"
            placeholder="Todo title"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
          />
          <Button
            text="Create"
            onClick={() => {
              fetch("/api/todo/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  colocId: selectedColoc?.id,
                  title: todoTitle,
                }),
              }).then((res) => {
                res.json().then((data) => {
                  setTodoTitle("");
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
                });
              });
            }}
          />
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
    </PageWrapper>
  );
}