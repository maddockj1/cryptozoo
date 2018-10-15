exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cryptids').del()
    .then(function() {
      // Inserts seed entries
      return knex('cryptids').insert([{
          id: 1,
          name: 'Chupacabra',
          bio: 'A goat-sucker from Puerto Rico, perhaps an escaped lab experiment.',
          photo: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Chupacabra_%28artist%27s_rendition%29.jpg'
        },
        {
          id: 2,
          name: 'Kraken',
          bio: 'Legendary cephalopod-like sea monster of giant size that is said to dwell off the coasts of Norway and Greenland',
          photo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Colossal_octopus_by_Pierre_Denys_de_Montfort.jpg'
        },
        {
          id: 3,
          name: 'Trunko',
          bio: 'An anteating narwhal-icorn who one day washed up on shore lookin all like Snufalufagus',
          photo: 'https://www.sciencesource.com/Doc/SCS/Media/TR1_WATERMARKED/5/a/0/7/SS2637697.jpg?d63643086495'
        },
        {
          id: 4,
          name: 'Classroom Sloth',
          bio: 'Rarely seen in mid-movement, he haunts the halls of Galvanize providing much needed encouragement to the students and staff.',
          photo: 'https://veryfunnypics.eu/wp-content/uploads/2015/04/funny-pictures-sloth-in-class.jpg'
        },
      ])
    })
}