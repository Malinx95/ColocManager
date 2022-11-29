import { useRouter } from "next/router";
import { useCurrentUserContext } from "../provider/CurrentUserContext";

function Title() {
  const router = useRouter();
  const { currentUser } = useCurrentUserContext();

  return (
    <h1
      className="text-center text-4xl py-5 font-bold"
      onClick={() => {
        if (currentUser && currentUser.Coloc.length > 0) {
          router.push("/dashboard");
        }
      }}
    >
      Coloc Manager
    </h1>
  );
}

export default Title;
