export function getDatabaseLogContext() {
  return {
    databaseUrlConfigured: Boolean(process.env.DATABASE_URL),
  };
}

export function getSafeErrorDetails(error: unknown) {
  if (error instanceof Error) {
    const details: Record<string, unknown> = {
      name: error.name,
      message: error.message,
    };

    const maybeCode = (error as { code?: unknown }).code;

    if (maybeCode) details.code = maybeCode;

    return details;
  }

  return { message: "Unknown database error" };
}