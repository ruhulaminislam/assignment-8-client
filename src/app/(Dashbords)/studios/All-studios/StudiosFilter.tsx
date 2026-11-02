"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { StudioCard } from "@/components/StudioCard/studio-card";
import { TStudio } from "@/lib/studios";
import { useRouter, useSearchParams } from "next/navigation";

/* Category options shown as browse-by-category buttons. */
const categories = [
  "All",
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

/* Sort options shown in the compact sorting dropdown. */
const sortOptions = [
  { value: "", label: "Default Sorting" },
  { value: "low", label: "Price: Low to High" },
  { value: "high", label: "Price: High to Low" },
];

/**
 * Explore Studios page — search, browse by category, sort, and responsive card grid.
 * Frontend only. All filtering and sorting happen client-side.
 */
export default function StudiosFilter({
  allStudios,
  initialCategory,
}: {
  allStudios: TStudio[];
  initialCategory: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory || "All");
  const [sort, setSort] = useState("");

  // --- Filtering (re-runs on every render) ---
  const filteredStudios = allStudios.filter((studio) => {
    const query = search.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      studio.title.toLowerCase().includes(query) ||
      studio.location.toLowerCase().includes(query);

    const matchesCategory = category === "All" || studio.category === category;

    return matchesSearch && matchesCategory;
  });

  // --- Sorting (re-runs on every render) ---
  const sortedStudios = [...filteredStudios];

  if (sort === "low") {
    sortedStudios.sort((a, b) => Number(a.rate) - Number(b.rate));
  } else if (sort === "high") {
    sortedStudios.sort((a, b) => Number(b.rate) - Number(a.rate));
  }

  const resultCount = sortedStudios.length;

  const handleCategoryClick = (value: string) => {
    setCategory(value);

    const params = new URLSearchParams(searchParams.toString());

    if (value === "All") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    const query = params.toString();

    router.push(
      query ? `/studios/All-studios?${query}` : "/studios/All-studios"
    );
  };

  const handleSortChange = (value: string | null) => {
    if (value === null) return;
    setSort(value);

  };
  const clearFilters = () => {
  setSearch("");
  setCategory("All");
  setSort("");

  router.push("/studios/All-studios");
};

  return (
    <section
      className="min-h-screen bg-canvas py-10"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ---------- Full-width search bar ---------- */}
        <div className="mx-auto mb-10 w-full max-w-3xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search studios by name or location..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-12 w-full pl-12 pr-8 text-sm rounded-xl border border-border bg-card focus:border-[#6D4AFF]/60 focus:outline-offset-2 focus:ring-2 focus:ring-[#6D4AFF]/30 transition-colors"
            />
          </div>
        </div>

        {/* ---------- Browse by category ---------- */}
        <div className="mt-2 mb-2">
          <h2 className="text-3xl font-semibold text-foreground tracking-tight">
            Browse by Category
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => {
              const isActive = category === cat;
              return (
                <Button
                  key={cat}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => handleCategoryClick(cat)}
                  className={cn(
                    "h-9 rounded-lg px-4 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-[#6D4AFF] text-white shadow-[0_4px_14px_rgba(109,74,255,0.35)] hover:bg-[#5A3BD9]"
                      : "border-border bg-card text-muted-foreground hover:border-[#6D4AFF]/40 hover:text-brand-text hover:shadow-sm"
                  )}
                >
                  {cat}
                </Button>
              );
            })}
          </div>
        </div>

        {/* ---------- Available Studios heading + sorting dropdown ---------- */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Available Studios
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {resultCount} studio{resultCount === 1 ? "" : "s"} found
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden text-xs font-medium text-muted-foreground sm:inline">
              Sort by
            </span>
            <Filter className="size-4 text-muted-foreground" />
            <Select value={sort} onValueChange={handleSortChange}>
              <SelectTrigger className="h-9 w-40 rounded-lg border border-border bg-card text-sm shadow-none hover:bg-[#6D4AFF]/5 transition-colors">
                <SelectValue placeholder="Default Sorting" />
              </SelectTrigger>
              <SelectContent className="rounded-lg">
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ---------- Studio cards grid ---------- */}
        <div className="mt-6">
          {sortedStudios.length === 0 ? (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-[#6D4AFF]/10">
      <Search className="size-8 text-brand-text" />
    </div>

    <h3 className="text-lg font-semibold">
      No Studios Found
    </h3>

    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
      We couldn't find any studios matching your search.
      Try changing your search or filters.
    </p>

    <Button
      onClick={clearFilters}
      className="mt-5 rounded-lg bg-[#6D4AFF] text-white hover:bg-[#5A3BD9]"
    >
      Clear Filters
    </Button>
  </div>
) : (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {sortedStudios.map((studio) => (
      <StudioCard key={studio?._id} studio={studio} />
    ))}
  </div>
)}
        </div>
      </div>
    </section>
  );
}