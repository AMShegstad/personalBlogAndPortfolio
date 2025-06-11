import LoginDrawer from '../src/components/LoginDrawer';

export default {
    title: 'Components/LoginDrawer',
    component: LoginDrawer
}

export const Default = {};
export const WithLogin = {
    args: {
        isOpen: true,
        onClose: () => {},
        onLogin: () => {}
    }
};