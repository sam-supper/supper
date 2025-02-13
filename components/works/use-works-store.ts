import { create } from "zustand";

export const useWorksStore = create<{
  view: 'grid' | 'list'
  setView: (view: 'grid' | 'list') => void
  activeFilter: string | null
  setActiveFilter: (filter: string | null) => void
  filtersExpanded: boolean
  setFiltersExpanded: (expanded: boolean) => void
  gridSize: number
  setGridSize: (size: number) => void
  gridControlsActive: boolean
  setGridControlsActive: (active: boolean) => void
}>((set) => ({
  view: 'list',
  setView: (view) => set({ view }),
  activeFilter: 'all',
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  filtersExpanded: false,
  setFiltersExpanded: (expanded) => set({ filtersExpanded: expanded }),
  gridSize: 4,
  setGridSize: (size) => set({ gridSize: size }),
  gridControlsActive: false,
  setGridControlsActive: (active) => set({ gridControlsActive: active })
}))