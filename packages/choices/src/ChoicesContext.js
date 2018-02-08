import React from 'react'


export default React.createContext({
  select: null,
  deselect: null,
  toggle: null,
  setSelections: null,
  clearSelections: null,
  isSelected: null,

  addChoice: null,
  deleteChoice: null,
  setChoices: null,
  clearChoices: null,
  isChoice: null,

  selections: null,
  choices: null
})
