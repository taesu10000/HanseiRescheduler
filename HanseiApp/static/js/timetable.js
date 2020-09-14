	function GetToday()
	{
		let today = new Date();  
		return today.getFullYear() + "-" + (leadingZeros(today.getMonth() + 1, 2)) + "-" + today.getDate();//재포맷
	}

	function leadingZeros(n, digits) //숫자앞에 0 붙이기 숫자n을 digits자리수로 맞추기
	{
		var zero = '';
		n = n.toString();
		if (n.length < digits) 
		{
			for (var i = 0; i < digits - n.length; i++)
			zero += '0';
		}
		return zero + n;
	}

	//Event
	function onsubmit()
	{
		var strAvailable = ""
		//var ObjectSearch_ = new ObjectSearch();
		for	(var key in listAll)  //포맷 -> 좌표&TrueOrFalse$Class$Color|좌표&TOrF$Class$Color|좌표&TrueOrFalse$Class$Color
		{
			var object_ = m_mainTableObjects[listAll[key]];
			if (object_.GetClassDayoff() == false) //DayOff일때
			{
				if (strAvailable != "")	
							strAvailable += "|"; 
				strAvailable += listAll[key]+"$T$$";
			}
			else
			{
				var str = object_.GetClassName();
				var color = object_.GetClassColor();

				if (strAvailable != "")
					strAvailable += "|";
				strAvailable += listAll[key] + "$F$" + str + "$" + color; //포맷 -> 좌표&TrueOrFalse$Class$Color|좌표&TOrF$Class$Color|좌표&TrueOrFalse$Class$Color
			}
		}
		document.getElementById("timetablecellinfo").value = strAvailable;
		//그리드 정보 포맷
		CtrlInfoUpdate()
		//셀렉션 정보 입력
	}
	function chageLangSelect()
	{
		CtrlInfoUpdate()
		var frm = document.getElementById("frm");
		frm.submit();
	//     var selectValue = langSelect.options[langSelect.selectedIndex].value;
	//     var selectText = langSelect.options[langSelect.selectedIndex].text;
	}
	function onClickCalendar()
	{
		CtrlInfoUpdate()
		var frm = document.getElementById("frm");
		frm.submit();
	}
	function OnmClickth(targetObj)
	{
		for	(var key in listAll)
		{
			if( listAll[key].indexOf(targetObj.id) != -1)
			{
				var CellID = listAll[key];
				var cellinfo = m_mainTableObjects[CellID];
				cellinfo.SetClassColor(GetDayoffColor());
				ChangeTbColor(CellID,cellinfo);
			}
		}
	}
	function OnClickedContextMenu(TargetID,ContextMenuID,text)
	{
		var tablecell = m_mainTableObjects[TargetID];
		if (ContextMenuID == 0) {
			tablecell.SetClassColor(GetDayNothingColor());
			tablecell.SetClassName("");
		}
		else if (ContextMenuID == 1)
			tablecell.SetClassColor(GetDayoffColor());
		else 
		{
			var ObjectSearch_ = new ObjectSearch();
			ObjectSearch_.GetObjectByDateClassName(TargetID,text)
			tablecell.SetClassColor(ObjectSearch_.GetClassColor());
			tablecell.SetClassName(text);
		}
		ChangeTbColor(TargetID,tablecell);
	}
	function CtrlInfoUpdate()
	{
		var User_selection = document.getElementById("User_selection");
		var seluser = document.getElementById("seluser");
		seluser.value = User_selection.options[User_selection.selectedIndex].text;

		var textarea = document.getElementById("textarea").value;
		document.getElementById("memo").value = textarea;
		//셀렉션 정보 입력
	}

	//ContextMenu
	class ContextManu
	{
		constructor()
		{
			this.subContextId = {};
			this.CreateContextMenu(this.subContextId);
		}
		
		CreateContextMenu(subContextId)
		{
			document.write("<ul class=\'context_main\'>");
			$("ul.context_main").append("<li class=\'main-item\' data-action=\"0\">Clear</li>");
			$("ul.context_main").append("<li class=\'main-item\' data-action=\"1\">Day Off</li>")
			document.write("</ul>");
			
			var i = 2, j=1;
			for (var k = 0; k < m_ClassLevelList.length ; k++)
			{	
				if(m_ClassLevelList[k].GetClassLevel().indexOf("Can't") == -1)
				{
					var id = "id"+j++;
					var chlid = "<li class=\'context_sub\' id=\'"+ id +"\' data-action=\""+ i++ +"\"><div>"+m_ClassLevelList[k].GetClassLevel()+"</div><ul></ul></li>";
					$(chlid).appendTo("ul.context_main");
					subContextId[id] = m_ClassLevelList[k].GetClassLevel();
				}
			}
		}
		
		CreateContextSubMenu(targetID)
		{
			while ($("li.context_sub ul").find("li").length > 0)
			{
				$("li.context_sub ul").find("li").remove();//detach
			}
			var TableDatabyDaytime = [];
			var ObjectSearch_ = new ObjectSearch();
			ObjectSearch_.GetClassesByName(targetID,TableDatabyDaytime);// 선택된 테이블이 mon9이면 모든 강의실 mon9강의 리스트를 가져옴
			if(TableDatabyDaytime.length > 0) //TableDatabyDaytime x3,x1....Class Name by date/time must be in the menu
			{
				for(var key in this.subContextId)// key = context menu id / subContaxtID = className 
				{
					for(var i = 0; i < TableDatabyDaytime.length; i++)
					{
						var Class_ = TableDatabyDaytime[i];
						if(this.subContextId[key]== Class_.GetClassLevel())
						{
							var chlid = "<li class=\'menu-item\'>"+Class_.GetClassName()+"</li>";
							$(chlid).appendTo("li.context_sub#"+key+" ul");
						}

					}
				}
			}
		}
	}


	(function($) {

	})(jQuery);