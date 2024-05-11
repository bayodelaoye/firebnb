"use strict";

const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const validReviewImages = [
  {
    reviewId: 1,
    url: "https://unsplash.com/photos/underwater-photography-of-man-wearing-snorkel-lending-his-hand-OKBb9_v-K1I",
  },
  {
    reviewId: 2,
    url: "https://unsplash.com/photos/buildings-near-body-of-water-PXl3L6A1hRE",
  },
  {
    reviewId: 3,
    url: "https://unsplash.com/photos/rice-terraces-jN9JnZ-SyVc",
  },
  {
    reviewId: 4,
    url: "https://unsplash.com/photos/rock-cliff-tsnJEq4744s",
  },
  {
    reviewId: 5,
    url: "https://unsplash.com/photos/woman-stepping-and-going-down-on-stairs-viewing-mountain-and-body-of-water-dUPfhP18dPI",
  },
  {
    reviewId: 6,
    url: "https://unsplash.com/photos/man-in-red-t-shirt-sitting-on-brown-wooden-ladder-near-green-trees-during-daytime-EpeNGhitrlc",
  },
  {
    reviewId: 7,
    url: "https://unsplash.com/photos/people-riding-on-boat-during-golden-hour-nR1dI28cH58",
  },
  {
    reviewId: 8,
    url: "https://unsplash.com/photos/green-covered-mountain-ca3d4FYDf84",
  },
  {
    reviewId: 9,
    url: "https://unsplash.com/photos/green-covered-mountain-with-gray-concrete-walking-path-aerial-photography-nLdRVPSlcXA",
  },
  {
    reviewId: 10,
    url: "https://unsplash.com/photos/two-man-and-woman-standing-on-stair-during-daytime-8mObCIY9kxg",
  },
  {
    reviewId: 11,
    url: "https://unsplash.com/photos/green-grass-field-near-mountain-under-white-clouds-during-daytime-5UvLcZcPPX8",
  },
  {
    reviewId: 12,
    url: "https://unsplash.com/photos/aerial-photography-of-rice-terraces-during-daytime-rf5R1qXwlDU",
  },
  {
    reviewId: 13,
    url: "https://unsplash.com/photos/woman-standing-on-rock-monolith-below-waterfall-eVN9YIaH5P0",
  },
  {
    reviewId: 14,
    url: "https://unsplash.com/photos/woman-standing-on-pool-edge-near-palm-tree-during-daytime-H7Vv5iKJRvU",
  },
  {
    reviewId: 15,
    url: "https://unsplash.com/photos/body-of-water-beside-rock-formation-at-daytime-4kFwJDJ8HPY",
  },
  {
    reviewId: 16,
    url: "https://unsplash.com/photos/blue-body-of-water-near-mountain-PNri9hOFyFg",
  },
  {
    reviewId: 17,
    url: "https://unsplash.com/photos/woman-sitting-near-trees-g9IBhECDYE4",
  },
  {
    reviewId: 18,
    url: "https://unsplash.com/photos/mountain-near-green-trees-at-night-LSFuPFE9vKE",
  },
  {
    reviewId: 19,
    url: "https://unsplash.com/photos/temple-in-between-body-of-water-ycyLUcEoalE",
  },
  {
    reviewId: 20,
    url: "https://unsplash.com/photos/woman-in-between-on-concrete-landmarks-near-white-clouds-lh6cxuDOS8s",
  },
  {
    reviewId: 21,
    url: "https://unsplash.com/photos/an-and-woman-washing-in-water-fountain-with-free-flowing-water-6bUmlGstym8",
  },
  {
    reviewId: 22,
    url: "https://unsplash.com/photos/person-standing-on-green-grass-field-B04Xpnu5JQ4",
  },
  {
    reviewId: 23,
    url: "https://unsplash.com/photos/woman-riding-swing-IibRZfGCM10",
  },
  {
    reviewId: 24,
    url: "https://unsplash.com/photos/woman-on-swing-photo-during-daytime-yeIq4R7WS6o",
  },
  {
    reviewId: 25,
    url: "https://unsplash.com/photos/man-swinging-over-forest-s0qDAVc71Ao",
  },
  {
    reviewId: 26,
    url: "https://unsplash.com/photos/two-person-zip-lining-VS9YBwySCA4",
  },
  {
    reviewId: 27,
    url: "https://unsplash.com/photos/aerial-view-photography-of-cliff-gxlM2yBH63g",
  },
  {
    reviewId: 28,
    url: "https://unsplash.com/photos/woman-climbing-between-trees-thu6H8Hkfpk",
  },
  {
    reviewId: 29,
    url: "https://unsplash.com/photos/aerial-view-photography-of-green-tree-lot-rhOg6QdeDjM",
  },
  {
    reviewId: 30,
    url: "https://unsplash.com/photos/landscape-photography-of-mountains-QfHEWqPelsc",
  },
  {
    reviewId: 31,
    url: "https://unsplash.com/photos/rocky-mountain-photograph-OOTEpsO2eV0",
  },
  {
    reviewId: 32,
    url: "https://unsplash.com/photos/white-and-brown-labradoodle-puppy-near-the-house-6FZf3yzuodE",
  },
  {
    reviewId: 33,
    url: "https://unsplash.com/photos/a-monkey-sitting-in-a-tree-looking-up-O7U2QJ_pqOE",
  },
  {
    reviewId: 34,
    url: "https://unsplash.com/photos/man-standing-front-of-escalator-SYMLPwAXZXc",
  },
  {
    reviewId: 35,
    url: "https://unsplash.com/photos/people-walking-on-sidewalk-near-building-during-daytime-a7Gtlgpeq6w",
  },
  {
    reviewId: 36,
    url: "https://unsplash.com/photos/turned-off-flatscreen-computer-monitor--SG84EOcaJE",
  },
  {
    reviewId: 37,
    url: "https://unsplash.com/photos/man-in-chair-with-table-beside-coffee-4vr9a_sdJ78",
  },
  {
    reviewId: 38,
    url: "https://unsplash.com/photos/swimming-pool-photo-during-daytime-76-58HpxvpQ",
  },
  {
    reviewId: 39,
    url: "https://unsplash.com/photos/brown-wooden-house-near-waterfalls-during-daytime-z2tUtFKs5io",
  },
  {
    reviewId: 40,
    url: "https://unsplash.com/photos/brown-wooden-on-tree-bottom-MCK2JfWuoqw",
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await ReviewImage.bulkCreate(validReviewImages, {
        validate: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  },
};
