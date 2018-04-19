import LayoutRow from './LayoutRow';
import { shallow } from 'enzyme';
import * as React from 'react';
import LayoutCol from '../LayoutCell/LayoutCol';

describe('LayoutRow', () => {
  it('should render className in props', () => {
    const wrapper =
      shallow(<LayoutRow className="my-row"><LayoutCol className="my-cell">Cell</LayoutCol></LayoutRow>);

    expect(wrapper.find('.my-row')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render using specified componentClass in props', () => {
    const wrapper =
      shallow(
        <LayoutRow className="my-row" componentClass={'b'}>
          <LayoutCol className="my-cell">
            Col
          </LayoutCol>
        </LayoutRow>);

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('b.my-row')).toHaveLength(1);
  });
});