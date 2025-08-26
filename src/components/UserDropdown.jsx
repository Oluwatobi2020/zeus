import { useNavigate } from "react-router";

import { useAuth } from "../context/Auth/useAuth";
import { cn } from "../utils/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";

function UserDropdown() {
  const {
    signOut,
    user: { username, image },
  } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    signOut();
  };

  return (
    <DropdownMenu className="w-full">
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 py-3 px-1 hover:bg-black/5 rounded w-11/12 mx-auto mt-auto mb-2 cursor-pointer text-left",
            "dark:hover:bg-white/20",
          )}
        >
          <img src={image} alt={username} width={32} height={32} className="rounded-full" />
          <div className={cn("text-xs font-bold", "dark:text-white ")}>
            <p className="">{username.toUpperCase()}</p>
            {/* <p className="text-gray-500 text-left">User</p> */}
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className={cn(
          "w-11/12  min-w-[15rem] bg-white text-black border border-gray-200 shadow-lg",
          "dark:bg-light-dark dark:border-light-dark dark:hover:bg-white/20",
        )}
      >
        <DropdownMenuItem
          onClick={handleLogout}
          className={cn(
            "text-sm p-2 hover:bg-gray-100 cursor-pointer",
            "dark:text-white dark:hover:bg-white/20",
          )}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdown;
