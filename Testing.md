# Testing a React App

## What to test and not test
* Don't test library
* Test isloated units
* Test conditional output

## Links
* [Jest Getting Start](https://jestjs.io/docs/en/getting-started.html)
* [Enzyme](https://airbnb.io/enzyme/)

## Testing
1. Install the following packages
```
npm install jest enzyme react-test-renderer enzyme-adapter-react-16
```
2. Delete App.test.js
3. Stateless component. Create a file next to a component named Component.test.js
```
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () =>{
    let wrapper;
    beforeEach(()=>{
         wrapper = shallow(<NavigationItems />); 
    });
    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});
```
4. When testing a state component make sure the component is exported by name as well the default.
```
export class BurgerBuilder extends Component {
  ...
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, api.client));
```
5. State component. Create a file next to a component named Component.test.js
```
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () =>{
    let wrapper;
    beforeEach(()=>{
         wrapper = shallow(<BurgerBuilder onInitIngredients={()=>{}} />); 
    });
    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ings:{salad: 0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
```
6. Redux. Create a file next to the reducer named reducer.test.js
```
import reducer from './reducer';
import actionTypes from '../actionTypes';

describe('auth reducer', () =>{
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the token upon login', () => {
        expect(reducer(
        {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, 
        {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'token',
            userId: 'userId'
        })
        ).toEqual({
            token: 'token',
            userId: 'userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
});
```
7. run tests with the following command
```
npm test
```

## Authors

* **David Ikin**