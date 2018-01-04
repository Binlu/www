module.exports = {
	devServer:{
		port:"80",
		contentBase:"./public",
		historyApiFallback:true,
		inline:true
	},
	devtool: 'eval-source-map',
  	entry: __dirname+'/app/main.js',
  	output: {
  		path:__dirname+"/public",
    	filename: 'index.js'
  	}
};