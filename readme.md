## imessage-to-web

Simple web client/server for MacOS's native iMessage app - hobby project that serves the purpose of providing basic message reading/sending functionalities to the user. Server side utilizes sqlite3 and Applescript to interface with messaging app while providing 'mobile centric' web experience on the client side.

Written and tested on `MacOS Mojave ver. 10.14.1`

Before first use user needs to grant `Terminal` (or any other app used to launch the script) `Full Disk Access` via `System Preferences > Security & Privacy > Privacy > Full Disk Access` 

* To start the app execute `node index -p='xxx'` command in project folder, where `xxx` is passphrase of your choice used in authentication process.

* Project supports tunneling out of the box via ngrok. If you'd like to use it, just pass `-t` arg after `node index -p='xxx'`.

Enjoy!