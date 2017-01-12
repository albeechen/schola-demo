/*create form item*/
var items_name = ["First name", "Last name", "Gender", "Birthady", "Phone1",
				  "Phone2", "Address", "Address", "City", "State", "Zip"];
	  
var items = document.getElementsByClassName("item-style");

for( var i = 0; i < items_name.length ; i++ ){
	var item_div = document.createElement("div");
	var item_name = document.createTextNode(items_name[i]);
	item_div.className = "item-style";
	item_div.appendChild(item_name);
	document.getElementById("item").appendChild(item_div);
};

/*create form item_value*/
var items_type = ["text", "text", "radio", "date", "tel",
				  "tel", "text", "text", "text", "", "number"]
var state_list = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC",
      			  "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS",
    			  "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO",
    			  "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP",
                  "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN",
				  "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]
var gender_list = ["Male ", "Female"];

function createItemValue (classname, type){
	input_item = document.createElement("input");
	input_item.className = classname;
	input_item.type = type;
	return input_item;
};


var input_item;
var item_value_className = "item-value-style";

for( var i = 0; i < items_name.length ; i++ ){
	var item_value_div = document.createElement("div");

	switch(i)
	{
		case 2 :
			item_value_div.className = "item-value-radio";
			for( var k = 0; k < 2; k++ ){
				var radio = document.createElement("input");
				radio.type = "radio";
				radio.setAttribute("name", "gender");
				item_value_div.appendChild(radio);
				var item_name = document.createTextNode(gender_list[k]);
				item_value_div.appendChild(item_name);

			}		
			break;

		case 9:
			var select = document.createElement("select");
			select.className = "item-value-style";
			for( var j = 0; j < state_list.length ; j++ ){
				var state = document.createElement("option");
				state.innerHTML = state_list[j];
				select.appendChild(state);
			}
			item_value_div.appendChild(select);
			break;

		default:
			item_value_div.appendChild(createItemValue(item_value_className, items_type[i]));
			break;
	}

	document.getElementById("item-value").appendChild(item_value_div);
};
