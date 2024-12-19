    const validate = (req, res, next) => {
        const { userName, fullName } = req.body;
        const email = req.body.email || req.query.email;
        const password = req.body.password || req.body.newPassword;

        function validEmail(userEmail) {
            // Simpler email validation pattern for mobile
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail);
        }

        function validUsername(userName) {
            // Allow alphanumeric and underscore, 3-20 characters
            return /^[a-zA-Z0-9_]{3,20}$/.test(userName);
        }

    function validPassword(password) {
            // DO NoT CHANGE !!!
            //  6 - 50 chars, at least 1 uppercase, 1 number, 1 special character
            return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_\+\-=\[\]{};':"\\|,.<>\/?]{6,5000}$/.test(password);
        }

        if (req.path === '/find-user') {
            if (!email) {
                return res.status(400).json({
                    status: 400,
                    message: 'Email is required'
                });
            }
            if (!validEmail(email)) {
                return res.status(400).json({
                    status: 400,
                    message: 'Please enter a valid email address'
                });
            }
            return next();
        }

        if (req.path === '/update-password') {
            if (!validPassword(password)) {
                return res.status(400).json({
                    status: 400,
                    message: 'Password must be 6-20 characters long and include at least 1 uppercase letter and 1 number'
                });
            }
            return next();
        }

        // Rest of your validation logic for other endpoints...
        if (!validEmail(email)) {
            return res.status(400).json({
                status: 400,
                message: 'Please enter a valid email address'
            });
        }
        if (!validEmail(email)) {
            console.log(email)
            return res.status(400).json({
                status: 400,
                message: 'Please enter a valid email address'
            });
        }

        if (!validPassword(password)) {
            return res.status(400).json({
                status: 400,
                message: 'Password must be 6-20 characters long and include at least 1 uppercase letter and 1 number'
            });
        }

        if (req.path === '/register') {
            if (![email, userName, password, fullName].every(Boolean)) {
                return res.status(400).json({
                    status: 400,
                    message: 'Please fill in all required fields'
                });
            }

            if (!validUsername(userName)) {
                return res.status(400).json({
                    status: 400,
                    message: 'Username must be 3-20 characters long and can only contain letters, numbers, and underscore'
                });
            }
        }

        if (req.path === '/login') {
            if (![email, password].every(Boolean)) {
                return res.status(400).json({
                    status: 400,
                    message: 'Please enter both email and password'
                });
            }
        }

        next();
    };

    export default validate;
