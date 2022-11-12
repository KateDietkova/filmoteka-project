export const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
    //отримуємо позицію скролу
    scrollController.scrollPosition = window.scrollY;
    // фіксуємо скролл на поточній позиції
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
    
      top: -${scrollController.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
 
      padding-right: ${window.innerWidth - document.body.offsetWidth}px
    `;
    // вираховуємо ширину скроллу
    document.documentElement.style.scrollBehavior = 'unset';
  },
  enabledScroll() {
    document.body.style.cssText = '';
    window.scroll({ top: scrollController.scrollPosition });
    document.documentElement.style.scrollBehavior = '';
  },
};
