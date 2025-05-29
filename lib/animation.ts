export type EasingCurve = [number, number, number, number]

export interface TransitionTemplate {
  show: 'show';
  hide: 'hide';
  variants: {
    show: {
      [key: string]: any
    }
    hide: {
      [key: string]: any
    }
  }
}

export const easeOutCubic: EasingCurve = [0.22, 1, 0.36, 1]
export const easeInOutQuart: EasingCurve = [0.76, 0, 0.24, 1]
export const easeOutExpo: EasingCurve = [0.16, 1, 0.3, 1]
export const easeInExpo: EasingCurve = [0.7, 0, 0.84, 0]
export const easeInOutExpo: EasingCurve = [0.87, 0, 0.13, 1]

export const revealTop: TransitionTemplate = {
  show: 'show',
  hide: 'hide',
  variants: {
    hide: {
      y: -8,
      opacity: 0,
      pointerEvents: 'none',
      transition: { duration: 0.65, ease: easeOutExpo}
    },
    show: {
      y: 0,
      opacity: 1,
      pointerEvents: 'auto',
      transition: { duration: 0.65, ease: easeOutExpo, delay: 0.1}
    }
  }
}

export const revealBottom: TransitionTemplate = {
  show: 'show',
  hide: 'hide',
  variants: {
    hide: {
      y: 8,
      opacity: 0,
      pointerEvents: 'none',
      transition: { duration: 0.65, ease: easeOutExpo}
    },
    show: {
      y: 0,
      opacity: 1,
      pointerEvents: 'auto',
      transition: { duration: 0.65, ease: easeOutExpo, delay: 0.1}
    }
  }
}

export const transitionWithDelay = ({ enter = 0, exit = 0, template }: { enter?: number, exit?: number, template: TransitionTemplate }) => {
  return {
    ...template,
    variants: {
      ...template.variants,
      [template.show]: { ...template.variants[template.show], transition: { ...template.variants[template.show].transition, delay: enter } },
      [template.hide]: { ...template.variants[template.hide], transition: { ...template.variants[template.hide].transition, delay: exit } }
    }
  }
}