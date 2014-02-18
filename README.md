# [Teste Apontador](https://apresentae.appspot.com/teste-apontador)

> Quick demo using [Apontador API](api.apontador.com.br/v2/) for showing the reviews for a particular place.

## Hacking


### TL;DR
	
1.	`npm install`
2.	`grunt`
3.  get the testing access token and replace in `HERE-COMES-YOUR-TOKEN` at `main.js`	
4.	open `src/index.hmtl`

### Step by Step


At the root of the project, run `npm install` for installing the dev dependencies.

When that completes, you'll have `node_modules`, which is where the dependencies lives. As the project depends on [Grunt](http://gruntjs.com/) for running tasks *(go take a look, it's awesome)*, you'll need to have the grunt commmand line interface installed previously.

If you don't, just run `npm install -g grunt-cli` for installing globally or without the `-g` for locally.

After that, run the default grunt tasks with `grunt` which will generate the minified files (*/build* folder) and start whatching some files that matters *(go learn [about it](https://github.com/gruntjs/grunt-contrib-watch#))*. 

Next, get an access token so that you'll be able to use all the functionalities. One way of getting one is by curl:

```bash
curl -X POST -d "client_id=recruitment-apontador&client_secret=EvgGjjORuTnQESSslOhalwyLK5i~&grant_type=client_credentials&scope=read" https://api.apontador.com.br/v2/oauth/token
```

Then, with that, paste it in `HERE-COMES-YOUR-TOKEN` at `main.js`.

### Testing

There are two tests to be done: one that will run greatly with the `grunt qunit` and another that i'll let it to be run only via html file as this is not meant to be run as the other that is configure for grunt. That's because the 'non-grunt' depends a lot on async and it would make more sense to not confuse it with the unit testing one.

## Contact

Talk with me on [g+](http://www.google.com/+ciroscosta)!

