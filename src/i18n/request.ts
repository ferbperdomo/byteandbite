import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const currentLocale = locale || "en";

  try {
    return {
      locale: currentLocale,
      messages: (
        await import(`../messages/${currentLocale}/${currentLocale}.json`)
      ).default,
    };
  } catch (error) {
    console.error(
      `Failed to load messages for locale: ${currentLocale}`,
      error
    );
    // Fallback to English if the locale fails to load
    return {
      locale: "en",
      messages: (await import(`../messages/en/en.json`)).default,
    };
  }
});
