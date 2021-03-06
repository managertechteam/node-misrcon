/**
 * Name: getAllServerData
 * Created by chris on 4/30/2017.
 * Description:
 */
import parseStatus from '../parsers/parseStatus';
import parseSysInfoPQM from '../parsers/parseSysInfoPQM';
import parseSysInfoStats from '../parsers/parseSysInfoStats';
import sendRCONCommandToServer from '../sendRCONCommandToServer';

import { defaultAllData } from '../node-misrcon';

import { IAllData, ICredentials } from '../types';

export default async function getPerfData(options: ICredentials): Promise<IAllData> {
  try {
    // Get status response
    const serverStatusString = await sendRCONCommandToServer({
      ...options,
      command: 'status'
    });
    const status = parseStatus(serverStatusString);

    // get stats
    const statsString = await sendRCONCommandToServer({
      ...options,
      command: 'sysinfo stats'
    });
    const stats = parseSysInfoStats(statsString);

    // get pqm
    const pqmString = await sendRCONCommandToServer({
      ...options,
      command: 'sysinfo pqm'
    });
    const pqm = parseSysInfoPQM(pqmString);

    return { ...defaultAllData, status, stats, pqm };
  } catch (e) {
    throw e;
  }
}
