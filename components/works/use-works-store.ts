import { create } from "zustand";

export const useWorksStore = create<{
  activeFilter: string | null
  setActiveFilter: (filter: string | null) => void
  filtersExpanded: boolean
  setFiltersExpanded: (expanded: boolean) => void
  gridSize: number
  setGridSize: (size: number) => void
  gridControlsActive: boolean
  setGridControlsActive: (active: boolean) => void
}>((set) => ({
  activeFilter: 'all',
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  filtersExpanded: false,
  setFiltersExpanded: (expanded) => set({ filtersExpanded: expanded }),
  gridSize: 4,
  setGridSize: (size) => set({ gridSize: size }),
  gridControlsActive: false,
  setGridControlsActive: (active) => set({ gridControlsActive: active })
}))