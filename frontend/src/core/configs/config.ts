type Config = {
    development: {
        apiUrl: string;
    };
    production: {
        apiUrl: string;
    };
    test: {
        apiUrl: string;
    };
};

const config: Config = {
    development: {
        apiUrl: process.env.REACT_APP_API_URL ?? 'http://localhost:9000'
    },
    production: {
        apiUrl: process.env.REACT_APP_API_URL!     // ! indicates apiUrl won't be undefined.
    },
    test: {
        apiUrl: process.env.REACT_APP_API_URL!
    }
};

export const getConfig = () => {
    const env = process.env.NODE_ENV as keyof Config;
    return config[env];
};