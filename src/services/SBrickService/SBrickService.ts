import { SBrickCommand } from '../../models/SBrickCommand';
import { getConfigForEnv } from '../ConfigService/ConfigService';
import axios from 'axios';

const sendRequest = (url: string) => (resolve: any, reject: any) => {
  axios.get(url).then((response) => {
      resolve(response);
    }
  ).catch((err) => {
      reject(err);
    }
  );
};

export const drive = (command: SBrickCommand) => {
  const config = getConfigForEnv();
  const url = config.sBrickDrive.urlPrefix + '/drive/' + SBrickCommand[command];
  return new Promise(sendRequest(url));
};