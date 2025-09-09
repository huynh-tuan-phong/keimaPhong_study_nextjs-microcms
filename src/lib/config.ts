function getEnvVar(name: string, fallbacks: string[] = []): string {
  const keys = [name, ...fallbacks];
  for (const key of keys) {
    const val = process.env[key];
    if (val) {
      if (key !== name) {
        console.warn(`Using fallback env var ${key} for ${name}. Consider renaming to ${name}.`);
      }
      return val;
    }
  }
  throw new Error(
    `Environment variable ${name} is not defined. ` +
      `Add it to .env.local (see .env.example). Also supports fallbacks: ${fallbacks.join(", ")}`
  );
}

// Server-only envs for microCMS access (used in route handlers only)
export const MICROCMS_BASE_URL = getEnvVar("MICROCMS_BASE_URL", ["NEXT_PUBLIC_API_BASE_URL"]);
export const MICROCMS_API_KEY = getEnvVar("MICROCMS_API_KEY", ["NEXT_PUBLIC_MICROCMS_API_KEY"]);
