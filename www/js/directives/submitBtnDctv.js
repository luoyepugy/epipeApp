define(["./module"],function(e){e.directive("submitButton",["httpService","messageService","validateService","$state","userService",function(e,t,o,n,i){return{restrict:"E",template:'<button class="button button-full button-energized button-round">{{text}}</button>',replace:!0,scope:{},link:function(s,u,r){s.text=r.text;var l,c,a=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,f=/^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;u.bind("click",function(){if(l=o.isEmpty(".j-form .j-input"),1!==l)return console.log(l),t.show(l),!1;if(c=o.submitData(".j-form"),null!==c.email&&void 0!==c.email&&a.test(c.email)===!1)t.show("请输入正确的邮箱格式");else if(null!==c.phone&&void 0!==c.phone&&f.test(c.phone)===!1)t.show("请输入正确的手机号码格式");else if(null!==c.confirmPwd&&void 0!==c.confirmPwd&&c.confirmPwd!==c.password)t.show("两次密码输入不一致");else{var u=e.getData(r.action,c);u.then(function(e){t.show(e.message),n.go(r.state),"true"===r.user&&(i.user=s.$parent.user,console.log(i.user))},function(e){t.show(e)})}})}}}])});