const path = require('path');

const PUBLIC_FOLDER_PATH = path.join(__dirname, '..', 'public');
const DATA_CSV_PATH = path.join(__dirname, '..', 'data', 'kepler_data.csv');

module.exports = {
    PUBLIC_FOLDER_PATH,
    DATA_CSV_PATH
}