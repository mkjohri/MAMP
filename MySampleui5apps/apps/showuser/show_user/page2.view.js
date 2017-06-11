sap.ui.jsview("show_user.page2", {
	
	getControllerName : function() {
		return "show_user.page2";
	},
	
	createContent : function(oController) {
		var ibar = new sap.m.IconTabBar('ibar') ;
		var tab1         =  new sap.m.IconTabFilter({
			id : "id1", // sap.ui.core.ID
			text : "General details", // string
			icon : "sap-icon://account",
		}) ;
		var box1         =  new sap.m.VBox('user');
		var panel        = new sap.m.Panel('user_panel',{

		});
		
		panel.addContent(box1);
		tab1.addContent(panel);
		
		var tab2         =  new sap.m.IconTabFilter({
			id : "id2", // sap.ui.core.ID
			text : "Address", // string
			icon :"sap-icon://addresses",
		}) ;
		var table2       = new sap.m.Table('address_tab');
	
		tab2.addContent(table2);
		
		var tab3         =  new sap.m.IconTabFilter({
			id : "id3", // sap.ui.core.ID
			text : "Contacts", // string
			icon :"sap-icon://arobase",
		}) ;
		var box3         =  new sap.m.VBox("contacts");
		var table3       = new sap.m.Table('contacts_tab');
		box3.addItem(table3);
	tab3.addContent(box3);
	
	ibar.addItem(tab1).addItem(tab2).addItem(tab3);
	return new sap.m.Page({
	title : "User details",
	content : [
	
	]
	}).addContent(ibar);
	},
	
	});	