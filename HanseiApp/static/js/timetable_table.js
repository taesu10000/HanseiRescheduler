function GetDayoffColor()
{
	return "rgba(100, 100, 100, 0.8)";//"#646464";
}
function GetDayNothingColor()
{
	return "rgba(255, 255, 255,1)";//"#ffffff";
}

// function ChangeTbColor(id,color)
// {
// 	var cell = document.getElementById(id);
// 	cell.style.backgroundColor=color; //클릭된 테이블에 한해서 색칠
// 	if(color == GetAvailableColor() || color == GetDayoffColor())
// 		cell.textContent  = "";
// }

function ChangeTbColor(id,object_)
{
	var cell = $("#"+ id);
	cell.text(object_.GetClassName());
	cell.css('backgroundColor',object_.GetClassColor());
}

function CreateTd(tableObject)//빈 오브젝트(ID만 가지고 있는) 공급. 색,클래스레벨 제공 가능
{
	var tableID = tableObject.GetClassDay();
	document.write("<td class=\"table-on-off\" name=\"" + tableID + "\" id=\"" + tableID + "\"style=\"width:18%;\">");
	if (m_timetableinfo.indexOf(tableID) != -1) //받은게 있고 포함 문자가 있을때
	{
		cellinfos.forEach(element => {   //cellinfos = m_timetableinfo.split("|");  mon9$F$$ | tue9$F$$| thu10$F&asdasd$#854141
			if(element.indexOf(tableID) != -1)
			{
				var cellinfo = element.split("$");		
				tableObject.SetClassDayoff(cellinfo[1]);
				tableObject.SetClassName(cellinfo[2])
				tableObject.SetClassColor(cellinfo[3]);		
			}
		});
	}
	document.write("</td>");
	ChangeTbColor(tableID,tableObject);
}
function CreateClassesLevelTable()
{
	
	var table = $('#classroomtable')
	while(table.find('tr').length > 1)
	{
		table.find('tr').eq(table.find('tr').length -1).remove();
	}
	var html = "<tr>";
	for (var i=0; i < m_ClassLevelList.length ; i++) {
		html += "<tr><th style=\"background-color:"+m_ClassLevelList[i].GetClassColor()+"d0"+";padding: 0\">"+m_ClassLevelList[i].GetClassLevel()+"</th></tr>";
	}
	html += "</tr>";
	document.write(html);
}