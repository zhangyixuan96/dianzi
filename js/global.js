// const baseUrl = "https://admin.loopinmo.com/dzhyk";
const baseUrl = "http://test.loopinmo.com/dzhyk";
//const baseUrl = "/dzhyk";
// var sessionId = getCookie("sessionId");
var sessionId = "595f4db27cab4eae8d04f287788e3941";
// var sessionId = "a19acec885fd458e942d20d91d570569";

var languageCookie = "CN_Hant";

function goLogin(data, url) {
	if(data.code == '5000101' || data.code == '5000102') {
		warmHint("登錄過期，請重新登錄");
		setTimeout(function() {
			window.location.href = "http://www.dzhyk.com/login.html";
		}, 1000);
		return false;
	} else {
		return true;
	}
}

initScreen();
window.onresize = function() {
	initScreen();
}

function defaultfont() {
	var sw = document.documentElement.clientWidth;
	var pw = 750;
	  sw = sw > 750 ? 750 : sw < 320 ? 320 : sw;
	var f = 100 * sw / pw;
	document.documentElement.style.fontSize = f + 'px';
}

function initScreen() {
	defaultfont();
	setTimeout(function() {
		defaultfont();
	}, 100);
}

// 添加Cookie
function addCookie(name, value, options) {
	if(arguments.length > 1 && name != null) {
		if(options == null) {
			options = {};
		}
		if(value == null) {
			options.expires = -1;
		}
		if(typeof options.expires == "number") {
			var time = options.expires;
			var expires = options.expires = new Date();
			expires.setTime(expires.getTime() + time * 1000);
		}
		document.cookie = encodeURIComponent(String(name)) + "=" + encodeURIComponent(String(value)) + (options.expires ? "; expires=" + options.expires.toUTCString() : "") + (options.path ? "; path=" + options.path : "") + (options.domain ? "; domain=" + options.domain : ""), (options.secure ? "; secure" : "");
	}
}

// 獲取Cookie
function getCookie(name) {
	if(name != null) {
		var value = new RegExp("(?:^|; )" + encodeURIComponent(String(name)) + "=([^;]*)").exec(document.cookie);
		return value ? decodeURIComponent(value[1]) : null;
	}
}

// 移除Cookie
function removeCookie(name, options) {
	addCookie(name, null, options);
}

//檢驗是否是手機號
function isphoneFun(number) {
	var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
	return myreg.test(number);
}

//獲取驗證碼
var waitTime = 60;

function checkcode(e) {
	if(waitTime == 0) {
		e.target.disabled = false;
		e.target.innerHTML = "獲取驗證碼";
		waitTime = 60;
	} else {
		e.target.disabled = true;
		e.target.innerHTML = waitTime + "s後重新獲取";
		waitTime--;
		setTimeout(function() {
			checkcode(e);
		}, 1000);
	}
}

//檢驗是否是真的手機號碼並提醒
function checkPhone(val) {
	if(!isphoneFun(val)) {
		warmHint("請輸入正確的手機號碼");
		return false;
	} else {
		return true;
	}
}

//獲取url中的參數
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //構造壹個含有目標參數的正則表達式對象
	var r = window.location.search.substr(1).match(reg); //匹配目標參數
	if(r != null) return decodeURI(r[2]);
	return null; //返回參數值
}

//溫馨提示
function warmHint(msg) {
	var lastChild = document.createElement("div");
	lastChild.className = 'popup-tips';
	lastChild.innerHTML = msg;
	lastChild.style.display = "block";
	document.body.appendChild(lastChild);
	setTimeout(function() {
		document.body.removeChild(lastChild);
	}, 2000);
}

//去登錄
function toLogin(msg) {
	var lastChild = document.createElement("div");
	lastChild.className = 'popup-tips';
	lastChild.innerHTML = msg;
	lastChild.style.display = "block";
	document.body.appendChild(lastChild);
	setTimeout(function() {
		document.body.removeChild(lastChild);
		window.location.href = "login.html";
	}, 2000);
}

//身份證正則表達式
function isCardNo(card) {
	console.log(card)
	// 身份證號碼為15位或者18位，15位時全為數字，18位前17位為數字，最後壹位是校驗位，可能為數字或字符X
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	// var reg  = /(^d{15}$)|(^d{17}([0-9]|X)$)/
	if(reg.test(card) === false) {
		warmHint("請輸入正確的身份證號");
		return false;
	} else {
		return true;
	}
}

//獲取性別
function getSex(sex) {
	switch(sex) {
		case 1:
			return "男";
			break;
		case 2:
			return "女";
			break;
	}
}
//跳到哪個頁面
function jumpTo(url) {
	window.location.href = url;
}
if(getCookie("language") == null) {
	languageCookie = "CN_Hant";
} else {
	languageCookie = getCookie("language");
}

//传入三个参数： 繁体 简体 英文
function translateWord(complex,simple,en){
	if(languageCookie=="CN_Hant" || languageCookie=="繁体中文"){
		return complex;
	}else if(languageCookie=="CN_Hans" || languageCookie=="简体中文"){
		return simple;
	}else{
		return en;
	}
//	return (languageCookie=="CN_Hant")? complex : (languageCookie=="CN_Hans")?simple:en
}
//languageCookie = "en"
var language = {
	noPhone:translateWord("商戶還沒設定電話","商户还没设定电话","hasn't set the phone"),
	inBussiness: translateWord("營業中","营业中","In bussiness"),
	resting: translateWord("休息中","休息中","Resting"),
	add_card: translateWord("添加自製卡","添加自制卡","Add Physical card"),
	card_number: translateWord("卡號","卡号","Card Number"),
	please_fill_in: translateWord("請填寫","请填写","Please fill in"),
	shop_name: translateWord("商家名稱","商家名称","Shop Name"),
	effective_period: translateWord("有效期","有效期","Effective Period"),
	please_choose: translateWord("請選擇","请选择","Please Select"),
	business_type: translateWord("商戶類型","商户类型","Business Type"),
	card_face_photo: translateWord("卡面照片","卡面照片","Front side of the card"),
	positive: translateWord("正面","正面","Front side"),
	negative: translateWord("反面","反面","Back side"),
	confirm_add: translateWord("確認添加","确认添加","Confirm to Add"),
	select_a_business_type: translateWord("選擇商戶類型","选择商户类型","Select a Business Type"),
	rescan_code: translateWord("重新掃碼","重新扫码","Rescan"),
	barcode_scan_code_filling: translateWord("條碼掃碼填入","条形码扫码填入","Please fill in the Barcode Number "),
	please_fill_in_the_card_number: translateWord("請填寫卡號","请填写卡号","Please fill in the card number"),
	please_fill_in_the_business_name: translateWord("請填寫商家名稱","请填写商家名称","Please fill in the shop name"),
	please_select_a_valid_period: translateWord("請選擇有效期","请选择有效期","Please select a validity period"),
	please_select_a_business_type: translateWord("請選擇商戶類型","请选择商户类型","Please select a business type"),
	please_upload_the_front: translateWord("請上傳正面","请上传正面","Please upload the front side"),
	please_upload_the_reverse_side: translateWord("請上傳反面","请上传反面","Please upload the back side"),
	added_successfully: translateWord("添加成功","添加成功","Added successfully"),
	year: translateWord("年","年","Year"),
	month: translateWord("月","月","Month"),
	day: translateWord("日","日","Day"),
	selection_period: translateWord("選擇時間","选择时间","Selection period"),
	annual: translateWord("年期","年期","Duration of Period"),
	indefinite: translateWord("無限期","无限期","No Expiry Date"),
	fixed_term: translateWord("固定期限","固定期限","Fixed Expiry Date"),
	please_enter_the_deadline: translateWord("請輸入期限","请输入期限","Please enter the duration of period"),
	please_select_year_month_day: translateWord("請選擇年/月/日","请选择年/月/日","Please select the date"),
	save: translateWord("保存","保存","Save"),
	agree_to_authorize: translateWord("同意授權","同意授权","Agree to Authorize"),
	phone: translateWord("電話","电话","Contact Number"),
	birthday: translateWord("生日","生日","Birthday"),
	agree_to_the_store_where_the_above_personal_information_is_provided: translateWord("同意將以上個人資訊提供給","同意将以上个人信息提供给","Agree to provide the above personal information"),
	confirm_authorization_and_open_membership: translateWord("確定授權並開通會員","确定授权并开通会员","Confirm authorization and activate membership"),
	not_authorized: translateWord("暫不授權","暂不授权","Not authorized"),
	please_tick_the_consent_to_confirm_the_authorization: translateWord("請勾選同意才能確定授權","请勾选同意才能确定授权","Please check the box to confirm authorization"),
	submitted: translateWord("已提交","已提交","Submitted"),
	advertising_details: translateWord("廣告詳情","广告详情","Advertising Details"),
	qr_code: translateWord("我的二維碼","我的二维码","QR code"),
	member_card_qr_code: translateWord("會員卡二維碼","会员卡二维码","Member card QR code"),
	membership_card_details: translateWord("會員卡詳情","会员卡详情","Membership card details"),
	more_instructions: translateWord("更多說明","更多说明","More Information"),
	apply_for_membership_card: translateWord("申請會員卡","申请会员卡","Apply for membership card"),
	sorry_not_complete: translateWord("抱歉，您的資料不全","抱歉，您的资料不全","Sorry, your information is not complete."),
	please_add_the_information_and_apply_for_membership_card: translateWord("請補充資料後再申請會員卡","请补充资料后再申请会员卡","Please add the information and apply for membership card"),
	cancel: translateWord("取消","取消","Cancel"),
	confirm: translateWord("確認","确认","Confirm"),
	member_card_description: translateWord("會員卡說明","会员卡说明","Membership card description"),
	current_level: translateWord("當前等級","当前等级","Current Tier "),
	
	terms_of_use: translateWord("使用條款","使用条款","Terms of Use"),
	renewal_condition: translateWord("續會條件","续会条件","Renewing Cards"),
	get_date: translateWord("獲取日期","获取日期","Date of Receipt"),
	expiration_date: translateWord("失效日期","失效日期","Expiry Date"),
	limited_period: translateWord("有限期限","有限期限","Limited period"),
	expire_date: translateWord("到期時間","到期时间","Expiry Date"),
	grade: translateWord("等級","等级","Tiers"),
	gradeName: translateWord("等級名稱","等级名称","Tiers"),
	level: translateWord("級","级","level"),
	can_offer: translateWord("可領優惠","可领优惠"," Redeem Offers"),
	integral: translateWord("積分","积分","Points"),
	remaining_number_of_sheets: translateWord("剩餘張數","剩余张数","Available Quotas"),
	empty_no_no: translateWord("空空如也，啥都沒有","空空如也，啥都没有","Empty"),
	application_for_renewal: translateWord("申請續會","申请续会","Application for renewal"),
	already_applied: translateWord("已申請","已申请","Applied"),
	the_information_you_submitted_is_under_review: translateWord("您提交的資料正在審核中，請耐心等待","您提交的资料正在审核中，请耐心等待","Your application is under reivew, please be patient"),
	whether_to_confirm_the_use: translateWord("是否確認使用","是否确认使用","Do you confirm to use?"),
	exchange: translateWord("兌換","兑换","Redemption"),
	successful_redemption: translateWord("成功兌換","成功兑换","Successful redemption"),
	successful_application_for_renewal: translateWord("申請續會成功","申请续会成功","Successful application for renewal"),
	expired: translateWord("已過期","已过期","Expired"),
	successfully_received: translateWord("領取成功","领取成功","Successfully received"),
	redeem_now: translateWord("立即兌換","立即兑换","Redeem Now"),
	get_it_right_now: translateWord("立即領取","立即领取","Collect Now"),
	received: translateWord("已領取","已领取","Received"),
	topped: translateWord("已置頂","已置顶","Pinned"),
	cancelled: translateWord("已取消置頂","已取消置顶","Unpinned"),
	topping: translateWord("置頂","置顶","Pin "),
	unpin: translateWord("取消置頂","取消置顶","Unpin"),
	business_recommendation: translateWord("商戶推薦","商户推荐","Recommended"),
	address: translateWord("地址","地址","Address"),
	phone: translateWord("電話","电话","Contact Number"),
	coupon_qr_code: translateWord("優惠券二維碼","优惠券二维码","Coupons QR code"),
	coupon_details: translateWord("優惠券詳細資訊","优惠券详细信息","Promotions Details"),
	types_of: translateWord("類型","类型","Promotions"),
	required_points: translateWord("所需積分","所需积分","Required points"),
	coupon_title: translateWord("優惠券標題","优惠券标题","Title"),
	user: translateWord("使用者","使用者","Targeted Users"),
	offer_description: translateWord("優惠描述","优惠描述","Descriptions"),
	remaining_number_of_sheets: translateWord("剩餘張數","剩余张数","Available Quotas"),
	applicable_shop: translateWord("適用店鋪","适用店铺","Applicable shops"),
	instructions_for_use: translateWord("使用說明","使用说明","Instructions for use"),
	use_immediately: translateWord("立即使用","立即使用","Use immediately"),
	give_others: translateWord("贈送他人","赠送他人","Gift for the others"),
	effective: translateWord("正生效","正生效","Effective"),
	not_active: translateWord("未生效","未生效","Inactive"),
	expired: translateWord("已過期","已过期","Expired"),
	used: translateWord("已使用","已使用","Used"),
	unknown: translateWord("未知","未知","Unknown"),
	everyone: translateWord("所有人","所有人","All"),
	followig: translateWord("關注的人","关注的人","Followers"),
	member: translateWord("會員","会员","Member"),
	ordinary_coupon: translateWord("普通優惠券","普通优惠券","Coupons"),
	point_coupon: translateWord("積分優惠券","积分优惠券","Points Redeem "),
	use_a_coupon: translateWord("使用優惠券","使用优惠券","Use"),
	really_use: translateWord("確認使用","确认使用","Confirm to Use"),
	use_offer: translateWord("使用優惠","使用优惠","Used"),
	this_offer_has_been_used: translateWord("已使用該優惠","已使用该优惠","Used for the offer"),
	electronic_membership_card: translateWord("電子會員卡","电子会员卡","Electronic membership card"),
	download: translateWord("下載","下载","Download"),
	edit_homemade_card: translateWord("編輯自製卡","编辑自制卡","Edit physical card"),
	the_person_being_called: translateWord("被贈送人電話","被赠送人电话","Gift receiver phone number"),
	gifted_mailbox: translateWord("被贈送人郵箱","被赠送人邮箱","Gift recevier email"),
	you_have_successfully_sent_the_coupon_because_you_chose: translateWord("您已成功送出優惠券。","您已成功送出优惠券。","The offer have been sent."),
	non_registered_users_your_friends_register: translateWord("由於您選擇了非註冊用戶，您的朋友註冊此APP後會收到您的優惠券","由于您选择了非注册用户，您的朋友注册此APP後會收到您的優惠券","The user you have chosen is Non-registered user.  Your friend will receive your coupon once he/she registers this app."),
	select_region: translateWord("選擇地區","选择地区","Select Locations"),
	are_you_sure_you_want_to_give_a_coupon: translateWord("是否確認要贈送優惠券給","是否确认要赠送优惠券给","Are you sure to give this coupon to him/her?"),
	please_enter_the_callee_phone_number: translateWord("請輸入被贈送人電話","请输入被赠送人电话","Please input the receiver's phone number"),
	please_enter_the_credited_person_email_address: translateWord("請輸入被贈送人郵箱","请输入被赠送人邮箱","Please input the receiver's email"),
	already_given: translateWord("已贈送","已赠送","Already Sent"),
	level_information: translateWord("等級資訊","等级信息","Tier Details"),
	current_points: translateWord("當前積分","当前积分","Current Balance"),
	cumulative_points: translateWord("累計積分","累计积分","Cumulative Balance"),
	level_privilege: translateWord("等級特權","等级特权","Tier Privilege"),
	you_are_still_worse_than_the_next_level: translateWord("您距離下一等級還差","您距离下一等级还差","You still need ___ points/credits to the next level"),
	
	current_point_balance: translateWord("當前積分餘額","当前积分余额","Current Account Balance"),
	expired_in_days: translateWord("天後過期","天后过期","Expired in days"),
	whether_to_confirm: translateWord("是否確認","是否确认","Whether to confirm"),
	deducted_successfully: translateWord("扣除成功","扣除成功","Deducted "),
	deduction: translateWord("扣除","扣除","Deduct"),
	increase: translateWord("增加","增加","Increase"),
	latest_offers: translateWord("最新優惠","最新优惠","Latest Offers"),
	latest_addition: translateWord("最新加入","最新加入","New"),
	homemade_card_details: translateWord("自製卡詳情","自制卡详情","Physical card details"),
	edit: translateWord("編輯","编辑","Edit"),
	delete_this_card: translateWord("刪除此卡","删除此卡","Delete this card"),
	card_front: translateWord("卡正面","卡正面","Front side"),
	reverse_side_of_the_card: translateWord("卡反面","卡反面","Back side"),
	are_you_sure_to_delete_this_card: translateWord("是否確認刪除此卡","是否确认删除此卡","Are you sure to delete this card?"),
	successfully_deleted: translateWord("刪除成功","删除成功","Successfully deleted"),
	user_code_membership_code_coupon_code: translateWord("用戶碼/會員碼/優惠券碼","用户码/会员码/优惠券码","User code / membership code / promotion code"),
	please_enter_the_user_code_membership_code_coupon_code: translateWord("請輸入用戶碼/會員碼/優惠券碼","请输入用户码/会员码/优惠券码","Please enter promotion code"),
	birthday: translateWord("生日","生日","Birthday"),
	date_of_enrollment: translateWord("入會日期","入会日期","Join Date"),
	expired_date: translateWord("過期時間","过期时间","Expiry Date"),
	remaining_points: translateWord("剩餘積分","剩余积分","Account Balance"),
	minute: translateWord("分","分","Points"),
	clear_the_points: translateWord("積分清零","积分清零","Clear the points"),
	issue_a_membership_card: translateWord("發放會員卡","发放会员卡","Send Membership Cards"),
	whether_to_confirm_the_issuance_of_membership_card: translateWord("是否確認發放會員卡","是否确认发放会员卡","Whether to confirm the issuance of membership card"),
	successfully_issued: translateWord("發放成功","发放成功","Sent"),
	message: translateWord("訊息","讯息","Message"),
	more: translateWord("更多","更多","More"),
	powder_circle: translateWord("粉圈","粉圈","Moments"),
	offer: translateWord("優惠","优惠","Offers"),
	before: translateWord("前","前","before"),
	whether_to_confirm_the_use: translateWord("是否確認使用","是否确认使用","Confirm to Use?"),
	exchange: translateWord("兌換","兑换","Convert "),
	whether_to_confirm_the_call: translateWord("是否確認撥打電話","是否确认拨打电话","Whether to confirm the call"),
	business_information: translateWord("商戶資訊","商户资讯","Shop's Information"),
	invite_friends: translateWord("邀請朋友","邀请朋友","Invite friends"),
	invite_code: translateWord("邀請碼","邀请码","Invite code"),
	unsubscribe: translateWord("取消關注","取消关注","Unsubscribe"),
	has_been_concerned: translateWord("已關注","已关注","Has been subscribed"),
	unfollowed: translateWord("已取消關注","已取消关注","Unsubscibed"),
	membership_card: translateWord("會員卡","会员卡","Membership Card"),
	join_member: translateWord("加入會員","加入会员","Join membership"),
	successful_redemption: translateWord("成功兌換","成功兑换","Successful redemption"),
	successfully_received: translateWord("領取成功","领取成功","Successfully received"),
	members_can_receive: translateWord("會員才可以領取","会员才可以领取","Members Only"),
	have_finished: translateWord("已領完","已领完","Have finished"),
	redeem_now: translateWord("立即兌換","立即兑换","Redeem now"),
	get_it_right_now: translateWord("立即領取","立即领取","Collect now"),
	received: translateWord("已領取","已领取","Received"),
	minute: translateWord("分鐘","分钟","Minute"),
	hour: translateWord("小時","小时","Hour"),
	days: translateWord("天","天","Day"),
	merchant: translateWord("商戶","商户","Business"),
	store_name: translateWord("店鋪名稱","店铺名称","Shop Name"),
	category: translateWord("行業分類","行业分类","Business Type"),
	openning_hours: translateWord("開業時間","开业时间","Business start form"),
	store_area: translateWord("店鋪地區","店铺地区","Location"),
	shop_address: translateWord("店鋪地址","店铺地址","Shop Location"),
	branch_address: translateWord("分店地址","分店地址","Store Locations"),
	branch_phone: translateWord("分店電話","分店电话","Store Phone"),
	shop_portable_number: translateWord("店鋪手提號碼","店铺手提号码","Shop's Mobile Number"),
	shop_fixed_line_telephone: translateWord("店鋪電話","店铺电话","Shop's Contact Number"),
	company_email: translateWord("公司電郵","公司电邮","Email"),
	company_website: translateWord("公司網頁","公司网页","Website"),
	wechat_public_number: translateWord("微信公眾號","微信公众号","Wechat Official Account"),
	taobao: translateWord("淘寶","淘宝","Taobao"),
	company_profile: translateWord("公司簡介","公司简介","Company Profile"),
	business_hours: translateWord("營業時間","营业时间","Business hour"),
	merchant_homepage: translateWord("商戶主頁","商户主页","Shop Homepage"),
	recommended_merchant: translateWord("推薦商戶","推荐商户","Recommended Shop"),
	merchant_pink_circle_search_results: translateWord("商戶粉圈搜索結果","商户粉圈搜索結果","Search results of shop's moments"),
	no_data: translateWord("暫無數據","暂无数据","No data"),
	user_profile_search_results: translateWord("用戶個人主頁搜索結果","用户个人主页搜索结果","Search results of user profile"),
	merchant_search_results: translateWord("商戶搜尋結果","商戶搜寻結果","Search results of Shop Name"),
	business_name: translateWord("商戶名稱","商户名称","Shop Name"),
	user_search_results: translateWord("用戶搜索結果","用户搜索结果","Search results of user's name"),
	search_for: translateWord("搜索","搜索","Search"),
	user_name: translateWord("用戶名稱","用户名称","User Name"),
	user_profile: translateWord("用戶個人主頁","用户个人主页","User Profile"),
	merchants: translateWord("商戶粉圈","商户粉圈","Shop's Moments"),
	powder_circle: translateWord("粉圈","粉圈","Moments"),
	exchange: translateWord("兌換","兑换","Redemption"),
	whether_to_confirm_the_use: translateWord("是否確認使用","是否确认使用","Confirm to Use?"),
	whether_to_confirm_the_call: translateWord("是否確認撥打電話","是否确认拨打电话","Confirm to Call?"),
	business_information: translateWord("商戶資訊","商户资讯","Shop Information"),
	attention: translateWord("關注","关注","Followers"),
	valid_until_a_specific_date: translateWord("特定日期前有效","特定日期前有效","Valid until a specific date"),
	please_select_a_specific_date_that_is_valid: translateWord("請選擇有效特定日期","请选择有效特定日期","Please select a specific date that is valid"),
	the_expiry_date_cannot_be_earlier_than_today: translateWord("有效期不能早於今天","有效期不能早于今天","The expiry date cannot be earlier than today"),
	shop: translateWord("店鋪","店铺","shop"),
	store_features: translateWord("店鋪標籤","店铺标签","Store features"),
	offers_way: translateWord("優惠方式","优惠方式","Offers_way"),
	minimum_consumption: translateWord("最低消費","最低消费","Minimum consumption"),
	not_ready_yet: translateWord("還沒有到使用時間","还没有到使用时间","It's not ready yet"),
	run_out_time: translateWord("已經過了使用時間","已经过了使用时间","It has run out of time"),
	edit_success: translateWord("編輯成功","编辑成功","Edited successfully"),
	confirm_give: translateWord("確認贈送","确认赠送","Confirm to Give"),
	have_not: translateWord("未有","未有","Have not "),
	physical_card_details: translateWord("自製卡詳情","自制卡详情","Physical card Details"),
	user_only: translateWord("只限用戶領取","只限用户领取","User only"),
	has_not_opened_the_membership_card: translateWord("該商戶未開通會員卡功能","该商户未开通会员卡功能","The merchant has not opened the membership card function"),
	be_verifing: translateWord("正在審核中","正在审核中","Be verifing"),
	website_area: translateWord("網店地區","网店地区","Store area"),
	pickup_address: translateWord("提貨地址","提货地址","Pickup address"),
	pickup_time: translateWord("提貨時間","提货时间","Pickup time"),
	website_phone: translateWord("網店手提號碼","网店手提电话","Online store portable number"),
	website_fixphone: translateWord("網店電話","网店电话","Store area"),
	website_email: translateWord("網店電郵","网店电邮","Online store email"),
	website_website: translateWord("網店網頁","网店网页","Online web page"),
	website_website: translateWord("回复","回复","reply"),
	more_wonderful: translateWord("更多精彩，請下載APP體驗！","更多精彩，请下载app体验!","More exciting, please download the app experience!"),
	terms_and_conditions_of_use: translateWord("會員使用條款及細則","会员使用条款及细则","Terms and conditions of use"),
	read_agree_conditions: translateWord("我已閱讀並同意《會員使用條款及細則》","我已同意并同意《会员使用条款及细则》","I have read and agree to the terms and conditions of use"),	
};