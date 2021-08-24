var appConfigDev = {
  //apiLoc : 'http://35.198.248.47/~developer/knowledge/v7/', // Dev server
  apiLoc: 'https://developer.clirnet.com/knowledge/rnv5/', //Dev Server
  img_path: 'https://doctor.clirnet.com/knowledge/',
  app_url: 'https://doctor.clirnet.com/reactjs',
  wp_url: 'https://doctor.clirnet.com/store/deals/wp-json/wpoauthserver/v1/logout/',
  //chatApiLoc : 'https://staging-chat.kyndor.com/', // chat dev server name
  //imgLoc : 'https://stagingkyndor.b-cdn.net/files/', // dev image location
  imgFolder: 'doctor/',
  gtag_measure_id:'G-CYP74BM1LV' // dev image folder
}
  
var appConfigProd = {          
  apiLoc: "/",//https://developer.clirnet.com/knowledge/rnv11  // ///
  img_path: 'https://doctor.clirnet.com/knowledge/', 
  app_url: 'https://doctor.clirnet.com/',
  wp_url: 'https://doctor.clirnet.com/store/deals/wp-json/wpoauthserver/v1/logout/',
  //chatApiLoc : 'https://chat.kyndor.com/', // chat Prod server name
  //imgLoc : 'https://kyndor.b-cdn.net/files/', // prod image location
  imgFolder: 'doctor/', // prod image folder
  app_store_url: 'https://clirnet.page.link/clirnet', 
  zoom_root_url: 'https://developer.clirnet.com/join_webinar/#/Zoom/',
  gtag_measure_id:'G-CYP74BM1LV'
}

var appConfig = appConfigProd // for dev
//var appConfig = appConfigDev // for prod

module.exports = appConfig