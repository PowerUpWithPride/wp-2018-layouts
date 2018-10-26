wp-2018-layouts is a [NodeCG](http://github.com/nodecg/nodecg) bundle. 
It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `^1.0.0`
You will need to have an appropriate version of NodeCG installed to use it.

## Getting Started

### 1. Install Node.js
Instructions on the Node.js site here: https://nodejs.org/en/

I recommend getting the latest current release (10.x at the time of this writing).

### 2. Install NodeCG modules
Follow the quick start guide here: https://nodecg.com/tutorial-3_quick-start.html

Do steps 1-3 to install the `bower` and `nodecg-cli` packages.

### 3. Make a working directory and install NodeCG
Create a fresh directory, and run the NodeCG setup in it:

```
> nodecg setup
```

### 4. Install bundles
Install both the Speedcontrol bundle and this one from GitHub using the following commands:

```
> nodecg install PowerUpWithPride/nodecg-speedcontrol
> nodecg install PowerUpWithPride/wp-2018-layouts
```

This will create a `bundles` subfolder inside your new directory that contains git repositories of these two bundles.  You can now make whatever changes and tweaks you like from that location.

### 5. Copy config files
Create a new subdirectory called `cfg` and copy whatever config files you would like from the [config files repository](https://github.com/PowerUpWithPride/puwp-config-files/tree/master/layouts).  The only one strictly necessary will be the one specifically for this bundle since it has the donation tracker URL.

### 6. Run the server locally to test
In the directory where you ran setup initially, run the following:

```
> nodecg start
```

The server should run on `localhost:9090` by default.  You can open this location in your web browser and start experimenting.
