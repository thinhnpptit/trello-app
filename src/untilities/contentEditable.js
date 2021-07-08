// onKeyDown
export const selectAllInlineText = (e) => {
  e.target.focus()
  e.target.select()
}

// Select all input values when click
export const saveContentAfterPressEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    e.target.blur()
  }
}
