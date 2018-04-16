import { shallow } from 'enzyme';
import * as React from 'react';
import LayoutContainer from './LayoutContainer';
import LayoutRow from '../LayoutRow/LayoutRow';
import LayoutCell from '../LayoutCell/LayoutCell';

describe('LayoutContainer', () => {
  it('should render extraClassNames in props', () => {
    const wrapper = shallow(
      <LayoutContainer extraClassNames="my-container">
        <LayoutRow extraClassNames="my-row">
          <LayoutCell extraClassNames="my-cell">hello</LayoutCell>
        </LayoutRow>
      </LayoutContainer>);

    expect(wrapper.find('.my-container')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});