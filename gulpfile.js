var gulp      =   require('gulp'), // Подключаем Gulp
	autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления п
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'); // Подключаем Browser Sync




gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'lend' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

gulp.task('prefex', function(){
	return gulp.src('lend/css/*.css')
		   .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		   .pipe(gulp.dest('css')); // Выгружаем результата в папку app/css
});

gulp.task('common-js', function() {
    return gulp.src([
        'lend/js/script.js',
        ])
    .pipe(concat('script.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('lend/js'));
});

gulp.task('js', ['common-js'], function() {
    return gulp.src([
        'lend/libs/jquery/dist/jquery.min.js',
        'lend/js/script.min.js', // Всегда в конце
        ])
    .pipe(concat('common.min.js'))
    // .pipe(uglify()) // Минимизировать весь js (на выбор)
    .pipe(gulp.dest('lend/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['js', 'browser-sync'], function() {
    gulp.watch('lend/css/*.css',  browserSync.reload);
    gulp.watch(['libs/**/*.js', 'lend/js/script.js'], ['js']);
    gulp.watch('lend/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);