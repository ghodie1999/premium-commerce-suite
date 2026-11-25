import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Check,
  Copy,
  Layers,
  Monitor,
  Plus,
  RotateCcw,
  Search,
  Smartphone,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import {
  PREMIUM_CATEGORIES,
  PREMIUM_SECTION_REGISTRY,
  type CategoryCode,
  type PremiumSectionDefinition,
} from "@/components/store/premium/registry";
import type {
  SectionAlignment,
  SectionSpacing,
  SectionSurface,
} from "@/components/store/premium/shared";

type SectionsSearch = {
  section?: number;
  mode?: "inspector" | "combination";
  embed?: string;
  stack?: string;
  surface?: SectionSurface | "auto";
  spacing?: SectionSpacing | "auto";
  align?: SectionAlignment | "auto";
  heading?: string;
  subheading?: string;
};

export const Route = createFileRoute("/sections")({
  validateSearch: (search: Record<string, unknown>): SectionsSearch => ({
    section:
      typeof search.section === "number"
        ? search.section
        : typeof search.section === "string" && /^\d+$/.test(search.section)
          ? Number(search.section)
          : undefined,
    mode: search.mode === "combination" ? "combination" : undefined,
    embed: search.embed === "1" || search.embed === true ? "1" : undefined,
    stack: typeof search.stack === "string" ? search.stack : undefined,
    surface:
      search.surface === "default" ||
      search.surface === "white" ||
      search.surface === "sand" ||
      search.surface === "primary"
        ? search.surface
        : undefined,
    spacing:
      search.spacing === "compact" || search.spacing === "normal" || search.spacing === "spacious"
        ? search.spacing
        : undefined,
    align:
      search.align === "left" || search.align === "center" || search.align === "right"
        ? search.align
        : undefined,
    heading: typeof search.heading === "string" ? search.heading : undefined,
    subheading: typeof search.subheading === "string" ? search.subheading : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Section Library Showcase (105 Sections) — ShopEase" },
      {
        name: "description",
        content:
          "Browse, customise, and combine all 105 independent premium ecommerce sections across Categories A–J.",
      },
    ],
  }),
  component: SectionShowcasePage,
});

function SectionShowcasePage() {
  const search = Route.useSearch();
  const isEmbed = search.embed === "1";

  const [selectedCategory, setSelectedCategory] = useState<"ALL" | CategoryCode>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeId, setActiveId] = useState<number>(search.section ?? 1);
  const [mode, setMode] = useState<"inspector" | "combination">(
    search.mode === "combination" ? "combination" : "inspector",
  );
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");
  const [stackIds, setStackIds] = useState<number[]>(() => {
    if (search.stack) {
      const parsed = search.stack
        .split(",")
        .map((n) => Number(n.trim()))
        .filter((n) => Number.isFinite(n) && n >= 1 && n <= 105);
      if (parsed.length > 0) return parsed;
    }
    return [1, 13, 25, 39, 51, 88];
  });

  // Live Customiser overrides (optional; undefined falls back to section defaults)
  const [surfaceOverride, setSurfaceOverride] = useState<SectionSurface | "auto">(
    search.surface ?? "auto",
  );
  const [spacingOverride, setSpacingOverride] = useState<SectionSpacing | "auto">(
    search.spacing ?? "auto",
  );
  const [alignOverride, setAlignOverride] = useState<SectionAlignment | "auto">(
    search.align ?? "auto",
  );
  const [headingOverride, setHeadingOverride] = useState(search.heading ?? "");
  const [subheadingOverride, setSubheadingOverride] = useState(search.subheading ?? "");
  const [copiedImport, setCopiedImport] = useState(false);

  const filteredSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PREMIUM_SECTION_REGISTRY.filter((sec) => {
      if (selectedCategory !== "ALL" && sec.category !== selectedCategory) return false;
      if (!q) return true;
      const paddedId = String(sec.id).padStart(3, "0");
      const catMeta = PREMIUM_CATEGORIES.find((c) => c.code === sec.category);
      return (
        sec.name.toLowerCase().includes(q) ||
        sec.description.toLowerCase().includes(q) ||
        String(sec.id) === q ||
        paddedId.includes(q) ||
        sec.slug.includes(q) ||
        sec.category.toLowerCase() === q ||
        (catMeta?.title.toLowerCase().includes(q) ?? false)
      );
    });
  }, [selectedCategory, searchQuery]);

  const activeSection: PremiumSectionDefinition =
    PREMIUM_SECTION_REGISTRY.find((s) => s.id === activeId) ?? PREMIUM_SECTION_REGISTRY[0]!;

  const customProps = useMemo(
    () => ({
      ...(surfaceOverride !== "auto" ? { surface: surfaceOverride } : {}),
      ...(spacingOverride !== "auto" ? { spacing: spacingOverride } : {}),
      ...(alignOverride !== "auto" ? { align: alignOverride } : {}),
      ...(headingOverride.trim() ? { heading: headingOverride.trim() } : {}),
      ...(subheadingOverride.trim() ? { subheading: subheadingOverride.trim() } : {}),
    }),
    [surfaceOverride, spacingOverride, alignOverride, headingOverride, subheadingOverride],
  );

  const stackSections = useMemo(
    () =>
      stackIds
        .map((id) => PREMIUM_SECTION_REGISTRY.find((s) => s.id === id))
        .filter((s): s is PremiumSectionDefinition => Boolean(s)),
    [stackIds],
  );

  const embedUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.set("embed", "1");
    params.set("mode", mode);
    if (mode === "inspector") {
      params.set("section", String(activeSection.id));
      if (surfaceOverride !== "auto") params.set("surface", surfaceOverride);
      if (spacingOverride !== "auto") params.set("spacing", spacingOverride);
      if (alignOverride !== "auto") params.set("align", alignOverride);
      if (headingOverride.trim()) params.set("heading", headingOverride.trim());
      if (subheadingOverride.trim()) params.set("subheading", subheadingOverride.trim());
    } else {
      params.set("stack", stackIds.join(","));
    }
    return `/sections?${params.toString()}`;
  }, [
    mode,
    activeSection.id,
    surfaceOverride,
    spacingOverride,
    alignOverride,
    headingOverride,
    subheadingOverride,
    stackIds,
  ]);

  if (isEmbed) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        {mode === "inspector" ? (
          activeSection.render(customProps)
        ) : (
          <div>
            {stackSections.map((sec) => (
              <div key={sec.id} className="border-b border-border/50 last:border-b-0">
                {sec.render({})}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const toggleStack = (id: number) => {
    setStackIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const moveStack = (index: number, delta: -1 | 1) => {
    const target = index + delta;
    if (target < 0 || target >= stackIds.length) return;
    setStackIds((prev) => {
      const next = [...prev];
      const [moved] = next.splice(index, 1);
      if (moved !== undefined) next.splice(target, 0, moved);
      return next;
    });
  };

  const resetCustomiser = () => {
    setSurfaceOverride("auto");
    setSpacingOverride("auto");
    setAlignOverride("auto");
    setHeadingOverride("");
    setSubheadingOverride("");
  };

  const copyImportLine = async () => {
    const symbol = activeSection.importPath.split("/").pop() ?? "Section";
    const snippet = `import { ${symbol} } from "${activeSection.importPath}";`;
    try {
      await navigator.clipboard.writeText(snippet);
    } catch {
      // Clipboard fallback ignored cleanly
    }
    setCopiedImport(true);
    window.setTimeout(() => setCopiedImport(false), 1600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Showcase Toolbar */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="size-3.5" /> Back to Storefront
            </Link>
            <div className="hidden h-5 w-px bg-border sm:block" aria-hidden="true" />
            <div>
              <p className="font-display text-sm font-extrabold tracking-tight text-primary">
                ShopEase Section Library
              </p>
              <p className="text-[11px] text-muted-foreground tabular-nums">
                105 independent sections · Categories A–J
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Mode Switcher */}
            <div
              className="inline-flex rounded-full border border-border bg-background p-1"
              role="group"
              aria-label="Preview mode"
            >
              <button
                type="button"
                onClick={() => setMode("inspector")}
                aria-pressed={mode === "inspector"}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  mode === "inspector"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <SlidersHorizontal className="size-3.5" /> Inspector
              </button>
              <button
                type="button"
                onClick={() => setMode("combination")}
                aria-pressed={mode === "combination"}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors tabular-nums ${
                  mode === "combination"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="size-3.5" /> Combination ({stackIds.length})
              </button>
            </div>

            {/* Viewport Toggle */}
            <div
              className="inline-flex rounded-full border border-border bg-background p-1"
              role="group"
              aria-label="Viewport width"
            >
              <button
                type="button"
                onClick={() => setViewport("desktop")}
                aria-pressed={viewport === "desktop"}
                aria-label="Desktop preview"
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  viewport === "desktop"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Monitor className="size-3.5" /> Desktop
              </button>
              <button
                type="button"
                onClick={() => setViewport("mobile")}
                aria-pressed={viewport === "mobile"}
                aria-label="Mobile preview"
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  viewport === "mobile"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone className="size-3.5" /> Mobile (390px)
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-12">
        {/* Left Catalog Directory Sidebar */}
        <aside className="border-b border-border bg-card lg:col-span-3 lg:min-h-[calc(100vh-57px)] lg:border-r lg:border-b-0">
          <div className="p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter 105 sections or #ID..."
                aria-label="Filter sections"
                className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-xs focus:border-primary focus:outline-none"
              />
            </div>

            {/* Category Chips */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCategory("ALL")}
                aria-pressed={selectedCategory === "ALL"}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors tabular-nums ${
                  selectedCategory === "ALL"
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground hover:border-primary/40"
                }`}
              >
                All ({PREMIUM_SECTION_REGISTRY.length})
              </button>
              {PREMIUM_CATEGORIES.map((cat) => {
                const count = PREMIUM_SECTION_REGISTRY.filter(
                  (s) => s.category === cat.code,
                ).length;
                const active = selectedCategory === cat.code;
                return (
                  <button
                    key={cat.code}
                    type="button"
                    onClick={() => setSelectedCategory(cat.code)}
                    aria-pressed={active}
                    title={cat.title}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors tabular-nums ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-background text-foreground hover:border-primary/40"
                    }`}
                  >
                    {cat.code} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto border-t border-border divide-y divide-border/60 lg:max-h-[calc(100vh-205px)]">
            {filteredSections.length === 0 ? (
              <p className="p-5 text-xs text-muted-foreground">
                No sections match "{searchQuery}".
              </p>
            ) : (
              filteredSections.map((sec) => {
                const isSelected = sec.id === activeSection.id && mode === "inspector";
                const inStack = stackIds.includes(sec.id);
                return (
                  <div
                    key={sec.id}
                    className={`flex items-center justify-between gap-2 px-4 py-2.5 transition-colors ${
                      isSelected ? "bg-primary/8" : "hover:bg-background"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActiveId(sec.id);
                        setMode("inspector");
                      }}
                      className="min-w-0 flex-1 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-accent tabular-nums">
                          {sec.category}·{String(sec.id).padStart(3, "0")}
                        </span>
                        <span className="truncate text-xs font-semibold text-foreground">
                          {sec.name}
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleStack(sec.id)}
                      aria-label={
                        inStack
                          ? `Remove ${sec.name} from combination stack`
                          : `Add ${sec.name} to combination stack`
                      }
                      title={inStack ? "In Combination Stack" : "Add to Combination Stack"}
                      className={`grid size-6 shrink-0 place-items-center rounded-md border text-[11px] transition-colors ${
                        inStack
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {inStack ? <Check className="size-3" /> : <Plus className="size-3" />}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* Right Live Preview & Customiser */}
        <main className="bg-sand/30 p-4 sm:p-6 lg:col-span-9">
          {mode === "inspector" ? (
            <>
              {/* Metadata & Customiser Card */}
              <div className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-accent tabular-nums">
                        Category {activeSection.category} · Section #
                        {String(activeSection.id).padStart(3, "0")}
                      </span>
                      <span className="text-muted-foreground">&middot;</span>
                      <span className="font-medium text-muted-foreground">
                        {PREMIUM_CATEGORIES.find((c) => c.code === activeSection.category)?.title}
                      </span>
                    </div>
                    <h1 className="mt-1 font-display text-xl font-extrabold text-foreground sm:text-2xl">
                      {activeSection.name}
                    </h1>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {activeSection.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={copyImportLine}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs font-semibold text-foreground hover:border-primary"
                    >
                      {copiedImport ? (
                        <Check className="size-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                      {copiedImport ? "Copied Import" : "Copy Import"}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleStack(activeSection.id)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      {stackIds.includes(activeSection.id) ? (
                        <>
                          <Check className="size-3.5" /> In Combination
                        </>
                      ) : (
                        <>
                          <Plus className="size-3.5" /> Add to Stack
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Live Section Props Controls */}
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                  <div>
                    <label
                      htmlFor="prop-surface"
                      className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Surface Token
                    </label>
                    <select
                      id="prop-surface"
                      value={surfaceOverride}
                      onChange={(e) =>
                        setSurfaceOverride(e.target.value as SectionSurface | "auto")
                      }
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium"
                    >
                      <option value="auto">Section Default</option>
                      <option value="default">Off-White (#FAFAFA)</option>
                      <option value="white">Pure White (#FFFFFF)</option>
                      <option value="sand">Secondary Tint (#F5F5F5)</option>
                      <option value="primary">Forest Green (#0F2D22)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="prop-spacing"
                      className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Vertical Rhythm
                    </label>
                    <select
                      id="prop-spacing"
                      value={spacingOverride}
                      onChange={(e) =>
                        setSpacingOverride(e.target.value as SectionSpacing | "auto")
                      }
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs font-medium"
                    >
                      <option value="auto">Section Default</option>
                      <option value="compact">Compact</option>
                      <option value="normal">Normal</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="prop-subheading"
                      className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Subheading Override
                    </label>
                    <input
                      id="prop-subheading"
                      value={subheadingOverride}
                      onChange={(e) => setSubheadingOverride(e.target.value)}
                      placeholder="Optional eyebrow..."
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="prop-heading"
                      className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                    >
                      Heading Override
                    </label>
                    <input
                      id="prop-heading"
                      value={headingOverride}
                      onChange={(e) => setHeadingOverride(e.target.value)}
                      placeholder="Optional heading..."
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs"
                    />
                  </div>

                  <div className="flex items-end justify-between gap-2">
                    <div className="flex-1">
                      <label
                        htmlFor="prop-align"
                        className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                      >
                        Align
                      </label>
                      <select
                        id="prop-align"
                        value={alignOverride}
                        onChange={(e) =>
                          setAlignOverride(e.target.value as SectionAlignment | "auto")
                        }
                        className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs font-medium"
                      >
                        <option value="auto">Default</option>
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={resetCustomiser}
                      aria-label="Reset prop overrides"
                      title="Reset prop overrides"
                      className="grid size-8 place-items-center rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground"
                    >
                      <RotateCcw className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Isolated Live Frame */}
              {viewport === "mobile" ? (
                <div className="mx-auto w-[390px] max-w-full overflow-hidden rounded-3xl border border-border bg-background shadow-soft">
                  <iframe
                    key={embedUrl}
                    title={`Mobile preview: ${activeSection.name}`}
                    src={embedUrl}
                    className="block h-[760px] w-full border-0 bg-background"
                  />
                </div>
              ) : (
                <div className="w-full overflow-hidden rounded-3xl border border-border bg-background shadow-soft">
                  {activeSection.render(customProps)}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Combination Builder Panel */}
              <div className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h1 className="font-display text-lg font-extrabold text-foreground">
                      Section Combination Canvas ({stackSections.length} sections)
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      Test vertical spacing and surface alternation before placing components into a
                      storefront template.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStackIds([])}
                    className="rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
                  >
                    Clear Stack
                  </button>
                </div>

                {stackSections.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {stackSections.map((sec, idx) => (
                      <div
                        key={sec.id}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-background px-2.5 py-1.5 text-xs"
                      >
                        <span className="font-mono text-[10px] font-bold text-accent tabular-nums">
                          #{sec.id}
                        </span>
                        <span className="font-semibold text-foreground">{sec.name}</span>
                        <button
                          type="button"
                          onClick={() => moveStack(idx, -1)}
                          disabled={idx === 0}
                          aria-label={`Move ${sec.name} up`}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                        >
                          <ArrowUp className="size-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveStack(idx, 1)}
                          disabled={idx === stackSections.length - 1}
                          aria-label={`Move ${sec.name} down`}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-30"
                        >
                          <ArrowDown className="size-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleStack(sec.id)}
                          aria-label={`Remove ${sec.name}`}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {stackSections.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
                  <p className="font-display text-base font-bold text-foreground">
                    Your Combination Canvas Is Empty
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Click the + icon beside any section in the left directory to stack sections
                    here.
                  </p>
                </div>
              ) : viewport === "mobile" ? (
                <div className="mx-auto w-[390px] max-w-full overflow-hidden rounded-3xl border border-border bg-background shadow-soft">
                  <iframe
                    key={embedUrl}
                    title="Mobile combination preview"
                    src={embedUrl}
                    className="block h-[760px] w-full border-0 bg-background"
                  />
                </div>
              ) : (
                <div className="w-full overflow-hidden rounded-3xl border border-border bg-background shadow-soft">
                  {stackSections.map((sec) => (
                    <div key={sec.id} className="border-b border-border/50 last:border-b-0">
                      {sec.render({})}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
