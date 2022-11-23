import { Coloc, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserWithColocs } from "../types/prisma-extend";

type UserContextType = {
  currentUser: UserWithColocs;
  selectedColoc: Coloc | null;
  setSelectedColoc: (coloc: Coloc) => void;
};

const CurrentUserContext = createContext({} as UserContextType);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState<UserWithColocs>(null);
  const [selectedColoc, setSelectedColoc] = useState<Coloc | null>(null);

  useEffect(() => {
    if (session) {
      fetch("/api/user/getCurrentUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user.id }),
      }).then((res) => {
        res.json().then((data) => {
          setCurrentUser(data);
          if (data.Coloc.length > 0) {
            setSelectedColoc(data.Coloc[0]);
          }
        });
      });
    } else {
      setCurrentUser(null);
      setSelectedColoc(null);
      console.log("no session");
    }
  }, [session]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: currentUser,
        selectedColoc: selectedColoc,
        setSelectedColoc: setSelectedColoc,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
};
