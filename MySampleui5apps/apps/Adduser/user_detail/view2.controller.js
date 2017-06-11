sap.ui.controller("user_detail.view2", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf user_detail.view2
	 */
	onInit : function() {

	},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf user_detail.view2
	 */
	// onBeforeRendering: function() {
	//
	// },
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf user_detail.view2
	 */
	// onAfterRendering: function() {
	//
	// },
	/**
	 * Called when the Controller is destroyed. Use this one to free resources
	 * and finalize activities.
	 * 
	 * @memberOf user_detail.view2
	 */
	// onExit: function() {
	//
	// }
	updateHeader : function() {

		var temp = new sap.m.Text();
		temp = sap.ui.getCore().byId("userid");
		var uid = temp.getText();

		var temp1 = new sap.m.Input();
		temp1 = sap.ui.getCore().byId("Fname");
		var fname = temp1.getValue();

		temp1 = sap.ui.getCore().byId("Mname");
		var mname = temp1.getValue();

		temp1 = sap.ui.getCore().byId("Lname");
		var lname = temp1.getValue();

		temp1 = sap.ui.getCore().byId("Dob");
		var dob = temp1.getValue();

		var userid = new sap.m.Text({
			text : "Userid : " + uid,
		});
		var name = new sap.m.Text({
			text : "Name : " + fname + " " + lname,
		});
		var dob = new sap.m.Text({
			text : " D.O.B : " + dob,
		});
		var box1 = new sap.m.VBox();
		box1 = sap.ui.getCore().byId("header");

		box1.addItem(userid).addItem(name).addItem(dob);
	},

	addAddress : function(oController) {
		var temp = new sap.m.Input();
		temp = sap.ui.getCore().byId("line1");
		var line1 = temp.getValue();
		if (line1 == "") {
			temp.focus();
			this.message("Please enter address first line");
			return;
		}
		;
		temp = sap.ui.getCore().byId("line2");
		var line2 = temp.getValue();
		temp = sap.ui.getCore().byId("city");
		var city = temp.getValue();
		if (city == "") {
			temp.focus();
			this.message("Please enter city");
			return;
		}
		;
		temp = sap.ui.getCore().byId("state");
		var state = temp.getValue();
		if (state == "") {
			temp.focus();
			this.message("Please enter State");
			return;
		}
		;

		temp = sap.ui.getCore().byId("zip");
		var zip = temp.getValue();
		if (zip == "") {
			temp.focus();
			this.message("Please enter ZIP");
			return;
		}
		;

		var temp1 = new sap.m.Select();
		temp1 = sap.ui.getCore().byId("address_type");
		var temp2 = temp1.getSelectedItem();
		var address_type = temp2.getKey();

		if (!(line1 == "" && city == "" && state == "" && zip == "")) {
			var text = new sap.m.Text();
			text = sap.ui.getCore().byId("addressid");
			addressid = text.getText();

			$.ajax({
				type : "POST",
				url : "myphpservices/add_address.php",
				data : {
					addressid : addressid,
					address_type : address_type,
					line1 : line1,
					line2 : line2,
					city : city,
					state : state,
					zip : zip
				},
				success : function(response) {
					if (response.status == 'success') {
						var oController = sap.ui.getCore().byId("view1")
								.getController();
						var button = sap.ui.getCore().byId("next2");
						button.setEnabled(true);
						oController.message("Address added successfully");
						
						 oController = sap.ui.getCore().byId("view2")
						.getController();
						 
						 oController.addToPanel("header",response.address);
							

					} else {
						var oController = sap.ui.getCore().byId("view1")
								.getController();
						oController.message("Unable to save address");
					}
					;
				},
				dataType : "JSON"
			});
		} else {
			var oController = sap.ui.getCore().byId("view1").getController();
			oController.message('Please enter all mandatory values');
		}
	},

	addToPanel : function(box, Text) {
		var box = sap.ui.getCore().byId(box);
		var otext = new sap.m.Text({
		text: Text
		});
		box.addItem(otext);
	},

});