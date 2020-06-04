const { execSync } = require("child_process")
const run = (cmd, cwd) => execSync(cmd, { encoding: "utf8", stdio: "inherit", cwd })
run('esbuild --platform=node --bundle --external:vite --external:esbuild --external:electron-builder scripts/app-builder.ts --outfile=build/app-builder.js', '.')