# surfeR

This is designed to enable remote execution of R code for embedding in a web page.  It is currently beta software, so there is only a quick start guide.  This has successfully run for two University courses without crashing or needing to be rebooted for 2+ years.  Hence, hopefully soon to be out of beta!

## Quick start

This guide assumes an Ubuntu LTS install, such as you would get with a [Digital Ocean](https://www.digitalocean.com/) droplet.

Once logged in, pull this repository:

```{bash}
git clone https://github.com/louisaslett/surfeR.git
```

Edit and make any desired changes to the configuration (it will run fine leaving all defaults):

```{bash}
nano surfeR/config.sh
```

Deploy and start the server:

```{bash}
bash surfeR/setup.sh
```

Note that you should not rerun setup once the server is running successfully. If the server reboots, you can start the surfeR environment again by just running:

```{bash}
/surfeR/surfeR.sh > /dev/null 2>/dev/null &
```

Then, to test the setup, visit http://your-server-ip-address/test.html in a browser to test out the code.  Note that cookies tie your session, so if you want to test the queuing mechanism, you will need to launch multiple incognito/private browser sessions to do so.

Additionally, note that if you are going to call this embedded on a page on a different server, then you will need both websites to be served over SSL in order for it to work in Chrome (cross-site scripting requires https in Chrome).  It will work either way in Safari.

## Related projects

- I very highly recommend the amazing [WebR](https://docs.r-wasm.org/webr/latest/) project! It provides R compiled to WebAssembly so that you can run R in the browser without any server at all. It was released well after this project was conceived and for many use cases makes surfeR unnecessary. However, it does involve a many 100s of megabyte download and currently R package coverage is not complete. Hence, surfeR is still relevant if you are willing to run a small virtual machine server and want a very light weight alternative to avoid stressing user's bandwidth.

- This project was essentially inspired by [Juniper](https://github.com/ines/juniper). However, [I had problems](https://github.com/ines/juniper/issues/9) getting Juniper to work with R which were never resolved, so surfeR was born!
