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

export default function Calendar() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });
  const { selectedColoc } = useCurrentUserContext();

  const [colocCalendar, setColocCalendar] = useState<any>([]);
  const [calendarTitle, setCalendarTitle] = useState<string>("");
  const [calendarDate, setCalendarDate] = useState<Date>(new Date());

  function dateInputString(date: Date) {
    let year = date.getFullYear();
    let monthNb = date.getMonth() + 1;
    let dayNb = date.getDate();
    let day = dayNb.toString();
    let month = monthNb.toString();

    if (monthNb < 10) {
      month = "0" + monthNb;
    }
    if (dayNb < 10) {
      day = "0" + dayNb;
    }

    return year + "-" + month + "-" + day;
  }

  useEffect(() => {
    if (status === "authenticated" && selectedColoc) {
      fetch("/api/calendar/getColocCalendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ colocId: selectedColoc?.id }),
      }).then((res) => {
        res.json().then((data) => {
          setColocCalendar(data);
        });
      });
    }
  }, [session, selectedColoc]);

  return (
    <PageWrapper title="Calendar" description="Calendar">
      <div>
        <NavBar />

        <Card title="Create a new calendar">
          <Input
            type="text"
            placeholder="calendar title"
            value={calendarTitle}
            onChange={(e) => setCalendarTitle(e.target.value)}
          />
          <Input
            type="date"
            value={dateInputString(calendarDate)}
            onChange={(e) => {
              let date = new Date(e.target.value);
              setCalendarDate(date);
            }}
          />
          <Button
            text="Create"
            onClick={() => {
              fetch("/api/calendar/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  colocId: selectedColoc?.id,
                  title: calendarTitle,
                  date: calendarDate,
                }),
              }).then((res) => {
                res.json().then((data) => {
                  setCalendarTitle("");
                  fetch("/api/calendar/getColocCalendar", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ colocId: selectedColoc?.id }),
                  }).then((res) => {
                    res.json().then((data) => {
                      setColocCalendar(data);
                    });
                  });
                });
              });
            }}
          />
        </Card>
        <Card title="Calendar">
          {colocCalendar?.map(
            (t: { title: string; date: string; id: string }) => {
              let tDate = new Date(t.date);
              let aDate = tDate;
              aDate.setHours(0);
              aDate.setMinutes(0);
              aDate.setSeconds(0);
              aDate.setMilliseconds(0);
              let today = new Date();

              today.setHours(0);
              today.setMinutes(0);
              today.setSeconds(0);
              today.setMilliseconds(0);

              return (
                <div className="flex flex-row justify-between" key={t.id}>
                  <p
                    className={
                      aDate.getTime() == today.getTime()
                        ? "text-blue-500"
                        : aDate.getTime() < today.getTime()
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {t.title} {tDate.toLocaleDateString()}
                  </p>
                  <TrashIcon
                    className="w-6 h-6 text-red-500"
                    onClick={() => {
                      fetch("/api/calendar/delete", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ calendarId: t.id }),
                      }).then((res) => {
                        res.json().then((data) => {
                          setCalendarTitle("");
                          fetch("/api/calendar/getColocCalendar", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              colocId: selectedColoc?.id,
                            }),
                          }).then((res) => {
                            res.json().then((data) => {
                              setColocCalendar(data);
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
