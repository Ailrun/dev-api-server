import { parseConfig } from './parseConfig';
import { runServer } from './runServer';
import { error, info } from './utilities';
import { watchFile } from './watchFile';

const singleRun = async (configFile: string) => {
  try {
    return runServer(await parseConfig(configFile))
  } catch (e) {
    if (e instanceof Error) {
      console.error(error(e.message));
    }
    return null;
  }
}

export const run = async (configFile: string, watch?: boolean) => {
  if (watch) {
    let close: (() => Promise<{}>) | null =
      await singleRun(configFile);

    watchFile(configFile, async () => {
      console.info(info(">> Reloading..."));
      try {
        if (close != null) {
          await close();
        }
      } catch (e) {
        if (e instanceof Error) {
          console.error(error(e.message));
        }
      }

      close = await singleRun(configFile);
    });
  } else {
    singleRun(configFile);
  }
};
