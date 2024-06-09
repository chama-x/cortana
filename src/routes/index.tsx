import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// import Hero from "../components/starter/hero/hero";
// import Starter from "../components/starter/next-steps/next-steps";

export default component$(() => {
  return (
    <>
    <h1>Hi, I'm Chamath</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: "Cortana | Welcome",
  meta: [
    {
      name: "description",
      content: "Stay ahead in digital trends with Cortana. Our evolving tech solutions empower customers for success.",
    },
  ],
};
