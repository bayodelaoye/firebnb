"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const validReviews = [
  {
    userId: 2,
    spotId: 1,
    imageId: 1,
    review:
      "Fantastic location. Easily able to get all over with plenty of dining (and drinking) options! Can't wait to come back.",
    stars: 5,
  },
  {
    userId: 6,
    spotId: 2,
    imageId: 2,
    review:
      "Excellent place to stay; surprisingly quiet considering it was on a busy street. Great view and kitchen and all the furniture and appliances were spotless.",
    stars: 4,
  },
  {
    userId: 10,
    spotId: 3,
    imageId: 3,
    review:
      "Very nice and modern furnished apartment in a good and central location. I was very satisfied.",
    stars: 3,
  },
  {
    userId: 12,
    spotId: 4,
    imageId: 4,
    review: "My husband and I really enjoyed staying at this place.",
    stars: 4,
  },
  {
    userId: 13,
    spotId: 5,
    imageId: 5,
    review: "It was really a great stay!",
    stars: 3,
  },
  {
    userId: 14,
    spotId: 6,
    imageId: 6,
    review:
      "I wouldn't recommend. The host was late with providing us access to the house, and it was not in a good location.",
    stars: 1,
  },
  {
    userId: 16,
    spotId: 7,
    imageId: 7,
    review:
      "The apartment was in a great location. Walkable to so many sights, and very close to metro and trams. Our host met us at apartment and showed us everything we needed to know. Perfect size for a couple.",
    stars: 3,
  },
  {
    userId: 17,
    spotId: 8,
    imageId: 8,
    review: "Absolutely horrible place to stay at. The host was extremly rude!",
    stars: 2,
  },
  {
    userId: 18,
    spotId: 9,
    imageId: 9,
    review:
      "The stay was very nice. A Bijou, surrounded by nature! Great for relaxing!",
    stars: 4,
  },
  {
    userId: 20,
    spotId: 10,
    imageId: 10,
    review:
      "The place was in a good location but overal an average experience.",
    stars: 3,
  },
  {
    userId: 21,
    spotId: 11,
    imageId: 11,
    review:
      "We had a great time at maras place! Lovely host and beautifully located near the lake but very private. The apartment itself also was very nice, we had lots of space and our dog enjoyed it a lot as well!",
    stars: 5,
  },
  {
    userId: 22,
    spotId: 12,
    imageId: 12,
    review:
      "We had a great stay and the location and views are amazing. Nice breakfast and coffee shop 100m opposite on the cliff. Thank you for a great stay.",
    stars: 4,
  },
  {
    userId: 23,
    spotId: 13,
    imageId: 13,
    review:
      "Thank you for hosting us at the charming apartment!! We loved walking on the Malecón, and the view was amazing. We also really appreciate your help setting up the pick up and drop off at the airport. Again, thanks for an amazing time.",
    stars: 5,
  },
  {
    userId: 24,
    spotId: 14,
    imageId: 14,
    review: "The place was not like the image.",
    stars: 1,
  },
  {
    userId: 25,
    spotId: 15,
    imageId: 15,
    review:
      "Stayed at this place for about a week and was very pleased, host is very nice and was helpful whenever we had questions. Will definitely recommend.",
    stars: 4,
  },
  {
    userId: 26,
    spotId: 16,
    imageId: 16,
    review:
      "It took us 3 hours to get into the building as the host was unresponsive. Furthermore, the place smelled bad.",
    stars: 1,
  },
  {
    userId: 27,
    spotId: 17,
    imageId: 17,
    review: "Great stay! I will recommend it.",
    stars: 5,
  },
  {
    userId: 28,
    spotId: 18,
    imageId: 18,
    review: "All great. Recommended!",
    stars: 5,
  },
  {
    userId: 29,
    spotId: 19,
    imageId: 19,
    review: "The apartment was extremely dirty when we arrived.",
    stars: 2,
  },
  {
    userId: 30,
    spotId: 20,
    imageId: 20,
    review: "Amazing Time. Amazing view. Worth it.",
    stars: 4,
  },
  {
    userId: 2,
    spotId: 20,
    imageId: 21,
    review:
      "I really loved the place, very good location and very clean. Would definitely come back. Thank you.",
    stars: 5,
  },
  {
    userId: 6,
    spotId: 19,
    imageId: 22,
    review:
      "I had a really bad experience. The place was not clean and the other guests would make a lot of noise.",
    stars: 1,
  },
  {
    userId: 10,
    spotId: 18,
    imageId: 23,
    review: "It was great!",
    stars: 4,
  },
  {
    userId: 12,
    spotId: 17,
    imageId: 24,
    review:
      "Very nice apartment, well equipped and owner always quickly responding.",
    stars: 3,
  },
  {
    userId: 13,
    spotId: 16,
    imageId: 25,
    review:
      "Very nice little apartment, hostess very nice and we would book again immediately.",
    stars: 5,
  },
  {
    userId: 14,
    spotId: 15,
    imageId: 26,
    review:
      "Very well equipped apartment and sparkling clean. Well-maintained ambiance, good location, access to public transport and very quiet, both outside and inside. Nice hosts.",
    stars: 5,
  },
  {
    userId: 16,
    spotId: 14,
    imageId: 27,
    review: "The place was a lot smaller than what it looked like in images.",
    stars: 3,
  },
  {
    userId: 17,
    spotId: 13,
    imageId: 28,
    review:
      "Welcoming host, apartment as described, ideal location for visiting the city! I highly recommend this apartment :)",
    stars: 4,
  },
  {
    userId: 18,
    spotId: 12,
    imageId: 29,
    review:
      "We'd love to come back! We felt very comfortable. Everything was clean and cozy. The location is also very central and above all quiet.",
    stars: 5,
  },
  {
    userId: 20,
    spotId: 11,
    imageId: 30,
    review: "Very clean and tighty, felt right at home.",
    stars: 4,
  },
  {
    userId: 21,
    spotId: 10,
    imageId: 31,
    review: "The environment is clean and the hosts are friendly.",
    stars: 5,
  },
  {
    userId: 22,
    spotId: 9,
    imageId: 32,
    review: "Great place and great location!",
    stars: 4,
  },
  {
    userId: 23,
    spotId: 8,
    imageId: 33,
    review: "Would not recommend, the host was very impolite.",
    stars: 5,
  },
  {
    userId: 24,
    spotId: 7,
    imageId: 34,
    review: "This was paradise in full swing! Thank you.",
    stars: 4,
  },
  {
    userId: 25,
    spotId: 6,
    imageId: 35,
    review: "Was not the best of experiences.",
    stars: 2,
  },
  {
    userId: 26,
    spotId: 5,
    imageId: 36,
    review:
      "The space is convenient, clean in an incredible spot with a great view. Everything was as you see it in the photos.",
    stars: 5,
  },
  {
    userId: 27,
    spotId: 4,
    imageId: 37,
    review:
      "It was so nice. The area around the neighborhood was quiet and friendly. The station wasn't far away, so I was able to have a comfortable trip!",
    stars: 4,
  },
  {
    userId: 28,
    spotId: 3,
    imageId: 38,
    review:
      "If this is available book it, you won't regret it. Most amazing view ever, super clean and made to feel welcome. Very nice place, and easy to work with.",
    stars: 4,
  },
  {
    userId: 29,
    spotId: 2,
    imageId: 39,
    review:
      "This Airbnb is probably one of my favorites. It was lovely. And perfect for our kiddos. Highly recommend and hope to be back.",
    stars: 5,
  },
  {
    userId: 30,
    spotId: 1,
    imageId: 40,
    review: "Great stay will stay their everytime I come back.",
    stars: 5,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await Review.bulkCreate(validReviews, {
        validate: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  },
};
