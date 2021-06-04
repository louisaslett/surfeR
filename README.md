# Rserve

This is designed to enable remote execution of R code for embedding in a web page.  It is currently alpha software, so there is only a quick start guide.  I am currently extensively testing it for a University course I am writing and once any kinks are ironed out this guide will become more extensive and include working examples.  In the meantime it is mostly made available for brave tinkerers!

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

Then, to test the setup, visit http://your-server-ip-address/test.html in a browser to test out the code.  Note that cookies tie your session, so if you want to test the queuing mechanism, you will need to launch multiple incognito/private browser sessions to do so.

Additionally, note that if you are going to call this embedded on a page on a different server, then you will need both websites to be served over SSL in order for it to work in Chrome (cross-site scripting requires https in Chrome).  It will work either way in Safari.
