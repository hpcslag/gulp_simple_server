var gulp = require('gulp');
var liveload = require('gulp-livereload');

gulp.task('watch',function(){
	var server = liveload();
	gulp.watch(['dist/*.html','dist/css/*.css'],function(event){
		server.changed(event.path);
	});
});