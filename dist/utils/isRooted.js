function isRooted() {
    return (process.platform === 'android' &&
        process.getuid && process.getuid() === 0);
}
export default isRooted;
