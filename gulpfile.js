import gulp from 'gulp';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';

// Task to minify JS files
export const minifyJS = () => {
    return gulp.src('src/assets/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/js'));
};

// Task to minify CSS files
export const minifyCSS = () => {
    return gulp.src('src/assets/css/*.css')
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css'));
};

// Task to optimize images
export const optimizeImages = () => {
    return gulp.src('src/assets/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'));
};

// Default task
export const defaultTask = gulp.parallel(minifyJS, minifyCSS, optimizeImages);

export default defaultTask;