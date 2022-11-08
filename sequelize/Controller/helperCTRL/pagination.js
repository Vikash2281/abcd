exports.paginition = (req) => {
    let PageNumber = req.query.page ?? 1;
    let limit = req.query.limit ?? 10;
    let offset = (PageNumber - 1) * limit;

    let obj = {
        limit: limit,
        offset: offset
    }
    return obj;
}