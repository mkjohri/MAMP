sap.ui
		.controller(
				"user_detail.view1",
				{ // called when the view is called first time
					onInit : function() {
						jQuery.sap.require("sap.ui.core.IconPool");
					},
					// called when view is created
					onBeforeRendering : function() {

					},
					/**
					 * Called when the View has been rendered (so its HTML is
					 * part of the document). Post-rendering manipulations of
					 * the HTML could be done here. This hook is the same one
					 * that SAPUI5 controls get after being rendered.
					 * 
					 * @memberOf user_detail.view1
					 */
					// onAfterRendering: function() {
					//
					// },
					/**
					 * Called when the Controller is destroyed. Use this one to
					 * free resources and finalize activities.
					 * 
					 * @memberOf user_detail.view1
					 */
					// onExit: function() {
					//
					// },
					validateInput : function() {
						// *-Get first name input control and get filled value
						var result = true;
						var temp = sap.ui.getCore().byId("Fname");
						// *-If first name is not entered display error message
						// and focus on the field
						if (temp.getValue() == "") {
							temp.focus();
							result = false;
							this.message("Please enter first name");
							return;
						};
						// *-Get last name input control and get filled value
						temp = sap.ui.getCore().byId("Lname");
						if (temp.getValue() == "") {
							temp.focus();
							result = false;
							this.message("Please enter last name");
							return;
						};

						temp = sap.ui.getCore().byId("Dob");
						if (temp.getValue() == "") {
							temp.focus();
							result = false;
							this.message("Please enter date of birth");
							return;
						}
						;
						return result;

					},

					addUser : function() {
///--------------------------------------------------////
						// *-Get first name input control and get filled value
						var result = true;
						var temp = sap.ui.getCore().byId("Fname");
						var fname = temp.getValue();
						// *-Get last name input control and get filled value
						temp = sap.ui.getCore().byId("Lname");
						var lname = temp.getValue();

						temp = sap.ui.getCore().byId("Mname");
						var mname = temp.getValue();
						
						temp = sap.ui.getCore().byId("Dob");
						var dob = temp.getValue();

						////-------------------------------------------------------///
						temp1 = sap.ui.getCore().byId("Gender");
						var temp2 = temp1.getSelectedItem();
						var gender = temp2.getKey();
						if (!(fname == "" && lname == "" && dob == "")) {
							$
									.ajax({
										type : "POST",
										url : "myphpservices/add_user.php",
										data : {
											fname : fname,
											mname : mname,
											lname : lname,
											gender : gender,
											dob : dob
										},
										success : function(response) {
											if (response.status == 'success') {
												
												var oController = sap.ui
														.getCore()
														.byId("view1")
														.getController();
												oController.enable(false);
												oController
														.message("User created, user id: "
																+ response.userid);
												var oController = sap.ui
														.getCore()
														.byId("view2")
														.getController();

												var userid = new sap.m.Text();
												userid = sap.ui.getCore().byId(
														"userid");
												userid.setText(response.userid);

												var uniqid = new sap.m.Text();
												uniqid = sap.ui.getCore().byId(
														"uniqid");
												uniqid.setText(response.uniqid);

												var addressid = new sap.m.Text();
												addressid = sap.ui.getCore()
														.byId("addressid");
												addressid
														.setText(response.addressid);

												var contactid = new sap.m.Text();
												contactid = sap.ui.getCore()
														.byId("contactid");
												contactid
														.setText(response.contactid);
												oController.updateHeader();
												
												var button = sap.ui.getCore().byId("adduser");
												button.setEnabled(false);
												
												button = sap.ui.getCore().byId("nextbutton1");
												button.setEnabled(true);
												//app.to('view2');
											} else {
//												Enable all the input fields
												var oController = sap.ui
												.getCore()
												.byId("view1")
												.getController();
												oController.enable(true);
												oController.message('Unable to create user,Please check the data');
											};
										},
										dataType : "JSON"
									});
						} else {
							this.message('Please enter all mandatory values');
						}
					},

					message : function(msg) {

						var mDialog = new sap.m.Dialog({
							title : "Message", // string
							beginButton : new sap.m.Button({
								text : "Close", // string
								press : [ function(oEvent) {
									mDialog.close();
								}, this ]
							}), // sap.m.Button, since 1.15.1
						});
						var msgtext = new sap.m.Text({
							text : msg,
						});
						mDialog.addContent(msgtext);
						mDialog.open();
						return;
					},

					enable: function(status){	
						var temp = sap.ui.getCore().byId("Fname");
						temp.setEnabled(status);
						temp = sap.ui.getCore().byId("Lname");
						temp.setEnabled(status);
						temp = sap.ui.getCore().byId("Mname");
						temp.setEnabled(status);												
						temp = sap.ui.getCore().byId("Dob");
						temp.setEnabled(status);
						temp = sap.ui.getCore().byId("Gender");
						temp.setEnabled(status);
					},
					
					
				});