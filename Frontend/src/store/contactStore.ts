// src/store/contactStore.ts

import { create } from "zustand"
import type { Contact, Graph } from "../types/contact"

interface State {

  contact: Contact | null
  graph: Graph | null

  setContact: (contact: Contact) => void
  setGraph: (graph: Graph) => void
  clearGraph: () => void
}

export const useContactStore =
create<State>((set) => ({

  contact: null,
  graph: null,

  setContact: (contact) =>
    set({ contact }),

  setGraph: (graph) =>
    set({ graph }),

  clearGraph: () =>
    set({ graph: null })

}))