({
    // appDir: './src/',
    baseUrl: 'www/',
    dir: 'www/bundle/',
    mainConfigFile: 'www/main.js',
    modules: [
        {
            name: 'main',
            include: [
                'bootstrap',
                'app',
                'app.route',
		      　　'app.config'
            ],
            out: 'bundle.js'
        }
    ],
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true
})
