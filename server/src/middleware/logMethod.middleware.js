const logMethod = (req, _res, next) => {
    // this will look the http method (GET, POST, etc) and the current timestamp.
    console.log(`${req.method} request received: ${new Date()}`);
    console.log('======================');
    // calling the next function will continue with the route, without it all your requests will hang.
    next();
};
export default logMethod;
