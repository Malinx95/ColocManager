import { Coloc, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CurrentUser } from "../types/prisma-extend";

type UserContextType = {
  currentUser: CurrentUser;
  selectedColoc: Coloc | null | undefined;
  setSelectedColoc: (coloc: Coloc | undefined | null) => void;
  refreshUser: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

const CurrentUserContext = createContext({} as UserContextType);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [selectedColoc, setSelectedColoc] = useState<Coloc | null | undefined>(
    null
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {}, [selectedColoc]);

  function refreshUser() {
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
    }
  }

  useEffect(() => {
    refreshUser();
  }, [session]);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: currentUser,
        selectedColoc: selectedColoc,
        setSelectedColoc: setSelectedColoc,
        refreshUser: refreshUser,
        drawerOpen: drawerOpen,
        setDrawerOpen: setDrawerOpen,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext);
};
