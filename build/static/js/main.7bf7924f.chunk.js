(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{39:function(e,t,a){e.exports=a(83)},45:function(e,t,a){},46:function(e,t,a){},83:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(3),c=a.n(o),i=(a(45),a(11)),s=a(12),l=a(15),u=a(14),m=a(16),d=a(17),h=a(38),g=a(13),p=(a(46),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).handlecategoryChange=function(e){a.setState({ticketCategory:e.target.value})},a.handleInputChange=function(e){var t,n=e.target,r=n.value,o=n.name,c=Object(g.a)(a);function i(e){c.setState({changedValues:c.state.changedValues.filter(function(t){return t!==e})})}if(a.state.changedValues.includes(o))switch(a.setState(Object(d.a)({},o,r)),o){case"contactName":r===a.props.name&&i(o);break;case"contactEmail":r===a.props.email&&i(o);break;case"contactPhone":r===a.props.phone&&i(o);break;case"contactExtension":r===a.props.extension&&i(o);break;case"ticketSummary":r===a.props.summary&&i(o);break;case"ticketStatus":r===a.props.status&&i(o);break;case"ticketType":r===a.props.type&&i(o);break;case"ticketPriority":r===a.props.priority&&i(o);break;case"ticketCategory":r===a.props.category&&i(o);break;case"ticketSubcategory":r===a.props.subcategory&&i(o);break;case"ticketNewDetailedInfo":""===r&&i(o);break;default:console.error("No field found with name "+o)}else a.setState((t={},Object(d.a)(t,o,r),Object(d.a)(t,"changedValues",[].concat(Object(h.a)(a.state.changedValues),[o])),t))},a.handleCancel=function(){0===a.state.changedValues.length?a.props.onCancel():window.confirm("Do you wish to discard changes?")&&a.props.onCancel()},a.handleToggleHistory=function(e){e.preventDefault(),a.setState({showHistory:!a.state.showHistory})},a.state={ID:a.props.id,contactName:a.props.name,contactEmail:a.props.email,contactPhone:a.props.phone,contactExtension:a.props.extension,ticketSummary:a.props.summary,ticketStatus:a.props.status,ticketType:a.props.type,ticketPriority:a.props.priority,ticketCategory:a.props.category,ticketSubcategory:a.props.subcategory,ticketNewDetailedInfo:"",ticketDetailedInfo:a.props.details,ticketHistory:a.props.history,categoriesAndSubcategories:[{category:"Hardware",subcategories:["Laptop","Desktop","Peripheral/accessory","Other"]},{category:"Software",subcategories:["MS Office","MS Outlook","Web browser","Other"]},{category:"Other",subcategories:["Other"]}],noChangesMade:!0,changedValues:[],showHistory:!1},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e,t=this,a=""!==this.state.ticketDetailedInfo?r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"form-row mb-1"},r.a.createElement("div",{className:"form-group col-12"},r.a.createElement("label",{htmlFor:"ticketDetailedInfo"},"Past Detailed Info"),r.a.createElement("textarea",{className:"form-control",name:"ticketDetailedInfo",rows:"5",value:this.state.ticketDetailedInfo,disabled:!0}))),r.a.createElement("div",{className:"form-row mb-2"},r.a.createElement("div",{className:"form-group col-12"},r.a.createElement("button",{className:"btn btn-secondary",value:this.state.ticketDetailedInfo,onClick:this.handleToggleHistory},"Toggle ticket history")))):null,n=this.state.showHistory?r.a.createElement("div",{className:"form-row mb-1"},r.a.createElement("div",{className:"form-group col-12"},r.a.createElement("textarea",{className:"form-control",name:"ticketHistoryBox",rows:"5",value:this.state.ticketHistory,disabled:!0}))):null;return e="Select category"===this.state.ticketCategory||"undefined"===typeof this.state.ticketCategory?[{category:"Select category",subcategories:[]}]:this.state.categoriesAndSubcategories.filter(function(e){return e.category===t.state.ticketCategory}),r.a.createElement(r.a.Fragment,null,r.a.createElement("main",{className:"container bg-light pb-2 pt-2"},r.a.createElement("h1",null,""===this.state.ID?"New Ticket":"Ticket #"+this.state.ID),r.a.createElement("hr",null),r.a.createElement("h3",{className:"mt-3"},"Contact Information"),r.a.createElement("form",{onSubmit:0===this.state.changedValues.length?this.props.onCancel:this.props.onSubmit,onCancel:this.handleCancel,id:this.state.ID},r.a.createElement("div",{className:"form-row align-items-center mt-3"},r.a.createElement("div",{className:"form-group col mr-1"},r.a.createElement("label",{htmlFor:"contactName"},"Name *"),r.a.createElement("input",{type:"name",className:"form-control",name:"contactName",placeholder:"First Last",value:this.state.contactName,onChange:this.handleInputChange,required:!0})),r.a.createElement("div",{className:"form-group col ml-1 mr-1"},r.a.createElement("label",{htmlFor:"contactEmail"},"Email *"),r.a.createElement("input",{type:"email",className:"form-control",name:"contactEmail",placeholder:"someone@site.com",value:this.state.contactEmail,onChange:this.handleInputChange,required:!0})),r.a.createElement("div",{className:"form-group col ml-1 mr-1"},r.a.createElement("label",{htmlFor:"contactPhone"},"Phone number"),r.a.createElement("input",{type:"tel",className:"form-control",name:"contactPhone",placeholder:"123-456-7880",value:null===this.state.contactPhone?"":this.state.contactPhone,onChange:this.handleInputChange})),r.a.createElement("div",{className:"form-group col ml-1"},r.a.createElement("label",{htmlFor:"contactExtension"},"Extension"),r.a.createElement("input",{type:"text",className:"form-control",name:"contactExtension",placeholder:"1234",value:null===this.state.contactExtension?"":this.state.contactExtension,onChange:this.handleInputChange}))),r.a.createElement("div",{className:"form-row mb-5"}),r.a.createElement("h3",null,"Ticket Information"),r.a.createElement("div",{className:"form-row mt-3 mb-5"},r.a.createElement("div",{className:"form-group col-9"},r.a.createElement("label",{htmlFor:"ticketSummary"},"Summary *"),r.a.createElement("input",{type:"text",className:"form-control",name:"ticketSummary",value:this.state.ticketSummary,onChange:this.handleInputChange,required:!0})),r.a.createElement("div",{className:"form-group col ml-2"},r.a.createElement("label",{htmlFor:"ticketStatus"},"Status *"),r.a.createElement("select",{className:"form-control",name:"ticketStatus",value:this.state.ticketStatus,onChange:this.handleInputChange,required:!0},r.a.createElement("option",{style:{display:"none"},value:""},"Select status"),r.a.createElement("option",{value:"Open"},"Open"),r.a.createElement("option",{value:"In progress"},"In progress"),r.a.createElement("option",{value:"On hold"},"On hold"),r.a.createElement("option",{value:"Closed"},"Closed")))),r.a.createElement("div",{className:"form-row mb-5"},r.a.createElement("div",{className:"form-group col mr-1"},r.a.createElement("label",{htmlFor:"ticketType"},"Ticket type *"),r.a.createElement("select",{className:"form-control",name:"ticketType",value:this.state.ticketType,onChange:this.handleInputChange,required:!0},r.a.createElement("option",{style:{display:"none"},value:""},"Select type"),r.a.createElement("option",{value:"Request"},"Request"),r.a.createElement("option",{value:"Incident"},"Incident"),r.a.createElement("option",{value:"Task"},"Task"))),r.a.createElement("div",{className:"form-group col ml-1 mr-1"},r.a.createElement("label",{htmlFor:"ticketPriority"},"Priority *"),r.a.createElement("select",{className:"form-control",name:"ticketPriority",value:this.state.ticketPriority,onChange:this.handleInputChange,required:!0},r.a.createElement("option",{style:{display:"none"},value:""},"Select priority"),r.a.createElement("option",{value:"High"},"High"),r.a.createElement("option",{value:"Medium"},"Medium"),r.a.createElement("option",{value:"Low"},"Low"))),r.a.createElement("div",{className:"form-group col ml-1 mr-1"},r.a.createElement("label",{htmlFor:"ticketCategory"},"Category *"),r.a.createElement("select",{className:"form-control",name:"ticketCategory",value:this.state.ticketCategory,onChange:this.handlecategoryChange.bind(this),required:!0},r.a.createElement("option",{style:{display:"none"},value:""},"Select category"),this.state.categoriesAndSubcategories.map(function(e,t){return r.a.createElement("option",{key:t},e.category)}))),r.a.createElement("div",{className:"form-group col ml-1"},r.a.createElement("label",{htmlFor:"ticketSubcategory"},"Subcategory *"),r.a.createElement("select",{className:"form-control",name:"ticketSubcategory",value:this.state.ticketSubcategory,onChange:this.handleInputChange,required:!0},r.a.createElement("option",{style:{display:"none"},value:""},"Select subcategory"),e[0].subcategories.map(function(e,t){return r.a.createElement("option",{key:t},e)})))),r.a.createElement("div",{className:"form-row mb-5"},r.a.createElement("div",{className:"form-group col-12"},r.a.createElement("label",{htmlFor:"ticketNewDetailedInfo"},"Detailed Info *"),r.a.createElement("textarea",{className:"form-control",name:"ticketNewDetailedInfo",rows:"5",value:this.state.ticketNewDetailedInfo,onChange:this.handleInputChange,required:!0}))),a,n,r.a.createElement("div",{className:"form-row mb-2"},r.a.createElement("div",{className:"col"},r.a.createElement("button",{type:"submit",className:"btn btn-primary",id:"submit"},"Submit")),r.a.createElement("button",{type:"button",className:"btn btn-danger",id:"cancel",onClick:this.handleCancel},"Cancel")))))}}]),t}(n.Component)),y=a(37),k=a.n(y),b=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={showModal:!1,newTicket:!1,allTickets:"",requestedTicket:""},a.componentDidMount=function(){a.getAllTickets(),document.title="PickIt"},a.getAllTickets=function(){fetch("http://localhost:3001/tickets").then(function(e){return e.json()}).then(function(e){return a.setState({allTickets:e})})},a.handleNewTicket=function(){a.setState({showModal:!0,newTicket:!0})},a.handleViewTicket=function(e){var t=e.target.id;fetch("http://localhost:3001/tickets/"+t).then(function(e){return e.json()}).then(function(e){return a.setState({requestedTicket:e[0]})}),a.setState({showModal:!0,newTicket:!1})},a.handleSubmit=function(e){if(e.preventDefault(),window.confirm("Submit ticket?")){var t=new Date,n="\r\n__________________________________________\r\nSubmitted on: "+([("00"+t.getDate()).slice(-2),("00"+(t.getMonth()+1)).slice(-2),t.getFullYear()].join("/")+" at "+[("00"+t.getHours()).slice(-2),("00"+t.getMinutes()).slice(-2),("00"+t.getSeconds()).slice(-2)].join(":"))+":\r\n"+e.target.ticketNewDetailedInfo.value;fetch("http://localhost:3001/tickets",{method:"post",mode:"cors",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({name:e.target.contactName.value,email:e.target.contactEmail.value,phone:e.target.contactPhone.value,extension:e.target.contactExtension.value,summary:e.target.ticketSummary.value,status:e.target.ticketStatus.value,type:e.target.ticketType.value,priority:e.target.ticketPriority.value,category:e.target.ticketCategory.value,subcategory:e.target.ticketSubcategory.value,details:n,history:""})}),window.alert("Ticket has been submitted."),a.setState({newTicket:!1,showModal:!1},a.getAllTickets())}},a.handleEdit=function(e){var t=e.target.id;if(window.confirm("Submit changes to ticket #"+t+"?")){var n=function(e,t,a){return"Details"===e?"Ticket details updated.\r\n":'"'+e+'" changed from "'+t+'" to "'+a+'"\r\n'};e.preventDefault();var r=new Date,o=[("00"+r.getDate()).slice(-2),("00"+(r.getMonth()+1)).slice(-2),r.getFullYear()].join("/")+" at "+[("00"+r.getHours()).slice(-2),("00"+r.getMinutes()).slice(-2),("00"+r.getSeconds()).slice(-2)].join(":"),c="\r\n__________________________________________\r\nEdited on: "+o+":\r\n"+e.target.ticketNewDetailedInfo.value+e.target.ticketDetailedInfo.value,i=o+":\r\n";e.target.contactName.value!==a.state.requestedTicket.name&&(i+=n("Name",a.state.requestedTicket.name,e.target.contactName.value)),e.target.contactEmail.value!==a.state.requestedTicket.email&&(i+=n("Email",a.state.requestedTicket.email,e.target.contactEmail.value)),e.target.contactPhone.value!==a.state.requestedTicket.phone&&""===e.target.contactPhone.value&&null!==a.state.requestedTicket.phone&&(i+=n("Phone",a.state.requestedTicket.phone,e.target.contactPhone.value)),e.target.contactExtension.value!==a.state.requestedTicket.extension&&""===e.target.contactExtension.value&&null!==a.state.requestedTicket.extension&&(i+=n("Extension",a.state.requestedTicket.extension,e.target.contactExtension.value)),e.target.ticketSummary.value!==a.state.requestedTicket.summary&&(i+=n("Summary",a.state.requestedTicket.summary,e.target.ticketSummary.value)),e.target.ticketStatus.value!==a.state.requestedTicket.status&&(i+=n("Status",a.state.requestedTicket.status,e.target.ticketStatus.value)),e.target.ticketType.value!==a.state.requestedTicket.type&&(i+=n("Type",a.state.requestedTicket.type,e.target.ticketType.value)),e.target.ticketPriority.value!==a.state.requestedTicket.priority&&(i+=n("Priority",a.state.requestedTicket.priority,e.target.ticketPriority.value)),e.target.ticketCategory.value!==a.state.requestedTicket.category&&(i+=n("Category",a.state.requestedTicket.category,e.target.ticketCategory.value)),e.target.ticketSubcategory.value!==a.state.requestedTicket.subcategory&&(i+=n("Subcategory",a.state.requestedTicket.subcategory,e.target.ticketSubcategory.value)),e.target.ticketDetailedInfo.value!==a.state.requestedTicket.details&&(i+=n("Details",a.state.requestedTicket.details,e.target.ticketDetailedInfo.value)),i+="\r\n"+a.state.requestedTicket.history,fetch("http://localhost:3001/tickets/"+t,{method:"put",mode:"cors",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({name:e.target.contactName.value,email:e.target.contactEmail.value,phone:e.target.contactPhone.value,extension:e.target.contactExtension.value,summary:e.target.ticketSummary.value,status:e.target.ticketStatus.value,type:e.target.ticketType.value,priority:e.target.ticketPriority.value,category:e.target.ticketCategory.value,subcategory:e.target.ticketSubcategory.value,details:c,history:i})}).then(function(e){return e.json()}),window.alert("Changes have been submitted."),a.setState({newTicket:!1,showModal:!1,requestedTicket:""},a.getAllTickets())}else e.preventDefault()},a.handleCancel=function(){a.setState({showModal:!1,newTicket:!1,requestedTicket:""})},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e,t=this;""!==this.state.allTickets&&(e=this.state.allTickets.map(function(e){return r.a.createElement("tr",{className:"border-bottom",key:e.id},r.a.createElement("td",null,e.id),r.a.createElement("td",null,e.summary),r.a.createElement("td",null,e.status),r.a.createElement("td",null,e.type),r.a.createElement("td",null,e.priority),r.a.createElement("td",null,e.category),r.a.createElement("td",null,e.subcategory),r.a.createElement("td",{style:{textAlign:"right"}},r.a.createElement("button",{className:"btn btn-sm btn-primary",onClick:t.handleViewTicket,id:e.id},"View")))}));var a=this.state.showModal?this.state.newTicket?r.a.createElement("div",{id:"_ticket"},r.a.createElement(p,{onSubmit:this.handleSubmit,onCancel:this.handleCancel,id:"",name:"",email:"",phone:"",extension:"",summary:"",status:"",type:"",priority:"",category:"Select category",subcategory:"",details:"",history:""})):r.a.createElement("div",{id:"_ticket"},r.a.createElement(p,{key:this.state.requestedTicket.id,onSubmit:this.handleEdit,onCancel:this.handleCancel,id:this.state.requestedTicket.id,name:this.state.requestedTicket.name,email:this.state.requestedTicket.email,phone:this.state.requestedTicket.phone,extension:this.state.requestedTicket.extension,summary:this.state.requestedTicket.summary,status:this.state.requestedTicket.status,type:this.state.requestedTicket.type,priority:this.state.requestedTicket.priority,category:this.state.requestedTicket.category,subcategory:this.state.requestedTicket.subcategory,details:this.state.requestedTicket.details,history:this.state.requestedTicket.history})):"";return r.a.createElement(r.a.Fragment,null,r.a.createElement("link",{rel:"stylesheet",href:"https://unpkg.com/bootstrap-table@1.15.3/dist/bootstrap-table.min.css"}),r.a.createElement("link",{rel:"stylesheet",href:"https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css",integrity:"sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4",crossOrigin:"anonymous"}),r.a.createElement("link",{rel:"stylesheet",href:"./App.css"}),r.a.createElement("main",{className:"container bg-light pb-2 pt-2"},r.a.createElement("div",null,r.a.createElement("button",{className:"btn btn-sm btn-secondary",onClick:this.getAllTickets},"Refresh tickets"),r.a.createElement("button",{className:"btn btn-sm btn-primary",onClick:this.handleNewTicket},"New ticket")),r.a.createElement("hr",null),r.a.createElement("h3",null,"Tickets"),r.a.createElement("div",{className:"container"},r.a.createElement("table",{"data-toggle":"bootstrap-table","data-search":"true",className:"ticketsTable",style:{width:"100%",tableLayout:"fixed",textOverflow:"auto"}},r.a.createElement("thead",null,r.a.createElement("tr",{className:"border-bottom border-dark"},r.a.createElement("th",{"data-field":"id","data-sortable":"true"},"ID"),r.a.createElement("th",{"data-sortable":"true","data-field":"summary"},"Summary"),r.a.createElement("th",{"data-sortable":"true","data-field":"status"},"Status"),r.a.createElement("th",{"data-sortable":"true","data-field":"type"},"Type"),r.a.createElement("th",{"data-sortable":"true","data-field":"priority"},"Priority"),r.a.createElement("th",{"data-sortable":"true","data-field":"category"},"Category"),r.a.createElement("th",{"data-sortable":"true","data-field":"subcategory"},"Subcategory"))),r.a.createElement("tbody",null,e))),r.a.createElement(k.a,{size:"lg",show:this.state.showModal,onHide:null},a)),r.a.createElement("script",{src:"https://unpkg.com/bootstrap-table@1.15.3/dist/bootstrap-table.min.js"}))}}]),t}(n.Component),f=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function v(e,t){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}c.a.render(r.a.createElement(b,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var t="".concat("","/service-worker.js");f?(function(e,t){fetch(e).then(function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):v(e,t)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(t,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):v(t,e)})}}()}},[[39,1,2]]]);
//# sourceMappingURL=main.7bf7924f.chunk.js.map