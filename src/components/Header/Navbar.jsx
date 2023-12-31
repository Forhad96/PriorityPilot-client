import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
  HomeModernIcon,

} from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/Auth/UseAuth";
import toast from "react-hot-toast";

// profile menu component
const profileMenuItems = [
  // {
  //   label: "My Profile",
  //   icon: UserCircleIcon,
  // },
  // {
  //   label: "Edit Profile",
  //   icon: Cog6ToothIcon,
  // },
  // {
  //   label: "Inbox",
  //   icon: InboxArrowDownIcon,
  // },
  {
    label: "Dashboard",
    icon: LifebuoyIcon,
    path: "dashboard",
  },
  {
    label: "Task",
    icon: LifebuoyIcon,
    path: "dashboard/tasks",
  },
  {
    label: "Ongoing Task",
    icon: LifebuoyIcon,
    path: "dashboard/ongoing",
  },
  {
    label: "Complete Task",
    icon: LifebuoyIcon,
    path: "dashboard/complete",
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    path: "help",
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const {logOut} = useAuth()
  const closeMenu = () => setIsMenuOpen(false);


  const handleSingOut = async() =>{
    try {
      await logOut()

       toast.success("Logout successful");
    } catch (error) {
      console.log(error);
      
    }
    console.log('ok');


  }
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon ,path}, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Link to={path}>
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  onClick={label === "Sign Out" && handleSingOut}
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </Link>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list menu




// nav list component
const navListItems = [
  {
    label: "Home",
    icon: HomeModernIcon,
    path: "/",
  },
  // {
  //   label: "Dashboard",
  //   icon: UserCircleIcon,
  //   path: "dashboard",
  // },
  {
    label: "Contact",
    icon: CodeBracketSquareIcon,
    path: "contact",
  },
  {
    label: "About",
    icon: RocketLaunchIcon,
    path: "about",
  },
];

function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon,path }, key) => (
        <Typography
          key={label}
          as="div"
          href="#"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <NavLink to={path}>
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              <span className="text-gray-900"> {label}</span>
            </MenuItem>
          </NavLink>
        </Typography>
      ))}
    </ul>
  );
}

export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const {user} = useAuth()

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="mx-auto max-w-7xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          <img src="/Black logo - no background.png" className="w-32" alt="" />
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        {user ? (
          <ProfileMenu />
        ) : (
          <Typography
            as="div"
            href="#"
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <NavLink to="/login">
              <MenuItem className="flex items-center gap-2 lg:rounded-full">
                {/* {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "} */}
                <span className="text-gray-900">Login/Register</span>
              </MenuItem>
            </NavLink>
          </Typography>
        )}
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
