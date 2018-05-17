var gulp         = require('gulp'), // Подключаем Gulp
    less         = require('gulp-less'), //Подключаем Less пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    autoprefixer = require('gulp-autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    concat       = require('gulp-concat'); // Подключаем gulp-concat (для конкатенации файлов)

//  таск Less+префиксы
gulp.task('less', function(){ // Создаем таск Less
    return gulp.src('app/less/*.less') // Берем источник
        .pipe(less()) // Преобразуем Less в CSS посредством gulp-less
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

//  таск для минификации CSS
gulp.task('css-libs', ['less'], function() {
    return gulp.src('app/css/*.css') // Выбираем файли
        .pipe(concat ('style.css'))//Объединить все css
        .pipe(gulp.dest('app/css')); // Выгружаем в папку app/css
});

//  таск browser-sync
gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync.init({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        port: 4200,
        open: true,
        notify: false // Отключаем уведомления
    });
});

// Наблюдение
gulp.task('watch', ['browser-sync','less'], function() {
    gulp.watch('app/less/*.less', ['less']); // Наблюдение за less файлами в папке less
    gulp.watch('app/js/*.js', browserSync.reload); // Наблюдение за js файлами в папке js
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
});


// продакшен
gulp.task('build', function() {

    var buildCss = gulp.src(['app/css/style.css']) // Переносим библиотеки css в продакшен
        .pipe(gulp.dest('dist/css'))

    var buildJs = gulp.src(['app/js/*.js']) // Переносим скрипты в продакшен
        .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src(['app/*.html'])// Переносим библиотеки html в продакшен
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);