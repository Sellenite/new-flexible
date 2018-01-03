var gulp = require('gulp');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var pxtoviewport = require('postcss-px-to-viewport');

// 创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
	gulp.watch(['./public/html/*.html'], ['liveReload']);
});

// 使用ppostcss-px-to-viewport，得到vw
gulp.task('css', function () {
	var processors = [
		pxtoviewport({
			viewportWidth: 750,
			viewportHeight: 1334,
			viewportUnit: 'vw'
		})
	];
	gulp.src('./public/less/*.less')
		.pipe(less())
		.pipe(postcss(processors))
		.pipe(gulp.dest('./public/dest/css/'));
});

// 输出html
gulp.task('html', function () {
	gulp.src('./public/html/*.html')
		.pipe(gulp.dest('./public/dest/'));
});

// 运行gulp 默认的Task
gulp.task('default', ['css', 'html', 'watch'])