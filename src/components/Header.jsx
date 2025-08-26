import { ChevronDown } from "lucide-react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router";

import { useMenu } from "../context/Menu/useMenu";
import { DOCUMENTATION, DOCUMENTATION_SEARCH_PARAM_KEY } from "../data/nav";
import { cn } from "../utils/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ToolTip";

function Header({ selectedDocument, accessibleDocuments, startNewConversation }) {
  const navigate = useNavigate();
  const { openMenu } = useMenu();

  return (
    <div
      className={cn(
        " border-b border-gray-200 dark:border-light-dark py-3.5 flex justify-between items-center px-4",
        {
          "py-[0.8rem]": !!selectedDocument,
        },
      )}
    >
      <button className="md:hidden" onClick={openMenu} aria-label="Open Sidebar">
        <Menu className="w-6 h-6 text-gray-700 dark:text-white" />
      </button>

      <div className="flex-1 flex justify-center md:block">
        {selectedDocument && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700  not-dark:hover:bg-gray-50 transition",
                  "dark:bg-light-dark dark:border-light-dark dark:text-white",
                )}
              >
                {selectedDocument.toUpperCase()}
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className={cn(
                "w-56 max-h-48 overflow-y-auto bg-white text-gray-900 border border-gray-200 shadow-lg",
                "dark:bg-light-dark dark:text-white dark:border-light-dark",
              )}
              align="start"
            >
              {accessibleDocuments.map((doc) => (
                <DropdownMenuItem
                  key={doc.value}
                  onClick={() => {
                    startNewConversation();
                    navigate(`/${DOCUMENTATION}?${DOCUMENTATION_SEARCH_PARAM_KEY}=${doc.value}`);
                  }}
                  className={cn(
                    "cursor-pointer px-2 py-1.5 text-sm hover:bg-gray-100 rounded",
                    "dark:text-white dark:hover:bg-white/20",
                  )}
                >
                  {doc.key.toUpperCase()}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <button onClick={startNewConversation} className="border dark:text-white dark:border-white text-black border-black rounded cursor-pointer py-0.5 px-2">
        New Chat
      </button>
    </div>
  );
}

export default Header;
