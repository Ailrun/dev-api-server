import fs from 'fs';

export const watchFile = (configFile: string, cb: () => Promise<void>) => {
  fs.watchFile(configFile, cb);
};
