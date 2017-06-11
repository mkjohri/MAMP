sap.ui.jsview("user_detail.view2", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf user_detail.view2
	 */
	getControllerName : function() {
		return "user_detail.view2";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf user_detail.view2
	 */

	createContent : function(oController) {
		var panel = new sap.m.Panel("panel2");
		var box1 = new sap.m.VBox("header", {
			width : "50%",
		});

		panel.addContent(box1);

		var vbox1 = new sap.m.VBox();
		vbox1.addStyleClass("vbox");

		var lbl_adtyp = new sap.m.Label({
			text : "Address type",
		}).addStyleClass("label");
		var lbl_line1 = new sap.m.Label({
			text : "Address line1",
		}).addStyleClass("label");

		var lbl_line2 = new sap.m.Label({
			text : "Address line2",
		}).addStyleClass("label");

		var lbl_city = new sap.m.Label({
			text : "City",
		}).addStyleClass("label");

		var lbl_state = new sap.m.Label({
			text : "State",
		}).addStyleClass("label");

		var lbl_zip = new sap.m.Label({
			text : "ZIP",
		}).addStyleClass("label");

		var address_type = new sap.m.Select("address_type", {
			maxWidth : "200px", // sap.ui.core.CSSSize
			items : [ new sap.ui.core.Item({
				text : "Permanent", // string
				key : "1"
			}), new sap.ui.core.Item({
				text : "correspondence", // string
				key : "2"
			}) ], // sap.ui.core.Item
		});

		var line1 = new sap.m.Input("line1", {
			width : "200px", // sap.ui.core.CSSSizeg
			placeholder : "Address line1", // string
			maxLength : 100, // int
		});

		var line2 = new sap.m.Input("line2", {
			width : "200px", // sap.ui.core.CSSSizeg
			placeholder : "Address line 2", // string
			maxLength : 40, // int
		});

		var city = new sap.m.Input("city", {
			width : "200px", // sap.ui.core.CSSSizeg
			placeholder : "City", // string
			maxLength : 40, // int
		});

		var state = new sap.m.Input("state", {
			width : "200px", // sap.ui.core.CSSSizeg
			placeholder : "State", // string
			maxLength : 40, // int
		});

		var zip = new sap.m.Input("zip", {
			width : "200px", // sap.ui.core.CSSSizeg
			placeholder : "ZIP", // string
			maxLength : 40, // int
		});

		var bAdd = new sap.m.Button({
			text : "Add", // string
			type : sap.m.ButtonType.Accept, // sap.m.ButtonType
			width : "120px", // sap.ui.core.CSSSize
			icon : "sap-icon://add", // 
			press : function(oEvent) {
				oController.addAddress();
			}
		});

		var next = new sap.m.Button({
			text : "Next", // string
			type : sap.m.ButtonType.Unstyled, // sap.m.ButtonType
			width : "120px", // sap.ui.core.CSSSize
			icon : "sap-icon://navigation-right-arrow", // 
			press : function(oEvent) {
				app.to('view2');
			}
		});

		var bar = new sap.m.Bar({
			translucent : true, // boolean, since 1.12
			design : sap.m.BarDesign.Footer, // sap.m.BarDesign, since 1.22
		});

		bar.addContentRight(bAdd).addContentRight(next);

		vbox1.addItem(lbl_adtyp).addItem(address_type);
		vbox1.addItem(lbl_line1).addItem(line1);
		vbox1.addItem(lbl_line2).addItem(line2);
		vbox1.addItem(lbl_city).addItem(city);
		vbox1.addItem(lbl_state).addItem(state)
		vbox1.addItem(lbl_zip).addItem(zip);
		vbox1.setAlignItems(sap.m.FlexAlignItems.Start);

		return new sap.m.Page({
			title : "Address",
			content : [

			]
		}).setFooter(bar).addContent(panel).addContent(vbox1);
	}

});