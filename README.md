__Note that almost all of this code belongs to Spotify. I have just extracted the parts I think are relevant for the Spotify Web Remote.__

SpotifyRemote.js
================
The Spotify desktop client is (among other) listening to 127.0.0.1:4370. It also points *.spotilocal.com to 127.0.0.1.

It provides an interface to control the desktop client and also get it's current status. The data available is among other: song playing, volume, private mode, client version and time in track. See the file in raw/ for an example of the data.

Notice
---------
You need to send a token to the client when you do a request.
You get the token from embed.spotify.com.
The token is now (as of 2012-04-16): M1Nwb3RpZnkgIDY4NzE5NDc2NzM2IDEzMzQ1NzU1NTAgMTMzNDYwNDM1MCAAALhdmxhwstln2O7J8Zz6kd1bD08a
I don't know if this is going to change in the future but it feels unneccesarry if it wouldn't.

Usage
---------
Avaiable methods:

* addPlayModeChangedListener(callback)
* addOnClientOpeningListener(callback)
* addOnClientConnectedListener(callback)
* addOnClientErrorListener(callback)
* playPauseTrack(id, type, context)
* getCurrentTrack()
* getCurrentURI()
* isClientRunning()
* isTrackPlaying()
* openSpotifyURI(uri)

