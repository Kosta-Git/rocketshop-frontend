import { IconType } from "react-icons";
import Link from "next/link";

interface SidebarLinkProps {
  text: string;
  icon: IconType;
  link: string;
}

export const SidebarLink = (props: SidebarLinkProps) => {
  return (
    <li className="text-gray-400 hover:text-white relative hover:bg-gray-800 rounded">
      <Link href={props.link}>
        <div className="absolute inset-0 left-0 flex items-center pl-2">
          <props.icon className="w-6 h-6" />
        </div>
        <span className="inline-block w-full pl-10 pr-4 py-2">
          {props.text}
        </span>
      </Link>
    </li>
  );
};
