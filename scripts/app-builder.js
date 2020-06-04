let __defineProperty = Object.defineProperty;
let __hasOwnProperty = Object.prototype.hasOwnProperty;
let __toModule = (module) => {
  if (module && module.__esModule)
    return module;
  let result = {};
  __defineProperty(result, "default", {
    value: module,
    enumerable: true
  });
  for (let key in module)
    if (__hasOwnProperty.call(module, key) && key !== "default")
      __defineProperty(result, key, {
        get: () => module[key],
        enumerable: true
      });
  return result;
};

// configs/esbuild.config.ts
const dev = {
  entryPoints: ["main/main.ts", "main/preload.ts"],
  outdir: "build/",
  minify: false,
  bundle: true,
  external: ["electron", "path", "fs"]
};
const spectron = {
  entryPoints: ["tests/spectron/spec.ts"],
  outdir: "tests/spectron",
  minify: false,
  bundle: true,
  external: ["path", "spectron", "assert"]
};
const dist = {
  entryPoints: ["main/main.ts", "main/preload.ts"],
  outdir: "build/",
  minify: true,
  bundle: true,
  external: ["electron", "path", "fs"]
};
const esbuild_config_default = {
  dev,
  spectron,
  dist
};

// configs/vite.config.ts
const buildConfig = {
  root: "renderer",
  outDir: "build/renderer",
  base: "."
};
const serverConfig = {
  root: "renderer",
  optimizeDeps: {
    auto: false
  },
  port: 3000,
  env: {
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
    APP_ENV: process.env.NODE_ENV || "development"
  }
};
const buildConfigVtu = {
  root: "tests/vtu",
  outDir: "tests/vtu/build",
  assetsDir: ".",
  emitIndex: false,
  emitAssets: false,
  rollupInputOptions: {
    input: "tests/vtu/Navbar.spec.ts",
    external: ["assert", "path", "fs", "util", "stream", "os", "constants", "tty", "module"]
  },
  rollupOutputOptions: {
    format: "cjs"
  }
};
const vite_config_default = {
  buildConfig,
  serverConfig,
  buildConfigVtu
};

// configs/electron-builder.ts
const conf = {
  productName: "TinyEvt",
  electronVersion: "9.0.0",
  compression: "store",
  files: ["package.json", {
    from: "build",
    to: "build",
    filter: ["!dev-runner.js", "!app-builder.js"]
  }, {
    from: "main/resources",
    to: "resources",
    filter: ["**/*"]
  }],
  dmg: {
    contents: [{
      x: 410,
      y: 150,
      type: "link",
      path: "/Applications"
    }, {
      x: 130,
      y: 150,
      type: "file"
    }]
  },
  mac: {
    category: "public.app-category.developer-tools",
    target: "dmg",
    type: "distribution",
    icon: "main/resources/icons/icon.icns",
    publish: ["github"]
  }
};
const electron_builder_default = conf;

// scripts/app-builder.ts
const vite = __toModule(require("vite"));
const esbuild = __toModule(require("esbuild"));
const electron_builder = __toModule(require("electron-builder"));
function packMain() {
  return esbuild.build(esbuild_config_default.dist).then((result) => {
    console.log(result.stderr);
  }).catch((err) => {
    console.log(`
failed to build main process`);
    console.error(`
${err}
`);
    process.exit(1);
  });
}
function packRenderer() {
  return vite.build(vite_config_default.buildConfig).catch((err) => {
    console.log(`
failed to build renderer process`);
    console.error(`
${err}
`);
    process.exit(1);
  });
}
const buildStart = Date.now();
Promise.all([packMain(), packRenderer()]).then((result) => {
  electron_builder.build({
    targets: electron_builder.Platform.current().createTarget(),
    config: electron_builder_default
  }).then(() => {
    console.log("\nBuild completed in", Math.floor((Date.now() - buildStart) / 1000) + " s.");
  }).catch((e) => {
    console.error(e);
  });
}).catch((e) => console.log(e));
