sap.ui.jsview("user_detail.view3", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf user_detail.view2
	 */
	getControllerName : function() {
		return "user_detail.view3";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf user_detail.view2
	 */

	createContent : function(oController) {
		var panel = new sap.m.Panel("panel3",{
		});
		var box = new sap.m.VBox("header3", {
			width : "50%",
		});

		panel.addContent(box);

		var vbox1 = new sap.m.VBox();
		vbox1.addStyleClass("vbox");

		var lbl_typ = new sap.m.Label({
			text : "Type",
		}).addStyleClass("label");
		
		var lbl_contact = new sap.m.Label({
			text : "Contact",
		}).addStyleClass("label");


		var type = new sap.m.Select("contacttype", {
			maxWidth : "200px", // sap.ui.core.CSSSize
			items : [ new sap.ui.core.Item({
				text : "Mobile", // string
				key : "1"
			}), new sap.ui.core.Item({
				text : "Landline", // string
				key : "2"
			}), new sap.ui.core.Item({
				text : "Email", // string
				key : "2"
			}) ], // sap.ui.core.Item
		});

		var contact = new sap.m.Input("contact", {
			width : "200px", // sap.ui.core.CSSSizeg
			placeholder : "Contact", // string
			maxLength : 40, // int
		});

		var bAdd = new sap.m.Button({
			text : "Add", // string
			type : sap.m.ButtonType.Accept, // sap.m.ButtonType
			width : "120px", // sap.ui.core.CSSSize
			icon : "sap-icon://add", // 
			press : function(oEvent) {
				oController.addContact();
			}
		});

		var next = new sap.m.Button("next3",{
			text : "Next", // string
			type : sap.m.ButtonType.Unstyled, // sap.m.ButtonType
			width : "120px", // sap.ui.core.CSSSize
			icon : "sap-icon://navigation-right-arrow", // 
			press : function(oEvent) {
				app.to('view1','flip');
			}
		});

		var bar = new sap.m.Bar({
			translucent : true, // boolean, since 1.12
			design : sap.m.BarDesign.Footer, // sap.m.BarDesign, since 1.22
		});

		bar.addContentRight(bAdd).addContentRight(next);

		vbox1.addItem(lbl_typ).addItem(type);
		vbox1.addItem(lbl_contact).addItem(contact);
		vbox1.setAlignItems(sap.m.FlexAlignItems.Start);

		return new sap.m.Page({
			title : "Contact",
		}).setFooter(bar).addContent(panel).addContent(vbox1);
	}

});