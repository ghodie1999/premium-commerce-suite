import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type RegionOption = {
  code: string;
  country: string;
  regionLabel: string;
  currency: string;
  symbol: string;
  locale: string;
  rateFromUsd: number;
};

export const REGIONS: RegionOption[] = [
  {
    code: "US",
    country: "United States",
    regionLabel: "North America",
    currency: "USD",
    symbol: "$",
    locale: "en-US",
    rateFromUsd: 1,
  },
  {
    code: "GB",
    country: "United Kingdom",
    regionLabel: "Europe",
    currency: "GBP",
    symbol: "£",
    locale: "en-GB",
    rateFromUsd: 0.79,
  },
  {
    code: "EU",
    country: "European Union",
    regionLabel: "Europe",
    currency: "EUR",
    symbol: "€",
    locale: "en-IE",
    rateFromUsd: 0.92,
  },
  {
    code: "CA",
    country: "Canada",
    regionLabel: "North America",
    currency: "CAD",
    symbol: "CA$",
    locale: "en-CA",
    rateFromUsd: 1.39,
  },
  {
    code: "AU",
    country: "Australia",
    regionLabel: "Asia-Pacific",
    currency: "AUD",
    symbol: "A$",
    locale: "en-AU",
    rateFromUsd: 1.53,
  },
  {
    code: "JP",
    country: "Japan",
    regionLabel: "Asia-Pacific",
    currency: "JPY",
    symbol: "¥",
    locale: "ja-JP",
    rateFromUsd: 153,
  },
  {
    code: "NG",
    country: "Nigeria",
    regionLabel: "Africa",
    currency: "NGN",
    symbol: "₦",
    locale: "en-NG",
    rateFromUsd: 1640,
  },
  {
    code: "AE",
    country: "United Arab Emirates",
    regionLabel: "Middle East",
    currency: "AED",
    symbol: "AED",
    locale: "en-AE",
    rateFromUsd: 3.67,
  },
];

const DEFAULT_REGION = REGIONS[0]!;
const STORAGE_KEY = "shopease_region_v1";

export function detectBrowserRegionCode(): string {
  if (typeof window === "undefined") return "US";

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const locales = [...(navigator.languages || []), navigator.language || ""].map((l) =>
      l.toLowerCase(),
    );

    if (
      tz === "Europe/London" ||
      tz === "Europe/Belfast" ||
      locales.some((l) => l.endsWith("-gb"))
    ) {
      return "GB";
    }
    if (tz === "Asia/Tokyo" || locales.some((l) => l.startsWith("ja"))) {
      return "JP";
    }
    if (tz === "Africa/Lagos" || locales.some((l) => l.endsWith("-ng"))) {
      return "NG";
    }
    if (tz === "Asia/Dubai" || locales.some((l) => l.endsWith("-ae"))) {
      return "AE";
    }
    if (tz.startsWith("Australia/") || locales.some((l) => l.endsWith("-au"))) {
      return "AU";
    }
    if (
      tz.startsWith("America/Toronto") ||
      tz.startsWith("America/Vancouver") ||
      tz.startsWith("America/Montreal") ||
      tz.startsWith("America/Edmonton") ||
      tz.startsWith("America/Winnipeg") ||
      tz.startsWith("America/Halifax") ||
      locales.some((l) => l.endsWith("-ca"))
    ) {
      return "CA";
    }
    if (
      tz.startsWith("Europe/") ||
      locales.some((l) =>
        ["de", "fr", "es", "it", "nl", "pt", "fi", "sv", "da", "el", "ie"].some(
          (prefix) => l === prefix || l.startsWith(`${prefix}-`),
        ),
      )
    ) {
      return "EU";
    }
  } catch {
    return "US";
  }

  return "US";
}

export function formatCurrencyAmount(
  usdValue: number,
  region: RegionOption = DEFAULT_REGION,
): string {
  const converted = usdValue * region.rateFromUsd;
  const zeroDecimals = region.currency === "JPY" || region.currency === "NGN";

  return new Intl.NumberFormat(region.locale, {
    style: "currency",
    currency: region.currency,
    minimumFractionDigits: zeroDecimals ? 0 : 2,
    maximumFractionDigits: zeroDecimals ? 0 : 2,
  }).format(converted);
}

export type RegionApi = {
  region: RegionOption;
  regions: RegionOption[];
  isAuto: boolean;
  setRegionCode: (code: string) => void;
  enableAutoDetect: () => void;
  formatPrice: (usdValue: number) => string;
  convertPrice: (usdValue: number) => number;
};

const REGION_CONTEXT_KEY = Symbol.for("shopease.region.context");
type GlobalWithRegion = typeof globalThis & {
  [REGION_CONTEXT_KEY]?: React.Context<RegionApi | null>;
};

const RegionContext: React.Context<RegionApi | null> = ((globalThis as GlobalWithRegion)[
  REGION_CONTEXT_KEY
] ||= createContext<RegionApi | null>(null));

const defaultRegionApi: RegionApi = {
  region: DEFAULT_REGION,
  regions: REGIONS,
  isAuto: true,
  setRegionCode: () => {},
  enableAutoDetect: () => {},
  formatPrice: (v) => formatCurrencyAmount(v, DEFAULT_REGION),
  convertPrice: (v) => v,
};

export function RegionProvider({ children }: { children: ReactNode }) {
  const [regionCode, setRegionCodeState] = useState<string>("US");
  const [isAuto, setIsAuto] = useState<boolean>(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { mode?: string; code?: string };
        if (
          parsed.mode === "manual" &&
          parsed.code &&
          REGIONS.some((r) => r.code === parsed.code)
        ) {
          setIsAuto(false);
          setRegionCodeState(parsed.code);
          setHydrated(true);
          return;
        }
      }
    } catch {
      // Fallback to auto-detect
    }

    const detected = detectBrowserRegionCode();
    setIsAuto(true);
    setRegionCodeState(detected);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          mode: isAuto ? "auto" : "manual",
          code: regionCode,
        }),
      );
    } catch {
      // Ignore storage errors in restricted environments
    }
  }, [hydrated, isAuto, regionCode]);

  const api = useMemo<RegionApi>(() => {
    const activeRegion = REGIONS.find((r) => r.code === regionCode) ?? DEFAULT_REGION;

    return {
      region: activeRegion,
      regions: REGIONS,
      isAuto,
      setRegionCode: (code: string) => {
        if (REGIONS.some((r) => r.code === code)) {
          setIsAuto(false);
          setRegionCodeState(code);
        }
      },
      enableAutoDetect: () => {
        const detected = detectBrowserRegionCode();
        setIsAuto(true);
        setRegionCodeState(detected);
      },
      formatPrice: (usdValue: number) => formatCurrencyAmount(usdValue, activeRegion),
      convertPrice: (usdValue: number) => usdValue * activeRegion.rateFromUsd,
    };
  }, [regionCode, isAuto]);

  return <RegionContext.Provider value={api}>{children}</RegionContext.Provider>;
}

export function useRegion(): RegionApi {
  const ctx = useContext(RegionContext);
  return ctx ?? defaultRegionApi;
}
