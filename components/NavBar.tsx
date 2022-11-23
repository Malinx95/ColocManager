import { Coloc } from "@prisma/client";
import { useCurrentUserContext } from "../provider/CurrentUserContext";
import { Dropdown } from "./Dropdown";

type NavBarProps = {
  colocs: Coloc[];
};

function NavBar({ colocs }: NavBarProps) {
  const { currentUser } = useCurrentUserContext();
  console.log(currentUser);
  return (
    <nav className="flex flex-col justify-center text-center shadow-sm">
      {/* <select
        name="coloc"
        id="coloc"
        className="bg-[#d9d9d9] rounded-lg focus:outline-none text-center text-4xl py-5 font-bold"
      >
        {currentUser?.Coloc.map((coloc, index) => (
          <option key={coloc.id} value={index}>
            {coloc.name}
          </option>
        ))}
      </select> */}
      <Dropdown />
    </nav>
  );
}

export default NavBar;
