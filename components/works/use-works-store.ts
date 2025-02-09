import { create } from "zustand";

export const useWorksStore = create<{
  view: 'grid' | 'list'
  setView: (view: 'grid' | 'list') => void
  activeFilter: string | null
  setActiveFilter: (filter: string | null) => void
  filtersExpanded: boolean
  setFiltersExpanded: (expanded: boolean) => void
}>((set) => ({
  view: 'list',
  setView: (view) => set({ view }),
  activeFilter: null,
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  filtersExpanded: false,
  setFiltersExpanded: (expanded) => set({ filtersExpanded: expanded })
}))