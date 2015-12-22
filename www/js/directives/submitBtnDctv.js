define(["./module"],function(e){e.directive("submitButton",["httpService","messageService","validateService","$state","userService",function(e,t,n,i,o){return{restrict:"E",template:'<button class="button button-full button-energized button-round">{{text}}</button>',replace:!0,scope:{},link:function(s,u,r){s.text=r.text;var l,a,c=r.state||"",m=r.user||"",d=r.login||"",f=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,w=/^((145|147)|(15[^4])|(17[6-8])|((13|18)[0-9]))\d{8}$/;u.bind("click",function(){if(l=n.isEmpty(r.form),1!==l)return t.show(l),!1;if(a=n.submitData(r.form),null!==a.email&&void 0!==a.email&&f.test(a.email)===!1)t.show("请输入正确的邮箱格式");else if(null!==a.phone&&void 0!==a.phone&&w.test(a.phone)===!1)t.show("请输入正确的手机号码格式");else if(null!==a.confirmPwd&&void 0!==a.confirmPwd&&a.confirmPwd!==a.password)t.show("两次密码输入不一致");else if(null!==a.num&&void 0!==a.num&&isNaN(a.num)===!0||Number(a.num)<=0)t.show("请输入正确的商品数量格式");else{var u=e.getData(r.action,a);u.then(function(e){t.show(e.message),i.go(c),"true"===m&&o.set(s.$parent.user),"true"===d&&o.set(e.data)})}})}}}])});