const express = require("express");
const knex = require("../db/client");
const router = express.Router();

router.get("/", (req, res) => {
  // //   knex("strata_corporations")
  // //     .select("*")
  // //     .then((data) => {
  // //       data.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)
  
        res.render("profile/new",{
          // strata_corporations: data,
        });
  // //     });
  });

router.get("/new", (req, res) => {
  const profileParams = {
    // image_url: req.body.imageUrl,
    // content: req.body.content,
    // username: res.locals.username
  };
  res.render("profile/new",{
    // strata_corporations: data,
  });
})

router.get("/show", (req, res) => {
  const profileParams = {
    // image_url: req.body.imageUrl,
    // content: req.body.content,
    // username: res.locals.username
  };
  res.render("profile/show",{
    // strata_corporations: data,
  });
})

router.get("/show_us", (req, res) => {
  const profileParams = {
    // image_url: req.body.imageUrl,
    // content: req.body.content,
    // username: res.locals.username
  };
  res.render("profile/show_us",{
    // strata_corporations: data,
  });
})


router.get("/show_vehicles", (req, res) => {
  const profileParams = {
    // image_url: req.body.imageUrl,
    // content: req.body.content,
    // username: res.locals.username
  };
  res.render("profile/show_vehicles",{
    // strata_corporations: data,
  });
})

router.get("/show_destinations", (req, res) => {
  const profileParams = {
    // image_url: req.body.imageUrl,
    // content: req.body.content,
    // username: res.locals.username
  };
  res.render("profile/show_destinations",{
    // strata_corporations: data,
  });
})

router.get("/show_unit", (req, res) => {
  const profileParams = {
    // image_url: req.body.imageUrl,
    // content: req.body.content,
    // username: res.locals.username
  };
  res.render("profile/show_unit",{
    // strata_corporations: data,
  });
})

router.get("/show_lifestyle", (req, res) => {
  const profileParams = {
    // image_url: req.body.imageUrl,
    // content: req.body.content,
    // username: res.locals.username
  };
  res.render("profile/show_lifestyle",{
    // strata_corporations: data,
  });
})

router.get("/show_financial", (req, res) => {
  const profileParams = {
    // image_url: req.body.imageUrl,
    // content: req.body.content,
    // username: res.locals.username
  };
  res.render("profile/show_financial",{
    // strata_corporations: data,
  });
})


// router.get("/index", (req, res) => {
//   knex("strata_corporations")
//     .select("*")
//     .then((data) => {
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










// // strata_corporation show page. id is dynamic url parameter
// router.get("/:id", (req, res) => {
//   // if we go to localhost:4535/articles/6007
//   // req.params looks like this object: 
//   // {
//   //   id: 6007
//   // }
//   knex("strata_corporations")
//     .select("*")
//     .where({id: req.params.id})
//     .then((data) => {
//       res.render("strata_corporation/show", {
//         strata_corporation: data[0], //set the local variable strata_corporation to the queried strata_corporation
//       })
//     })
// })

// router.delete("/:id", (req, res) => {
//   knex("strata_corporations")
//     .where({id: req.params.id})
//     .delete()
//     .then((data) => {
//       res.redirect("/stratas")
//     })
// })

// router.get("/:id/edit", (req, res) => {

//   knex("strata_corporations")
//     .select("*")
//     .where({id: req.params.id })
//     .then((data) => {
//       res.render("strata_corporation/edit", {
//         strata_corporation: data[0]
//       })
//     })
// })

// router.patch("/:id", (req, res) => {
//   const strataCorporationParams = {
//     name: req.body.name,
//     strata_plan_number: req.body.strata_plan_number,
//     title_to_land: req.body.title_to_land,
//     status: req.body.status,
//   };
//   knex("strata_corporations")
//     .where({id: req.params.id})
//     .update(strataCorporationParams)
//     .returning('id')
//     .then((data) => {
//       res.redirect(`/stratas/${data[0]}`);
//     });
// });






// router.get("/new", (req, res) => {
//   if (res.locals.username && res.locals.username.length > 0) {
//     res.render("./clucks/new", {});
//   }
// });



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