"use client";
import { useEffect, useState } from "react";
import "./EditProfile.css";
import { getMyProfile, updateProfile } from "@/lib/api/profile";

/* ===== SECTIONS ===== */
import VisualSection from "./sections/VisualSection";
import AboutSection from "./sections/AboutSection";
import LocationSection from "./sections/LocationSection";
import SocialSection from "./sections/SocialSection";
import VisibilitySection from "./sections/VisibilitySection";
import IdentitySection from "./sections/IdentitySection";
import PreviewSection from "./sections/PreviewSection";

/* ======================
   TYPES
====================== */
type Section =
  | "visual"
  | "about"
  | "location"
  | "social"
  | "visibility"
  | "identity"
  | "preview"
  | null;

type Profile = {
  avatar_url?: string;
  cover_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  xhandle?: string;

  /* 🔐 VISIBILITY FLAGS */
  show_bio?: boolean;
  show_location?: boolean;
  show_birthday?: boolean;
  show_social_links?: boolean;
  show_stats?: boolean;
};

export default function EditProfilePage() {
  const [profile, setProfile] = useState<Profile>({});
  const [posts, setPosts] = useState<any[]>([]);
  const [dashboard, setDashboard] = useState<any>(null);

  const [open, setOpen] = useState<Section>(null);
  const [saving, setSaving] = useState<Section>(null);
  const [loading, setLoading] = useState(true);

  /* ======================
     LOAD PROFILE (FULL)
  ====================== */
  useEffect(() => {
    (async () => {
      try {
        const data = await getMyProfile();
        setProfile(data.profile || {});
        setPosts(data.posts || []);
        setDashboard(data.dashboard || null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ======================
     SAVE SECTION
  ====================== */
  const saveSection = async (
    section: Exclude<Section, null>,
    payload: Record<string, any>
  ) => {
    try {
      setSaving(section);

      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          formData.append(
            key,
            value instanceof File ? value : String(value)
          );
        }
      });

      const res = await updateProfile(formData);
      setProfile(res.profile);
      setDashboard(res.dashboard || dashboard);
      setOpen(null);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(null);
    }
  };

  if (loading) {
    return <p style={{ padding: 24 }}>Loading…</p>;
  }

  return (
    <main className="edit-profile-page">
      {/* HEADER */}
      <header className="edit-header">
        <button className="edit-back" onClick={() => history.back()}>
          ← Back
        </button>
        <h1>Edit profile</h1>
        <p>Update your presence, one section at a time.</p>
      </header>

      {/* SECTION CARDS */}
      <section className="edit-sections">
        <EditCard title="Visual Identity" desc="Avatar & cover" filled={!!profile.avatar_url} onClick={() => setOpen("visual")} />
        <EditCard title="About" desc="Your personal story" filled={!!profile.bio} onClick={() => setOpen("about")} />
        <EditCard title="Location" desc="Where you’re based" filled={!!profile.location} onClick={() => setOpen("location")} />
        <EditCard title="Social Links" desc="External profiles" filled={!!profile.website || !!profile.instagram} onClick={() => setOpen("social")} />
        <EditCard title="Visibility" desc="Who can see what" filled onClick={() => setOpen("visibility")} />
        <EditCard title="Identity Preferences" desc="How you appear" filled onClick={() => setOpen("identity")} />
        <EditCard title="Profile Preview" desc="See public view" filled onClick={() => setOpen("preview")} />
      </section>

      {/* SECTIONS */}
      {open === "visual" && <VisualSection profile={profile} saving={saving === "visual"} onSave={(p) => saveSection("visual", p)} onBack={() => setOpen(null)} />}
      {open === "about" && <AboutSection value={profile.bio} saving={saving === "about"} onSave={(p) => saveSection("about", p)} onBack={() => setOpen(null)} />}
      {open === "location" && <LocationSection value={profile.location} saving={saving === "location"} onSave={(p) => saveSection("location", p)} onBack={() => setOpen(null)} />}
      {open === "social" && <SocialSection profile={profile} saving={saving === "social"} onSave={(p) => saveSection("social", p)} onBack={() => setOpen(null)} />}
      {open === "visibility" && <VisibilitySection initial={profile} saving={saving === "visibility"} onSave={(p) => saveSection("visibility", p)} onBack={() => setOpen(null)} />}
      {open === "identity" && <IdentitySection saving={saving === "identity"} onSave={(p) => saveSection("identity", p)} onBack={() => setOpen(null)} />}

      {open === "preview" && (
        <PreviewSection
          profile={profile}
          posts={posts}
          stats={dashboard?.stats}
          onBack={() => setOpen(null)}
        />
      )}
    </main>
  );
}

/* CARD */
function EditCard({ title, desc, filled, onClick }: any) {
  return (
    <button type="button" className="edit-card" onClick={onClick}>
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
      <span>{filled ? "✓" : "+"}</span>
    </button>
  );
}
