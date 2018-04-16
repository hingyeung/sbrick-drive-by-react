import LayoutCell from './LayoutCell';
import { shallow, mount } from 'enzyme';
import * as React from 'react';

describe('LayoutCell', () => {
  const sizes = ['sm', 'md', 'lg', 'xl'];
  it('should render extraClassNames in props', () => {
    const wrapper = shallow(<LayoutCell extraClassNames="hello">Hello</LayoutCell>);

    expect(wrapper.find('.hello')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  sizes.forEach(size =>
    [1, 12].forEach(width =>
      it(`should set ${size} screen column number when ${size} prop is set`, () => {
        const sizeProps = {[size]: width};
        const wrapper = shallow(
          <LayoutCell extraClassNames="hello" {...sizeProps}>Hello</LayoutCell>
        );

        expect(wrapper.find('.hello').hasClass(`col-${size}-${width}`)).toBeTruthy();
      })
    )
  );

  sizes.forEach(size =>
    [0, 13].forEach(width =>
      it('should not set ${size} screen column number when ${size} prop out of range', () => {
        const sizeProps = {[size]: width};
        const wrapper = mount(
          <LayoutCell extraClassNames="hello" {...sizeProps}>Hello</LayoutCell>
        );

        hasClassWithPrefix(wrapper, `col-${size}-`);
      })
    )
  );

  // it('should set medium screen column number when md prop is set', () => {
  //   const wrapper = shallow(
  //     <LayoutCell extraClassNames="hello" md={6}>Hello</LayoutCell>
  //   );
  //
  //   expect(wrapper.find('.hello').hasClass('col-md-6')).toBeTruthy();
  // });
  //
  // it('should not set medium screen column number when md prop out of range', () => {
  //   const wrapper = mount(
  //     <LayoutCell extraClassNames="hello" md={13}>Hello</LayoutCell>
  //   );
  //
  //   hasClassWithPrefix(wrapper, 'col-md-');
  // });

  const hasClassWithPrefix = (wrapper: any, prefix: string) => {
    expect(
      wrapper.find('.hello').prop('className').trim().split(/\s+/).filter((thisClass: string) =>
        thisClass.indexOf(prefix) > -1)
    ).toEqual([]);
  };
});