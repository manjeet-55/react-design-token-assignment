import light from "./theme/light.json";
import dark from "./theme/dark.json";
import alias from "./alias.json";
import core from "./core.json";
import web from "./Web.json";

const tokenSources = { alias, core, light, dark, web };

/**
 * Resolves token references recursively
 * Example: "{neutral.0}" → "{grey.light.0}" → "#ffffff"
 */
export function resolveReference(
  refPath: string,
  visited = new Set<string>(),
): any {
  if (visited.has(refPath)) {
    console.warn(`Circular reference: ${refPath}`);
    return undefined;
  }
  visited.add(refPath);

  const parts = refPath.split(".");
  // Try each source
  for (const source of Object.values(tokenSources)) {
    let current: any = source;
    let found = true;

    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        found = false;
        break;
      }
    }

    if (found && current) {
      const value = current.$value ?? current;
      // If it's a reference, resolve it
      if (
        typeof value === "string" &&
        value.startsWith("{") &&
        value.endsWith("}")
      ) {
        return resolveReference(value.slice(1, -1), visited);
      }
      return value;
    }
  }

  return undefined;
}

/**
 * Gets resolved value from a token object
 */
export function getResolvedValue(token: any): any {
  if (!token) return undefined;
  const value = token.$value ?? token;
  if (
    typeof value === "string" &&
    value.startsWith("{") &&
    value.endsWith("}")
  ) {
    return resolveReference(value.slice(1, -1));
  }

  // Handle shadow tokens (array of objects)
  if (Array.isArray(value)) {
    const resolvedArray = value.map((item) => getResolvedValue(item));
    if (resolvedArray.length > 0 && isShadowToken(resolvedArray[0])) {
      return resolvedArray.map(shadowToString).join(", ");
    }
    return resolvedArray;
  }

  // Handle nested objects (like border configs)
  if (typeof value === "object" && value !== null) {
    const resolved: any = {};
    for (const [key, val] of Object.entries(value)) {
      if (typeof val === "string" && val.startsWith("{") && val.endsWith("}")) {
        resolved[key] = resolveReference(val.slice(1, -1));
      } else {
        resolved[key] = val;
      }
    }
    return resolved;
  }
  return value;
}

function isShadowToken(item: any): boolean {
  return (
    typeof item === "object" &&
    item !== null &&
    "x" in item &&
    "y" in item &&
    "blur" in item &&
    "spread" in item &&
    "color" in item
  );
}

function shadowToString(item: any): string {
  const { x, y, blur, spread, color, type } = item;
  const inset = type === "innerShadow" ? "inset " : "";
  return `${inset}${x}px ${y}px ${blur}px ${spread}px ${color}`;
}
