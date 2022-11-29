import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import NavBar from "../../components/NavBar";
import PageWrapper from "../../components/PageWrapper";
import { useCurrentUserContext } from "../../provider/CurrentUserContext";

export default function Spendings() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });
  const { selectedColoc, currentUser } = useCurrentUserContext();

  const [colocSpendings, setColocSpendings] = useState<any>([]);
  const [expanseTitle, setexpanseTitle] = useState<string>("");
  const [expanseAmount, setexpanseAmount] = useState<number>(0);

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
    <PageWrapper title="$p€ndings" description="A lot of mon€y mon€y">
      <div className="h-full w-full">
        <NavBar />

        <Card title="Create a new expanse">
          <Input
            type="text"
            placeholder="Expanse title"
            value={expanseTitle}
            onChange={(e) => setexpanseTitle(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Todo title"
            value={expanseAmount}
            onChange={(e) => setexpanseAmount(e.target.value)}
          />
          <Button
            text="Create"
            onClick={() => {
              fetch("/api/spendings/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  colocId: selectedColoc?.id,
                  userId: currentUser?.id,
                  amount: expanseAmount,
                  name: expanseTitle,
                }),
              }).then((res) => {
                res.json().then((data) => {
                  setexpanseTitle("");
                  setexpanseAmount(0);
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
                });
              });
            }}
          />
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

        <Card title="Dépenses">
          <table>
            {colocSpendings?.spendings?.map((s: any) => {
              return (
                <tr key={s.date}>
                  <th>{s.username}</th>
                  <th>{new Date(s.date).toLocaleDateString()}</th>
                  <th>{s.name}</th>
                  <th>- {s.amount} £</th>
                </tr>
              );
            })}
          </table>
        </Card>
      </div>
    </PageWrapper>
  );
}
