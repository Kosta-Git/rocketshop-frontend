import { PropsWithChildren, useState } from "react";
import { RiRocket2Fill, RiCloseCircleFill, RiMenuFill } from "react-icons/ri";
import "./navigation.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SidebarProps {};

export const Sidebar = (props: PropsWithChildren<SidebarProps>) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="bg-gray-900 text-gray-100 flex justify-between md:hidden px-2.5 py-2.5">
        <span className="bg-blue-500 p-2 rounded-md flex items-center justify-center">
          <RiRocket2Fill className="w-4 h-4" />
          RocketShop
        </span>
        <button
          className="flex items-center justify-center"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? (
            <RiCloseCircleFill className="w-6 h-6" />
          ) : (
            <RiMenuFill className="w-6 h-6" />
          )}
        </button>
      </div>
      <div className={expanded ? "sidebar" : "sidebar sidebar-close"}>
        <div className="px-6 pt-8">
          <span className="bg-blue-500 p-2 rounded-md flex items-center justify-center">
            <RiRocket2Fill className="w-8 h-8" />
            RocketShop
          </span>
        </div>
        <div className="px-6 pt-4">
          <hr className="border-gray-700" />
        </div>
        <div className="px-6 pt-4">
          {props.children && <ul>{props.children}</ul>}
        </div>
      </div>
    </>
  );
};
