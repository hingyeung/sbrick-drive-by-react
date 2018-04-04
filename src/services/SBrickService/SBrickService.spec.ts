import { drive } from './SBrickService';
import axios from 'axios';
import { SBrickCommand } from '../../models/SBrickCommand';

jest.mock('axios');

describe('SBrickService', () => {
  it('should send GET request to server', function () {
    axios.get = jest.fn().mockImplementation((url: string) => Promise.resolve({}));
    drive(SBrickCommand.forward);

    expect(axios.get).toBeCalledWith('http://localhost:3030/drive/forward');
  });

  it('should invoke success callback on success', async () => {
    const resp = {status: 200, data: {}};
    axios.get = jest.fn().mockImplementation((url: string) => Promise.resolve(resp));
    drive(SBrickCommand.forward).then((data) => {
      expect(data).toEqual(resp);
    }).catch((err) => {
      fail('promise should not be rejected');
    });
  });

  it('should invoke error callback on error', async () => {
    const error = {error: 'something is wrong'};
    axios.get = jest.fn().mockImplementation((url: string) => Promise.reject(error));
    drive(SBrickCommand.forward).then((data) => {
      fail('promise should not be resolved');
    }).catch((err) => {
      expect(err).toEqual(error);
    });
  });
});