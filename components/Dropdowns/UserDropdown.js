import React from "react";
import { createPopper } from "@popperjs/core";
import Image from '@/components/Image'
import Link from "next/link";
import { withProtected } from "src/hook/route";

const UserDropdown = ({ userInfo, auth }) => {

  const { logout } = auth;

  // console.log(user)

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            {/* <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={user?.photoURL}
            /> */}
            {
              userInfo !== undefined ?
                <Image
                  src={userInfo !== undefined ? userInfo.photoURL : ''}
                  width="35px"
                  height="35px"
                  alt="avatar"
                  className="h-10 w-10 rounded-full"
                />
                :
                "no image"
            }


          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {/* <a
          href="/dashboard/profile"
          user={user}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          // onClick={(e) => e.preventDefault()}
        >
          Profile
        </a> */}

        <Link href="/dashboard/profile">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
          >
            {/* <i
                      className={
                        "fas fa-tv mr-2 text-sm " 
                      }
                    ></i>{" "} */}
            Profile
          </a>
        </Link>

        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a> */}
        {/* <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a> */}
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <Link href="#">
          <a
            href="#pablo"
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={logout}
          >
            {/* <i
                      className={
                        "fas fa-tv mr-2 text-sm " 
                      }
                    ></i>{" "} */}
            Log out
          </a>
        </Link>
      </div>
    </>
  );
};

export default withProtected(UserDropdown);
