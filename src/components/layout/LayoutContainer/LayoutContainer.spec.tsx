import { shallow } from 'enzyme';
import * as React from 'react';
import LayoutContainer from './LayoutContainer';
import LayoutRow from '../LayoutRow/LayoutRow';
import LayoutCol from '../LayoutCol/LayoutCol';

describe('LayoutContainer', () => {
  it('should render className in props', () => {
    const wrapper = shallow(
      <LayoutContainer className="my-container">
        <LayoutRow className="my-row">
          <LayoutCol className="my-cell">hello</LayoutCol>
        </LayoutRow>
      </LayoutContainer>);

    expect(wrapper.find('.my-container')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render using componentClass in props', () => {
    const wrapper = shallow(
      <LayoutContainer className="my-container" componentClass={'b'}>
        <LayoutRow className="my-row">
          <LayoutCol className="my-cell">hello</LayoutCol>
        </LayoutRow>
      </LayoutContainer>);

    expect(wrapper.find('b.my-container')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});