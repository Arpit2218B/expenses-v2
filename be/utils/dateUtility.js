const getCurrentDateString = () => {
    return new Date().toJSON().slice(0,10).replace(/-/g,'/');
}

module.exports = {
    getCurrentDateString,
}