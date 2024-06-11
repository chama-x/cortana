/* eslint-disable qwik/jsx-key */
import { component$ } from "@builder.io/qwik";

interface NavLink {
  href: string;
  text: string;
}

interface NavProps {
  links: NavLink[];
}

export const Nav = component$<NavProps>(({ links }) => {
  return (
    <nav class="flex gap-x-6 gap-y-5 gap-8">
      {links.map((link) => (
        <a
          href={link.href}
          class="no-underline opacity-90 cursor-pointer pointer-events-auto text-neutral-50 max-md:font-light hover:text-blue-400 transition-colors duration-150 ease-in-out"
        >
          {link.text}
        </a>
      ))}
    </nav>
  );
});

export const NavLink = component$(() => {
  const links: NavLink[] = [
    { href: "/assist", text: "Assist" },
    { href: "/boost", text: "Boost" },
    { href: "/dev", text: "Dev" },
    { href: "/immerse", text: "Immerse" },
    { href: "/web", text: "Web" },
  ];

  return (
    <header class="flex gap-8 justify-center items-center py-5 w-full bg-black bg-opacity-90 max-md:flex max-md:mx-auto max-sm:hidden">
      <a href="/">
      <img
        loading="lazy"
        alt="Logo"
        src="https://cdn.builder.io/api/v1/image/assets%2F5d086b2108f645f2aa78ff97e6eb22cb%2Fa71aed067f64450fbd955d3660151f5f"
        class="object-contain opacity-90 aspect-square w-[23px]"
      /></a>
      <Nav links={links} />
    </header>
  );
});