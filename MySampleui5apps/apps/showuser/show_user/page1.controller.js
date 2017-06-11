sap.ui.controller("show_user.page1", {
	
	/**
		* Called when a controller is instantiated and its View controls (if available) are already created.
		* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		* @memberOf show_user.page1
	*/
	//	onInit: function() {
	//
	//	},
	
	/**
		* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		* (NOT before the first rendering! onInit() is used for that one!).
		* @memberOf show_user.page1
	*/
	//	onBeforeRendering: function() {
	//
	//	},
	
	/**
		* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		* This hook is the same one that SAPUI5 controls get after being rendered.
		* @memberOf show_user.page1
	*/
	//	onAfterRendering: function() {
	//
	//	},
	
	/**
		* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		* @memberOf show_user.page1
	*/
	//	onExit: function() {
	//
	//	}
	//	}
	
	sendMail : function(){	
	sap.m.URLHelper.triggerEmail('mk.johri@gmail.com', 'Test mail', 'Lahan k baude','mk.johri@gmail;ssrivastava139@gmail.com');
	},
	
	clearFields : function(){
		var oTable = sap.ui.getCore().byId("table1");
		oTable.destroyItems();
		var temp = sap.ui.getCore().byId('userid');
		temp.setValue();
		temp = sap.ui.getCore().byId('fname');
		temp.setValue();
		temp = sap.ui.getCore().byId('lname');
		temp.setValue();
		temp = sap.ui.getCore().byId('dob');
		temp.setValue();
		var oController2 = sap.ui.getCore().byId('page2').getController(); 
		oController2.clearFields();
	},
	
	getList: function(){
		
		var temp = sap.ui.getCore().byId('userid');
		var userid = temp.getValue();
		temp = sap.ui.getCore().byId('fname');
		var fname = temp.getValue();
		temp = sap.ui.getCore().byId('lname');
		var lname = temp.getValue();
		temp = sap.ui.getCore().byId('dob');
		var dob = temp.getValue();
		var oModel = new sap.ui.model.json.JSONModel();
		var keys = [];
		if(userid !== '' || 
		fname !== '' ||
		lname !== '' ||
		dob   !== ''){
			$.ajax({
				type : 'POST',
				url : "MyPHPservices/get_user.php",
				data : { 
					userid : userid,
					fname : fname ,
					lname : lname,
					dob   : dob,
				},
				dataType : 'json',
				success : function(data,textStatus,jqXHR){
					
					var myJSONObject =  data[0]; 
					for (var i in myJSONObject ) { keys.push(i); }			
					var oTable = sap.ui.getCore().byId("table1");
					oModel.setData(data);
					oTable.setModel(oModel);
					var oController = sap.ui.getCore().byId('page1').getController();
					oController.addColFromService('table1',keys);				
				}	
			});
			
			}else{
			var controller = sap.ui.getCore().byId('page1').getController();
			controller.clearFields();
			this.message('Please enter atleast one parameter');
		};
	},
	
	addColFromService : function(tableName,keys){
		
		var oRow = new sap.m.ColumnListItem({
			vAlign : 'Middle',
		});
		var table = sap.ui.getCore().byId(tableName);
		var oCol = new sap.m.Column();
		var text = new sap.m.Text();
		table.destroyColumns();
		oRow.destroyCells();
		for (i = 0; i < keys.length; i++) { 
			if(String(keys[i]) == 'userid' || 
			String(keys[i]) == 'fname' || 
			String(keys[i]) == 'lname' ){
				var f = "{"+String(keys[i])+"}";
				text = new sap.m.Text({
				text : f});
				
				oCol1 = new sap.m.Column();
				table.addColumn(oCol1);
				oRow.addCell(text);				
			}
			
		}
		oCol2 = new sap.m.Column();
		table.addColumn(oCol2);
		var btn_del =  new sap.m.Button({
			icon : 'sap-icon://delete',
			press : function(){
				var oController = sap.ui.getCore().byId('page1').getController();
				oController.deleteRecord();
			},
		});
		oRow.addCell(btn_del);
		console.log(oRow);
		table.bindItems("/",oRow);	
	},
	
	
	detail: function(){
		var table = sap.ui.getCore().byId("table1");
		var item = table.getSelectedItem();
		var userid = item.getCells()[0].getText();
		console.log(userid);
		oController2 = sap.ui.getCore().byId('page2').getController();
		oController2.getDetails(userid);
	},
	
	message: function(msg){
		var mDialog = new sap.m.Dialog({
			title : "Error", // string
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
	deleteRecord: function(){
		var table = sap.ui.getCore().byId("table1");
		var item = table.getSelectedItem();
		if(table.indexOfItem(item) !== -1){
			var userid = item.getCells()[0].getText();
			var uniqid = item.getCells[1].getText();
			var contactid = item.getCells[2].getText();
			var addressid = item.getCells[3].getText();
			$.ajax({
				type : 'POST',
				url : "MyPHPservices/delete_user.php",
				data : { 
					userid : userid,
					uniqid : uniqid,
					contactid : contactid,
					addressid : addressid,
				},
				dataType : 'json',
				success : function(data,textStatus,jqXHR){
				var table1 = sap.ui.getCore().byId("table1");
				table1.removeItem(table.indexOfItem(item));
					var oController = sap.ui.getCore().byId('page1').getController();
					oController.message('User deleted from database');
					oController = sap.ui.getCore().byId('page2').getController();
					oController.clearFields();
				}	
			});
			}else{
			var oController = sap.ui.getCore().byId('page1').getController();
			oController.message('Select the user first');	
		};
	},
});