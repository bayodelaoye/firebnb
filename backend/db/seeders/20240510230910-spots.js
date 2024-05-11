"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const validSpots = [
  {
    ownerId: 1,
    address: "3 Burning Wood Hill",
    city: "Tokyo",
    state: "Detroit",
    country: "Russia",
    lat: 60.0024341,
    lng: 30.2410163,
    name: "Shared large room with desk 15 min to Manhattan",
    description:
      "This stylish shared place to stay is perfect for quick trips. It is a wonderful large room with TV and desk. We are across the street from Roberto Clemente State Park (Please See Photos) 10 min. Walk to Metro North",
    price: 915,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683579416/App%20Academy%20Front%20End%20Project/1_Dome_Treehouse/exterior1_amvdf6.jpg",
  },
  {
    ownerId: 1,
    address: "481 Veith Terrace",
    city: "Delhi",
    state: "Braga",
    country: "Portugal",
    lat: 41.5331853,
    lng: -8.2524001,
    name: "Beach front, modern, comfortable, fully equipped",
    description:
      "One step away of the wonderful turquoise waters of the Caribbean. Incredible views of the sunset on the Lagoon.",
    price: 2374,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575343/App%20Academy%20Front%20End%20Project/2_Waterfall_Bangalow/exterior_jlsslt.jpg",
  },
  {
    ownerId: 7,
    address: "2533 Mcbride Drive",
    city: "Caracas",
    state: "Dalarna",
    country: "Indonesia",
    lat: -7.76929,
    lng: 114.2241895,
    name: "Kasa El Paseo | 5-Min Walk to the Beach",
    description:
      "You will never miss a beat at Kasa El Paseo. Electrifying experiences await you from sunrise to sundown.",
    price: 2261,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575382/App%20Academy%20Front%20End%20Project/3_Adobe_luxury_estate/exterior_smbni0.jpg",
  },
  {
    ownerId: 7,
    address: "0 Duke Street",
    city: "Cairo",
    state: "Dalarna",
    country: "Guadeloupe",
    lat: 25.6765837,
    lng: -100.2602364,
    name: "Guest suite",
    description:
      "Take it easy at this unique and tranquil getaway where you get to experience what it means to have only the sound of the waves and the bush for company.",
    price: 1879,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575396/App%20Academy%20Front%20End%20Project/4_Beachfront_treehouse/exterior_imc1vv.jpg",
  },
  {
    ownerId: 15,
    address: "4141 Larry Alley",
    city: "Beijing",
    state: "Maryland",
    country: "United States",
    lat: 39.0041504,
    lng: 68.533658,
    name: "Villa Le Passage",
    description:
      "In the heart of the hamlet of Portovecchiaccio and the Les Hauts de St-Cyprien estate (9 house subdivision with secure gate) you will find peace and serenity",
    price: 9750,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575419/App%20Academy%20Front%20End%20Project/5_Oceanview_glass_home/exterior2_vzyxhv.jpg",
  },
  {
    ownerId: 4,
    address: "595 Clove Junction",
    city: "Osaka",
    state: "Sabah",
    country: "Malaysia",
    lat: 5.9840985,
    lng: 116.0761121,
    name: "North Hill Place",
    description:
      "First fire proof Cape Cod house built on North Hill in 1948. A brand new garden flat space created  now ready for guest.",
    price: 1047,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575432/App%20Academy%20Front%20End%20Project/6_luxury_yacht/exterior_t4ssy1.jpg",
  },
  {
    ownerId: 4,
    address: "297 8th Center",
    city: "Lagos",
    state: "Pennsylvania",
    country: "United States",
    lat: 40.6238902,
    lng: 127.0051893,
    name: "Delacy's Place - Cozy 1 bedroom suite",
    description:
      "You will walk up to a studio apartment located on the third floor. It is equipped with a full kitchen.",
    price: 1379,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575448/App%20Academy%20Front%20End%20Project/7_luxury_hawaiian_estate/exterior_m1mc21.jpg",
  },
  {
    ownerId: 4,
    address: "637 Oakridge Street",
    city: "Istanbul",
    state: "Troms",
    country: "Norway",
    lat: 69.63186,
    lng: 18.9221,
    name: "Wonderful apartment in Manilva",
    description:
      "This peaceful place offers a relaxing stay for the whole family in a brand new residence with a pool.",
    price: 2899,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575464/App%20Academy%20Front%20End%20Project/8_beachfront_villa/pool_tf82f2.jpg",
  },
  {
    ownerId: 4,
    address: "11 South Pass",
    city: "Tianjin",
    state: "District of Columbia",
    country: "United States",
    lat: 31.046822,
    lng: 123.4665442,
    name: "2 Bedroom Villa Deluxe",
    description:
      "This gorgeous fully-equipped villa on the second sea line presents a luxurious vacation accommodation for your well-deserved rest.",
    price: 4687,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575482/App%20Academy%20Front%20End%20Project/9_luxury_oceanview_villa/exterior3_cma2gi.jpg",
  },
  {
    ownerId: 4,
    address: "60165 International Place",
    city: "Bogota",
    state: "Ontario",
    country: "Canada",
    lat: 43.5167511,
    lng: 21.6773447,
    name: "Large bright room in excellent location",
    description:
      "Whether you're moving to Toronto, visiting, or simply need a break, this is the perfect place for you!",
    price: 1063,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575491/App%20Academy%20Front%20End%20Project/10_lakefront_cabin/exterior_gd64gn.jpg",
  },
  {
    ownerId: 19,
    address: "7 Loftsgordon Trail",
    city: "Bayern",
    state: "Tamarindo",
    country: "Germany",
    lat: 49.4025357,
    lng: 11.0502709,
    name: "Quality Furnishing & Expansive Harbour Views",
    description:
      "An executive retreat of rare quality & unrivalled excellence, this exceptional apartment is a rental opportunity that is simply without equal.",
    price: 5325,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575503/App%20Academy%20Front%20End%20Project/11_luxury_ranch_estate/exterior_pls8vo.jpg",
  },
  {
    ownerId: 3,
    address: "6 Ohio Place",
    city: "Paris",
    state: "California",
    country: "United States",
    lat: 34.1615135,
    lng: 28.385948,
    name: "Modern Apartment-Free Parking",
    description:
      "This stunning apartment has been set up to create a bright and modern, comfortable space for you to relax.",
    price: 2069,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575517/App%20Academy%20Front%20End%20Project/12_Beachfront_villa/pool_bfjart.jpg",
  },
  {
    ownerId: 3,
    address: "80 Sullivan Point",
    city: "Seoul",
    state: "Halland",
    country: "Sweden",
    lat: 56.7117056,
    lng: 12.8778046,
    name: "Peace & Quiet Hotel- Floating Glass Room",
    description:
      "Experience the arctic light in the true last wilderness of Europe. In the cultural melting pot of the Sami culture you find our sustainable and eco-friendly luxury suite for two.",
    price: 4755,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575529/App%20Academy%20Front%20End%20Project/13_tropical_retreat/exterior_yytlsg.jpg",
  },
  {
    ownerId: 9,
    address: "67984 Karstens Crossing",
    city: "Wuhan",
    state: "Lisboa",
    country: "Portugal",
    lat: 38.7326381,
    lng: 23.7371118,
    name: "Casale di Monacella - Pizzuta",
    description:
      "Our structure consists of 6 lodgings, Each of which bears the name of a variety of Sicilian main olive cultivar.",
    price: 3234,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575539/App%20Academy%20Front%20End%20Project/14_Modern_mountain_house/exterior_p7ojh8.jpg",
  },
  {
    ownerId: 9,
    address: "1688 Moland Hill",
    city: "Baghdad",
    state: "Leiria",
    country: "China",
    lat: 30.20003,
    lng: 115.038835,
    name: "Beautiful private cabin with a great view",
    description: "Cozy but stylish luxury cabin close to the golden circle.",
    price: 11860,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575620/App%20Academy%20Front%20End%20Project/15_treehouse_retreat/exterior2_gywxzb.jpg",
  },
  {
    ownerId: 5,
    address: "54 Eagle Crest Road",
    city: "Toronto",
    state: "New South Wales",
    country: "Australia",
    lat: 32.06078,
    lng: 121.368162,
    name: "Loft in Palermo Hollywood",
    description: "Modern one bedroom loft in Palermo Hollywood 6th floor.",
    price: 1446,
    previewImage:
      "https://res.cloudinary.com/dnzxq7dgk/image/upload/v1683575634/App%20Academy%20Front%20End%20Project/16_lakefront_caabin/exterior_eunmxh.jpg",
  },
  {
    ownerId: 5,
    address: "24604 Rigney Alley",
    city: "Melbourne",
    state: "Coimbra",
    country: "Portugal",
    lat: 40.0341373,
    lng: 17.7458559,
    name: "Dome in the Paradise of Silence",
    description:
      "Looking for a break from social media? This is the perfect spot! ",
    price: 678,
    previewImage:
      "https://unsplash.com/photos/living-room-set-with-green-dumb-cane-plant-R-LK3sqLiBw",
  },
  {
    ownerId: 11,
    address: "55 4th Plaza",
    city: "Rome",
    state: "Jalisco",
    country: "Mexico",
    lat: 20.7917375,
    lng: 117.16587,
    name: "Charming View Loft",
    description:
      "In the heart of the Historic Center, just 5 minutes walk from the base of the CDMX- in a beautiful building completely remodeled, designed in a contemporary style.",
    price: 1047,
    previewImage:
      "https://unsplash.com/photos/black-wooden-table-on-rug-mGZX2MOPR-s",
  },
  {
    ownerId: 8,
    address: "97862 Eliot Street",
    city: "Athens",
    state: "Pennsylvania",
    country: "United States",
    lat: 40.3208847,
    lng: 34.4212109,
    name: "Villa by the sea in Foulpointe",
    description: "HASANI BEACH HOUSE, a large villa beside the Foulpointe Sea.",
    price: 11829,
    previewImage:
      "https://unsplash.com/photos/white-house-under-maple-trees-1ddol8rgUH8",
  },
  {
    ownerId: 8,
    address: "758 Shopko Circle",
    city: "Dubai",
    state: "Nayarit",
    country: "Japan",
    lat: 10.407146,
    lng: 5.4699173,
    name: "2LDK/5 minutes walk from Shinokubo Station",
    description:
      "This unique house is conveniently located between the bustling Shin-Okubo business district and the elegant and quiet residential area.",
    price: 3685,
    previewImage:
      "https://unsplash.com/photos/white-and-grey-concrete-building-near-swimming-pool-under-clear-sky-during-daytime-2d4lAQAlbDA",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Spot.bulkCreate(validSpots, {
        validate: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  },
};
