module.exports = {
	devServer:{
		contentBase: "./public",
	    historyApiFallback: true,
	    inline: true
	},
	devtool: 'eval-source-map',
  	entry: __dirname+'/app/main.js',
  	output: {
  		path:__dirname+"/public",
    	filename: 'index.js'
  	},
  	module:{
  		rules:[
  			{
  				test:/(\.jsx|\.js)$/,
  				use:{
  					loader:"babel-loader",
  					options:{
  						preset:["env","react"]
  					}
  				},
  				exclude:/node_modules/
  			}
  		]
  	}
};