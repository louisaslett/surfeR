# Rserve

## Quick start

This guide assumes an Ubuntu 20.04 LTS install, such as you would get with a [Digital Ocean](https://www.digitalocean.com/) droplet.

Once logged in, pull this repository:

```{bash}
git clone https://github.com/louisaslett/Rserve.git
```

Edit and make any desired changes to the configuration (it will run fine leaving all defaults):

```{bash}
nano Rserve/config.sh
```

Deploy and start the server:

```{bash}
bash Rserve/setup.sh
```

If the server reboots, you can start the Rserve environment again by running

```{bash}
/rserve/Rserve.sh
```

Then, to test the setup, visit http://<your-server-ip-address>/test.html in a browser to test out the code.  Note that cookies tie your session, so if you want to test the queuing mechanism, you will need to launch multiple incognito/private browser sessions to do so.
