var gulp = require("gulp")
var sass = require("gulp-sass")


gulp.task("scss",function(){
    return gulp.src("./src/scss/*.scss")
    .pipe(sass().on(('error'),sass.logError))
    .pipe(gulp.dest("./dist/css"))
})
gulp.task("watch",function(){
    gulp.watch("./src/scss/*.scss",gulp.series(["scss"]))
})
gulp.task("default",gulp.series(['watch']))


