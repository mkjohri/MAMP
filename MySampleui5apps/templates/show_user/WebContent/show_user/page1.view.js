sap.ui.jsview("show_user.page1", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf show_user.page1
	 */
	getControllerName : function() {
		return "show_user.page1";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf show_user.page1
	 */
	createContent : function(oController) {
		var input1 = new sap.m.Input("userid1");
		var input2 = new sap.m.Input("userid2");
		var input3 = new sap.m.Input("userid3");
		var ibar = new sap.m.IconTabBar('ibar') ;
var tab1  =  new sap.m.IconTabFilter({
	id : "id1", // sap.ui.core.ID
	text : "Tab1", // string
	icon : "sap-icon://add"
}) ;

tab1.addContent(input1);
var tab2  =  new sap.m.IconTabFilter({
	id : "id2", // sap.ui.core.ID
	text : "Tab2", // string
}) ;
tab2.addContent(input2)
var tab3  =  new sap.m.IconTabFilter({
	id : "id3", // sap.ui.core.ID
	text : "Tab3", // string
}) ;
tab3.addContent(input3)
ibar.addItem(tab1).addItem(tab2).addItem(tab3);
		return new sap.m.Page({
			title : "Title",
			content : [

			]
		}).addContent(ibar);
		 var tab = new sap.ui.core.Icon({
			id : "id", // sap.ui.core.ID
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			src : undefined, // sap.ui.core.URI
			size : undefined, // sap.ui.core.CSSSize
			color : undefined, // string
			hoverColor : undefined, // string
			activeColor : undefined, // string
			width : undefined, // sap.ui.core.CSSSize
			height : undefined, // sap.ui.core.CSSSize
			backgroundColor : undefined, // string
			hoverBackgroundColor : undefined, // string
			activeBackgroundColor : undefined, // string
			decorative : true, // boolean, since 1.16.4
			tooltip : undefined, // sap.ui.core.TooltipBase
			customData : [ new sap.ui.core.CustomData({
				id : "id1", // sap.ui.core.ID
				key : undefined, // string
				value : undefined, // any
				writeToDom : false, // boolean, since 1.9.0
				tooltip : undefined, // sap.ui.core.TooltipBase
				customData : [], // sap.ui.core.CustomData
				dependents : []
			// sap.ui.core.Control, since 1.19
			}) ], // sap.ui.core.CustomData
			dependents : [], // sap.ui.core.Control, since 1.19
			press : [ function(oEvent) {
				var control = oEvent.getSource();
			}, this ]
		});
		
		
		
		
		
		var column = new sap.m.Column({
			id : "id", // sap.ui.core.ID
			width : undefined, // sap.ui.core.CSSSize
			hAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			vAlign : sap.ui.core.VerticalAlign.Inherit, // sap.ui.core.VerticalAlign
			styleClass : undefined, // string
			visible : true, // boolean
			minScreenWidth : undefined, // string
			demandPopin : false, // boolean
			popinHAlign : sap.ui.core.TextAlign.Begin, // sap.ui.core.TextAlign
			popinDisplay : sap.m.PopinDisplay.Block, // sap.m.PopinDisplay, since 1.13.2
			mergeDuplicates : false, // boolean, since 1.16
			mergeFunctionName : "getText", // string, since 1.16
			tooltip : undefined, // sap.ui.core.TooltipBase
			customData : [ new sap.ui.core.CustomData({
				id : "id1", // sap.ui.core.ID
				key : undefined, // string
				value : undefined, // any
				writeToDom : false, // boolean, since 1.9.0
				tooltip : undefined, // sap.ui.core.TooltipBase
				customData : [], // sap.ui.core.CustomData
				dependents : []
			// sap.ui.core.Control, since 1.19
			}) ], // sap.ui.core.CustomData
			dependents : [], // sap.ui.core.Control, since 1.19
			header : undefined, // sap.ui.core.Control
			footer : undefined
		// sap.ui.core.Control
		});
	}


	
	
	
	
});