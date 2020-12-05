const { default: User } = require("./src/models/user");

const user = new User({ username: 'velopert' });
user.setPassword('mypass123');

