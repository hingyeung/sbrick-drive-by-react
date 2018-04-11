import * as React from 'react';
import ControlPanel from './ControlPanel';
import { shallow } from 'enzyme';

describe('ControlPanel', () => {
  it('should call onPlayClick callback when play button is clicked', () => {
    const callback = jest.fn();
    const wrapper = shallow(<ControlPanel onPlayClick={callback} onClearCLick={jest.fn()} />);

    wrapper.find('.control-container__play-btn').simulate('click');

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should call onClearCLick callback when clear button is clicked', () => {
    const callback = jest.fn();
    const wrapper = shallow(<ControlPanel onPlayClick={jest.fn()} onClearCLick={callback} />);

    wrapper.find('.control-container__clear-btn').simulate('click');

    expect(callback).toHaveBeenCalledTimes(1);
  });
});