export const container = document.getElementById('tui-pagination-container');

export let options = {
  totalItems: 500,
  itemsPerPage: 10,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn page-pagination">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected selected-page">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}} page-pagination move-btn">' +
      '<span class="tui-ico-{{type}} move-btn-arrow"></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}} page-pagination">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}} page-pagination">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

