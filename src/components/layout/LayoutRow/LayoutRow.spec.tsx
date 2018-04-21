import LayoutRow from './LayoutRow';
import { shallow } from 'enzyme';
import * as React from 'react';
import LayoutCol from '../LayoutCol/LayoutCol';

describe('LayoutRow', () => {
  it('should render className in props', () => {
    const wrapper =
      shallow(<LayoutRow className="my-row"><LayoutCol className="my-cell">Cell</LayoutCol></LayoutRow>);

    expect(wrapper.find('.my-row')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should preserve children element', () => {
    const wrapper =
      shallow(<LayoutRow><div id="find-me">ABC</div></LayoutRow>);
    expect(wrapper.find('#find-me').contains('ABC')).toBeTruthy();
  });

  it('should render using specified componentClass in props', () => {
    const wrapper =
      shallow(
        <LayoutRow className="my-row" componentClass={'b'}>
          <LayoutCol className="my-cell">
            Col
          </LayoutCol>
        </LayoutRow>);

    expect(wrapper.find('b.my-row')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});