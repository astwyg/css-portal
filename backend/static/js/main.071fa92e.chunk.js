(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{107:function(e,t,a){e.exports=a(171)},164:function(e,t,a){},166:function(e,t,a){},171:function(e,t,a){"use strict";a.r(t);a(108);var n=a(0),r=a.n(n),l=a(27),o=a.n(l),c=(a(164),a(165),a(166),a(32)),s=a(6),i=a(51),m=a(52),u=a(62),d=a(60),h=a(12),E=a(8),p=a(9),f=a(106),g=a(80),w=a(5);var y="http://123.150.8.50:8000",v={users:"".concat(y,"/users/"),checkInviteCode:"".concat(y,"/inviteCode/check/"),login:"".concat(y,"/login/"),logout:"".concat(y,"/logout/"),updateUserInfo:"".concat(y,"/updateUserInfo/"),saasApiGetTickets:"".concat(y,"/saasApi/getTickets/"),saasApiGetKnowledges:"".concat(y,"/saasApi/getKnowledges/")},k=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={registModalVisible:!1,userinfoModalVisible:!1,loginModalVisible:!1},n.newUserForm={inviteCode:r.a.createRef(),company:r.a.createRef(),title:r.a.createRef(),name:r.a.createRef(),phone:r.a.createRef(),email:r.a.createRef(),passwd:r.a.createRef(),agree:r.a.createRef()},n.loginForm={phone:r.a.createRef(),passwd:r.a.createRef()},n.userInfoForm={company:r.a.createRef(),title:r.a.createRef(),name:r.a.createRef(),phone:r.a.createRef(),email:r.a.createRef(),passwd:r.a.createRef()},n}return Object(m.a)(a,[{key:"handleLogout",value:function(){fetch(v.logout,{method:"POST",body:JSON.stringify({}),headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e.status?alert(e.message):window.location.reload(!1)}))}},{key:"handleLoadUserinfo",value:function(){var e=this;this.setState({userinfoModalVisible:!0},(function(){e.userInfoForm.company.current.value=window.user.company,e.userInfoForm.name.current.value=window.user.name,e.userInfoForm.phone.current.value=window.user.phone,e.userInfoForm.email.current.value=window.user.email,e.userInfoForm.title.current.value=window.user.title}))}},{key:"handleCreateUser",value:function(){this.newUserForm.agree.current.checked?this.newUserForm.title.current.value?this.newUserForm.name.current.value?this.newUserForm.phone.current.value&&11===this.newUserForm.phone.current.value.length?this.newUserForm.email.current.value?this.newUserForm.passwd.current.value?fetch(v.users,{method:"POST",body:JSON.stringify({inviteCode:this.newUserForm.inviteCode.current.value,name:this.newUserForm.name.current.value,phone:this.newUserForm.phone.current.value,email:this.newUserForm.email.current.value,passwd:this.newUserForm.passwd.current.value,company:this.newUserForm.company.current.value,title:this.newUserForm.title.current.value}),headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(e){0===e.status?(alert(e.message),window.location.reload(!1)):e.message?alert(e.message):alert("\u53d1\u751f\u4e86\u672a\u77e5\u7684\u670d\u52a1\u5668\u9519\u8bef, \u8bf7\u8054\u7cfb400\u5ba2\u670d.")})):alert("\u8bf7\u8f93\u5165\u670d\u52a1\u5bc6\u7801"):alert("\u8bf7\u8f93\u5165\u90ae\u7bb1"):alert("\u8bf7\u6b63\u786e\u8f93\u516511\u4f4d\u624b\u673a\u53f7"):alert("\u8bf7\u8f93\u5165\u59d3\u540d"):alert("\u8bf7\u8f93\u5165\u804c\u4f4d"):alert("\u60a8\u9700\u8981\u540c\u610f\u98de\u817e\u65b0\u57fa\u5efa\u670d\u52a1\u4fdd\u8bc1\u8054\u76df\u7ae0\u7a0b\u624d\u80fd\u6ce8\u518c\u672c\u5e73\u53f0.")}},{key:"handleCheckInviteCode",value:function(){var e=this;8!==this.newUserForm.inviteCode.current.value.length?this.newUserForm.company.current.value="\u8bf7\u6b63\u786e\u8f93\u51658\u4f4d\u9080\u8bf7\u7801":fetch(v.checkInviteCode,{method:"POST",body:JSON.stringify({code:this.newUserForm.inviteCode.current.value}),headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(t){t.status?alert(t.message):e.newUserForm.company.current.value=t.message}))}},{key:"handleLogin",value:function(){this.loginForm.phone.current.value&&11===this.loginForm.phone.current.value.length?this.loginForm.passwd.current.value?fetch(v.login,{method:"POST",body:JSON.stringify({phone:this.loginForm.phone.current.value,passwd:this.loginForm.passwd.current.value}),headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(e){console.log(e),e.status?alert(e.message):window.location.reload(!1)})):alert("\u8bf7\u8f93\u5165\u670d\u52a1\u5bc6\u7801"):alert("\u8bf7\u6b63\u786e\u8f93\u516513\u4f4d\u624b\u673a\u53f7")}},{key:"handleUpdateUserInfo",value:function(){fetch(v.updateUserInfo,{method:"POST",body:JSON.stringify({title:this.userInfoForm.title.current.value,name:this.userInfoForm.name.current.value,email:this.userInfoForm.email.current.value,phone:this.userInfoForm.phone.current.value,passwd:this.userInfoForm.passwd.current.value}),headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(e){e.status?alert(e.message):window.location.reload(!1)}))}},{key:"render",value:function(){var e=this;return r.a.createElement(c.a,null,r.a.createElement(s.a,null,r.a.createElement(E.a,{xs:12,sm:6,style:{textAlign:"right",margin:"2em"}},r.a.createElement(s.a,null," ",r.a.createElement("img",{src:"/static/img/logo2.png",alt:"logo"})," ",r.a.createElement("span",{className:"header-title"},"\u98de\u817e\u65b0\u57fa\u5efa\u670d\u52a1\u4fdd\u969c\u5e73\u53f0")," ")),r.a.createElement(E.a,{xs:12,sm:6,style:{textAlign:"right",flex:1,margin:"2em"}},window.user?r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{variant:"secondary",size:"sm",onClick:function(){return e.handleLoadUserinfo()}},"\u7528\u6237\u4fe1\u606f")):r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{variant:"secondary",size:"sm",onClick:function(){return e.setState({loginModalVisible:!0})}},"\u767b\u5f55"),r.a.createElement(h.a,{variant:"secondary",size:"sm",onClick:function(){return e.setState({registModalVisible:!0})}},"\u6ce8\u518c")))),r.a.createElement(p.a,{show:this.state.registModalVisible,onHide:function(){return e.setState({registModalVisible:!1})}},r.a.createElement(p.a.Header,{closeButton:!0},r.a.createElement(p.a.Title,null,"\u6b22\u8fce\u6ce8\u518c\u98de\u817e\u65b0\u57fa\u5efa\u670d\u52a1\u4fdd\u8bc1\u5e73\u53f0")),r.a.createElement(p.a.Body,null,r.a.createElement(f.a,{defaultActiveKey:"invite"},r.a.createElement(g.a,{eventKey:"invite",title:"\u9080\u8bf7\u6ce8\u518c"},r.a.createElement("br",null),r.a.createElement(w.a,null,r.a.createElement(w.a.Group,{as:s.a},r.a.createElement(w.a.Label,{column:!0,sm:3,controlId:"inviteCode",style:{textAlign:"right"}},"\u9080\u8bf7\u7801"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{required:!0,ref:this.newUserForm.inviteCode,onChange:function(){return e.handleCheckInviteCode()},placeholder:"\u5982\u679c\u6ca1\u6709\u7533\u8bf7\u7801\u8bf7\u4f7f\u7528\u81ea\u884c\u7533\u8bf7"}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"company"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u516c\u53f8"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{disabled:!0,required:!0,ref:this.newUserForm.company,placeholder:"\u586b\u5199\u9080\u8bf7\u7801\u540e\u81ea\u52a8\u8bc6\u522b"}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"title"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u804c\u4f4d"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{required:!0,ref:this.newUserForm.title,placeholder:""}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"realname"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u59d3\u540d"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{required:!0,ref:this.newUserForm.name,placeholder:""}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"phone"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u624b\u673a\u53f7"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{required:!0,ref:this.newUserForm.phone,placeholder:""}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"email"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u90ae\u7bb1"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{ref:this.newUserForm.email,placeholder:""}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"passwd"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u670d\u52a1\u5bc6\u7801"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{required:!0,ref:this.newUserForm.passwd,type:"password",placeholder:""}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"formHorizontalCheck"},r.a.createElement(E.a,{sm:{span:2,offset:3}},r.a.createElement(w.a.Check,{ref:this.newUserForm.agree,label:"\u540c\u610f"})),r.a.createElement(E.a,null,r.a.createElement("a",{href:"#",onClick:function(){return window.open("/static/\u98de\u817e\u65b0\u57fa\u5efa\u670d\u52a1\u4fdd\u969c\u8054\u76df\u7ae0\u7a0b.pdf","_blank")}},"\u98de\u817e\u65b0\u57fa\u5efa\u670d\u52a1\u4fdd\u8bc1\u8054\u76df\u7ae0\u7a0b"))),r.a.createElement(w.a.Group,{as:s.a},r.a.createElement(E.a,{sm:{span:4,offset:3}},r.a.createElement(h.a,{variant:"primary",onClick:function(){return e.handleCreateUser()}},"\u6ce8\u518c"))))),r.a.createElement(g.a,{eventKey:"diy",title:"\u81ea\u884c\u7533\u8bf7"},r.a.createElement("p",null,"\u8bf7\u6309\u7167\u5982\u4e0b\u6b65\u9aa4\u7533\u8bf7\u52a0\u5165\u8054\u76df:"),r.a.createElement("p",null,"1. \u4e0b\u8f7d ",r.a.createElement("a",{href:"#",onClick:function(){return window.open("/static/\u98de\u817e\u65b0\u57fa\u5efa\u670d\u52a1\u4fdd\u969c\u8054\u76df\u7533\u8bf7\u8868.docx","_blank")}},"\u98de\u817e\u65b0\u57fa\u5efa\u670d\u52a1\u4fdd\u969c\u8054\u76df\u7533\u8bf7\u8868"),"\u5e76\u586b\u5199\u3001\u6253\u5370\u3001\u76d6\u7ae0\u3001\u626b\u63cf"),r.a.createElement("p",null,"2. \u4e0b\u8f7d ",r.a.createElement("a",{href:"#",onClick:function(){return window.open("/static/\u98de\u817e\u65b0\u57fa\u5efa\u670d\u52a1\u4fdd\u969c\u8054\u76df\u8d26\u53f7\u4fe1\u606f\u8868.xlsx","_blank")}},"\u98de\u817e\u65b0\u57fa\u5efa\u670d\u52a1\u4fdd\u969c\u8054\u76df\u8d26\u53f7\u4fe1\u606f\u8868"),"\u5e76\u586b\u5199"),r.a.createElement("p",null,"3. \u8bf7\u5c06\u4e0a\u8ff0\u7b2c1\u9879\u626b\u63cf\u4ef6\u548c\u7b2c2\u9879\u7535\u5b50\u6863\u53d1\u90ae\u4ef6\u5230",r.a.createElement("a",{href:"mailto:pnic@phytium.com.cn"},"pnic@phytium.com.cn")))))),r.a.createElement(p.a,{show:this.state.userinfoModalVisible,onHide:function(){return e.setState({userinfoModalVisible:!1})}},r.a.createElement(p.a.Header,{closeButton:!0},r.a.createElement(p.a.Title,null,"\u4fee\u6539\u7528\u6237\u4fe1\u606f")),r.a.createElement(p.a.Body,null,r.a.createElement("br",null),r.a.createElement(w.a,null,r.a.createElement(w.a.Group,{as:s.a,controlId:"company"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u516c\u53f8"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{disabled:!0,required:!0,ref:this.userInfoForm.company}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"company"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u804c\u52a1"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{required:!0,ref:this.userInfoForm.title}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"realname"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u59d3\u540d"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{required:!0,ref:this.userInfoForm.name}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"phone"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u624b\u673a\u53f7"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{required:!0,ref:this.userInfoForm.phone}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"email"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u90ae\u7bb1"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{required:!0,ref:this.userInfoForm.email}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"passwd"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u670d\u52a1\u5bc6\u7801"),r.a.createElement(E.a,{sm:9},r.a.createElement(w.a.Control,{required:!0,ref:this.userInfoForm.passwd,type:"password",placeholder:"\u8bf7\u8f93\u5165\u65b0\u5bc6\u7801"}))),r.a.createElement(w.a.Group,{as:s.a},r.a.createElement(E.a,{sm:{span:9,offset:3}},r.a.createElement(h.a,{variant:"primary",onClick:function(){return e.handleUpdateUserInfo()}},"\u66f4\u65b0\u7528\u6237\u4fe1\u606f")," "," ",r.a.createElement(h.a,{variant:"danger",onClick:function(){return e.handleLogout()}},"\u9000\u51fa\u767b\u5f55")))))),r.a.createElement(p.a,{show:this.state.loginModalVisible,onHide:function(){return e.setState({loginModalVisible:!1})}},r.a.createElement(p.a.Header,{closeButton:!0},r.a.createElement(p.a.Title,null,"\u767b\u5f55")),r.a.createElement(p.a.Body,null,r.a.createElement("br",null),r.a.createElement(w.a,null,r.a.createElement(w.a.Group,{as:s.a,controlId:"phone"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u624b\u673a\u53f7"),r.a.createElement(E.a,{sm:8},r.a.createElement(w.a.Control,{required:!0,ref:this.loginForm.phone,placeholder:"11\u4f4d\u624b\u673a\u53f7"}))),r.a.createElement(w.a.Group,{as:s.a,controlId:"passwd"},r.a.createElement(w.a.Label,{column:!0,sm:3,style:{textAlign:"right"}},"\u670d\u52a1\u5bc6\u7801"),r.a.createElement(E.a,{sm:8},r.a.createElement(w.a.Control,{required:!0,ref:this.loginForm.passwd,type:"password",placeholder:"\u8bf7\u8f93\u5165\u5bc6\u7801"}))),r.a.createElement(w.a.Group,{as:s.a},r.a.createElement(E.a,{sm:{span:9,offset:3}},r.a.createElement(h.a,{variant:"primary",onClick:function(){return e.handleLogin()}},"\u767b\u5f55")," "," "))))))}}]),a}(r.a.Component),b=a(105),C=a(81),F=a(64),I=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).state={ticketModalVisible:!1,knowledgeModalVisible:!1,tickets:[],currentTicketContent:"",knowledges:[],currentKnowledge:""},n}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;window.user&&(fetch(v.saasApiGetTickets,{method:"POST",body:JSON.stringify({}),headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(t){t.status?alert(t.message):e.setState({tickets:t.contents})})),fetch(v.saasApiGetKnowledges,{method:"POST",body:JSON.stringify({}),headers:{"content-type":"application/json"}}).then((function(e){return e.json()})).then((function(t){e.setState({knowledges:t.knowledge_questions})})))}},{key:"handleShowTicket",value:function(e){var t,a,n=(t=[["\u5de5\u5355id",e.id],["\u6807\u9898",e.subject],["\u72b6\u6001",e.status],["\u521b\u5efa\u65f6\u95f4",new Date(e.created_at).toLocaleString()],["\u6700\u540e\u66f4\u65b0",new Date(e.updated_at).toLocaleString()]],r.a.createElement("div",null,t.map((function(e,t){return r.a.createElement(s.a,{key:t},r.a.createElement(E.a,{className:"d-none d-sm-block",sm:3,style:{textAlign:"right"}},e[0]," "," : "),r.a.createElement(E.a,{className:"d-none d-sm-block",sm:9},e[1]),r.a.createElement(E.a,{className:"d-block d-sm-none",sm:12},e[0]," "," : "),r.a.createElement(E.a,{className:"d-block d-sm-none",sm:12,style:{textAlign:"right"}},e[1]))})))),l=r.a.createElement("div",null,n,(a=e.replies,r.a.createElement(C.a,{striped:!0,bordered:!0,hover:!0,style:{marginTop:"15px"}},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"\u5904\u7406\u4eba"),r.a.createElement("th",null,"\u5904\u7406\u65f6\u95f4"),r.a.createElement("th",null,"\u5904\u7406\u610f\u89c1"))),r.a.createElement("tbody",null,a.map((function(e){if("html"===e.reply_content_type)return r.a.createElement("tr",null,r.a.createElement("td",null,e.reply_user),r.a.createElement("td",null,new Date(e.reply_updated_at).toLocaleString()),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.reply_content}}))}))))));this.setState({ticketModalVisible:!0,currentTicketContent:l})}},{key:"handleShowKnowledge",value:function(e){this.setState({knowledgeModalVisible:!0,currentKnowledge:r.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.content}})})}},{key:"render",value:function(){var e=this;return r.a.createElement(c.a,{className:"PageContent"},r.a.createElement(s.a,{style:{textAlign:"left"}},r.a.createElement(b.a,{className:"jumbotron-cover"},r.a.createElement("div",{className:"zoomIn animated"},r.a.createElement("h1",null,"\u6b22\u8fce!"),r.a.createElement("p",null,"\u968f\u7740\u6211\u56fd\u65b0\u57fa\u5efa\u548c\u4fe1\u606f\u5e94\u7528\u6280\u672f\u521b\u65b0\u7b49\u9886\u57df\u4e0d\u65ad\u53d1\u5c55\uff0c \u5929\u6d25\u98de\u817e\u4fe1\u606f\u6280\u672f\u6709\u9650\u516c\u53f8\u5e0c\u671b\u53ef\u4ee5\u4e3a\u751f\u6001\u4f19\u4f34\u5728\u65b0\u57fa\u5efa\u8fdb\u7a0b\u4e2d\uff0c \u63d0\u4f9b\u66f4\u597d\u7684\u54a8\u8be2\u670d\u52a1\u3001\u6280\u672f\u652f\u6301\u548c\u552e\u540e\u4fdd\u969c\u670d\u52a1\uff0c\u5e76\u5f62\u6210\u5e38\u6001\u5316\u548c\u4fe1\u606f\u5316\u652f\u6491\u673a\u5236\uff0c \u56e0\u6b64\uff0c\u51b3\u5b9a\u6210\u7acb\u98de\u817e\u65b0\u57fa\u5efa\u670d\u52a1\u4fdd\u969c\u8054\u76df\u3002"),r.a.createElement("p",null,"\u6210\u4e3a\u98de\u817e\u65b0\u57fa\u5efa\u670d\u52a1\u4fdd\u969c\u8054\u76df\u4f1a\u5458\uff0c\u53ef\u4ee5\u4f7f\u7528\u672c\u5e73\u53f0\u5168\u90e8\u529f\u80fd\uff0c\u5e76\u53ef\u4f18\u5148\u901a\u8fc7 ",r.a.createElement("span",{className:"important-text"},"400-9221-666")," \u83b7\u53d6\u4e13\u5bb6\u7535\u8bdd\u652f\u6301\u3002"),r.a.createElement("p",null,r.a.createElement(h.a,{variant:"primary",className:"btn-read-more",onClick:function(){return window.open("/static/\u98de\u817e\u65b0\u57fa\u5efa\u670d\u52a1\u4fdd\u969c\u8054\u76df\u7ae0\u7a0b.pdf","_blank")}},"\u67e5\u770b\u8054\u76df\u7ae0\u7a0b"))))),r.a.createElement(s.a,{className:"center-title"},r.a.createElement("h4",null,"\u4e13\u5bb6\u5728\u7ebf\u54a8\u8be2(\u5de5\u4f5c\u65e510\u70b9-16\u70b9)")),r.a.createElement(s.a,{className:"center-title"},r.a.createElement("div",{className:"title-line"})),r.a.createElement(s.a,null,["\u65b9\u6848\u54a8\u8be2","\u9879\u76ee\u5408\u4f5c","\u9002\u914d\u8ba4\u8bc1","\u8d4b\u80fd\u57f9\u8bad","\u8054\u5408\u5ba3\u4f20","\u6574\u673a\u677f\u5361\u95ee\u9898","\u8bfe\u9898\u7533\u62a5","\u5176\u4ed6\u95ee\u9898"].map((function(e,t){return r.a.createElement(E.a,{key:t,lg:3,sm:6,xs:6,style:{margin:"1em 0"}},r.a.createElement(h.a,{variant:"light",className:"btn-service",onClick:function(){window.user?window.open("https://1396609.s2.udesk.cn/im_client/?web_plugin_id=28724?channel=".concat(e).concat(window.user.webim_sign),"_blank"):alert("\u8bf7\u5148\u767b\u5f55")}},e))}))),r.a.createElement(s.a,{className:"center-title",style:{marginTop:"2em"}},r.a.createElement("h4",null,"\u6211\u7684\u5de5\u5355")),r.a.createElement(s.a,{className:"center-title"},r.a.createElement("div",{className:"title-line"})),r.a.createElement(s.a,null,r.a.createElement(C.a,{striped:!0,bordered:!0,hover:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"\u7f16\u53f7"),r.a.createElement("th",null,"\u6807\u9898"),r.a.createElement("th",null,"\u66f4\u65b0\u65f6\u95f4"),r.a.createElement("th",null,"\u5f53\u524d\u72b6\u6001"))),r.a.createElement("tbody",null,window.user?this.state.tickets.map((function(t){return r.a.createElement("tr",null,r.a.createElement("td",null,t.id),r.a.createElement("td",null,r.a.createElement("a",{href:"#",onClick:function(){return e.handleShowTicket(t)}},t.subject)),r.a.createElement("td",null,new Date(t.updated_at).toLocaleDateString()),r.a.createElement("td",null,"open"===t.status?r.a.createElement(h.a,{variant:"outline-danger",size:"sm",onClick:function(){return e.handleShowTicket(t)}},"\u6b63\u5728\u5904\u7406"):r.a.createElement(h.a,{variant:"outline-dark",size:"sm",onClick:function(){return e.handleShowTicket(t)}},"\u5df2\u5b8c\u6210")))})):r.a.createElement("tr",null,r.a.createElement("td",{colSpan:"4"},"\u8bf7\u767b\u5f55\u540e\u67e5\u770b\u5de5\u5355"))))),r.a.createElement(s.a,{className:"center-title",style:{marginTop:"2em"}},r.a.createElement("h4",null,"\u77e5\u8bc6\u5e93")),r.a.createElement(s.a,{className:"center-title"},r.a.createElement("div",{className:"title-line"})),r.a.createElement(s.a,null,r.a.createElement(F.a,{style:{width:"100%",textAlign:"left"}},window.user?this.state.knowledges.map((function(t){return r.a.createElement(F.a.Item,{action:!0,onClick:function(){return e.handleShowKnowledge(t)},className:"item-highlight"},t.title)})):r.a.createElement(F.a.Item,{action:!0,className:"item-highlight"},"\u8bf7\u767b\u5f55\u540e\u67e5\u770b\u77e5\u8bc6\u5e93"))),r.a.createElement(p.a,{show:this.state.ticketModalVisible,size:"lg",onHide:function(){return e.setState({ticketModalVisible:!1,currentTicketContent:""})}},r.a.createElement(p.a.Header,{closeButton:!0},r.a.createElement(p.a.Title,null,"\u5de5\u5355\u8be6\u60c5")),r.a.createElement(p.a.Body,null,this.state.currentTicketContent),r.a.createElement(p.a.Footer,null,r.a.createElement(h.a,{variant:"secondary",onClick:function(){return e.setState({ticketModalVisible:!1,currentTicketContent:""})}},"\u5173\u95ed"))),r.a.createElement(p.a,{show:this.state.knowledgeModalVisible,size:"lg",onHide:function(){return e.setState({knowledgeModalVisible:!1,currentKnowledge:""})}},r.a.createElement(p.a.Header,{closeButton:!0},r.a.createElement(p.a.Title,null,"\u77e5\u8bc6\u5e93\u8be6\u60c5")),r.a.createElement(p.a.Body,null,this.state.currentKnowledge),r.a.createElement(p.a.Footer,null,r.a.createElement(h.a,{variant:"secondary",onClick:function(){return e.setState({knowledgeModalVisible:!1,currentKnowledge:""})}},"\u5173\u95ed"))))}}]),a}(r.a.Component),S=function(){return r.a.createElement(s.a,{style:{width:"100%",margin:"4em auto 2em auto"}},r.a.createElement(E.a,null,r.a.createElement("a",{href:"#",className:"info-text"},"\u6d25ICP\u590716004869\u53f7-1"),"\xa0\xa0\xa0\xa0",r.a.createElement("span",{className:"info-text"},"\u6211\u4eec\u6b63\u5728\u9a84\u50b2\u7684\u4f7f\u7528\u98de\u817eCPU\u652f\u6491\u672c\u7cfb\u7edf")))};var U=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(c.a,null,r.a.createElement(s.a,null,r.a.createElement(k,null),r.a.createElement(I,null),r.a.createElement(S,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[107,1,2]]]);
//# sourceMappingURL=main.071fa92e.chunk.js.map