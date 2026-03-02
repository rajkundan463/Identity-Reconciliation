const identify = require("../services/identifyService");

exports.identify =
    async (req, res) => {

        try {
            const {email,phoneNumber} = req.body;
            const result =
                await identify(email, phoneNumber);
                res.status(200).json(result);
           }
           catch (e) {
            res.status(500).json({
                error: e.message
            });
        }

    };