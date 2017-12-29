var mysql      = require('mysql');
var connection = mysql.createConnection({
  user     : 'root',
  password : '',
  database : 'movieList'
});
 
connection.connect();

var queryDB = (queryStr, queryArgs, callback) => {
  connection.query(queryStr, queryArgs, function (error, results) {
    callback(error, results);
  });
}

module.exports = {
  insertMany: (movies, callback) => {
    var moviesArray = [];
    movies.forEach(({id, vote_average, title, poster_path, overview, release_date}) => {
      moviesArray.push([id, vote_average, title, poster_path, overview, release_date]);
    })

    var queryStr = 'INSERT into movies (id, vote_average, title, poster_path, overview, release_date) VALUES ? \
                  ON DUPLICATE key UPDATE id = id';

    // INSERT INTO users (username) VALUES (?) ON DUPLICATE key UPDATE username = username;
    
    queryDB(queryStr, [moviesArray], callback);
  },

  selectAll: (callback) => {
    var queryStr = 'SELECT * FROM movies';
    var queryArgs = [];

    queryDB(queryStr, queryArgs, callback);
  },

  insertOne: (newMovie, callback) => {
    var queryStr = 'INSERT into movies SET ?';
    console.log('newMovie here -->', newMovie);

    queryDB(queryStr, newMovie, callback);
  }
}


// const movies = [{ 
//        id: 376658,
//        vote_average: 6.7,
//        title: 'Love Beats Rhymes',    
//        poster_path: '/40DTqW72Igok7ilNJ5ju6HWYhpi.jpg',
//        overview: 'An aspiring hip-hop artist discovers the world of slam poetry.',
//        release_date: '2017-12-01' },
//      { 
//        id: 446354,
//        vote_average: 6.7,
//        title: 'The Post',
//        poster_path: '/5765ORvdKVX5bWmhEjjiOqLk3TH.jpg',
//        overview: 'A cover-up that spanned four U.S. Presidents pushed the country\'s first female newspaper publisher and a hard-driving editor to join an unprecedented battle between journalist and government. Inspired by true events.',
//        release_date: '2017-12-22' } ]

// module.exports.insertMany(movies, (error, results) => console.log('done', error, results));
// module.exports.selectAll((error, results) => console.log('found: ', results, error));

