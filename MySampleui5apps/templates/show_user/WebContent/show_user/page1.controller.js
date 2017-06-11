sap.ui.controller("show_user.page2", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf show_user.page1
*/
//	onInit: function() {2015@July	
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

getDetails: function(userid){
	var keys = [];
	$.ajax({
		type : 'POST',
		url : "MyPHPservices/get_address.php",
		data : { 
				userid : userid,
				},
            dataType : 'json',
    		success : function(data,textStatus,jqXHR){
			var myJSONObject =  data[0]; 
				for (var i in myJSONObject ) { keys.push(i); }			
				var oTable = sap.ui.getCore().byId("address_tab");
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(data);
				oTable.setModel(oModel);
				var oController = sap.ui.getCore().byId('page2').getController();
				oController.addressDetails('address_tab',keys);	
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
    		success : function(data,textStatus,jqXHR){	
				var oController = sap.ui.getCore().byId('page2').getController();
				oController.userDetails(data);			
				app.to('page2');
    		}	
	});	
},

userDetails : function(data){
//update userdetails
var oController = sap.ui.getCore().byId('page2').getController();
				
var text = new sap.m.Text();
var oBox = sap.ui.getCore().byId('user');

oBox.destroyItems();
 $.each(data, function(index) {  
     $.each(data[index] ,function(key,value){

	 label = new sap.m.Text( {
text : key,
width : '100px'
});

text = new sap.m.Text({
text : ': '+value,
width : '100px'
});
var oLine =  new sap.m.HBox().addItem(label).addItem(text);
oBox.addItem(oLine);
     });
 });


} ,

addressDetails : function(tableName,keys){
//Update address details
 
var oRow = new sap.m.ColumnListItem();
var table = sap.ui.getCore().byId(tableName);
var oCol = new sap.m.Column();
var text = new sap.m.Text();
table.destroyColumns();
oRow.destroyCells();
var oBox = new sap.m.VBox();
oBox.destroyItems();
oRow.addCell(oBox);
    oCol = new sap.m.Column({
			header : new sap.m.Label({
				text : '',
			})
		});

		table.addColumn(oCol);
for (i = 0; i < keys.length; i++) {
if(String(keys[i]) !== 'addressid' && String(keys[i]) !== 'serial' && String(keys[i]) !== 'address_type'){

var f = "{"+String(keys[i])+"}";
text = new sap.m.Text( {
text : f
});
		oBox.addItem(text);
}else(String(keys[i]) !== 'address_type'){
var f = "{"+String(keys[i])+"}";
panel = new sap.m.Panel( {
headerText : f
});
		oBox.addItem(panel);
}
}
 table.bindItems("/",oRow);	
 //update contact details

},


});