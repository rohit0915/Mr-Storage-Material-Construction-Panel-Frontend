import BellIcon from "../../assets/bellicon.svg";
import SearchIcon from "../../assets/searchIcon.svg";
import Logo from "../../assets/logo.svg";

type Props = {
  count?: number;
};

export default function Header({ count }: Props) {
  const displayCount =
    typeof count === "number" && count > 99 ? "99+" : count;

  return (
    <header className="h-[81px] bg-white flex items-center justify-between px-6 shadow-sm">
      <div className="flex gap-2 items-center px-2 border border-[#D1D5DB] rounded-[8px] h-[38px] min-w-[256px]">
        <img src={SearchIcon} alt="" />
        <input
          type="text"
          placeholder="Search leads, projects..."
          className="text-[14px] outline-none"
        />
      </div>

      <div className="flex gap-12 items-center">
        <div className="relative">
          <img src={BellIcon} className="w-8" alt="" />

          {typeof count === "number" && count > 0 && (
            <span className="absolute -top-2 left-5 px-1 min-w-5 h-5 flex items-center justify-center text-white bg-red-500 rounded-full text-[10px]">
              {displayCount}
            </span>
          )}
        </div>

        <img src={Logo} alt="" />
      </div>
    </header>
  );
}
