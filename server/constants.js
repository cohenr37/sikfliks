
const INSERT_THEATERS = 'INSERT INTO theaters (name, address, rating) VALUES ?';
const SELECT_THEATERS = 'SELECT * FROM theaters';
const CLEAR_THEATERS = 'TRUNCATE TABLE theaters';
const INSERT_MOVIES = 'INSERT INTO movies (title, imdbrating, released, rated, genre, poster, imdbID) VALUES ?';
const SELECT_MOVIES = 'SELECT * FROM movies';
const CLEAR_MOVIES = 'TRUNCATE TABLE movies';
const SELECT_SHOWTIMES = `SELECT title, theater, address, DATE_FORMAT(showDate, "%M %D, %Y") AS date, TIME_FORMAT(showTime,"%h:%i %p") AS time FROM showtimes`;
module.exports = {
  INSERT_THEATERS,
  SELECT_THEATERS,
  CLEAR_THEATERS,
  INSERT_MOVIES,
  SELECT_MOVIES,
  CLEAR_MOVIES,
  SELECT_SHOWTIMES
}
