
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reports').del()
    .then(function () {
      // Inserts seed entries
      return knex('reports').insert([
        {id: 1, name: 'Joe Bob Jenkins', content: 'Last Saturday morning, Joe Bob was tending to his sheep when all of a sudden, a blood sucking demon dropped out of a tree and stole 3 sheep, his truck, his wife, kids and cash under his mattress. He reported the incident to police that night and seemed sad.', reported_at: new Date(2018, 10, 13, 9, 22), location: 'Oaxaca, MX', cryptid_id: 1},
        {id: 2, name: 'Sally Mae', content: 'Sally was collecting seashells by the seashore when she noticed a furry whale looking thing stinking up the whole joint. She took photos but used inferior film so the shots came out blurry.', reported_at: new Date(2017, 3, 12), location: 'Playa Bonita, Bermuda', cryptid_id: 3},
        {id: 3, name: 'Pete', content: 'Pete was sailing on the high seas outside Greenland when his vessel was overcame with the power of mighty tentacles. His crew managed to confuse it with a comically small net, and it ran off into the deep to await his next ambush.', reported_at: new Date(1880, 02, 13, 9, 14), location: 'Undersea Cave of Horrors, Nuuk, Greenland', cryptid_id: 2},
        {id: 4, name: 'Craig', content: 'Craig recently said that the Classroom Sloth was stuck to his face with its magnetic hands.  Which leads us to believe that Craig may just be a programming robot from space and not be actually human.', reported_at: new Date(3018, 10, 13, 9, 22), location: 'Galvanize, Boulder, Colorado, United States, Earth', cryptid_id: 4},
      ])
    })
}
