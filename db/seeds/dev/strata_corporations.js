const faker = require("faker");

const createFakeStrataCorporation = (strata_plan_num) => ({
  name: "The " + faker.address.streetName(), 
  strata_plan_number: strata_plan_num, 
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
  let strata_plan_num, strata_plan_num_index, fakeStratas = [], fakeStrata
  const number_of_strata_corporations = 50;
  const strata_plan_num_prefixes = ["LMS", "NWS", "EPS", "VAS", "BCS"];

  await knex('strata_corporations').del()  

  for (let i = 0; i < number_of_strata_corporations; i++) {
    const strata_plan_num_index = Math.floor(Math.random()*5);
    const strata_plan_num = strata_plan_num_prefixes[strata_plan_num_index]+ Math.ceil(Math.random() * 10000).toString();
    const fakeStrata = createFakeStrataCorporation(strata_plan_num)
    await knex('strata_corporations').insert(fakeStrata)
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

    // knex.insert({
    //   first_name: firstName,
    //   last_name: lastName,
    //   email: email,
    //   phone_number: phoneNumber
    // })
    // .returning('id')
    // .into('person')
    // .then(function (id) {
    //   // use id here
    // });






  }

  
};

// exports.seed = async function(knex, Promise) {
//   let strata_plan_num, strata_plan_num_index, fakeStratas = [];
//   const number_of_strata_corporations = 50;
//   const strata_plan_num_prefixes = ["LMS", "NWS", "EPS", "VAS", "BCS"];
  
//   for (let i = 0; i < number_of_strata_corporations; i++) {
//     strata_plan_num_index = Math.floor(Math.random()*5);
//     strata_plan_num = strata_plan_num_prefixes[strata_plan_num_index] + Math.ceil(Math.random() * 10000).toString();
//     fakeStratas.push(createFakeStrata(strata_plan_num));
//   }
//   await knex('strata_corporations').del()
//   await knex('strata_corporations').insert(fakeStratas)
// };
