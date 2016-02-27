/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		 // Metadata.
		 pkg:     grunt.file.readJSON('package.json'),
		 uglify:  {
			 dist:    {
				 src:  'src/js/*.js',
				 dest: '_build/<%= pkg.name %>.js'
			 }
		 },
		 replace: {
			 dist: {
				 options: {
					 patterns: [
						 {
							 match:       'javascript',
							 replacement: '<%= grunt.file.read("_build/" + pkg.name + ".js") %>'
						 }
					 ]
				 },
				 files:   [
					 {expand: true, flatten: true, src: ['src/pathfinder.html'], dest: 'dist/'}
				 ]
			 }
		 },
		 cssmin:  {
			 options: {
				 banner: ''
			 },
			 dist:    {
				 src:  'src/css/*.css',
				 dest: 'dist/<%= pkg.name %>.css'
			 }
		 },
		 sass: {
			 options: {
				 sourcemap: 'none',
				 //style: 'compressed'
			 },
			 dist: {
				 files: {
					 'dist/pathfinder.css': 'src/css/core.scss'
				 }
			 }
		 },
		 jshint:  {
			 options:   {
				 curly:   true,
				 eqeqeq:  true,
				 immed:   true,
				 latedef: true,
				 newcap:  true,
				 noarg:   true,
				 sub:     true,
				 undef:   true,
				 unused:  true,
				 boss:    true,
				 eqnull:  true,
				 browser: true,
				 globals: {}
			 },
			 gruntfile: {
				 src: 'Gruntfile.js'
			 },
		 },
		 watch:   {
			 gruntfile: {
				 files: '<%= jshint.gruntfile.src %>',
				 tasks: ['jshint:gruntfile']
			 },
			 lib_test:  {
				 files: '<%= jshint.lib_test.src %>',
				 tasks: ['jshint:lib_test', 'qunit']
			 }
		 }
	 });

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	// Default task.
	grunt.registerTask('default', ['jshint', 'uglify', 'replace', 'sass']);

};
