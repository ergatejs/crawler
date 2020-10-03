function execStrategy() {
  // clean ads
  const ads = [
    '.adsbygoogle',
    '#amzn_assoc_ad_div_adunit0_0',
    '#footer',
  ];  

  ads.map(ad => {
    const elements = document.querySelectorAll(ad);
    for (const element of elements) {
      element.remove();
    }    
  });

  // clean table
  const tables = document.querySelectorAll('#main table');
  for (const table of tables) {
    if(table.clientHeight < 50) {
      table.remove();
    }
  }

  // change main length
  const main = document.querySelector('#main')
  if(main) {
    main.style.height = 'auto';
  }
  
  return [];
}
