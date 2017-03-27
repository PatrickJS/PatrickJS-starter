/*Lib Core Theme*/
import "assets/js/core/bootstrap.min";
import "assets/js/core/jquery.slimscroll.min";
import "assets/js/core/jquery.scrollLock.min";
import "assets/js/core/jquery.appear.min";
import "assets/js/core/jquery.countTo.min";
import "assets/js/core/jquery.placeholder.min";
// import "assets/js/core/js.cookie.min";
import "assets/js/app";
import "assets/js/plugins/slick/slick.min";

// ChartJS
import "chart.js/dist/Chart";

// Datatable
import "datatables.net/js/jquery.dataTables";
import "datatables.net-bs/js/dataTables.bootstrap";

// toastr
import "ng2-toastr/ng2-toastr.js";

// jQuery validation
import "jquery-validation/dist/jquery.validate.js";

/*
 Lưu ý không thể load file css ở đây. Lý do là trong config của webpack sẽ chỉ có:
 {
 test: /\.css$/,
 loaders: ['to-string-loader', 'css-loader']
 },
 
 Cái 'to-string-loader' cho phép component import file css:
 @Component({
 selector: 'app',
 encapsulation: ViewEncapsulation.None,
 styleUrls: [
 './app.component.css' // this why you import css as string
 ],
 Để có thể import file css từ file ts thì ta cần dùng module: npm i style-loader --save-dev
 Sau đó config thêm trong webpack:
 { //this rule will only be used for any vendors
 test: /\.css$/,
 loaders: ['style-loader', 'css-loader'],
 include: [/node_modules/] // cho này nếu thêm vào thì chỉ sử dụng cho vendor
 },
 */
