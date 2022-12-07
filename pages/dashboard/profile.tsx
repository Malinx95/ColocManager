import { TrashIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Input from "../../components/Input";
import NavBar from "../../components/NavBar";
import PageWrapper from "../../components/PageWrapper";
import { useCurrentUserContext } from "../../provider/CurrentUserContext";

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => {
      router.push("/");
    },
  });
  const { currentUser, refreshUser } = useCurrentUserContext();
  useEffect(() => {
    setFirstName(currentUser?.firstName);
    setLastName(currentUser?.lastName);
  }, [currentUser]);

  const [firstName, setFirstName] = useState(currentUser?.firstName);
  const [lastName, setLastName] = useState(currentUser?.lastName);

  return (
    <PageWrapper title="Profile" description="Profile page">
      <NavBar />
      <Card title={"Profil de " + currentUser?.username}>
        <p>first name:</p>
        <Input
          type="text"
          value={firstName}
          placeholder="John"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <p>last name:</p>
        <Input
          type="text"
          value={lastName}
          placeholder="Doe"
          onChange={(e) => setLastName(e.target.value)}
        />
        <Button
          text="Save"
          onClick={() => {
            fetch("/api/user/changeUserInfo", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                userId: currentUser?.id,
              }),
            }).then(() => {
              refreshUser();
            });
          }}
        />
      </Card>
      <Card title="Coloc">
        {currentUser?.Coloc.map((coloc) => {
          return (
            <div className="flex justify-between" key={coloc.id}>
              <p>{coloc.name}</p>
              <TrashIcon
                className="h-6 w-6 text-red-500"
                onClick={() => {
                  fetch("/api/coloc/leave", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      colocId: coloc.id,
                      userId: currentUser?.id,
                    }),
                  }).then(() => {
                    refreshUser();
                  });
                }}
              />
            </div>
          );
        })}
        <Button
          text="Create or join coloc"
          onClick={() => {
            router.push("/coloc/createOrJoin");
          }}
        />
      </Card>
    </PageWrapper>
  );
}
