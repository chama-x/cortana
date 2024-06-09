import { component$ } from "@builder.io/qwik";
import styles from "./footer.module.css";

export default component$(() => {

  return (
    <footer>
      <div class="container">
        <div class={styles.anchor}>
          <span>© 2024 Cortana . All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
});
