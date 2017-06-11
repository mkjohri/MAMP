sap.ui.controller("show_user.page2", {
	
	/**
		* Called when a controller is instantiated and its View controls (if
		* available) are already created. Can be used to modify the View before it
		* is displayed, to bind event handlers and do other one-time
		* initialization.
		* 
		* @memberOf show_user.page1
	*/
	// onInit: function() {
	//
	// },
	/**
		* Similar to onAfterRendering, but this hook is invoked before the
		* controller's View is re-rendered (NOT before the first rendering!
		* onInit() is used for that one!).
		* 
		* @memberOf show_user.page1
	*/
	// onBeforeRendering: function() {
	//
	// },
	/**
		* Called when the View has been rendered (so its HTML is part of the
		* document). Post-rendering manipulations of the HTML could be done here.
		* This hook is the same one that SAPUI5 controls get after being rendered.
		* 
		* @memberOf show_user.page1
	*/
	// onAfterRendering: function() {
	//
	// },
	/**
		* Called when the Controller is destroyed. Use this one to free resources
		* and finalize activities.
		* 
		* @memberOf show_user.page1
	*/
	// onExit: function() {
	//
	// }
	// }
	getDetails : function(userid) {
		var keys = [];
		$.ajax({
			type : 'POST',
			url : "MyPHPservices/get_address.php",
			data : {
				userid : userid,
			},
			dataType : 'json',
			success : function(data, textStatus, jqXHR) {
				var myJSONObject = data[0];
				keys = [];
				for ( var i in myJSONObject) {
					keys.push(i);
				}
				var oTable = sap.ui.getCore().byId("address_tab");
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(data);
				oTable.setModel(oModel);
				var oController = sap.ui.getCore().byId('page2')
				.getController();
				oController.updateTab('address_tab', keys);
				// oController.userDetails(keys);
			}
		});
		$.ajax({
			type : 'POST',
			url : "MyPHPservices/get_user.php",
			data : {
				userid : userid,
				fname : "",
				lname : "",
				dob : "",
			},
			dataType : 'json',
			success : function(data, textStatus, jqXHR) {
				var oController = sap.ui.getCore().byId('page2')
				.getController();
				oController.userDetails(data);
				app.to('page2');
			}
		});
		$.ajax({
			type : 'POST',
			url : "MyPHPservices/get_contact.php",
			data : {
				userid : userid,
			},
			dataType : 'json',
			success : function(data, textStatus, jqXHR) {
				var myJSONObject = data[0];
				keys = [];
				for ( var i in myJSONObject) {
					keys.push(i);
				}
				var oTable = sap.ui.getCore().byId("contacts_tab");
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(data);
				oTable.setModel(oModel);
				var oController = sap.ui.getCore().byId('page2')
				.getController();
				oController.disContact('contacts_tab', keys);
				// oController.userDetails(keys);
			}
		});
		
	},
	//-----------------------Address details tab update------------------//				
	userDetails : function(data) {
		// update userdetails
		var oController 
		= sap.ui.getCore().byId('page2').getController();
		
		var text = new sap.m.Text();
		var oBox = sap.ui.getCore().byId('user');
		var panel = sap.ui.getCore().byId('user_panel');
		panel.destroyHeaderToolbar();
		var head  = new sap.m.Toolbar().addStyleClass('gen');
		var label =  new sap.m.Label({
			text: 'General details',
		});
		head.addContent(label);
		panel.setHeaderToolbar(head);
		oBox.destroyItems();
		$.each(data, function(index) {
			$.each(data[index], function(key, value) {
				if(key == 'fname' || key == 'lname' || key == 'mname' 
				|| key == 'userid' || key =='dob'){
					switch(key){
						case 'userid':
						key = 'User id';
						break;
						case 'fname':
						key = 'First name';
						break;
						case 'mname':
						key = 'Middle name';
						break;
						case 'lname':
						key = 'Last name';
						break;
						case 'dob':
						key = 'Date of birth';
						break;
					};
					label = new sap.m.Label({
						text : key,
						width : '100px',
						textAlign : "Center",
					});
					
					text = new sap.m.Input({
						enabled : false,
						value : ': ' + value,
						width : '300px'
					});
					var oLine = new sap.m.HBox().addItem(label).addItem(text);
					oBox.addItem(oLine);
					
				}
			});
		});
		
	},
	clearFields : function(){
		var box = sap.ui.getCore().byId("user_panel");
		box.destroyContent();
		box.destroyHeaderToolbar();
		box = sap.ui.getCore().byId('address_tab');
		box.destroyColumns();
		box = sap.ui.getCore().byId('contacts_tab');
		box.destroyColumns();
	},
	//-----------------------Address details tab update------------------//			
	updateTab : function(tableName, keys) {
		// Update address details
		
		var oRow = new sap.m.ColumnListItem();
		var table = sap.ui.getCore().byId(tableName);
		var oCol = new sap.m.Column();
		var input = new sap.m.Input();
		var panel = new sap.m.Panel();
		table.destroyColumns();
		oRow.destroyCells();
		oRow.addCell(panel);
		var oBox = new sap.m.VBox();
		panel.addContent(oBox);
		oCol = new sap.m.Column({
		});
		var btn_change = new sap.m.Button({
			icon : 'sap-icon://edit',
			text : 'Change',
			press : function (evt){
				var oController2 = sap.ui.getCore().byId('page2').getController();
				oController2.editAddress(evt);
			},
		});
		table.addColumn(oCol);
		for (i = 0; i < keys.length; i++) {
			if (String(keys[i]) !== 'addressid' && String(keys[i]) 
			!== 'serial' && String(keys[i]) !== 'address_type') {
				
				var f = "{" + String(keys[i]) + "}";
				input = new sap.m.Input({
					enabled : false,
					value : f
				});
				oBox.addItem(input);
			} else if
			(String(keys[i]) == 'address_type')
			{
				var f = "{" + String(keys[i]) + "}";
				input = new sap.m.Input({
					enabled : false,
					value : f
				});
				// text.addStyleClass('headText');
				var panelHead = new sap.m.Toolbar().addStyleClass('heading');
				panelHead.addContent(input);
				panel.setHeaderToolbar(panelHead);
			}
		}
		oBox.addItem(btn_change);
		table.bindItems("/", oRow);
		table.destroyHeaderToolbar();
		// update contact details
		
	},
	
	disContact : function(tableName, keys){
		// Update address details
		
		var oRow = new sap.m.ColumnListItem();
		var table = sap.ui.getCore().byId(tableName);
		table.destroyColumns();
		var oCol = new sap.m.Column();
		var text = new sap.m.Text();
		oRow.destroyCells();
		
		for (i = 0; i < keys.length; i++) {
			if(String(keys[i]) !== 'serial' ){
				var value = "{" + String(keys[i]) + "}";
				text = new sap.m.Text({
					text : value
				});
				if(String(keys[i]) == 'number'){
					var colText = 'Number/Id';
					}else{
					var str1 = String(keys[i]).substring(0,1);
					str1 = str1.toUpperCase();
					var str2 = String(keys[i]).substring(1, String(keys[i]).length);
					var str3 = str1 + str2;
					
					var colText = str3 ;
				};
				
				
				text.addStyleClass('headText');
				oCol = new sap.m.Column({
					header: new sap.m.Label({
						text : colText,
					}).addStyleClass('colText'),
				});
				table.addColumn(oCol);
				oRow.addCell(text);
			}
		}
		
		table.bindItems("/", oRow);
		table.destroyHeaderToolbar();
		// update contact details	
	},
	editAddress : function(evt){
		
		var objectid = evt.getSource().getId().substr(10,11);
		var index = evt.getSource().getId().substr(22);
		var table = sap.ui.getCore().byId(objectid);
		var items = table.getItems();
		var item = items[index];
		var panel = item.getCells();
		panel = panel[0];
		var box = panel.getContent();
		box = box[0];
		var content = box.getItems();
		for (i = 0; i < (content.length - 1 ); i++) { 		
			var temp = content[i];
			if(temp.getEnabled()){
			if(temp.getName !== 'btn_change'){
			temp.setEnabled(false);
			}
			}else{
			temp.setEnabled(true);
			}
		}
		
		
		
	},
});											