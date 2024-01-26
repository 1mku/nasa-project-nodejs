import path from 'node:path';

const ROOT_PATH = process.cwd();

export const PUBLIC_FOLDER_PATH = path.join(ROOT_PATH, 'public');
export const DATA_CSV_PATH = path.join(ROOT_PATH, 'data', 'kepler_data.csv');
