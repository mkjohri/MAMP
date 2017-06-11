sap.ui.controller("user_detail.view3", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf user_detail.view3
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

	addContact : function(oController) {
		var temp = sap.ui.getCore().byId("contact");
		var contact = temp.getValue();
		if (contact == "") {
			temp.focus();
			this.message("Please enter contact details");
			return;
		};

		temp = sap.ui.getCore().byId("contacttype");
		temp = temp.getSelectedItem();
		var type = temp.getKey();

		if (!(contact == "")) {
			var text = new sap.m.Text();
			text = sap.ui.getCore().byId("contactid");
			var contactid = text.getText();

			$.ajax({
				type : "POST",
				url : "myphpservices/add_contact.php",
				data : {
					contactid : contactid,
					type 	: type,
					contact : contact,
				},
				success : function(response) {
					if (response.status == 'success') {
						window.alert(response.status);
						var oController = sap.ui.getCore().byId("view1")
								.getController();
						oController.message("Contact added successfully");
						
						oController = undefined;
						
						 oController = sap.ui.getCore().byId("view2")
						.getController();
						 
						 oController.addToPanel("header3",response.contact);
					} else {
						window.alert(response.status);
						var oController = sap.ui.getCore().byId("view1")
								.getController();
						oController.message("Unable to save contact");
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

});