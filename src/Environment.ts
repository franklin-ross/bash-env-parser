/** A map of variables which can be substituted. */
export type Environment = {
  [envVarName: string]: string | null | undefined;
};
