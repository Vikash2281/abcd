exports.withData = async (req, res, code, result, msg) => {
    try {
        const response = {
            success: true,
            status_code: code,
            responce: {
                message: msg,
                Data: result,
                //  time: Date.now()
            }
        };

        return res.status(code).json(response);
    } catch (error) {
        return res.json(
            {
                success: true,
                status_code: 500,
                message: lngMsg[lng] ? lngMsg[lng].INTERNAL_SERVER_ERROR : lngMsg.en.INTERNAL_SERVER_ERROR,
                //   time: Date.now()
            });
    }
};

exports.onlyMsg = async (req, res, code, msg) => {
    try {
        const response = {
            success: true,
            status_code: code,
            responce: {
                message: msg,
                // time: Date.now()
            }
        };
        return res.status(code).json(response);
    } catch (error) {
        return res.json(
            {
                success: true,
                status_code: 500,
                message: lngMsg[lng] ? lngMsg[lng].INTERNAL_SERVER_ERROR : lngMsg.en.INTERNAL_SERVER_ERROR,
                // time: Date.now()
            });
    }
};