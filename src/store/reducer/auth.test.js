import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe('auth reducer', () => {
    it('should return the init State', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            isAdmin: false,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            isAdmin: false,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'userId',
            isAdmin: true
        })).toEqual({
            token: 'some-token',
            userId: 'userId',
            isAdmin: true,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
});