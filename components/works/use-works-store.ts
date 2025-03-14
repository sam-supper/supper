import { create } from "zustand";

export const useWorksStore = create<{
  activeFilter: string | null
  setActiveFilter: (filter: string | null) => void
  gridSize: number
  setGridSize: (size: number) => void
  gridControlsActive: boolean
  setGridControlsActive: (active: boolean) => void
}>((set) => ({
  activeFilter: null,
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  gridSize: 4,
  setGridSize: (size) => set({ gridSize: size }),
  gridControlsActive: false,
  setGridControlsActive: (active) => set({ gridControlsActive: active })
}))