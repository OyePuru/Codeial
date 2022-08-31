const User = require('../models/user');

module.exports.profile = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		return res.render('user_profile', {
			title: 'User Profile',
			user_profile: user
		});
	} catch (error) {
		console.log(error);
	}
}


module.exports.update = async (req, res) => {
	try {
		if (req.params.id == req.user.id) {
			const user = await User.findByIdAndUpdate(req.params.id, req.body);
			return res.redirect('back');
		} else {
			return res.status(401).send('Unauthorized');
		}
	} catch (error) {
		console.log(error);
	}
}

// render the sign up page
module.exports.signUp = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/users/profile');
	}
	return res.render('user_sign_up', {
		title: "Codeial | Sign Up"
	});
}


// render the sign in page
module.exports.signIn = (req, res) => {
	if (req.isAuthenticated()) {
		return res.redirect('/users/profile');
	}
	return res.render('user_sign_in', {
		title: "Codeial | Sign In"
	});
}

// get the sign up data
module.exports.create = async (req, res) => {
	try {
		if (req.body.password != req.body.confirm_password) {
			req.flash('error', "Password Didn't Matched!");
			return res.redirect('back');
		}
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			const newUser = User.create(req.body);
			return res.redirect('/users/sign-in');
		} else {
			return res.redirect('back');
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports.connect = async (req, res) => {
	try {
		const users = await User.find({});
		return res.render('connect', {
			all_users: users
		});
	} catch (error) {
		console.log(error);
	}
}

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
	return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
	req.logout();
	req.flash('success', 'You have logged out!');
	return res.redirect('/');
}