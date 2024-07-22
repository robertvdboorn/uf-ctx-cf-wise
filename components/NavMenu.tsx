import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

const NavMenu: React.FC = () => (
  <ul className="list-reset lg:flex justify-end flex-1 items-center space-x-2 lg:mr-4">
    <NavItem href="/" label="Home" />
    <NavItem href="/developers" label="For Developers" />
    <NavItem href="/marketers" label="For Marketers" />
    <NavItem href="/registration" label="Registration" />
    <NavItem href="/?utm_campaign=unfrmconf" label="Call for papers" />
  </ul>
);

type NavItemProps = {
  href: string;
  label: string;
};

const NavItem: React.FC<NavItemProps> = ({ href, label }) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <li>
      <Link href={href} passHref>
        <a className={`inline-block py-2 px-4 no-underline ${isActive ? 'font-bold text-black' : 'text-black hover:text-gray-700'}`}>
          {label}
        </a>
      </Link>
    </li>
  );
};

export default NavMenu;
