import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onLoadingIngredients={() => {}} onInitIngredients={() => {}} />);
    });

    it('if ingredients is exist render burger', () => {
        wrapper.setProps({
            ig: {
                Salad: true
            }
        });
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});