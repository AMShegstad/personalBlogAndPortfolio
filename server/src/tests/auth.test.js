import AuthService from '../utils/auth'; // Adjust the import path as necessary
import { jwtDecode } from 'jwt-decode';

// auth.test.js


// Mock jwt-decode
jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
        removeItem: jest.fn((key) => { delete store[key]; }),
        clear: jest.fn(() => { store = {}; }),
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock window.location.assign
delete window.location;
window.location = { assign: jest.fn() };

afterAll(async () => {
  await mongoose.connection.close();
});

describe('AuthService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
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
            jest.spyOn(AuthService, 'isTokenExpired').mockReturnValue(false);
            expect(AuthService.loggedIn()).toBe(true);
        });

        it('should return false if no token', () => {
            expect(AuthService.loggedIn()).toBe(false);
        });

        it('should return false if token is expired', () => {
            localStorage.setItem('id_token', 'token');
            jest.spyOn(AuthService, 'isTokenExpired').mockReturnValue(true);
            expect(AuthService.loggedIn()).toBe(false);
        });
    });

    describe('isTokenExpired', () => {
        it('should return true if token is expired', () => {
            jwtDecode.mockReturnValue({ exp: (Date.now() / 1000) - 10 });
            expect(AuthService.isTokenExpired('token')).toBe(true);
        });

        it('should return false if token is not expired', () => {
            jwtDecode.mockReturnValue({ exp: (Date.now() / 1000) + 1000 });
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