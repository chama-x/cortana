// adapters/netlify-edge/vite.config.ts
import { netlifyEdgeAdapter } from "file:///Users/chamaththiwanka/MyRepo/cortana/node_modules/@builder.io/qwik-city/adapters/netlify-edge/vite/index.mjs";
import { extendConfig } from "file:///Users/chamaththiwanka/MyRepo/cortana/node_modules/@builder.io/qwik-city/vite/index.mjs";

// vite.config.ts
import { defineConfig } from "file:///Users/chamaththiwanka/MyRepo/cortana/node_modules/vite/dist/node/index.js";
import { qwikVite } from "file:///Users/chamaththiwanka/MyRepo/cortana/node_modules/@builder.io/qwik/optimizer.mjs";
import { qwikCity } from "file:///Users/chamaththiwanka/MyRepo/cortana/node_modules/@builder.io/qwik-city/vite/index.mjs";
import tsconfigPaths from "file:///Users/chamaththiwanka/MyRepo/cortana/node_modules/vite-tsconfig-paths/dist/index.mjs";
import { builderDevTools } from "file:///Users/chamaththiwanka/MyRepo/cortana/node_modules/@builder.io/dev-tools/vite/index.mjs";

// package.json
var package_default = {
  name: "my-qwik-basic-starter",
  description: "Demo App with Routing built-in (recommended)",
  engines: {
    node: "^18.17.0 || ^20.3.0 || >=21.0.0"
  },
  "engines-annotation": "Mostly required by sharp which needs a Node-API v9 compatible runtime",
  private: true,
  trustedDependencies: [
    "sharp"
  ],
  "trustedDependencies-annotation": "Needed for bun to allow running install scripts",
  type: "module",
  scripts: {
    build: "qwik build",
    "build.client": "vite build",
    "build.preview": "vite build --ssr src/entry.preview.tsx",
    "build.server": "vite build -c adapters/netlify-edge/vite.config.ts",
    "build.types": "tsc --incremental --noEmit",
    deploy: "netlify deploy --build",
    dev: "vite --mode ssr",
    "dev.debug": "node --inspect-brk ./node_modules/vite/bin/vite.js --mode ssr --force",
    fmt: "prettier --write .",
    "fmt.check": "prettier --check .",
    lint: 'eslint "src/**/*.ts*"',
    preview: "qwik build preview && vite preview --open",
    start: "vite --open --mode ssr",
    qwik: "qwik"
  },
  devDependencies: {
    "@builder.io/qwik": "^1.5.5",
    "@builder.io/qwik-city": "^1.5.5",
    "@builder.io/sdk-qwik": "^0.14.22",
    "@netlify/edge-functions": "^2.0.0",
    "@types/eslint": "^8.56.10",
    "@types/node": "^20.12.7",
    "@typescript-eslint/eslint-plugin": "^7.7.1",
    "@typescript-eslint/parser": "^7.7.1",
    autoprefixer: "^10.4.19",
    eslint: "^9.4.0",
    "eslint-plugin-qwik": "^1.5.5",
    "netlify-cli": "^17.26.1",
    postcss: "^8.4.38",
    prettier: "^3.2.5",
    tailwindcss: "^3.4.4",
    typescript: "5.4.5",
    undici: "*",
    vite: "^5.2.10",
    "vite-tsconfig-paths": "^4.2.1"
  },
  dependencies: {
    "@builder.io/dev-tools": "^1.0.14",
    "@grpc/grpc-js": "^1.8.22",
    braces: "^3.0.3",
    dotenv: "^16.4.5"
  }
};

// vite.config.ts
var { dependencies = {}, devDependencies = {} } = package_default;
errorOnDuplicatesPkgDeps(devDependencies, dependencies);
var vite_config_default = defineConfig(({ command, mode }) => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), builderDevTools()],
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      exclude: []
    },
    /**
     * This is an advanced setting. It improves the bundling of your server code. To use it, make sure you understand when your consumed packages are dependencies or dev depencies. (otherwise things will break in production)
     */
    // ssr:
    //   command === "build" && mode === "production"
    //     ? {
    //         // All dev dependencies should be bundled in the server build
    //         noExternal: Object.keys(devDependencies),
    //         // Anything marked as a dependency will not be bundled
    //         // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
    //         // If a dep-of-dep needs to be external, add it here
    //         // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
    //         // external: [...Object.keys(dependencies), 'bcrypt']
    //         external: Object.keys(dependencies),
    //       }
    //     : undefined,
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0"
      }
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600"
      }
    }
  };
});
function errorOnDuplicatesPkgDeps(devDependencies2, dependencies2) {
  let msg = "";
  const duplicateDeps = Object.keys(devDependencies2).filter(
    (dep) => dependencies2[dep]
  );
  const qwikPkg = Object.keys(dependencies2).filter(
    (value) => /qwik/i.test(value)
  );
  msg = `Move qwik packages ${qwikPkg.join(", ")} to devDependencies`;
  if (qwikPkg.length > 0) {
    throw new Error(msg);
  }
  msg = `
    Warning: The dependency "${duplicateDeps.join(
    ", "
  )}" is listed in both "devDependencies" and "dependencies".
    Please move the duplicated dependencies to "devDependencies" only and remove it from "dependencies"
  `;
  if (duplicateDeps.length > 0) {
    throw new Error(msg);
  }
}

// adapters/netlify-edge/vite.config.ts
var vite_config_default2 = extendConfig(vite_config_default, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.netlify-edge.tsx", "@qwik-city-plan"]
      },
      outDir: ".netlify/edge-functions/entry.netlify-edge"
    },
    plugins: [netlifyEdgeAdapter()]
  };
});
export {
  vite_config_default2 as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWRhcHRlcnMvbmV0bGlmeS1lZGdlL3ZpdGUuY29uZmlnLnRzIiwgInZpdGUuY29uZmlnLnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9jaGFtYXRodGhpd2Fua2EvTXlSZXBvL2NvcnRhbmEvYWRhcHRlcnMvbmV0bGlmeS1lZGdlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvY2hhbWF0aHRoaXdhbmthL015UmVwby9jb3J0YW5hL2FkYXB0ZXJzL25ldGxpZnktZWRnZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvY2hhbWF0aHRoaXdhbmthL015UmVwby9jb3J0YW5hL2FkYXB0ZXJzL25ldGxpZnktZWRnZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IG5ldGxpZnlFZGdlQWRhcHRlciB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrLWNpdHkvYWRhcHRlcnMvbmV0bGlmeS1lZGdlL3ZpdGVcIjtcbmltcG9ydCB7IGV4dGVuZENvbmZpZyB9IGZyb20gXCJAYnVpbGRlci5pby9xd2lrLWNpdHkvdml0ZVwiO1xuaW1wb3J0IGJhc2VDb25maWcgZnJvbSBcIi4uLy4uL3ZpdGUuY29uZmlnXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGV4dGVuZENvbmZpZyhiYXNlQ29uZmlnLCAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgYnVpbGQ6IHtcbiAgICAgIHNzcjogdHJ1ZSxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgaW5wdXQ6IFtcInNyYy9lbnRyeS5uZXRsaWZ5LWVkZ2UudHN4XCIsIFwiQHF3aWstY2l0eS1wbGFuXCJdLFxuICAgICAgfSxcbiAgICAgIG91dERpcjogXCIubmV0bGlmeS9lZGdlLWZ1bmN0aW9ucy9lbnRyeS5uZXRsaWZ5LWVkZ2VcIixcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtuZXRsaWZ5RWRnZUFkYXB0ZXIoKV0sXG4gIH07XG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2NoYW1hdGh0aGl3YW5rYS9NeVJlcG8vY29ydGFuYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2NoYW1hdGh0aGl3YW5rYS9NeVJlcG8vY29ydGFuYS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvY2hhbWF0aHRoaXdhbmthL015UmVwby9jb3J0YW5hL3ZpdGUuY29uZmlnLnRzXCI7LyoqXG4gKiBUaGlzIGlzIHRoZSBiYXNlIGNvbmZpZyBmb3Igdml0ZS5cbiAqIFdoZW4gYnVpbGRpbmcsIHRoZSBhZGFwdGVyIGNvbmZpZyBpcyB1c2VkIHdoaWNoIGxvYWRzIHRoaXMgZmlsZSBhbmQgZXh0ZW5kcyBpdC5cbiAqL1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCB0eXBlIFVzZXJDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgcXdpa1ZpdGUgfSBmcm9tIFwiQGJ1aWxkZXIuaW8vcXdpay9vcHRpbWl6ZXJcIjtcbmltcG9ydCB7IHF3aWtDaXR5IH0gZnJvbSBcIkBidWlsZGVyLmlvL3F3aWstY2l0eS92aXRlXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuaW1wb3J0IHsgYnVpbGRlckRldlRvb2xzIH0gZnJvbSBcIkBidWlsZGVyLmlvL2Rldi10b29scy92aXRlXCI7XG5pbXBvcnQgcGtnIGZyb20gXCIuL3BhY2thZ2UuanNvblwiO1xuXG50eXBlIFBrZ0RlcCA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG5jb25zdCB7IGRlcGVuZGVuY2llcyA9IHt9LCBkZXZEZXBlbmRlbmNpZXMgPSB7fSB9ID0gcGtnIGFzIGFueSBhcyB7XG4gIGRlcGVuZGVuY2llczogUGtnRGVwO1xuICBkZXZEZXBlbmRlbmNpZXM6IFBrZ0RlcDtcbiAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbn07XG5lcnJvck9uRHVwbGljYXRlc1BrZ0RlcHMoZGV2RGVwZW5kZW5jaWVzLCBkZXBlbmRlbmNpZXMpO1xuXG4vKipcbiAqIE5vdGUgdGhhdCBWaXRlIG5vcm1hbGx5IHN0YXJ0cyBmcm9tIGBpbmRleC5odG1sYCBidXQgdGhlIHF3aWtDaXR5IHBsdWdpbiBtYWtlcyBzdGFydCBhdCBgc3JjL2VudHJ5LnNzci50c3hgIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH0pOiBVc2VyQ29uZmlnID0+IHtcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbcXdpa0NpdHkoKSwgcXdpa1ZpdGUoKSwgdHNjb25maWdQYXRocygpLCBidWlsZGVyRGV2VG9vbHMoKV0sXG4gICAgLy8gVGhpcyB0ZWxscyBWaXRlIHdoaWNoIGRlcGVuZGVuY2llcyB0byBwcmUtYnVpbGQgaW4gZGV2IG1vZGUuXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICAvLyBQdXQgcHJvYmxlbWF0aWMgZGVwcyB0aGF0IGJyZWFrIGJ1bmRsaW5nIGhlcmUsIG1vc3RseSB0aG9zZSB3aXRoIGJpbmFyaWVzLlxuICAgICAgLy8gRm9yIGV4YW1wbGUgWydiZXR0ZXItc3FsaXRlMyddIGlmIHlvdSB1c2UgdGhhdCBpbiBzZXJ2ZXIgZnVuY3Rpb25zLlxuICAgICAgZXhjbHVkZTogW10sXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgYW4gYWR2YW5jZWQgc2V0dGluZy4gSXQgaW1wcm92ZXMgdGhlIGJ1bmRsaW5nIG9mIHlvdXIgc2VydmVyIGNvZGUuIFRvIHVzZSBpdCwgbWFrZSBzdXJlIHlvdSB1bmRlcnN0YW5kIHdoZW4geW91ciBjb25zdW1lZCBwYWNrYWdlcyBhcmUgZGVwZW5kZW5jaWVzIG9yIGRldiBkZXBlbmNpZXMuIChvdGhlcndpc2UgdGhpbmdzIHdpbGwgYnJlYWsgaW4gcHJvZHVjdGlvbilcbiAgICAgKi9cbiAgICAvLyBzc3I6XG4gICAgLy8gICBjb21tYW5kID09PSBcImJ1aWxkXCIgJiYgbW9kZSA9PT0gXCJwcm9kdWN0aW9uXCJcbiAgICAvLyAgICAgPyB7XG4gICAgLy8gICAgICAgICAvLyBBbGwgZGV2IGRlcGVuZGVuY2llcyBzaG91bGQgYmUgYnVuZGxlZCBpbiB0aGUgc2VydmVyIGJ1aWxkXG4gICAgLy8gICAgICAgICBub0V4dGVybmFsOiBPYmplY3Qua2V5cyhkZXZEZXBlbmRlbmNpZXMpLFxuICAgIC8vICAgICAgICAgLy8gQW55dGhpbmcgbWFya2VkIGFzIGEgZGVwZW5kZW5jeSB3aWxsIG5vdCBiZSBidW5kbGVkXG4gICAgLy8gICAgICAgICAvLyBUaGVzZSBzaG91bGQgb25seSBiZSBwcm9kdWN0aW9uIGJpbmFyeSBkZXBzIChpbmNsdWRpbmcgZGVwcyBvZiBkZXBzKSwgQ0xJIGRlcHMsIGFuZCB0aGVpciBtb2R1bGUgZ3JhcGhcbiAgICAvLyAgICAgICAgIC8vIElmIGEgZGVwLW9mLWRlcCBuZWVkcyB0byBiZSBleHRlcm5hbCwgYWRkIGl0IGhlcmVcbiAgICAvLyAgICAgICAgIC8vIEZvciBleGFtcGxlLCBpZiBzb21ldGhpbmcgdXNlcyBgYmNyeXB0YCBidXQgeW91IGRvbid0IGhhdmUgaXQgYXMgYSBkZXAsIHlvdSBjYW4gd3JpdGVcbiAgICAvLyAgICAgICAgIC8vIGV4dGVybmFsOiBbLi4uT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSwgJ2JjcnlwdCddXG4gICAgLy8gICAgICAgICBleHRlcm5hbDogT2JqZWN0LmtleXMoZGVwZW5kZW5jaWVzKSxcbiAgICAvLyAgICAgICB9XG4gICAgLy8gICAgIDogdW5kZWZpbmVkLFxuICAgIHNlcnZlcjoge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICAvLyBEb24ndCBjYWNoZSB0aGUgc2VydmVyIHJlc3BvbnNlIGluIGRldiBtb2RlXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT0wXCIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcHJldmlldzoge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICAvLyBEbyBjYWNoZSB0aGUgc2VydmVyIHJlc3BvbnNlIGluIHByZXZpZXcgKG5vbi1hZGFwdGVyIHByb2R1Y3Rpb24gYnVpbGQpXG4gICAgICAgIFwiQ2FjaGUtQ29udHJvbFwiOiBcInB1YmxpYywgbWF4LWFnZT02MDBcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn0pO1xuLy8gKioqIHV0aWxzICoqKlxuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIGlkZW50aWZ5IGR1cGxpY2F0ZSBkZXBlbmRlbmNpZXMgYW5kIHRocm93IGFuIGVycm9yXG4gKiBAcGFyYW0ge09iamVjdH0gZGV2RGVwZW5kZW5jaWVzIC0gTGlzdCBvZiBkZXZlbG9wbWVudCBkZXBlbmRlbmNpZXNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXBlbmRlbmNpZXMgLSBMaXN0IG9mIHByb2R1Y3Rpb24gZGVwZW5kZW5jaWVzXG4gKi9cbmZ1bmN0aW9uIGVycm9yT25EdXBsaWNhdGVzUGtnRGVwcyhcbiAgZGV2RGVwZW5kZW5jaWVzOiBQa2dEZXAsXG4gIGRlcGVuZGVuY2llczogUGtnRGVwXG4pIHtcbiAgbGV0IG1zZyA9IFwiXCI7XG4gIC8vIENyZWF0ZSBhbiBhcnJheSAnZHVwbGljYXRlRGVwcycgYnkgZmlsdGVyaW5nIGRldkRlcGVuZGVuY2llcy5cbiAgLy8gSWYgYSBkZXBlbmRlbmN5IGFsc28gZXhpc3RzIGluIGRlcGVuZGVuY2llcywgaXQgaXMgY29uc2lkZXJlZCBhIGR1cGxpY2F0ZS5cbiAgY29uc3QgZHVwbGljYXRlRGVwcyA9IE9iamVjdC5rZXlzKGRldkRlcGVuZGVuY2llcykuZmlsdGVyKFxuICAgIChkZXApID0+IGRlcGVuZGVuY2llc1tkZXBdXG4gICk7XG4gIC8vIGluY2x1ZGUgYW55IGtub3duIHF3aWsgcGFja2FnZXNcbiAgY29uc3QgcXdpa1BrZyA9IE9iamVjdC5rZXlzKGRlcGVuZGVuY2llcykuZmlsdGVyKCh2YWx1ZSkgPT5cbiAgICAvcXdpay9pLnRlc3QodmFsdWUpXG4gICk7XG4gIC8vIGFueSBlcnJvcnMgZm9yIG1pc3NpbmcgXCJxd2lrLWNpdHktcGxhblwiXG4gIC8vIFtQTFVHSU5fRVJST1JdOiBJbnZhbGlkIG1vZHVsZSBcIkBxd2lrLWNpdHktcGxhblwiIGlzIG5vdCBhIHZhbGlkIHBhY2thZ2VcbiAgbXNnID0gYE1vdmUgcXdpayBwYWNrYWdlcyAke3F3aWtQa2cuam9pbihcIiwgXCIpfSB0byBkZXZEZXBlbmRlbmNpZXNgO1xuICBpZiAocXdpa1BrZy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gIH1cbiAgLy8gRm9ybWF0IHRoZSBlcnJvciBtZXNzYWdlIHdpdGggdGhlIGR1cGxpY2F0ZXMgbGlzdC5cbiAgLy8gVGhlIGBqb2luYCBmdW5jdGlvbiBpcyB1c2VkIHRvIHJlcHJlc2VudCB0aGUgZWxlbWVudHMgb2YgdGhlICdkdXBsaWNhdGVEZXBzJyBhcnJheSBhcyBhIGNvbW1hLXNlcGFyYXRlZCBzdHJpbmcuXG4gIG1zZyA9IGBcbiAgICBXYXJuaW5nOiBUaGUgZGVwZW5kZW5jeSBcIiR7ZHVwbGljYXRlRGVwcy5qb2luKFxuICAgICAgXCIsIFwiXG4gICAgKX1cIiBpcyBsaXN0ZWQgaW4gYm90aCBcImRldkRlcGVuZGVuY2llc1wiIGFuZCBcImRlcGVuZGVuY2llc1wiLlxuICAgIFBsZWFzZSBtb3ZlIHRoZSBkdXBsaWNhdGVkIGRlcGVuZGVuY2llcyB0byBcImRldkRlcGVuZGVuY2llc1wiIG9ubHkgYW5kIHJlbW92ZSBpdCBmcm9tIFwiZGVwZW5kZW5jaWVzXCJcbiAgYDtcbiAgLy8gVGhyb3cgYW4gZXJyb3Igd2l0aCB0aGUgY29uc3RydWN0ZWQgbWVzc2FnZS5cbiAgaWYgKGR1cGxpY2F0ZURlcHMubGVuZ3RoID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICB9XG59XG4iLCAie1xuICBcIm5hbWVcIjogXCJteS1xd2lrLWJhc2ljLXN0YXJ0ZXJcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcIkRlbW8gQXBwIHdpdGggUm91dGluZyBidWlsdC1pbiAocmVjb21tZW5kZWQpXCIsXG4gIFwiZW5naW5lc1wiOiB7XG4gICAgXCJub2RlXCI6IFwiXjE4LjE3LjAgfHwgXjIwLjMuMCB8fCA+PTIxLjAuMFwiXG4gIH0sXG4gIFwiZW5naW5lcy1hbm5vdGF0aW9uXCI6IFwiTW9zdGx5IHJlcXVpcmVkIGJ5IHNoYXJwIHdoaWNoIG5lZWRzIGEgTm9kZS1BUEkgdjkgY29tcGF0aWJsZSBydW50aW1lXCIsXG4gIFwicHJpdmF0ZVwiOiB0cnVlLFxuICBcInRydXN0ZWREZXBlbmRlbmNpZXNcIjogW1xuICAgIFwic2hhcnBcIlxuICBdLFxuICBcInRydXN0ZWREZXBlbmRlbmNpZXMtYW5ub3RhdGlvblwiOiBcIk5lZWRlZCBmb3IgYnVuIHRvIGFsbG93IHJ1bm5pbmcgaW5zdGFsbCBzY3JpcHRzXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiYnVpbGRcIjogXCJxd2lrIGJ1aWxkXCIsXG4gICAgXCJidWlsZC5jbGllbnRcIjogXCJ2aXRlIGJ1aWxkXCIsXG4gICAgXCJidWlsZC5wcmV2aWV3XCI6IFwidml0ZSBidWlsZCAtLXNzciBzcmMvZW50cnkucHJldmlldy50c3hcIixcbiAgICBcImJ1aWxkLnNlcnZlclwiOiBcInZpdGUgYnVpbGQgLWMgYWRhcHRlcnMvbmV0bGlmeS1lZGdlL3ZpdGUuY29uZmlnLnRzXCIsXG4gICAgXCJidWlsZC50eXBlc1wiOiBcInRzYyAtLWluY3JlbWVudGFsIC0tbm9FbWl0XCIsXG4gICAgXCJkZXBsb3lcIjogXCJuZXRsaWZ5IGRlcGxveSAtLWJ1aWxkXCIsXG4gICAgXCJkZXZcIjogXCJ2aXRlIC0tbW9kZSBzc3JcIixcbiAgICBcImRldi5kZWJ1Z1wiOiBcIm5vZGUgLS1pbnNwZWN0LWJyayAuL25vZGVfbW9kdWxlcy92aXRlL2Jpbi92aXRlLmpzIC0tbW9kZSBzc3IgLS1mb3JjZVwiLFxuICAgIFwiZm10XCI6IFwicHJldHRpZXIgLS13cml0ZSAuXCIsXG4gICAgXCJmbXQuY2hlY2tcIjogXCJwcmV0dGllciAtLWNoZWNrIC5cIixcbiAgICBcImxpbnRcIjogXCJlc2xpbnQgXFxcInNyYy8qKi8qLnRzKlxcXCJcIixcbiAgICBcInByZXZpZXdcIjogXCJxd2lrIGJ1aWxkIHByZXZpZXcgJiYgdml0ZSBwcmV2aWV3IC0tb3BlblwiLFxuICAgIFwic3RhcnRcIjogXCJ2aXRlIC0tb3BlbiAtLW1vZGUgc3NyXCIsXG4gICAgXCJxd2lrXCI6IFwicXdpa1wiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBidWlsZGVyLmlvL3F3aWtcIjogXCJeMS41LjVcIixcbiAgICBcIkBidWlsZGVyLmlvL3F3aWstY2l0eVwiOiBcIl4xLjUuNVwiLFxuICAgIFwiQGJ1aWxkZXIuaW8vc2RrLXF3aWtcIjogXCJeMC4xNC4yMlwiLFxuICAgIFwiQG5ldGxpZnkvZWRnZS1mdW5jdGlvbnNcIjogXCJeMi4wLjBcIixcbiAgICBcIkB0eXBlcy9lc2xpbnRcIjogXCJeOC41Ni4xMFwiLFxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMTIuN1wiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNy43LjFcIixcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjogXCJeNy43LjFcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE5XCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOS40LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcXdpa1wiOiBcIl4xLjUuNVwiLFxuICAgIFwibmV0bGlmeS1jbGlcIjogXCJeMTcuMjYuMVwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzhcIixcbiAgICBcInByZXR0aWVyXCI6IFwiXjMuMi41XCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjQuNFwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIjUuNC41XCIsXG4gICAgXCJ1bmRpY2lcIjogXCIqXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjUuMi4xMFwiLFxuICAgIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiOiBcIl40LjIuMVwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBidWlsZGVyLmlvL2Rldi10b29sc1wiOiBcIl4xLjAuMTRcIixcbiAgICBcIkBncnBjL2dycGMtanNcIjogXCJeMS44LjIyXCIsXG4gICAgXCJicmFjZXNcIjogXCJeMy4wLjNcIixcbiAgICBcImRvdGVudlwiOiBcIl4xNi40LjVcIlxuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1XLFNBQVMsMEJBQTBCO0FBQ3RZLFNBQVMsb0JBQW9COzs7QUNHN0IsU0FBUyxvQkFBcUM7QUFDOUMsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxnQkFBZ0I7QUFDekIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUyx1QkFBdUI7OztBQ1JoQztBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsU0FBVztBQUFBLElBQ1QsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLHNCQUFzQjtBQUFBLEVBQ3RCLFNBQVc7QUFBQSxFQUNYLHFCQUF1QjtBQUFBLElBQ3JCO0FBQUEsRUFDRjtBQUFBLEVBQ0Esa0NBQWtDO0FBQUEsRUFDbEMsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLElBQ1QsT0FBUztBQUFBLElBQ1QsZ0JBQWdCO0FBQUEsSUFDaEIsaUJBQWlCO0FBQUEsSUFDakIsZ0JBQWdCO0FBQUEsSUFDaEIsZUFBZTtBQUFBLElBQ2YsUUFBVTtBQUFBLElBQ1YsS0FBTztBQUFBLElBQ1As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
