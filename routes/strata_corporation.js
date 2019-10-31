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
//     .limit(15)
//     .then((data) => {
//       data.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)

//       res.render("strata_corporation/index",{
//         strata_corporations: data,
//       });
//     });
// });


// knex('users').orderBy([{ column: 'email' }, { column: 'age', order: 'desc' }])
// Outputs:
// select * from "users" order by "email" asc, "age" desc


router.get("/index", (req, res) => {
  knex('strata_corporations')
    .leftJoin('strata_images', 'strata_corporations.id', '=', 'strata_images.strata_corporation_id')
    .select(
      'strata_corporations.id',
      'strata_corporations.name',
      'strata_corporations.status',
      'strata_corporations.strata_plan_number', 
      'strata_images.image_url',
      'strata_images.order')
    .whereNotNull('strata_corporations.strata_plan_number')
    .andWhereNot('strata_corporations.strata_plan_number', '')
    .orderBy([{ column: 'strata_corporations.status', order: 'desc'}, { column: 'strata_corporations.id' }, { column: 'strata_images.order'}])
    .limit(15)
    .then((data) => {

      data.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)

      let strata_corporations = [], 
          strata_corporation, 
          first_time = true, 
          current_strata_corporation_id = 0,
          strata_grade,
          strata_pros,
          strata_cons;

      for (let i = 0; i < data.length; i++) {
        if (data[i].id != current_strata_corporation_id) {
          if (first_time) {
            first_time = false;
          } else {
            strata_corporations.push(strata_corporation)
          }

          //fake data

          if (data[i].id === '4396'){
            strata_grade = "A+";
            strata_pros = [
              "15 min. train to ABC Company",
              "5 min. walk to cafe",
              "Accessible Facilities"
            ];
            strata_cons = [
              "2 BR/1 ba ~115% of budget",
              "25 min. ride to CodeCore",
              "No garden available"
            ];
          } else {
            strata_grade = "B";
            strata_pros = [
              "10 min. drive to work",
              "On-site Gym",
              "Non-smoking building"
            ];
            strata_cons = [
              "2 BR/1 ba ~105% of budget",
              "No on-site hot tub",
              "No on-site guest suite"
            ];
          }           
             
          strata_corporation = {
            id: data[i].id,
            name: data[i].name,
            strata_plan_number: data[i].strata_plan_number,
            image_urls: [],
            strata_grade: strata_grade,
            strata_pros: strata_pros,
            strata_cons: strata_cons
          };
          current_strata_corporation_id = data[i].id
        }
        if (data[i].image_url) {
          strata_corporation.image_urls.push(data[i].image_url)
        }


      }

      if (strata_corporation.id) {
        strata_corporations.push(strata_corporation)  //last one
      }
      
      // data.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)

      res.render("strata_corporation/index",{
        // strata_corporations: data,
        strata_corporations: strata_corporations
      });
    });
});

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
        id: 4396,
        name: "Koret Lofts",
        strata_plan_number: "BCS2025",
        image_url: "https://www.vancitylofts.com/images/2013/04/17/exterior.jpg&w=576",
        strata_grade: "A+",
        strata_pros: [
          "15 min. train to ABC Company",
          "5 min. walk to cafe",
          "Accessible Facilities",
          "Olive allowed",
          "Covered, secure parking",
          "Bike storage room",
        ],
        strata_cons: [
          "2 BR/1 ba ~112% of budget",
          "No garden available",
          "25 min. ride to CodeCore",
          "Smoking unprohibited",
          "No hot tub",
          "No garden"
        ],
        sales_listings: [
          {
            image_url: "https://media.pixilinkserver.com/R/241/43/16/R2414316-1.jpg?s=blu&w=576&h=405&t=y",
            price: "$829,800",	
            grade: "C-",
            bedrooms: "1 bed",
            bathrooms: "1 bath",
            address: "#205"
          },
          {
            image_url: "https://media.pixilinkserver.com/R/240/40/51/R2404051-1.jpg?s=blu&w=576&h=405&t=y",
            price: "$897,000",	
            grade: "D",
            bedrooms: "1 bed",
            bathrooms: "1 bath",
            address: "#402"
          },
          {
            image_url: "https://media.pixilinkserver.com/R/240/71/92/R2407192-1.jpg?s=blu&w=576&h=405&t=y",
            price: "$1,199,000",	
            grade: "C",
            bedrooms: "1 bed",
            bathrooms: "2 baths",
            address: "#310"
          },
          {
            image_url: "https://media.pixilinkserver.com/R/241/43/16/R2414316-1.jpg?s=blu&w=576&h=405&t=y",
            price: "$1,239,000",	
            grade: "B+",
            bedrooms: "2 beds",
            bathrooms: "1 bath",
            address: "#403"
          }          
        ]
      }
      res.render("strata_corporation/show",{
        strata_corporation: data,
      });
  //   });
});

router.get("/", (req, res) => {
  knex("strata_corporations")
    .select("*")
    .then((data) => {
      // data.sort(sortString)
      data.sort((a, b) => (a.created_at > b.created_at) ? -1 : 1)
      res.render("strata_corporation/index",{
        strata_corporations: data,
      });
    });
});

  

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