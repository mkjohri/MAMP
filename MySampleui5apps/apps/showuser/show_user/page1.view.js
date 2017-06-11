sap.ui.jsview("show_user.page1", {
	
	getControllerName : function() {
		return "show_user.page1";
	},
	
	createContent : function(oController) {
		var oTable1 = new sap.m.Table("table1",{
		});
		oTable1.attachSelectionChange(oController.detail);
		oTable1.setMode("SingleSelectMaster");
		var vbox1 = new sap.m.VBox({
			height: '380px',
		});
		vbox1.addStyleClass('box');
		var label_1 = new sap.m.Label({text : 'User id'});
		label_1.addStyleClass('label');
		var label_2 = new sap.m.Label({text : 'First name'});
		label_2.addStyleClass('label');
		var label_3 = new sap.m.Label({text : 'Last name'});
		label_3.addStyleClass('label');
		var label_4 = new sap.m.Label({text : 'Date of birth'});
		label_4.addStyleClass('label');
		var userid = new sap.m.MultiInput('userid',{
			width : '250px',
		}).addStyleClass('input');		
		var fname = new sap.m.Input('fname',{
			width : '250px',
		}).addStyleClass('input');		
		var lname = new sap.m.Input('lname',{
			width : '250px',
		}).addStyleClass('input');		
		
		var dob = new sap.m.DatePicker('dob',{
			width : '250px',
			valueFormat : "ddMMyyyy",
		}).addStyleClass('input');		
		
		var btn_det = new sap.m.Button('btn_det',{
			text : 'Get List',
			width : '140px',
			press : function(){
				var controller = sap.ui.getCore().byId('page1').getController();
				controller.getList();
				controller.sendMail();
			}
		}).addStyleClass('btn1');
		
		var btn_clear = new sap.m.Button('btn_clear',{
			text : 'Clear',
			width : '110px',
			press : function(){
				var controller = sap.ui.getCore().byId('page1').getController();
				controller.clearFields();
			}
		}).addStyleClass('btn2');
		var hbox1 = new sap.m.HBox();
		hbox1.addItem(btn_det).addItem(btn_clear);
		// var oRow = new sap.m.ColumnListItem("row");
		// oController.getList();
		vbox1.addStyleClass('box');
		vbox1.addItem(label_1).addItem(userid);
		vbox1.addItem(label_2).addItem(fname);	
		vbox1.addItem(label_3).addItem(lname);
		vbox1.addItem(label_4).addItem(dob);
		vbox1.addItem(hbox1);
		
		
		var head = new sap.m.Toolbar().addStyleClass('heading');
		var label =  new sap.ui.core.Icon({
			src : 'sap-icon://customer',
			size : '40px',
			color : 'white',
		}).addStyleClass('panelHead');
		head.addContent(label);
		var list = new sap.m.Panel();
		list.setHeight('310px');
		list.setHeaderToolbar(head);
		list.addContent(oTable1);
 		return new sap.m.Page({
		title: "User list",
		}).addContent(vbox1).addContent(list);
		},
		
		});			