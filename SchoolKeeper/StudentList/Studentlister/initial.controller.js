sap.ui.controller("studentlister.initial", {

	onSearch : function() {
		var studentid = this.getView().byId('studentid').getValue();

		var name1 = this.getView().byId('name1').getValue();

		var name2 = this.getView().byId('name2').getValue();

		var dob = this.getView().byId('dob').getValue();

		if (studentid !== '' || name1 !== '' || name2 !== '' || dob !== '') {
			$.ajax({
				type : 'POST',
				url : "services/Get_student.php",
				data : {
					studentid : studentid,
					name1 : name1,
					name2 : " ",
					name3 : name2,
					dob : dob,
				},
				dataType : 'json',
				success : function(data, textStatus, jqXHR) {
					var myJSONObject = data[0];

					var keys = [];

					for ( var i in myJSONObject) {
						keys.push(i)
					}
					;

					var oTable = sap.ui.getCore().byId("idinitial2--table1");

					var oModel = new sap.ui.model.json.JSONModel();

					oTable.setModel(oModel.setData(data));

					console.log(oModel);

					console.log(oTable);

					var oController = sap.ui.getCore().byId('idinitial1')
							.getController();

					oController.addColFromService('idinitial2--table1', keys);

				}
			});
		}
		;
	},

	addColFromService : function(tableName, keys) {

		var oRow = new sap.m.ColumnListItem({
			vAlign : 'Middle',
		});
		var table = sap.ui.getCore().byId(tableName);
		var oCol = new sap.m.Column();
		var text = new sap.m.Text();
		table.destroyColumns();
		oRow.destroyCells();
		for (i = 0; i < keys.length; i++) {
			if (String(keys[i]) == 'studentidid' || String(keys[i]) == 'name1'
					|| String(keys[i]) == 'name2') {
				var f = "{" + String(keys[i]) + "}";
				text = new sap.m.Text({
					text : f
				});

				oCol1 = new sap.m.Column();
				table.addColumn(oCol1);
				oRow.addCell(text);
			}

			oCol2 = new sap.m.Column();
			table.addColumn(oCol2);
			var btn_del = new sap.m.Button({
				icon : 'sap-icon://delete',
				press : function() {
					var oController = sap.ui.getCore().byId('initial2')
							.getController();
					oController.deleteRecord();
				},
			});
			oRow.addCell(btn_del);

			table.bindItems("/", oRow);
						console.log(oRow.getCells());
									console.log(table);
		}
		}
});