
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Aperture,
  ImagePlus,
  X,
  Check,
  MapPin,
  DollarSign,
  Users,
  Tag,
  Wifi,
  Snowflake,
  Car,
  Lightbulb,
  VolumeX,
  Projector,
  LayoutDashboard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

const amenities = [
  { label: "Wi-Fi", icon: Wifi },
  { label: "Air Conditioning", icon: Snowflake },
  { label: "Parking", icon: Car },
  { label: "Lighting Equipment", icon: Lightbulb },
  { label: "Soundproof Room", icon: VolumeX },
  { label: "Projector", icon: Projector },
];

function SectionHeading({
  icon: Icon,
  title,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-border pb-3">
      <Icon className="size-4 text-[#6D4AFF]" />
      <h2 className="text-sm font-semibold tracking-wide text-foreground uppercase">
        {title}
      </h2>
    </div>
  );
}

export default function AddStudioPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [category, setCategory] = useState<string>("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const toggleAmenity = (label: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch("http://localhost:5000/upload-image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log(data);
    setImageUrl(data.imageUrl);
    setImagePreview(data.imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const Data = Object.fromEntries(formData.entries());

    const { image, imageUrl: formImageUrl, ...studioData } = Data;

    const response = await fetch("http://localhost:5000/add-studios", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        ...studioData,
        category,
        amenities: selectedAmenities,
        imageUrl,
        username: user?.name,
        useremail: user?.email,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <main
      className="flex-1 px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#F8F7FC" }}
    >
      <div className="mx-auto w-full max-w-4xl">
        {/* Page heading */}
        <div className="flex flex-col items-start gap-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-[#6D4AFF] shadow-[0_6px_18px_rgba(109,74,255,0.35)]">
            <Aperture className="size-6 text-white" />
          </span>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Add New Studio
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              List your creative space on StudioSpace. Fill in the details
              below and start reaching creators looking for the perfect place to
              work.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(19,12,51,0.06)] ring-1 ring-border sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Studio Details */}
            <section className="space-y-5">
              <SectionHeading icon={LayoutDashboard} title="Studio Details" />

              <div className="space-y-2">
                <Label htmlFor="title">Studio Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. downtown-photography-studio"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value ?? "")}
                >
                  <SelectTrigger id="category" className="h-10 w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="rate">Hourly Rate ($)</Label>
                  <div className="relative">
                    <DollarSign className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="rate"
                      name="rate"
                      type="number"
                      min={0}
                      placeholder="45"
                      className="h-10 pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deposit">Security Deposit ($)</Label>
                  <div className="relative">
                    <DollarSign className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="deposit"
                      name="deposit"
                      type="number"
                      min={0}
                      placeholder="200"
                      className="h-10 pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Max Capacity</Label>
                  <div className="relative">
                    <Users className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="capacity"
                      name="capacity"
                      type="number"
                      min={1}
                      placeholder="12"
                      className="h-10 pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location / Address</Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      placeholder="123 creative Ave, Brooklyn, NY"
                      className="h-10 pl-9"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Studio Image */}
            <section className="space-y-5">
              <SectionHeading icon={ImagePlus} title="Studio Image" />

              {imagePreview ? (
                <div className="relative overflow-hidden rounded-xl ring-1 ring-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Studio preview"
                    className="h-56 w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview("");
                      setImageUrl("");
                    }}
                    aria-label="Remove image"
                    className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-[#6D4AFF]"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image-file"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#6D4AFF]/30 bg-[#6D4AFF]/5 px-6 py-10 text-center transition-colors hover:border-[#6D4AFF]/60 hover:bg-[#6D4AFF]/10"
                >
                  <ImagePlus className="size-8 text-[#6D4AFF]" />
                  <span className="text-sm font-medium text-foreground">
                    Upload studio image
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Click to browse or paste a link below
                  </span>
                  <input
                    id="image-file"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              )}

              <div className="space-y-2">
                <Label htmlFor="image-url">or paste an Image URL</Label>
                <Input
                  id="image-url"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/studio.jpg"
                  className="h-10"
                  onChange={(event) => {
                    const url = event.target.value.trim();
                    setImageUrl(url);
                    setImagePreview(url);
                  }}
                />
              </div>
            </section>

            {/* Amenities */}
            <section className="space-y-5">
              <SectionHeading icon={Tag} title="Amenities" />
              <div className="flex flex-wrap gap-3">
                {amenities.map(({ label, icon: Icon }) => {
                  const active = selectedAmenities.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => toggleAmenity(label)}
                      aria-pressed={active}
                      className={
                        "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors " +
                        (active
                          ? "border-[#6D4AFF] bg-[#6D4AFF] text-white"
                          : "border-border bg-white text-muted-foreground hover:border-[#6D4AFF]/50 hover:text-[#6D4AFF]")
                      }
                    >
                      <Icon className="size-4" />
                      {label}
                      {active && <Check className="size-4" />}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Overview */}
            <section className="space-y-5">
              <SectionHeading icon={Tag} title="Detailed Overview" />
              <Textarea
                id="overview"
                name="overview"
                placeholder="Describe your studio, its layout, lighting, gear, and what makes it ideal for creators..."
                className="min-h-32"
              />
            </section>

            {/* Host Information (read-only) */}
            <section className="space-y-5">
              <SectionHeading icon={Aperture} title="Host Information" />
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="host-name">User Name</Label>
                  <Input
                    id="host-name"
                    name="hostName"
                    type="text"
                    value={user?.name ?? ""}
                    readOnly
                    disabled
                    placeholder="Loading..."
                    className="h-10 bg-muted/50 text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="host-email">User Email</Label>
                  <Input
                    id="host-email"
                    name="hostEmail"
                    type="email"
                    value={user?.email ?? ""}
                    readOnly
                    disabled
                    placeholder="Loading..."
                    className="h-10 bg-muted/50 text-muted-foreground"
                  />
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="h-10 px-6"
                render={<Link href="/" />}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-10 bg-[#6D4AFF] px-6 text-white shadow-[0_4px_14px_rgba(109,74,255,0.35)] transition-colors hover:bg-[#5A3BD9]"
              >
                Add Studio
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
