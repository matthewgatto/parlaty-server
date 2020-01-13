export const isAStepFormOpen = ({steps}) => !!steps.open
export const getLastStepId = ({steps}) => steps.forms[steps.forms.length - 1]
