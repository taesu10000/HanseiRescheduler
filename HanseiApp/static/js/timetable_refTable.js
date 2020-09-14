function CreateRefTable()
{
	var table = $('#refTable')
	while(table.find('tr').length > 1) //기존 테이블 초기화
	{
		table.find('tr').eq(table.find('tr').length -1).remove();
	}
	var idNum = 0;
	html="";
	var objectlist = [];
	var ObjectSearch_ = new ObjectSearch();
	ObjectSearch_.GetClassesByName(targetID, objectlist);//선택한 날,교시에와 동일한 수업 획득/ 본 함수는 날,교시 정보만 가지고 검색
	var idNum = 1;
	var id = "";
	html = "";
	for(var i= 0; i < (objectlist.length*2)/10; i++)
	{
		var object;	
		html += "<tr>";
		for(var j = 0 ; j < 10 ; j++)
		{	
			object = objectlist[(i * 10) + j];
			id = "td"+idNum++;
			html += "<td id=\""+id +"\" style=\"width:auto;padding: 0;text-align: center;\"></td>";
		}
		html += "<tr>";
	}
	$("#refTable").append(html);
	idNum = 1;
	for(var i= 0; i < objectlist.length; i++) //M 505|3x|#FE0666
	{
		object = objectlist[i];
		var strday = [];
		object.GetClassDay(strday);
		id = "td"+idNum++;
		$("#refTable.alt tr #"+ id).css('backgroundColor', "#FFFF00d0");
		$("#refTable.alt tr #"+ id).text(object.GetClassRoom());
		id = "td"+idNum++;
		$("#refTable.alt tr #"+ id).css('backgroundColor', object.GetClassColor()+"d0");
		$("#refTable.alt tr #"+ id).text(object.GetClassName());

		$("h2#headerlable").text("classes " + object.GetClassName() +" on "+ strday[0] + " at " + strday[1] +" in "+object.GetClassRoom());
	}
	var table = $('#refFooterTable')
	while(table.find('tr').length > 1) //TH를 남기기 위해 1로, TH 삭제 안함
	{
		table.find('tr').eq(table.find('tr').length -1).remove();
	}
}
function RefFooterTable(RefTargetID,RefTargetColor)
{
	var table = $('#refFooterTable')
	while(table.find('tr').length > 1) //TH를 남기기 위해 1로, TH 삭제 안함
	{
		table.find('tr').eq(table.find('tr').length -1).remove();
	}
	var RefTableObjList = []
	var targetcolor = ""
	var ObjectSearch_ = new ObjectSearch();
	ObjectSearch_.GetObjectByColorClassName(RefTargetID,RefTargetColor,RefTableObjList)
	var idNum = 1;

	html = "";
	for(var i= 0; i < (RefTableObjList.length*2)/10; i++)
	{
		var object;	
		html += "<tr>";
		for(var j = 0 ; j < 10 ; j++)
		{	
			object = RefTableObjList[(i * 10) + j];
			id = "td"+idNum++;
			html += "<td id=\""+id +"\" style=\"width:auto;padding: 0;text-align: center;\"></td>";
		}
		html += "<tr>";
	}
	$("#refFooterTable").append(html);

	idNum = 1;
	for(var i= 0; i < RefTableObjList.length; i++) //M 505|3x|#FE0666
	{
		object = RefTableObjList[i];
		var strday = [];
		object.GetClassDay(strday);
		id = "td"+idNum++;
		$("#refFooterTable.alt tr #"+ id).css('backgroundColor', "#FFFF00d0");
		$("#refFooterTable.alt tr #"+ id).text(object.GetClassRoom() + " " + strday[0] + " " + strday[1]);
		id = "td"+idNum++;
		$("#refFooterTable.alt tr #"+ id).css('backgroundColor', object.GetClassColor()+"d0");
		$("#refFooterTable.alt tr #"+ id).text(object.GetClassName());
		$("div#footerlable.modal-footer h3").text("Same classes as " + object.GetClassName() +" on "+ strday[0] + " at " + strday[1] +" in "+object.GetClassRoom());
	}
	
}
