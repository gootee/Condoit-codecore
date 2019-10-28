const express = require("express");
const knex = require("../db/client");
const router = express.Router();
// let sortString = "(a, b) => (a.created_at > b.created_at)"
// let sortString = "(a, b) => (a.strata_plan_number > b.strata_plan_number)"
// sortString = "(a, b) => (a.created_at > b.created_at) ? -1 : 1"

// debugger

// router.get("/index", (req, res) => {
//   knex("strata_corporations")
//     .select("*")
//     .whereNotNull('strata_plan_number')
//     .andWhereNot('strata_plan_number', '')
//     .then((data) => {
//       data.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)

//       res.render("strata_corporation/index",{
//         strata_corporations: data,
//       });
//     });
// });

// router.get("/index", (req, res) => {
//   knex('strata_corporations')
//     .leftJoin('strata_images', 'strata_corporations.id', '=', 'strata_images.strata_corporation_id')
//     .select(
//       'strata_corporations.id',
//       'strata_corporations.name',
//       'strata_corporations.strata_plan_number', 
//       'strata_images.image_url')
//     .whereNotNull('strata_corporations.strata_plan_number')
//     .andWhereNot('strata_corporations.strata_plan_number', '')
//     .then((data) => {
//       data.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)

//       res.render("strata_corporation/index",{
//         strata_corporations: data,
//       });
//     });
// });

router.get("/show", (req, res) => {
  // knex('strata_corporations')
  //   .leftJoin('strata_images', 'strata_corporations.id', '=', 'strata_images.strata_corporation_id')
  //   .select(
  //     'strata_corporations.id',
  //     'strata_corporations.name',
  //     'strata_corporations.strata_plan_number', 
  //     'strata_images.image_url')
  //   .whereNotNull('strata_corporations.strata_plan_number')
  //   .andWhereNot('strata_corporations.strata_plan_number', '')
  //   .then((data) => {
  //     data.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)
      const data = {
        // id: 4396,
        // number: "BR549",
        // name: "Koret",
        strata_plan_number: "BCS2025",
        sales_listing_grade: "B-",
        sales_listing_pros: [
          "15 min. ride to work",
          "5 min. walk to cafe",
          "Accessible Facilities",
          "In-unit laundry",
          "On-site Gym",
          "On-site Storage Locker"
        ],
        sales_listing_cons: [
          "2 BR/1 ba - 121% of budget",
          "No garden available",
          "No dishwasher",
          "No fireplace",
          "Smoking allowed in building",
          "No on-site hot tub"
        ]
      }
      res.render("sales_listing/show",{
        sales_listing: data,
      });
  //   });
});

// router.get("/", (req, res) => {
//   knex("strata_corporations")
//     .select("*")
//     .then((data) => {
//       // data.sort(sortString)
//       data.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)
//       res.render("strata_corporation/index",{
//         strata_corporations: data,
//       });
//     });
// });

  

//   knex({ a: 'table', b: 'table' })
//   .select({
//     aTitle: 'a.title',
//     bTitle: 'b.title'
//   })
//   .whereRaw('?? = ??', ['a.column_1', 'b.column_2'])
// Outputs:
// select `a`.`title` as `aTitle`, `b`.`title` as `bTitle` 
// from `table` as `a`, `table` as `b` 
// where `a`.`column_1` = `b`.`column_2`










// strata_corporation show page. id is dynamic url parameter
router.get("/:id", (req, res) => {
  // if we go to localhost:4535/articles/6007
  // req.params looks like this object: 
  // {
  //   id: 6007
  // }
  knex("strata_corporations")
    .select("*")
    .where({id: req.params.id})
    .then((data) => {
      res.render("strata_corporation/show", {
        strata_corporation: data[0], //set the local variable strata_corporation to the queried strata_corporation
      })
    })
})

router.delete("/:id", (req, res) => {
  knex("strata_corporations")
    .where({id: req.params.id})
    .delete()
    .then((data) => {
      res.redirect("/stratas")
    })
})

router.get("/:id/edit", (req, res) => {
  knex("strata_corporations")
    .select("*")
    .where({id: req.params.id })
    .then((data) => {
      res.render("strata_corporation/edit", {
        strata_corporation: data[0]
      })
    })
})

router.patch("/:id", (req, res) => {
  const strataCorporationParams = {
    name: req.body.name,
    strata_plan_number: req.body.strata_plan_number,
    title_to_land: req.body.title_to_land,
    status: req.body.status,
  };
  knex("strata_corporations")
    .where({id: req.params.id})
    .update(strataCorporationParams)
    .returning('id')
    .then((data) => {
      res.redirect(`/stratas/${data[0]}`);
    });
});






// router.get("/new", (req, res) => {
//   if (res.locals.username && res.locals.username.length > 0) {
//     res.render("./clucks/new", {});
//   }
// });

// router.post("/new", (req, res) => {
//   const cluckParams = {
//     image_url: req.body.imageUrl,
//     content: req.body.content,
//     username: res.locals.username
//   };

//   // save a cluck to database
//   knex("clucks")
//     .insert(cluckParams)
//     .returning("*")
//     .then((data) => {
//       // res.send(data);
//       res.redirect('/clucks/');
//     });
// });


module.exports = router;