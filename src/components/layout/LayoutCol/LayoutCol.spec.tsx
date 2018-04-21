import * as React from 'react';
import LayoutCol from './LayoutCol';
import { shallow } from 'enzyme';

describe('LayoutColComponent', () => {
  const hasClassWithPrefix = (wrapper: any, prefix: string) => {
    expect(
      wrapper.find('.hello').prop('className').trim().split(/\s+/).filter((thisClass: string) =>
        thisClass.indexOf(prefix) > -1)
    ).toEqual([]);
  };
  const sizes = ['sm', 'md', 'lg', 'xl'];

  it('should add "row" class to specified component', () => {
    const wrapper = shallow(<LayoutCol className="extra-class">hello</LayoutCol>);
    expect(wrapper.find('.col')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should use componentClass in props as children', () => {
    const wrapper = shallow(<LayoutCol className="extra-class" componentClass={'b'}/>);
    expect(wrapper.find('b').exists()).toBeTruthy();
    expect(wrapper.find('b.col.extra-class')).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass other props to componentClass', () => {
    const wrapper = shallow(
      <LayoutCol
        className="extra-class"
        componentClass={'b'}
        propsForComponent={{A: 'a', B: 'b'}}
      />);
    expect(wrapper.find('b').prop('A')).toEqual('a');
    expect(wrapper.find('b').prop('B')).toEqual('b');
    expect(wrapper).toMatchSnapshot();
  });

  sizes.forEach(size =>
    [1, 12].forEach(width =>
      it(`should set ${size} screen column number when ${size} prop is set`, () => {
        const sizeProps = {[size]: width};
        const wrapper = shallow(
          <LayoutCol className="hello" {...sizeProps}>Hello</LayoutCol>
        );

        expect(wrapper.find('.hello').hasClass(`col-${size}-${width}`)).toBeTruthy();
      })
    )
  );

  sizes.forEach(size =>
    [0, 13].forEach(width =>
      it('should not set ${size} screen column number when ${size} prop out of range', () => {
        const sizeProps = {[size]: width};
        const wrapper = shallow(
          <LayoutCol className="hello" {...sizeProps}>Hello</LayoutCol>
        );

        expect(hasClassWithPrefix(wrapper, `col-${size}-`)).toBeFalsy();
      })
    )
  );
});