Zepto(function($){
  console.log('Ready to Zepto!')

	var current_user = CURRENT_USER.get_current_user();	
	var current_session = CURRENT_SESSION.get_current_session();
	var user_sessions = USER_SESSION.get_user_sessions();
	
	var current_user_uid = current_user['uid'];
	var current_session_id = current_session['sid'];
		
	function log(t){
		console.log('[LOG] '+ t);
	}
	var client = new iChatClient({
		url : 'http://at35.com:4567/faye',
		timeout : 120,
		retry		: 5
	});

	function get_current_topic(){
		return 'foo' + '+' + current_session_id;
	}
	
	var current_topic = get_current_topic();
	
	function bind_send_msg_event(){
		var input_text = $.trim($('#msg_input_text_id').val());
		log('发送信息内容是：'+input_text);
		
		$('.send_msg_btn').click(function(){
			// alert('send_msg_btn');
			client.send(current_topic,{
				text: input_text
			},function(){
				// alert('Message received by server!');
			},function(error){
				alert('There was a problem: ' + error.message);
			});
		});
	}

	function test(){
		setTimeout(function(){
			client.send(current_topic, {
				text:'dssdjfkjkl'
			},function(){
				// alert('Message received by server!');
			},function(error){
				alert('There was a problem: ' + error.message);
			});
		},1000);
	}
	
	function leave(){
		client.leave('foo');
	}
	
	function write_msg_content_to_dom(msg){
		var is_myself = false;
		
		if(is_myself == true){
			write_left_msg_content_to_dom(msg);
		}else{
			write_right_msg_content_to_dom(msg);
		}
	}
	
	function write_left_msg_content_to_dom(msg){
		var received_msg_html = "<li class='msgitem leftitem clearfix'>"
			+"	<div class='chathead pull-left'>"
			+"		<a target='_blank' href='#'>"
			+"			<img src='../images/defaultimg.jpg' alt=''>"
			+"		</a>"
			+"	</div>"
			+"	<div class='msg-content-header pull-left'></div>"
			+"	<div class='msg-content-body pull-left'>"
			+"		<a class='close' href='#' style='display: none;'></a>"
			+"		<div class='msg-content'>"
			+"			<p class='abstract'>" + msg.text + "</p>"
			+"			<span class='chat-time text-right'>2012-5-28 3:35</span>"
			+"		</div>"
			+"	</div>"
			+"</li>";
		
		$('#chat_container_id').append(received_msg_html);
	}
	
	function write_right_msg_content_to_dom(msg){
		var received_msg_html = "<li class='msgitem rightitem clearfix'>"
 				+"<div class='msg-content-header pull-right'></div>"
 				+"<div class='msg-content-body pull-right'>"
 					+"<a class='close' href='#' style='display: none;'>"+"</a>"
 					+"<div class='msg-content'>"
 						+"<p class='abstract'>"+ msg.text +"</p>"
 						+"<span class='chat-time text-right'>2012-5-28 3:35</span>"
 					+"</div>"
 				+"</div>"
 				+"<div class='clear'>"+"</div>"
 			+"</li>"
		
		$('#chat_container_id').append(received_msg_html);
	}
	
		
	
	init();
	
	function init(){
		client.join('foo', function(message) {
		  // handle message
			// alert(message.text);
			write_msg_content_to_dom(message);
			log('收到的信息是：'+message.text);
		});
		
		// 绑定发送按钮事件
		bind_send_msg_event();
	}
	
});
