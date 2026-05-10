export function reportError(scope, error, context = {}) {
  const payload = { scope, message: error?.message || String(error), context };
  console.error(`[${scope}]`, payload, error);
}

export async function safeAsync(scope, fn, fallback = null, context = {}) {
  try {
    return await fn();
  } catch (error) {
    reportError(scope, error, context);
    return fallback;
  }
}

export function assertFunction(value, label) {
  return typeof value === 'function' ? value : null;
}
