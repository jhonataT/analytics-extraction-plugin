export const getAvatarName = (currentTheme: 'light' | 'dark', onlyName: boolean) => {
  if(onlyName)
    return currentTheme === 'dark' ? 'Hugo' : 'Maya';
  
  return currentTheme === 'dark' ? 'Avatar do Hugo' : 'Avatar da Maya' ;
};