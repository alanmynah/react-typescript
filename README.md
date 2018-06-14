# camera-app-challenge

## Prerequisites

- [ngrok](https://ngrok.com/)

- Azure storage emulator

- Azure storage explorer

``` javascript
npm i // to install node_modules
npm run build // to build webpack
npm run nodemon // start it on localhost
```

expose port: `10000` to ngrok:

``` shell
ngrok http 10000
```

use the `https` generated link.

Please note, that all the committed environment variables are either local or for trial accounts specific to this project. They are committed for educational purposes.

### *Don't expose your production keys to the outside world*

If you are using this repo, replace the keys as needed and add `.env` file to `.gitignore`.

## Requirements

### Registration

Create a form that:
* can input a name
* can input a username
* can take a photo

This must be recorded for use later

The name must have no symbols except ' (apostrophe) and - (hyphen)

The username must be limited to a-z and 0-9

The photo must contain a face

On successful register the user should be thanked and directed to login

### Login

Create a form that the user can:
* input a username
* take a photo

If the username doesn't exist the user should be notified

If the photo doesn't match the previous taken of the face then the user should be notified

If the photo face matches the user's then the user should be logged in and sent to the "Login list"

### Login list

The user can see a list of previous attempted logins

They must see the date, time and whether it was successful or not

They must also have a link to view more details about the login which takes them to the "Login details list"

The list must be ordered by date and time descending

The list may be filtered by whether the login was successful or not

The list may be filtered by a range of dates

The list must contain no more than 50 records, they should have buttons to see older records

### Login details

The user is presented with the following information about a login attempt:
* date
* time
* username
* photo
* whether it was successful
* IP address

### Logout

If the user is logged in and navigates to the login page they are pushed to the "Login list"

If the user is logged out and they navigate to a non login page they should be pushed back to the login page with a redirect to the page they tried to access

If the user is logged in they should always have a button visible to log them out wherever they are on the application