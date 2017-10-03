var gulp      = require('gulp'), // Подключаем Gulp
	autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления п
	browserSync = require('browser-sync'); // Подключаем Browser Sync




gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('prefex', function(){
	return gulp.src('css/*.css')
		   .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		   .pipe(gulp.dest('css')); // Выгружаем результата в папку app/css
});

gulp.task('watch', ['browser-sync', 'prefex'], function() {
    gulp.watch('css/*.css', browserSync.reload); // Наблюдение за sass файлами в папке css
    gulp.watch('*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('js/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
});

gulp.task('default', ['watch']);