sap.ui.jsview("user_detail.view1", {
	
	/**
		* Specifies the Controller belonging to this View. In the case that it is
		* not implemented, or that "null" is returned, this View does not have a
		* Controller.
		* 
		* @memberOf user_detail.view1
	*/
	getControllerName : function() {
		return "user_detail.view1";
	},
	
	/**
		* Is initially called once after the Controller has been instantiated. It
		* is the place where the UI is constructed. Since the Controller is given
		* to this method, its event handlers can be attached right away.
		* 
		* @memberOf user_detail.view1
	*/
	createContent : function(oController) {
		var vbox1 = new sap.m.VBox();
		var lbl_fname = new sap.m.Label({
			text : "First name",
		}).addStyleClass("label");
		var lbl_mname = new sap.m.Label({
			text : "Middle name",
		}).addStyleClass("label");
		
		var lbl_lname = new sap.m.Label({
			text : "Last name",
		}).addStyleClass("label");
		
		var lbl_gender = new sap.m.Label({
			text : "Gender",
		}).addStyleClass("label");
		
		var lbl_dob = new sap.m.Label({
			text : "Date of birth",
		});
		lbl_dob.addStyleClass("label");
		
		var tFname = new sap.m.Input("Fname", {
			width : "200px", // sap.ui.core.CSSSizeg
			placeholder : "First name", // string
			maxLength : 40, // int
		});
		
		var tMname = new sap.m.Input("Mname", {
			width : "200px", // sap.ui.core.CSSSizeg
			placeholder : "Middle name", // string
			maxLength : 40, // int
		});
		
		var tLname = new sap.m.Input("Lname", {
			width : "200px", // sap.ui.core.CSSSizeg
			placeholder : "Last name", // string
			maxLength : 40, // int
		});
		
		var tGender = new sap.m.Select("Gender", {
			maxWidth : "200px", // sap.ui.core.CSSSize
			items : [ new sap.ui.core.Item({
				text : "Male", // string
				key : "1"
				}), new sap.ui.core.Item({
				text : "Female", // string
				key : "2"
			}) ], // sap.ui.core.Item
		});
		
		var tDob = new sap.m.DatePicker("Dob", {
			width : "180px", // sap.ui.core.CSSSizeg
		}).setValueFormat('yyyy.MM.dd');
		
		var bAdd = new sap.m.Button("adduser",{
			text : "Add", // string
			type : sap.m.ButtonType.Accept, // sap.m.ButtonType
		width : "120px", // sap.ui.core.CSSSize
		icon : "sap-icon://add-contact", // 
		press : function(oEvent) {
		if(oController.validateInput()){
		oController.addUser();
		};
		
		}
		});
		
		var next = new sap.m.Button("nextbutton1",{
		text : "Next", // string
		enabled : false,
		type : sap.m.ButtonType.Unstyled, // sap.m.ButtonType
		width : "120px", // sap.ui.core.CSSSize
		icon : "sap-icon://navigation-right-arrow", // 
		press : function(oEvent) {			
		if(oController.validateInput()){
		app.to('view2');	
		};
		
		}
		});
		
		vbox1.addStyleClass("vbox");
		vbox1.addItem(lbl_fname).addItem(tFname);
		vbox1.addItem(lbl_mname).addItem(tMname);
		vbox1.addItem(lbl_lname).addItem(tLname);
		vbox1.addItem(lbl_dob).addItem(tDob);
		vbox1.addItem(lbl_gender).addItem(tGender);
		vbox1.setAlignItems(sap.m.FlexAlignItems.Start);
		
		var bar = new sap.m.Bar({
		translucent : true, // boolean, since 1.12
		design : sap.m.BarDesign.Footer, // sap.m.BarDesign, since 1.22
		});
		
		bar.addContentRight(bAdd).addContentRight(next);
		
		return new sap.m.Page({
		title : "Add user",
		}).addContent(vbox1).setFooter(bar);
		}
		
		});		