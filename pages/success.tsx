import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Success: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    console.log(session);
  }

  return (
    <div>
      <h1>Success</h1>
      <p>
        {status === "authenticated"
          ? "authenticated"
          : "this should not happen lol"}
      </p>
    </div>
  );
};

export default Success;
