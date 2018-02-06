export const win = typeof window != 'undefined' && window
export const doc = typeof document != 'undefined' && document
export const docEl = (doc && doc.documentElement) || (doc && doc.body)
export const winScreen = win && win.screen
