class TableInitializer
{
	constructor(_Object)
	{
		this.m_Object = this.init(_Object)
	}
	init(_Object)
	{
		var object = ""
		object = _Object.replace(/&#x27;/g, "\'");
		object = object.replace(/&quot;/g, "\"");
		return JSON.parse(object);
	}
	GetObject()
	{
		return this.m_Object;
	}
}

class ClassLevelInitializer extends TableInitializer
{

	constructor(_Object)
	{
		super(_Object);
	}

	ClassInfoInitialize(ClassLevelList)
	{
		for(var key in this.m_Object)
		{
			var strObject = this.m_Object[key].split("|");
			var _ObjectData = new ObjectData("","","",strObject[1],strObject[0]);
			ClassLevelList.push(_ObjectData);
		}
	}
}

class TableInfoInitializer extends TableInitializer
{

	constructor(_Object)
	{
		super(_Object);
	}

	TableInfoInitialize(TableLevelList)
	{
		for(var Classroom in this.m_Object)
		{
			for(var Day in this.m_Object[Classroom])
			{
				for(var className in this.m_Object[Classroom][Day])
				var classColor = this.m_Object[Classroom][Day][className][className];
				var _ObjectData = new ObjectData(Classroom,Day,className,classColor);
				TableLevelList.push(_ObjectData);
			}
		}
	}
}

class ObjectData
{
	constructor(ClassRoom="",ClassDay="",ClassName="",ClassColor="",ClassLevel="",ClassDayoff=false)
	{
		this.ClassRoom = ClassRoom;
		this.ClassDay = ClassDay;
		this.ClassName = ClassName;
		this.ClassColor = ClassColor;
		this.ClassLevel = ClassLevel;
		this.ClassDayoff = ClassDayoff
	}
	GetClassRoom(){return this.ClassRoom;}
	SetClassRoom(ClassRoom){this.ClassRoom = ClassRoom;}
	GetClassName(){return this.ClassName;}
	SetClassName(ClassName){ this.ClassName = ClassName;}
	GetClassColor(){return this.ClassColor;}
	SetClassColor(ClassColor)
	{
		this.ClassColor = ClassColor;
	}
	GetClassLevel(){return this.ClassLevel;}
	SetClassLevel(ClassLevel){this.ClassLevel =ClassLevel;}
	
	SetClassDay(ClassDay){ this.ClassDay = ClassDay}
	GetClassDay(ClassDay = null)
	{
		if(ClassDay == null)
			return this.ClassDay;
		else
		{
			var strDay = this.ClassDay.substring(0,3);
			var strTime = this.ClassDay.substring(3,this.ClassDay.length);
			if(strDay == "mon")
				strDay = "Monday";
			else if(strDay == "tue")
				strDay = "Tuesday";
			else if(strDay == "wed")
				strDay = "Wednesday";
			else if(strDay == "thu")
				strDay = "Thursday";
			else if(strDay == "fri")
				strDay = "Friday";
			ClassDay.push(strDay)	
			ClassDay.push(strTime);
		}
	}
	SetClassDayoff(ClassDayoff){ this.ClassDayoff = ClassDayoff;}
	GetClassDayoff(){return this.ClassDay;}

	//GetClassDay(){return this.ClassDay;}
}

class ObjectSearch extends ObjectData //목적 : 검색
{
	constructor()
	{
		super("","","","","","");		
		this.TableInfo = m_TableInfo.GetObject();
		this.ClassesInfo = m_ClassLevel.GetObject();
	}

	GetClassLevelByColor(color_)
	{
		
		for(var class_ in this.ClassesInfo)
		{
			var ClassesInfoObj = this.ClassesInfo[class_].split("|")[1];
			if(color_ == ClassesInfoObj)
				return this.ClassesInfo[class_].split("|")[0];
		}
	}

	GetClassesByName(targetID,TableDatabyDaytime)
	{
		if(targetID != "")
		{	
			for(var classroom in this.TableInfo)
			{
				for(var day in this.TableInfo[classroom])
				{
					if(targetID == day)
					{
						for(var class_ in this.TableInfo[classroom][day])
						{
							if(class_ != "null")
							{
								var color = this.TableInfo[classroom][day][class_];
								var level = this.GetClassLevelByColor(color);
								var NewObject = new ObjectData(classroom,day,class_,color,level);
								TableDatabyDaytime.push(NewObject);
							}
						}
					}
				}
			}
		}
	}
	GetObjectByRoomDate(Classroom_,targetID_)
	{
		if(targetID_ == "")
			return;

		for(var classroom in this.TableInfo)
		{
			if(classroom == Classroom_)
			{
				for(var day in this.TableInfo[classroom])
				{
					if(targetID_ == day)
					{
						for(var class_ in this.TableInfo[classroom][day])
						{
							if(class_ != "null")
							{
								var color = this.TableInfo[classroom][day][class_];
								var level = this.GetClassLevelByColor(color);
								this.classroom = classroom;
								this.ClassDay = day;
								this.ClassName = class_;
								this.ClassColor = color;
								this.ClassLevel = level;
								return;
							}
						}
					}
				}
			}
		}
	}
	GetObjectByDateClassName(Date_,ClassName_)
	{
		if(Date_ == "")
			return;

		for(var classroom in this.TableInfo)
		{
			for(var day in this.TableInfo[classroom])
			{
				if(Date_ == day)
				{
					for(var class_ in this.TableInfo[classroom][day])
					{
						if(class_ == ClassName_)
						{
							var color = this.TableInfo[classroom][day][class_];
							var level = this.GetClassLevelByColor(color);
							this.classroom = classroom;
							this.ClassDay = day;
							this.ClassName = class_;
							this.ClassColor = color;
							this.ClassLevel = level;
							return;
						}
					}
				}
			}
		}
	}
	GetObjectByColorClassName(ClassName_, ClassColor_,RefTableObjList = null)
	{
		for(var classroom in this.TableInfo)
		{
			for(var day in this.TableInfo[classroom])
			{
				for(var class_ in this.TableInfo[classroom][day])
				{
					if(class_ == ClassName_)
					{
						var color = this.TableInfo[classroom][day][class_]; //rgba(224, 102, 102, 0.816)
						if(this.rgbToHex(ClassColor_) == color)
						{
							var level = this.GetClassLevelByColor(color);
							var NewObject = new ObjectData(classroom,day,class_,color,level);
							if(RefTableObjList == null)
								return NewObject;
							else
								RefTableObjList.push(NewObject);
						}
					}
				}
			}
		}
	}
	componentToHex(c)
	{
		var hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	}
	rgbToHex(rgb_)
	{
		var rgb_ = rgb_.replace(/rgba\(/g, "");
		rgb_ = rgb_.replace(/rgb\(/g, "");
		rgb_ = rgb_.replace(/\)/g,"");
		var rgb = rgb_.split(", ")
		return "#" + this.componentToHex(parseInt(rgb[0])).toUpperCase() + this.componentToHex(parseInt(rgb[1])).toUpperCase() + this.componentToHex(parseInt(rgb[2])).toUpperCase();
	}
}
