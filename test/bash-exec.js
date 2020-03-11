const { spawnSync } = require("child_process");
const { join, dirname } = require("path");
const { mkdirSync, writeFileSync, readFileSync } = require("fs");

// I've added caching because it's starting to become quite slow to start hundreds of bash shells
// for the tests. The results should be idempotent, so it's faster to load them all from file. Any
// results which aren't available are still run and then added to the cache.
const cachePath = join(__dirname, ".bash-cache.json");
let cache = {};

const loadCache = () => {
  try {
    const cached = readFileSync(cachePath, "utf8");
    cache = JSON.parse(cached);
  } catch (err) {
    cache = {};
  }
};

const saveCache = () => {
  const dirName = dirname(cachePath);
  mkdirSync(dirName, { recursive: true });
  const out = JSON.stringify(cache, null, 2);
  writeFileSync(cachePath, out, { encoding: "utf8" });
};

/** Runs `bash -c command` and returns the result. Throws stderr if that is not empty. */
module.exports = {
  loadCache,
  saveCache,
  get: (command, env, useCache = true) => {
    const cached = useCache && cache[command];
    if (cached) return cached;

    // Use spawn so we can use bash on Windows without "/d /s /c" arguments on Node 10.
    const { stdout, stderr } = spawnSync("bash", ["-c", command], {
      timeout: 5000,
      encoding: "utf8",
      env,
      windowsHide: true
    });
    if (stderr != "") {
      throw new Error(stderr);
    }
    const result = stdout.replace(/[\r\n]+$/, ""); // Can have trailing newlines we don't want
    if (useCache) {
      cache[command] = result;
    }

    return result;
  }
};
