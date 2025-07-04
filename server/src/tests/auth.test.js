// @vitest-environment jsdom

import AuthService from '../../../client/src/utils/auth.js'; // Adjust the import path as necessary
import { jwtDecode } from 'jwt-decode';
import { vi } from 'vitest';

// auth.test.js


// Mock jwt-decode
vi.mock('jwt-decode', () => ({
    jwtDecode: vi.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
        removeItem: vi.fn((key) => { delete store[key]; }),
        clear: vi.fn(() => { store = {}; }),
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock window.location.assign
delete window.location;
window.location = { assign: vi.fn() };

describe('AuthService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorageMock.clear();
    });

    describe('getProfile', () => {
        it('should decode token from localStorage', () => {
            localStorage.setItem('id_token', 'sometoken');
            jwtDecode.mockReturnValue({ user: 'alex' });
            const profile = AuthService.getProfile();
            expect(jwtDecode).toHaveBeenCalledWith('sometoken');
            expect(profile).toEqual({ user: 'alex' });
        });

        it('should decode empty string if no token', () => {
            jwtDecode.mockReturnValue({});
            AuthService.getProfile();
            expect(jwtDecode).toHaveBeenCalledWith('');
        });
    });

    describe('loggedIn', () => {
        it('should return true if token exists and not expired', () => {
            localStorage.setItem('id_token', 'token');
            vi.spyOn(AuthService, 'isTokenExpired').mockReturnValue(false);
            expect(AuthService.loggedIn()).toBe(true);
        });

        it('should return false if no token', () => {
            expect(AuthService.loggedIn()).toBe(false);
        });

        it('should return false if token is expired', () => {
            localStorage.setItem('id_token', 'token');
            vi.spyOn(AuthService, 'isTokenExpired').mockReturnValue(true);
            expect(AuthService.loggedIn()).toBe(false);
        });
    });

    describe('isTokenExpired', () => {
        it('should return true if token is expired', () => {
            jwtDecode.mockReturnValue({ exp: (Date.now() / 1000) - 10 });
            expect(AuthService.isTokenExpired('token')).toBe(true);
        });

        it('should return false if token is not expired', () => {
            jwtDecode.mockReturnValue({ exp: (Date.now() / 1000) + 10000 }); // 10,000 seconds in the future
            expect(AuthService.isTokenExpired('token')).toBe(false);
        });

        it('should return false if jwtDecode throws', () => {
            jwtDecode.mockImplementation(() => { throw new Error('bad token'); });
            expect(AuthService.isTokenExpired('badtoken')).toBe(false);
        });
    });

    describe('getToken', () => {
        it('should return token from localStorage', () => {
            localStorage.setItem('id_token', 'abc123');
            expect(AuthService.getToken()).toBe('abc123');
        });

        it('should return null if no token', () => {
            expect(AuthService.getToken()).toBeNull();
        });
    });

    describe('login', () => {
        it('should save token and redirect', () => {
            AuthService.login('mytoken');
            expect(localStorage.setItem).toHaveBeenCalledWith('id_token', 'mytoken');
            expect(window.location.assign).toHaveBeenCalledWith('/');
        });
    });

    describe('logout', () => {
        it('should remove token and redirect', () => {
            AuthService.logout();
            expect(localStorage.removeItem).toHaveBeenCalledWith('id_token');
            expect(window.location.assign).toHaveBeenCalledWith('/');
        });
    });
});