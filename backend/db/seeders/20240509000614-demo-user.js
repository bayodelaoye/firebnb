"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

const validUsers = [
  {
    firstName: "Charlotte",
    lastName: "Franklin",
    email: "charlotte.franklin@example.com",
    username: "charfrank34",
    hashedPassword: bcrypt.hashSync("bJ4*(,fGTU~z"),
  },
  {
    firstName: "Dane",
    lastName: "Kirsch",
    email: "dkirsch0@furl.net",
    username: "dkirsch0",
    hashedPassword: bcrypt.hashSync("tA4>cvTya`x|$,"),
  },
  {
    firstName: "Guilbert",
    lastName: "Jakubovsky",
    email: "gjakubovsky1@digg.com",
    username: "gjakubovsky1",
    hashedPassword: bcrypt.hashSync("uG6|E}$=Rq"),
  },
  {
    firstName: "Colet",
    lastName: "Rummins",
    email: "crumminsa@paypal.com",
    username: "crumminsa",
    hashedPassword: bcrypt.hashSync("kL1/{L3bV3"),
  },
  {
    firstName: "Tatiania",
    lastName: "Fishbourne",
    email: "tfishbourneb@hubpages.com",
    username: "tfishbourneb",
    hashedPassword: bcrypt.hashSync("xC9}yM8i"),
  },
  {
    firstName: "Jazmin",
    lastName: "Fallowfield",
    email: "jfallowfieldc@google.cn",
    username: "jfallowfieldc",
    hashedPassword: bcrypt.hashSync("bU3|QbQ**w"),
  },
  {
    firstName: "Pepe",
    lastName: "Fisby",
    email: "pfisbyd@altervista.org",
    username: "pfisbyd",
    hashedPassword: bcrypt.hashSync("eZ3<_oX%`b"),
  },
  {
    firstName: "Emery",
    lastName: "Lansdowne",
    email: "elansdownee@google.com.au",
    username: "elansdownee",
    hashedPassword: bcrypt.hashSync("pI5?_Uj5}a"),
  },
  {
    firstName: "Grant",
    lastName: "Sands",
    email: "gsandsf@csmonitor.com",
    username: "gsandsf",
    hashedPassword: bcrypt.hashSync("gD9,682d%>g"),
  },
  {
    firstName: "Leanna",
    lastName: "Shimmin",
    email: "lshimming@china.com.cn",
    username: "lshimming",
    hashedPassword: bcrypt.hashSync("uG4`6Aq/=@o"),
  },
  {
    firstName: "Maddy",
    lastName: "Americi",
    email: "mamericih@drupal.org",
    username: "mamericih",
    hashedPassword: bcrypt.hashSync("lW5%asgIUd"),
  },
  {
    firstName: "Winfred",
    lastName: "Winspeare",
    email: "wwinspearei@hexun.com",
    username: "wwinspearei",
    hashedPassword: bcrypt.hashSync("nF8}f!+`HBF4"),
  },
  {
    firstName: "Homere",
    lastName: "McCotter",
    email: "hmccotterj@vinaora.com",
    username: "hmccotterj",
    hashedPassword: bcrypt.hashSync("jS2@lK<9,v"),
  },
  {
    firstName: "Meagan",
    lastName: "Siddell",
    email: "msiddellk@thetimes.co.uk",
    username: "msiddellk",
    hashedPassword: bcrypt.hashSync("dY1#bi~m"),
  },
  {
    firstName: "Wendel",
    lastName: "Gent",
    email: "wgentl@cmu.edu",
    username: "wgentl",
    hashedPassword: bcrypt.hashSync("vR2}H>~Fo|"),
  },
  {
    firstName: "Nara",
    lastName: "Garter",
    email: "ngarterm@dailymotion.com",
    username: "ngarterm",
    hashedPassword: bcrypt.hashSync("hJ4**73/NH+>Y!G"),
  },
  {
    firstName: "Hilliary",
    lastName: "Joburn",
    email: "hjoburnn@topsy.com",
    username: "hjoburnn",
    hashedPassword: bcrypt.hashSync("rW7,(%rpmO"),
  },
  {
    firstName: "Cristina",
    lastName: "Blonfield",
    email: "cblonfieldo@nsw.gov.au",
    username: "cblonfieldo",
    hashedPassword: bcrypt.hashSync("fW0FBgcY>uXW$"),
  },
  {
    firstName: "Archie",
    lastName: "Tydd",
    email: "atyddp@tripod.com",
    username: "atyddp",
    hashedPassword: bcrypt.hashSync("vT3!e(K~ebxm"),
  },
  {
    firstName: "Julita",
    lastName: "Sturror",
    email: "jsturrorq@si.edu",
    username: "jsturrorq",
    hashedPassword: bcrypt.hashSync("dP6~B6Y|59|.w~"),
  },
  {
    firstName: "Philis",
    lastName: "Kilfoyle",
    email: "pkilfoyler@a8.net",
    username: "pkilfoyler",
    hashedPassword: bcrypt.hashSync("qL2+K9it5BM~+*"),
  },
  {
    firstName: "Sella",
    lastName: "Sharp",
    email: "ssharps@macromedia.com",
    username: "ssharps",
    hashedPassword: bcrypt.hashSync("qH5?Cs8mLp%x"),
  },
  {
    firstName: "Kippy",
    lastName: "Leavens",
    email: "kleavenst@topsy.com",
    username: "kleavenst",
    hashedPassword: bcrypt.hashSync("mK5$gZx&z"),
  },
  {
    firstName: "Dag",
    lastName: "Pallaske",
    email: "dpallaskeu@icio.us",
    username: "dpallaskeu",
    hashedPassword: bcrypt.hashSync("jW0*z=pU&"),
  },
  {
    firstName: "Felike",
    lastName: "McCaster",
    email: "fmccasterv@com.com",
    username: "fmccasterv",
    hashedPassword: bcrypt.hashSync("lT7%IQ2_.g98Q{3"),
  },
  {
    firstName: "Kat",
    lastName: "Sayward",
    email: "ksaywardw@edublogs.org",
    username: "ksaywardw",
    hashedPassword: bcrypt.hashSync("nV2@+g'9WWrhD|(n"),
  },
  {
    firstName: "Jammie",
    lastName: "Shute",
    email: "jshutex@shinystat.com",
    username: "jshutex",
    hashedPassword: bcrypt.hashSync("pZ5@~i_bVN`wpM"),
  },
  {
    firstName: "Sibyl",
    lastName: "Gemmell",
    email: "sgemmelly@dot.gov",
    username: "sgemmelly",
    hashedPassword: bcrypt.hashSync("nZ6=#_vI+zU'(7"),
  },
  {
    firstName: "Flin",
    lastName: "Laviste",
    email: "flavistez@home.pl",
    username: "flavistez",
    hashedPassword: bcrypt.hashSync("vG8<,<bNR3%"),
  },
  {
    firstName: "Linn",
    lastName: "Rimell",
    email: "lrimell12@amazon.com",
    username: "lrimell12",
    hashedPassword: bcrypt.hashSync("qW0(T`)5>"),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await User.bulkCreate(validUsers, {
        validate: true,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["charfrank34", "dkirsch0", "gjakubovsky1"] },
      },
      {}
    );
  },
};
