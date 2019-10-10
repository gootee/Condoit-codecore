const faker = require("faker");

// const createFakeStrataCorporation = (strata_plan_num) => ({
//   name: "The " + faker.address.streetName(), 
//   strata_plan_number: strata_plan_num, 
//   title_to_land: 'freehold', 
//   status: 'completed'
// });

const formatStrataCorporation = (strata_corporation_arr) => ({
  name: strata_corporation_arr[4],
  // name: "The " + faker.address.streetName(), 
  strata_plan_number: strata_corporation_arr[6], 
  title_to_land: 'freehold', 
  status: 'completed'
});

const createFakeStrataSection = (strata_corporation_id, type, status, use_type) => ({
  // name: "The " + faker.address.streetName(), 
  strata_corporation_id: parseInt(strata_corporation_id), 
  type: type,
  status: status,
  use_type: use_type,
  name: ''
});

exports.seed = async function(knex, Promise) {
  // let strata_plan_num, strata_plan_num_index, fakeStratas = [], fakeStrata
  // const strata_plan_num_prefixes = ["LMS", "NWS", "EPS", "VAS", "BCS"];

  await knex('strata_corporations').del()  

  var fs = require('fs');
  let strataCorporations
  if (fs.existsSync('./db/Strata Rank Database.csv')) {
    const data = fs.readFileSync('./db/Strata Rank Database.csv', 'utf8');
    strataCorporations = data.split('\n')
  }

  const number_of_strata_corporations = strataCorporations.length
  let thisStrata
  for (let i = 1; i < number_of_strata_corporations - 1; i++) {
    thisStrata = strataCorporations[i].split(',');
    console.log(i.toString() + " - " + thisStrata[4])
    thisStrata = formatStrataCorporation(strataCorporations[i].split(','));

    await knex('strata_corporations').insert(thisStrata)
      .returning('id')
      .then(async function(id) {
        const strata_section_type = Math.floor(Math.random()*10);
        const fakeStatus = 'active'
        switch (strata_section_type) {
          case 0:
            await knex('strata_sections').insert(createFakeStrataSection(id, 'corporation', fakeStatus, 'commercial'))
            break;
          case 1:
            await knex('strata_sections').insert(createFakeStrataSection(id, 'corporation', fakeStatus, 'residential'))
            await knex('strata_sections').insert(createFakeStrataSection(id, 'tower', fakeStatus, 'residential'))
            await knex('strata_sections').insert(createFakeStrataSection(id, 'townhouses', fakeStatus, 'residential'))
            break;
          case 2:
          case 3:
            await knex('strata_sections').insert(createFakeStrataSection(id, 'corporation', fakeStatus, 'mixed use'))
            await knex('strata_sections').insert(createFakeStrataSection(id, 'residential', fakeStatus, 'residential'))
            await knex('strata_sections').insert(createFakeStrataSection(id, 'commercial', fakeStatus, 'commercial'))
            break;
          case 4:
            await knex('strata_sections').insert(createFakeStrataSection(id, 'corporation', fakeStatus, 'residential'))
            await knex('strata_sections').insert(createFakeStrataSection(id, 'low-rises', fakeStatus, 'residential'))
            await knex('strata_sections').insert(createFakeStrataSection(id, 'townhouses', fakeStatus, 'residential'))
            break;
          default:
            await knex('strata_sections').insert(createFakeStrataSection(id, 'corporation', fakeStatus, 'residential'))
        }
      })
  }
};