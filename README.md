# team-squids-backend
Hello there! This is the backend to team-squids-frontend!

We are using mySQL so we have a relational database. We have three models, churchUser, church and events. A churchUser can have many churches but a church only has one churchUser. A event can have only one church.

Most get requests are public, put and delete request requires authentication you NEED to be the same user that own the requested church/event in order to make those types of requests.

## Routes
### Church routes
get /api/church/ - get all churches & related churchUsers

get /api/church/:id - get a specific church, related churchUser, related events, and related churches

get /api/church/userchurch/:userId - get a specific church and related churchUser

get /api/church/search/:query - search church

post /api/church/ - create church

put /api/church/:id - edit church

delete /api/church/:id delete church


### ChurchUser routes
get /api/user/ get all churchUsers

get /api/user/:id get specific churchUser, related churches, related events, and related churchUsers.

get /api/user/verify/:id verify the requested user

get /api/user/verify-current-user/ verify the current user

post /api/user/signin signin

put /api/user/edit-account/:id edit churchUser

delete /api/user/delete-account/:id delete churchUser


### Event routes
get /api/event/ get all events, related churches, and related churchUsers

get /api/event/:id get specific event, related churches, and related churchUsers

get /api/event/userevent/:userId get a specific churchUsers events, related churches, and churchUsers

get /api/event/search/:query search events

post /api/event/ create event

put /api/event/editevent/:id edit event

delete /api/event/:id delete event
