import spawn from "cross-spawn";
import { normalize } from "path";
import { substitute, parse, toShellArgs } from ".";
import { Environment } from "./Environment";
import { stringify } from "./transforms";

interface Options {
  shell?: import("child_process").SpawnOptions["shell"];
  isWindows?: boolean;
}

export function crossEnv(args: string | string[], options: Options = {}) {
  const env = getEnv();
  const parsedArgs = Array.isArray(args)
    ? parseArgs(args, env)
    : parseString(args, env);

  const command = parsedArgs[0];
  const commandArgs = parsedArgs.slice(1);

  if (command) {
    const proc = spawn(
      // run `path.normalize` for command(on windows)
      options.isWindows || isWindows() ? normalize(command) : command,
      commandArgs,
      {
        stdio: "inherit",
        shell: options.shell,
        env
      }
    );
    process.on("SIGTERM", () => proc.kill("SIGTERM"));
    process.on("SIGINT", () => proc.kill("SIGINT"));
    process.on("SIGBREAK", () => proc.kill("SIGBREAK"));
    process.on("SIGHUP", () => proc.kill("SIGHUP"));
    proc.on("exit", (code, signal) => {
      let crossEnvExitCode = code;
      // exit code could be null when OS kills the process(out of memory, etc) or due to node
      // handling it but if the signal is SIGINT the user exited the process so we want exit code 0
      if (crossEnvExitCode === null) {
        crossEnvExitCode = signal === "SIGINT" ? 0 : 1;
      }
      process.exit(crossEnvExitCode);
    });
    return proc;
  }
  return null;
}

function parseString(shellString: string, env: Environment) {
  const parsed = parse(shellString);
  const substituted = substitute(parsed, env, true);
  return toShellArgs(substituted);
}

function parseArgs(shellArgs: readonly string[], env: Environment) {
  return shellArgs.map(arg => {
    const parsed = parse(arg);
    const substituted = substitute(parsed, env, true);
    return stringify(substituted);
  });
}

function getEnv() {
  const env = { ...process.env };
  if (process.env.APPDATA) {
    // Not sure why this is necessary. It's from the cross-env source.
    env.APPDATA = process.env.APPDATA;
  }
  return env;
}

function isWindows() {
  return (
    process.platform === "win32" ||
    (process.env.OSTYPE && /^(msys|cygwin)$/.test(process.env.OSTYPE))
  );
}
