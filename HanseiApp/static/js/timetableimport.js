
	(function($) {

	})(jQuery);

	function importTimetable(event, callback) 
	{
		let input = event.target;
		let reader = new FileReader();
		var txt = "";
		reader.onload = function () {
			let data = reader.result;
			let workBook = XLSX.read(data, { type: 'binary' });
			workBook.SheetNames.forEach(function (sheetName) {
				let csvs = XLSX.utils.sheet_to_html(workBook.Sheets[sheetName]);

				//let csvs = XLSX.utils.sheet_to_csv(workBook.Sheets[sheetName]);
				//txt += JSON.stringify(csvs);
				//alert("sheetName: " + sheetName);
				//alert(JSON.stringify(csvs));
				//alert("JSON.stringify(csvs) : "+JSON.stringify(csvs));
				//var rangeWithValues = sheet.getRange("A1:A5");
				
				//  if(sheetName == "2020-1 Blue Print of ALL ACE cl")
				// 	callback(JSON.stringify(csvs));
			})
		};
		reader.readAsBinaryString(input.files[0]);
	}
	function submit(excel)
	{
		//alert("submit : "+excel);
		excelvalue = document.getElementById("excelvalue");
		excelvalue.value = excel;
		alert("excelvalue : "+excelvalue.value);
		//alert("submit");
	}