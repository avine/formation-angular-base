module.exports = function(grunt) {

    grunt.initConfig({
        zenika: {
            formation: {
                name: 'AngularJS 2'
            }
        }
    });

    grunt.loadTasks('node_modules/zenika-formation-framework');
	
    grunt.registerTask('default', ['displaySlides']);

};
