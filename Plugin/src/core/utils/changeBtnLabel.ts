export const changeBtnLabel = (
  btnRef: HTMLElement | null,
  newLabel: string,
  classToAdd?: string,
  classToRemove?: string
) => {
  if(btnRef) {
    btnRef.innerText = newLabel;

    if(classToAdd)
      btnRef.classList.add(classToAdd);
    if(classToRemove)
      btnRef.classList.remove(classToRemove);
  }
};
