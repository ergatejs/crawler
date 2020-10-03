function execStrategy() {
  // clean ads
  const ads = [
    '.adsbygoogle',
    '#amzn_assoc_ad_div_adunit0_0',
    '#footer',
  ];  

  ads.map(ad => {
    const element = document.querySelector(ad);
    if(element){
      element.remove();
    }
  });
  
  return [];
}
