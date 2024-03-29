import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { loaderImg } from "../lib/loaderImg";

import { Transition } from "@headlessui/react";
import { useAuth } from "../lib/hooks/auth";

function UserMenu({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { logout } = useAuth();

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current?.contains(target) ||
        trigger.current?.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex">
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <Image
          loader={loaderImg}
          src={"/assets/images/tutwurihandayani.png"}
          width={32}
          height={32}
          alt="user pics"
          className="w-8 h-8 rounded-full"
          unoptimized={true}
        />

        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-gray-800">
            {user?.student?.fullname}
          </span>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg
            className="w-3 h-3 flex-shrink-0 ml-1 fill-current text-gray-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-max bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterstart="opacity-0 -translate-y-2"
        enterend="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leavestart="opacity-100"
        leaveend="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
            <div className="font-medium text-gray-800">
              {user.student?.fullname}
            </div>
            <div className="text-xs text-gray-500 italic">
              {user.student?.nipd} - Siswa
            </div>
          </div>
          <ul>
            <li>
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <div
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3 cursor-pointer"
                onClick={() => logout()}
              >
                Sign Out
              </div>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default UserMenu;
