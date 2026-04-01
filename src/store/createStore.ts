import { create } from "zustand";
import { persist } from "zustand/middleware";

/* =====================================
   🧠 CREATE PAGE STORE (PERSISTENT STABLE)
===================================== */

interface CreateState {
  mood: string;
  type:
    | "textshort"
    | "textlong"
    | "photo"
    | "video"
    | "voicemoment"
    | "moodcast"
    | "";

  text: string;

  storyTitle: string;
  storyBody: string;
  storyDraft: boolean;

  description: string;
  location: string;
  visibility: "Public" | "Private";
  reflect: "on" | "off";
  reecho: "on" | "off";

  mediaFiles: File[];
  audioFile: File | null;

  background: string;

  setMood: (m: string) => void;
  setType: (t: CreateState["type"]) => void;
  setText: (t: string) => void;

  setStoryTitle: (t: string) => void;
  setStoryBody: (b: string) => void;
  setStoryDraft: (v: boolean) => void;
  clearStory: () => void;

  setDescription: (d: string) => void;
  setLocation: (l: string) => void;
  setVisibility: (v: "Public" | "Private") => void;
  setReflect: (r: "on" | "off") => void;
  setReecho: (r: "on" | "off") => void;

  setBackground: (b: string) => void;

  addMedia: (f: File[]) => void;
  setMedia: (f: File[]) => void;
  removeMedia: (index: number) => void;

  setAudio: (f: File | null) => void;

  clearAll: () => void;
}

export const useCreateStore = create<CreateState>()(
  persist(
    (set) => ({
      /* CORE */
      mood: "",
      type: "",
      text: "",

      /* STORY */
      storyTitle: "",
      storyBody: "",
      storyDraft: false,

      /* META */
      description: "",
      location: "",
      visibility: "Public",
      reflect: "on",
      reecho: "on",

      /* MEDIA */
      mediaFiles: [],
      audioFile: null,

      /* UI */
      background: "gold",

      /* CORE SETTERS */
      setMood: (m) => set({ mood: m }),
      setType: (t) => set({ type: t }),
      setText: (t) => set({ text: t }),

      /* STORY */
      setStoryTitle: (t) => set({ storyTitle: t }),
      setStoryBody: (b) => set({ storyBody: b }),
      setStoryDraft: (v) => set({ storyDraft: v }),
      clearStory: () =>
        set({
          storyTitle: "",
          storyBody: "",
          storyDraft: false,
        }),

      /* META */
      setDescription: (d) => set({ description: d }),
      setLocation: (l) => set({ location: l }),
      setVisibility: (v) => set({ visibility: v }),
      setReflect: (r) => set({ reflect: r }),
      setReecho: (r) => set({ reecho: r }),

      /* UI */
      setBackground: (b) => set({ background: b }),

      /* MEDIA */
      addMedia: (files) =>
        set((state) => {
          if (!files || files.length === 0) return state;

          return {
            mediaFiles: [...state.mediaFiles, ...files],
          };
        }),

      setMedia: (files) =>
        set(() => ({
          mediaFiles: files || [],
        })),

      removeMedia: (i) =>
        set((state) => ({
          mediaFiles: state.mediaFiles.filter((_, idx) => idx !== i),
        })),

      setAudio: (f) => set({ audioFile: f }),

      /* RESET */
      clearAll: () =>
        set({
          mood: "",
          type: "",
          text: "",
          storyTitle: "",
          storyBody: "",
          storyDraft: false,
          description: "",
          location: "",
          visibility: "Public",
          reflect: "on",
          reecho: "on",
          mediaFiles: [],
          audioFile: null,
          background: "gold",
        }),
    }),
    {
      name: "create-storage", // 🔥 PERSIST KEY
      partialize: (state) => ({
  mood: state.mood,
  type: state.type, // 🔥 ADD THIS
  text: state.text,
  storyTitle: state.storyTitle,
  storyBody: state.storyBody,
  description: state.description,
  location: state.location,
  visibility: state.visibility,
  reflect: state.reflect,
  reecho: state.reecho,
  background: state.background,

  // ❌ DO NOT STORE FILES
  mediaFiles: [],   // 🔥 FORCE EMPTY
  audioFile: null,  // 🔥 FORCE EMPTY
}),

    }
  )
);
