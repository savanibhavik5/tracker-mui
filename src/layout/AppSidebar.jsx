import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";
import SidebarWidget from "./SidebarWidget";

const navItems = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
     path:"/",
    // subItems: [
    //   {
    //     name: "Ecommerce",
    //     path: "/",
    //   },
    // ],
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Profile",
    path: "/",
  },
  {
    icon: <ListIcon />,
    name: "Forms",
     path:"/",
    // subItems: [
    //   {
    //     name: "Form Elements",
    //     path: "/form-elements"
    //   }
    // ]
  },
  {
    icon: <TableIcon />,
    name: "Tables",
     path:"/",
    // subItems: [
    //   {
    //     name: "Basic Tables",
    //     path: "/basic-tables"
    //   }
    // ]
  },
  
];

const othersItems = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      {
        name: "Line Chart",
        path: "/line-chart"
      },
      {
        name: "Bar Chart",
        path: "/bar-chart"
      }
    ]
  },
  // {
  //   icon: <BoxCubeIcon />,
  //   name: "UI Elements",
  //   subItems: [
  //     {
  //       name: "Alerts",
  //       path: "/alerts"
  //     },
  //     {
  //       name: "Avatar",
  //       path: "/avatars"
  //     },
  //     {
  //       name: "Badge",
  //       path: "/badge"
  //     },
  //     {
  //       name: "Buttons",
  //       path: "/buttons"
  //     },
  //     {
  //       name: "Images",
  //       path: "/images"
  //     },
  //     {
  //       name: "Videos",
  //       path: "/videos"
  //     }
  //   ]
  // },
  // {
  //   icon: <PlugInIcon />,
  //   name: "Authentication",
  //   subItems: [
  //     {
  //       name: "Sign In",
  //       path: "/login"
  //     },
  //     {
  //       name: "Sign Up",
  //       path: "/register"
  //     }
  //   ]
  // }
];

const AppSidebar = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered
  } = useSidebar();
  const router = useRouter();
  const pathname = router.pathname;
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback(
    (path) => pathname === path,
    [pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items =
        menuType === "main"
          ? navItems
          : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType,
                index: index
              });
              submenuMatched = true;
            }
          })
        }
      })
    });
    if (!submenuMatched) {
      setTimeout(() => {
        setOpenSubmenu(null);
      }, 0)
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight(prev => ({
          ...prev,
          [key]:
            subMenuRefs.current[key].scrollHeight
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu(prev => {
      if (
        prev &&
        prev.type === menuType &&
        prev.index === index
      ) {
        return null;
      }
      return {
        type: menuType,
        index: index
      };
    });
  };

  const renderMenuItems = (items, type) => {
    return (
      <ul className="flex flex-col gap-4">
        {
          items.map((nav, index) => (
            <li key={nav.name}>
              {
                nav.subItems ? (
                  <button
                    onClick={() =>
                      handleSubmenuToggle(index, type)
                    }
                    className={`
menu-item group
${openSubmenu?.type === type &&
                        openSubmenu?.index === index
                        ?
                        "menu-item-active"
                        :
                        "menu-item-inactive"
                      }
`}
                  >
                    <span>
                      {nav.icon}
                    </span>
                    {
                      (isExpanded || isHovered || isMobileOpen)
                      &&
                      <span className="menu-item-text">
                        {nav.name}
                      </span>
                    }
                    {
                      (isExpanded || isHovered || isMobileOpen)
                      &&
                      <ChevronDownIcon
                        className={`ml-auto transition-transform ${openSubmenu?.type === type && openSubmenu?.index === index
                            ? "rotate-180": ""}`}
                      />
                    }
                  </button>
                )
                  :
                  (
                    <Link
                      href={nav.path}
                      className={`menu-item ${isActive(nav.path)
                          ?
                          "menu-item-active" : "menu-item-inactive"
                        }
`}
                    >
                      {nav.icon}
                      {
                        (isExpanded || isHovered || isMobileOpen)
                        &&
                        <span>
                          {nav.name}
                        </span>
                      }
                    </Link>
                  )
              }
              {
                nav.subItems && (isExpanded || isHovered || isMobileOpen) &&
                (
                  <div
                    ref={(el) => {
                      subMenuRefs.current[
                        `${type}-${index}`
                      ] = el;
                    }}
                    className="overflow-hidden transition-all"
                    style={{
                      height:
                        openSubmenu?.type === type &&
                          openSubmenu?.index === index
                          ?
                          `${subMenuHeight[`${type}-${index}`]}px`
                          :
                          "0px"
                    }}
                  >
                    <ul className="mt-2 space-y-1 ml-8">
                      {
                        nav.subItems.map(item => (
                          <li key={item.name}>
                            <Link
                              href={item.path}
                              className={`
  flex items-center
  px-10
  py-2
  rounded-lg
  text-sm
  text-gray-600
  dark:text-gray-300
  hover:bg-gray-100
  dark:hover:bg-gray-800
  ${isActive(item.path)
                                  ? "bg-brand-500 text-white dark:bg-brand-500 dark:text-white"
                                  : ""
                                }
`}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                )
              }
            </li>
          ))
        }
      </ul>
    )
  };
  return (
    <aside
     className={`
fixed top-0 left-0 z-50
h-screen
overflow-y-auto
overflow-x-hidden
bg-white
dark:bg-gray-900
border-r
border-gray-200
dark:border-gray-800
transition-all duration-300

${isExpanded || isHovered
? "lg:w-[290px] w-[290px]"
: "lg:w-[90px]"
}

${isMobileOpen
? "translate-x-0"
: "-translate-x-full lg:translate-x-0"
}

`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5">
        <h3 className="mb-5 text-xs uppercase text-gray-400">
          {
            isExpanded || isHovered
              ?
              "Menu"
              :
              <HorizontaLDots />
          }
        </h3>
        {renderMenuItems(navItems, "main")}
        <h3 className="mt-8 mb-5 text-xs uppercase text-gray-400">
          {
            isExpanded || isHovered
              ?
              "Others"
              :
              <HorizontaLDots />
          }
        </h3>
        {renderMenuItems(othersItems, "others")}
      </div>
     
    </aside>
  )
}

export default AppSidebar;