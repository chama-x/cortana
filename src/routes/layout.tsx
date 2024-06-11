import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import Footer from "../components/starter/footer/footer";

import styles from "./styles.css?inline";
import { NavLink } from "~/components/nav/NavLink";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7, // Cached for a week
    maxAge: 5, // Check for updates every 5 seconds
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <NavLink />
      <main>
        <h1 class="text-center m-10 font-bold text-5xl">ChamaX</h1>
        <h1 class="text-center m-10 font-bold text-5xl text-gray-500">Soon!</h1>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
