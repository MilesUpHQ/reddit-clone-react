const authProvider = {
    login: ({ username, password }) => {
        if (username !== 'admin' || password !== '123') {
            return Promise.reject();
        }
        localStorage.setItem('username', username);
        return Promise.resolve({
            redirectTo: '/admin/*'
        });
    },
    logout: () => {
        localStorage.removeItem('username');
        return Promise.resolve();
    },
        checkAuth: () =>
        localStorage.getItem('username') ? Promise.resolve() : Promise.reject(),
    checkError:  (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getIdentity: () =>
        Promise.resolve({
            id: 'user',
            fullName: 'Mithun-admin',
        }),
    getPermissions: () => Promise.resolve(''),
};

export default authProvider;
