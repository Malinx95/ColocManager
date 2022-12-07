import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCurrentUserContext } from "../provider/CurrentUserContext";

export default function Drawer() {
  const { setDrawerOpen, drawerOpen } = useCurrentUserContext();
  const router = useRouter();
  const pages = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Calendar",
      href: "/dashboard/calendar",
    },
    {
      name: "Spendings",
      href: "/dashboard/spendings",
    },
    {
      name: "Todo",
      href: "/dashboard/todo",
    },
    {
      name: "Create or join coloc",
      href: "/coloc/createOrJoin",
    },
  ];

  return (
    <>
      <div
        className={
          drawerOpen
            ? "fixed left-0 top-0 h-screen w-1/2 bg-[#d9d9d9] shadow-md shadow-black z-50 flex flex-col"
            : "hidden"
        }
      >
        <div className="h-[4.5rem] bg-white text-center items-center justify-center flex">
          <p className="text-2xl font-bold">Coloc Manager</p>
        </div>
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-col p-5 gap-2 font-semibold text-md">
            {pages.map((page, index) => {
              return (
                <>
                  <a
                    key={index}
                    onClick={() => {
                      setDrawerOpen(false);
                      router.push(page.href);
                    }}
                  >
                    {page.name}
                  </a>
                  <hr className="border-black" />
                </>
              );
            })}
          </div>
          <div className="flex flex-col p-5 gap-2 font-semibold text-md border-solid border-t border-black">
            <a
              onClick={() => {
                setDrawerOpen(false);
                router.push("/dashboard/profile");
              }}
            >
              Profile
            </a>
            <hr className="border-black" />
            <a
              onClick={() => {
                setDrawerOpen(false);
                signOut({ callbackUrl: "/" });
              }}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
      <div
        className={
          drawerOpen
            ? "w-screen h-screen backdrop-blur-sm fixed top-0 left-0 z-40"
            : "hidden"
        }
        onClick={() => setDrawerOpen(false)}
      />
    </>
  );
}
