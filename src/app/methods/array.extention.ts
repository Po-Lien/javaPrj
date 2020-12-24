interface Array<T> {
    concatAll();
}

Array.prototype.concatAll = function() {
    var result = [];

    this.forEach(item => {
        result.push(...item);
    });

    return result;
};