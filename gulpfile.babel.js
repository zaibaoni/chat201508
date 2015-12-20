// generated on 2015-12-19 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('html', [], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)//获取里面所有的外链的资源 js css
    // main.js main.css vendor.js vendor.css
    .pipe($.if('*.js', $.uglify()))//对JS文件进行压缩
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))//对CSS文件进行压缩
    .pipe(assets.restore())//恢复原始的资源
    .pipe($.useref())//修改html里面的引用
    //conditionals 不移除对IE处理  loose 多个空格的话至少保留一个空格
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))//
    .pipe(gulp.dest('dist'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/pages/*.*',
  ], {
    base:'app',
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

//启动一个本地的服务
gulp.task('serve', [], () => {
  //启动一个服务器
  browserSync({
    notify: false,//是否通知
    port: 9000,//端口号
    server: {//服务器配置
      baseDir: ['.tmp', 'app'],//设置静态文件目录
      routes: {//路由
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
  ]).on('change', reload);//当这些文件变化时自动重启服务器

  gulp.watch('bower.json', ['wiredep']);//把bower文件插入index.html
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

// inject bower components
gulp.task('wiredep', () => {

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['wiredep','html', 'extras'], () => {
  //统计文件的大小gzip 统计当启用gzip压缩后的大小
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
