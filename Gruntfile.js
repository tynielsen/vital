module.exports = function(grunt) {
	grunt.initConfig({

		less: {
			development: {
				files: {
					'./css/main.css': './css/main.less'
				}	
			},

		},

		watch: {
			development: {
				files: '**/*.less',
				tasks: ['less'],
				options: {
					livereload: true
				}
			}

		}
	});


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('default', ['less', 'watch']);

};