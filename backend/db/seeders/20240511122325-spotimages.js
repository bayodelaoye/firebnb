"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const validSpotImages = [
  {
    spotId: 1,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683579416/App%20Academy%20Front%20End%20Project/1_Dome_Treehouse/exterior1_amvdf6.jpg",
    preview: true,
  },
  {
    spotId: 1,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575316/App%20Academy%20Front%20End%20Project/1_Dome_Treehouse/interior_bhw5hd.jpg",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575315/App%20Academy%20Front%20End%20Project/1_Dome_Treehouse/bridges_vsn9jb.jpg",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575313/App%20Academy%20Front%20End%20Project/1_Dome_Treehouse/bridges2_frjqc6.jpg",
    preview: false,
  },
  {
    spotId: 1,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575312/App%20Academy%20Front%20End%20Project/1_Dome_Treehouse/trees_uvvzqx.jpg",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575343/App%20Academy%20Front%20End%20Project/2_Waterfall_Bangalow/exterior_jlsslt.jpg",
    preview: true,
  },
  {
    spotId: 2,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575349/App%20Academy%20Front%20End%20Project/2_Waterfall_Bangalow/interior_cit5jw.jpg",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575353/App%20Academy%20Front%20End%20Project/2_Waterfall_Bangalow/pool_gh4oyp.jpg",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575358/App%20Academy%20Front%20End%20Project/2_Waterfall_Bangalow/pool3_lejgcy.jpg",
    preview: false,
  },
  {
    spotId: 2,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575355/App%20Academy%20Front%20End%20Project/2_Waterfall_Bangalow/pool2_dtubqv.jpg",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575382/App%20Academy%20Front%20End%20Project/3_Adobe_luxury_estate/exterior_smbni0.jpg",
    preview: true,
  },
  {
    spotId: 3,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575386/App%20Academy%20Front%20End%20Project/3_Adobe_luxury_estate/interior2_atl6c2.jpg",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575384/App%20Academy%20Front%20End%20Project/3_Adobe_luxury_estate/interior_hzoykz.jpg",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575384/App%20Academy%20Front%20End%20Project/3_Adobe_luxury_estate/exterior2jpg_olmj5b.jpg",
    preview: false,
  },
  {
    spotId: 3,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575381/App%20Academy%20Front%20End%20Project/3_Adobe_luxury_estate/cat_stairs_fiafll.jpg",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575396/App%20Academy%20Front%20End%20Project/4_Beachfront_treehouse/exterior_imc1vv.jpg",
    preview: true,
  },
  {
    spotId: 4,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575397/App%20Academy%20Front%20End%20Project/4_Beachfront_treehouse/interior_xld3tl.jpg",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575398/App%20Academy%20Front%20End%20Project/4_Beachfront_treehouse/interior2_vplmef.jpg",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575399/App%20Academy%20Front%20End%20Project/4_Beachfront_treehouse/view_piglh7.jpg",
    preview: false,
  },
  {
    spotId: 4,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575395/App%20Academy%20Front%20End%20Project/4_Beachfront_treehouse/bridge2_g12puc.jpg",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575419/App%20Academy%20Front%20End%20Project/5_Oceanview_glass_home/exterior2_vzyxhv.jpg",
    preview: true,
  },
  {
    spotId: 5,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575423/App%20Academy%20Front%20End%20Project/5_Oceanview_glass_home/interior_zqxrfc.jpg",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575424/App%20Academy%20Front%20End%20Project/5_Oceanview_glass_home/interior2_idgrrd.jpg",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575425/App%20Academy%20Front%20End%20Project/5_Oceanview_glass_home/pool_r13yve.jpg",
    preview: false,
  },
  {
    spotId: 5,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575418/App%20Academy%20Front%20End%20Project/5_Oceanview_glass_home/exterior_jvbcjs.jpg",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575432/App%20Academy%20Front%20End%20Project/6_luxury_yacht/exterior_t4ssy1.jpg",
    preview: true,
  },
  {
    spotId: 6,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575433/App%20Academy%20Front%20End%20Project/6_luxury_yacht/exterior2_pvs29m.jpg",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575435/App%20Academy%20Front%20End%20Project/6_luxury_yacht/exterior3_ukzwsx.jpg",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575436/App%20Academy%20Front%20End%20Project/6_luxury_yacht/interior_kbpzoj.jpg",
    preview: false,
  },
  {
    spotId: 6,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575437/App%20Academy%20Front%20End%20Project/6_luxury_yacht/interior3_pzi21b.jpg",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575448/App%20Academy%20Front%20End%20Project/7_luxury_hawaiian_estate/exterior_m1mc21.jpg",
    preview: true,
  },
  {
    spotId: 7,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575449/App%20Academy%20Front%20End%20Project/7_luxury_hawaiian_estate/interior_wghqph.jpg",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575450/App%20Academy%20Front%20End%20Project/7_luxury_hawaiian_estate/wall_k5x3xh.jpg",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575451/App%20Academy%20Front%20End%20Project/7_luxury_hawaiian_estate/patio_ilbjfp.jpg",
    preview: false,
  },
  {
    spotId: 7,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575446/App%20Academy%20Front%20End%20Project/7_luxury_hawaiian_estate/bike_interior_h5g0lb.jpg",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575464/App%20Academy%20Front%20End%20Project/8_beachfront_villa/pool_tf82f2.jpg",
    preview: true,
  },
  {
    spotId: 8,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575461/App%20Academy%20Front%20End%20Project/8_beachfront_villa/exterior_bpvtnw.jpg",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575460/App%20Academy%20Front%20End%20Project/8_beachfront_villa/bedroom_inbbda.jpg",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575459/App%20Academy%20Front%20End%20Project/8_beachfront_villa/beach_pvnywa.jpg",
    preview: false,
  },
  {
    spotId: 8,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575462/App%20Academy%20Front%20End%20Project/8_beachfront_villa/livingroom_hmeltf.jpg",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575482/App%20Academy%20Front%20End%20Project/9_luxury_oceanview_villa/exterior3_cma2gi.jpg",
    preview: true,
  },
  {
    spotId: 9,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575483/App%20Academy%20Front%20End%20Project/9_luxury_oceanview_villa/view_fqpwg0.jpg",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575481/App%20Academy%20Front%20End%20Project/9_luxury_oceanview_villa/pool_fvihqa.jpg",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575480/App%20Academy%20Front%20End%20Project/9_luxury_oceanview_villa/exterior2_j5toyy.jpg",
    preview: false,
  },
  {
    spotId: 9,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575479/App%20Academy%20Front%20End%20Project/9_luxury_oceanview_villa/exterior_zjy176.jpg",
    preview: false,
  },
  {
    spotId: 10,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575491/App%20Academy%20Front%20End%20Project/10_lakefront_cabin/exterior_gd64gn.jpg",
    preview: true,
  },
  {
    spotId: 10,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575493/App%20Academy%20Front%20End%20Project/10_lakefront_cabin/interior2_oenoli.jpg",
    preview: false,
  },
  {
    spotId: 10,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575492/App%20Academy%20Front%20End%20Project/10_lakefront_cabin/interior_uitgpd.jpg",
    preview: false,
  },
  {
    spotId: 10,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575494/App%20Academy%20Front%20End%20Project/10_lakefront_cabin/mountains_cvkace.jpg",
    preview: false,
  },
  {
    spotId: 10,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575495/App%20Academy%20Front%20End%20Project/10_lakefront_cabin/snow_rz2pb1.jpg",
    preview: false,
  },
  {
    spotId: 11,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575503/App%20Academy%20Front%20End%20Project/11_luxury_ranch_estate/exterior_pls8vo.jpg",
    preview: true,
  },
  {
    spotId: 11,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575504/App%20Academy%20Front%20End%20Project/11_luxury_ranch_estate/exterior2_kqvdeo.jpg",
    preview: false,
  },
  {
    spotId: 11,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575506/App%20Academy%20Front%20End%20Project/11_luxury_ranch_estate/interior_sf3tlj.jpg",
    preview: false,
  },
  {
    spotId: 11,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575507/App%20Academy%20Front%20End%20Project/11_luxury_ranch_estate/interior3_p9il3p.jpg",
    preview: false,
  },
  {
    spotId: 11,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575509/App%20Academy%20Front%20End%20Project/11_luxury_ranch_estate/mountains_cligl5.jpg",
    preview: false,
  },
  {
    spotId: 12,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575517/App%20Academy%20Front%20End%20Project/12_Beachfront_villa/pool_bfjart.jpg",
    preview: true,
  },
  {
    spotId: 12,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575516/App%20Academy%20Front%20End%20Project/12_Beachfront_villa/exterior_vo8mmj.jpg",
    preview: false,
  },
  {
    spotId: 12,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575515/App%20Academy%20Front%20End%20Project/12_Beachfront_villa/bedroom_sa3ub2.jpg",
    preview: false,
  },
  {
    spotId: 12,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575513/App%20Academy%20Front%20End%20Project/12_Beachfront_villa/beach_wqqnaz.jpg",
    preview: false,
  },
  {
    spotId: 12,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575519/App%20Academy%20Front%20End%20Project/12_Beachfront_villa/pool2_fzamj7.jpg",
    preview: false,
  },
  {
    spotId: 13,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575529/App%20Academy%20Front%20End%20Project/13_tropical_retreat/exterior_yytlsg.jpg",
    preview: true,
  },
  {
    spotId: 13,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575528/App%20Academy%20Front%20End%20Project/13_tropical_retreat/bedroom_u9ltbb.jpg",
    preview: false,
  },
  {
    spotId: 13,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575531/App%20Academy%20Front%20End%20Project/13_tropical_retreat/garden_vggqkp.jpg",
    preview: false,
  },
  {
    spotId: 13,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575532/App%20Academy%20Front%20End%20Project/13_tropical_retreat/livingroom_oqcv5c.jpg",
    preview: false,
  },
  {
    spotId: 13,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575534/App%20Academy%20Front%20End%20Project/13_tropical_retreat/livingroom2_urkdtq.jpg",
    preview: false,
  },
  {
    spotId: 14,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575539/App%20Academy%20Front%20End%20Project/14_Modern_mountain_house/exterior_p7ojh8.jpg",
    preview: true,
  },
  {
    spotId: 14,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575541/App%20Academy%20Front%20End%20Project/14_Modern_mountain_house/livingroom_uuoc4t.jpg",
    preview: false,
  },
  {
    spotId: 14,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575549/App%20Academy%20Front%20End%20Project/14_Modern_mountain_house/reading_mzknqx.jpg",
    preview: false,
  },
  {
    spotId: 14,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575608/App%20Academy%20Front%20End%20Project/14_Modern_mountain_house/view_xxxeyj.jpg",
    preview: false,
  },
  {
    spotId: 14,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575550/App%20Academy%20Front%20End%20Project/14_Modern_mountain_house/window_ae7diu.jpg",
    preview: false,
  },
  {
    spotId: 15,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575620/App%20Academy%20Front%20End%20Project/15_treehouse_retreat/exterior2_gywxzb.jpg",
    preview: true,
  },
  {
    spotId: 15,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575618/App%20Academy%20Front%20End%20Project/15_treehouse_retreat/area_j1on1v.jpg",
    preview: false,
  },
  {
    spotId: 15,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575622/App%20Academy%20Front%20End%20Project/15_treehouse_retreat/interior_gghhfg.jpg",
    preview: false,
  },
  {
    spotId: 15,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575623/App%20Academy%20Front%20End%20Project/15_treehouse_retreat/interior2_m4fx1h.jpg",
    preview: false,
  },
  {
    spotId: 15,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575623/App%20Academy%20Front%20End%20Project/15_treehouse_retreat/interior2_m4fx1h.jpg",
    preview: false,
  },
  {
    spotId: 16,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575634/App%20Academy%20Front%20End%20Project/16_lakefront_caabin/exterior_eunmxh.jpg",
    preview: true,
  },
  {
    spotId: 16,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575636/App%20Academy%20Front%20End%20Project/16_lakefront_caabin/interior_ywefxh.jpg",
    preview: false,
  },
  {
    spotId: 16,
    url: "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575637/App%20Academy%20Front%20End%20Project/16_lakefront_caabin/kitchen_rldngf.jpg",
    preview: false,
  },
  {
    spotId: 16,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717609638/frames-for-your-heart-Rdh-OCcBqC0-unsplash_btyze3.jpg",
    preview: false,
  },
  {
    spotId: 16,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717609786/sir-manuel-pM6enCrUsqY-unsplash_lbfsh8.jpg",
    preview: false,
  },
  {
    spotId: 17,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717608334/outsite-co-R-LK3sqLiBw-unsplash_lgfalx.jpg",
    preview: true,
  },
  {
    spotId: 17,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717608456/kara-eads-L7EwHkq1B2s-unsplash_uoiqkz.jpg",
    preview: false,
  },
  {
    spotId: 17,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717608516/minh-pham-OtXADkUh3-I-unsplash_sexxzc.jpg",
    preview: false,
  },
  {
    spotId: 17,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717609884/dakota-lim-n_2DimPwbEk-unsplash_oibod9.jpg",
    preview: false,
  },
  {
    spotId: 17,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717609962/planetcare-23coWmkTNSg-unsplash_crujrh.jpg",
    preview: false,
  },
  {
    spotId: 18,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717608571/kenny-eliason-mGZX2MOPR-s-unsplash_yukwra.jpg",
    preview: true,
  },
  {
    spotId: 18,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717608648/sieuwert-otterloo-aren8nutd1Q-unsplash_hiceyk.jpg",
    preview: false,
  },
  {
    spotId: 18,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717608688/minh-pham-7pCFUybP_P8-unsplash_fxmsfj.jpg",
    preview: false,
  },
  {
    spotId: 18,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717610081/henrique-paim-sew5dUh0_bg-unsplash_uptlr4.jpg",
    preview: false,
  },
  {
    spotId: 18,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717610189/brandi-alexandra-MgJPU2da8jY-unsplash_pznzry.jpg",
    preview: false,
  },
  {
    spotId: 19,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717608729/scott-webb-1ddol8rgUH8-unsplash_fehgfh.jpg",
    preview: true,
  },
  {
    spotId: 19,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717608837/r-architecture-U6Ds9z7i3VQ-unsplash_u5ejrd.jpg",
    preview: false,
  },
  {
    spotId: 19,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717608936/naomi-hebert-MP0bgaS_d1c-unsplash_jnemge.jpg",
    preview: false,
  },
  {
    spotId: 19,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717610289/vlad-b-gMnA1dUkmkM-unsplash_g7yxnp.jpg",
    preview: false,
  },
  {
    spotId: 19,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717610354/r-architecture-P_0tnQ8hb70-unsplash_nmc24z.jpg",
    preview: false,
  },
  {
    spotId: 20,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717609000/frames-for-your-heart-2d4lAQAlbDA-unsplash_drkwxe.jpg",
    preview: true,
  },
  {
    spotId: 20,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717609047/inside-weather-Uxqlfigh6oE-unsplash_acnuog.jpg",
    preview: false,
  },
  {
    spotId: 20,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717609089/spacejoy-IH7wPsjwomc-unsplash_nwbulj.jpg",
    preview: false,
  },
  {
    spotId: 20,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717610416/r-architecture-M6E8SO73MPY-unsplash_q5g9e7.jpg",
    preview: false,
  },
  {
    spotId: 20,
    url: "https://res.cloudinary.com/dsb4nx6zn/image/upload/v1717610534/emmanuel-ikwuegbu-FXpJW_wdMdk-unsplash_pjtnxl.jpg",
    preview: false,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await SpotImage.bulkCreate(validSpotImages, {
        validate: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  },
};
