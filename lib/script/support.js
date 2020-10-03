function execStrategy() {

  // clean ads
  const ads = [
    '#ic_desktop_adhesion',
    '#customAd1763340958',
    '#customAd1330188159',
    '.no-print'
  ];

  ads.map(ad => {
    const elements = document.querySelectorAll(ad);
    for (const element of elements) {
      element.remove();
    }    
  });
  
  // load data
  const table = document.querySelector('#bc-cheat-sheet-table');

  console.log('===table', table);

  if (!table) {
    return [];
  };

  const data = [];

  // first row needs to be headers
  const headers = [];
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    headers[i] = table.rows[0].cells[i].innerHTML.toLowerCase().replace(/ /gi, '');
  }

  // go through cells
  for (let i = 1; i < table.rows.length; i++) {
    const tableRow = table.rows[i];
    const rowData = {};

    for (let j = 0; j < tableRow.cells.length; j++) {
      rowData[headers[j]] = tableRow.cells[j].innerHTML.trim();
    }
    data.push(rowData);
  }
  return data;
}
