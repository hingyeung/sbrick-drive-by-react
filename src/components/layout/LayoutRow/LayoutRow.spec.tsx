import LayoutRow from './LayoutRow';
import LayoutCell from '../LayoutCell/LayoutCell';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('LayoutRow', () => {
  it('should render extraClassNames in props', () => {
    const wrapper =
      shallow(<LayoutRow extraClassNames="my-row"><LayoutCell extraClassNames="my-cell">Cell</LayoutCell></LayoutRow>);

    expect(wrapper.find('.my-row')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });
});