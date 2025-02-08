# Pages

* `/` Home [server]
	* Welcome splash
	* Start game link to `/new`
	* Join game link to `/join`
* `/new` Start Game [server]
	* Player name input
	* Start button
		* Initializes game in DB
		* Adds player to game in DB
		* Redirects to `/game/{game code}`
* `/join/{game code?}` Join Game [server]
	* Game code input
	* Player name input
	* Join button
		* Validates name
		* Validates game code
			* If invalid, show error
		* Checks DB for game capacity
			* If full, show error
		* Registers user and gets new token
* `/game/{game code}` Game [server]
	* If no game code, redirect to `/`
	* If not joined, redirect to `/join/{game code}`
