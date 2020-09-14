
	function CreateMainTable()
	{
		if ($("#ClassRoom_selection").val() != "0")
		{
			var table = $('#classtable')
			while(table.find('tr').length > 1)
			{
				table.find('tr').eq(table.find('tr').length -1).remove();
			}

			var startime = 9;
			for( i = 0; i < 10; i++ ) //교시
			{
				var html = "<tr>";
				html += "<th>"+startime+" ~ "+(startime+1)+"</th>";

				for( j = 0; j < 5; j++ ) //요일mon tue wed thu fri 
				{
					talbeId = CreateTableID(i,j)
					html += "<td name=\"" + talbeId + "\" id=\"" + talbeId + "\"></td>";
				}
				html += "</tr>";
				$("#classtable").append(html);
				startime++
			}
			
			Classroom_ = $("#ClassRoom_selection").val();
			var ClassInfoObj = m_TableInfo.GetObject();
			for (var Classroom in ClassInfoObj) 
			{
				if (Classroom_ == Classroom)
				{
					ClassInfos = ClassInfoObj[Classroom]
					for(var classinfo in ClassInfos)
					{
						var first_key = Object.keys(ClassInfos[classinfo])[0];
						var first_value = ClassInfos[classinfo][first_key];
						
						$("#"+classinfo).text(first_key);
						$("#"+classinfo).css('backgroundColor', first_value+"d0");
					}
				}
			}
		}
		else
		{
			var table = $('#classtable')
			while(table.find('tr').length > 1)
			{
				table.find('tr').eq(table.find('tr').length -1).remove();
			}
		}
		function CreateTableID(time,dayNum)
		{
			var day= "";
			if(dayNum == 0)
				day = "mon";
			else if (dayNum == 1)
				day = "tue";
			else if (dayNum == 2)
				day = "wed";
			else if (dayNum == 3)
				day = "thu";
			else if (dayNum == 4)
				day = "fri";
			return day+(time+9);
		}
	}
	
	
(function($) {

})(jQuery);



	// function OnClick_Add()
	// {
	// 	var html = '';

	// 	var classtable = $("#classtable");
	// 	var classes = $("#classes").val();
	// 	var color = $("#color").val();
	// 	var rowlength = classtable.find('tr').length;
	// 	if(classes == "" || color == "")
	// 	{			
	// 		alert("Please type class name or color");
	// 		return;
	// 	}
	// 	html += "<tr>";
	// 	html += "<td style=background-color:"+ color +">"+classes+"</td>";
	// 	html += "<td style=background-color:"+ color +">"+color+"</td>";
	// 	html += "<td id=\""+rowlength+"0\">"+classes+"</td>";
	// 	html += "<td id=\""+rowlength+"1\">"+color+"</td>";
	// 	html += "</tr>";

	// 	document.getElementById(td1).style.backgroundColor=color;

	// 	$("#classtable").append(html);
	// 	classtable.find('tr').each(function(i=0)
	// 	{
	// 		if(i > 0)
	// 		{			
	// 			var $tds =$(this).find('td'),
	// 			str2 =$tds.eq(1).text();
	// 			td1 =$tds.eq(0);
	// 			td2 =$tds.eq(1);
	// 			td1.css('backgroundColor', str2);
	// 			td2.css('backgroundColor', str2);
	// 		}
	// 	});
	// 	$("#classes").val('');
	// 	$("#color").val('');
	// }
	// function OnClick_Delete()
	// {
	// 	var tr = $('#classtable').find('tr')
	// 	if(tr.length > 1)
	// 	{
	// 		tr.eq(tr.length-1).remove();
	// 	}
	// }
	// function OnClick_Clear()
	// {
	// 	var table = $('#classtable')
	// 	while(table.find('tr').length > 1)
	// 	{
	// 		table.find('tr').eq(table.find('tr').length -1).remove();
	// 	}
	// }
	// function OnSubmit()
	// {
	// 	var classes = "";
	// 	var classtable = $("#classtable");
	// 	classtable.find('tr').each(function(i=0)
	// 	{
	// 		if(i > 0)
	// 		{			
	// 			var $tds =$(this).find('td'),
	// 			str1 =$tds.eq(0).text(),
	// 			str2 =$tds.eq(1).text();

	// 			if(classes == "")
	// 				classes += str1 + "$" + str2;
	// 			else
	// 				classes += "|" + str1 + "$" + str2;
	// 		}
	// 	});
	// 	// var classesctlr =$("#classes");
	// 	// classesctlr.val() = classes;
	// 	var classesctlr = document.getElementById("classes");
	// 	classesctlr.value = classes;
	// 	//alert(classesctlr.val());
	// 	//$("#classes").value = classes;
	// 	var frm = document.getElementById("frm");
	// 	frm.submit();
	// }