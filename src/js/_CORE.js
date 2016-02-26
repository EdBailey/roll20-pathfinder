var PFSheet = PFSheet || (function(){

		var version= 0.33,
			pfDebug = false,

		/****************************** UTILITIES ************************************/

		/* findAbilityInString
		 * For dropdowns, this looks at the <option value="xxxx"> pass the value to here.
		 *
		 * Looks at a string for instances of an ability modifier DEX-mod, STR-mod,  etc and returnsthe modifier it finds.
		 * Note the order checked is the same as the order they traditionally appear in: STR-mod,DEX-mod,CON-mod,INT-mod,WIS-mod,CHA-mod
		 * Also checks for regular abilityies without mod , and other items that appear in dropdowns.
		 * if none is found, then if the first character is "0" return ""
		 */
			findAbilityInString = function (fieldToFind) {
				if (!fieldToFind) {fieldToFind="";}
				else if ( fieldToFind.indexOf("0")===0) {fieldToFind="";}
				else if (fieldToFind.indexOf("STR-mod") >= 0 ) {fieldToFind = "STR-mod";}
				else if (fieldToFind.indexOf("DEX-mod") >= 0 ) {fieldToFind = "DEX-mod";}
				else if (fieldToFind.indexOf("CON-mod") >= 0 ) {fieldToFind = "CON-mod";}
				else if (fieldToFind.indexOf("INT-mod") >= 0 ) {fieldToFind = "INT-mod";}
				else if (fieldToFind.indexOf("WIS-mod") >= 0 ) {fieldToFind = "WIS-mod";}
				else if (fieldToFind.indexOf("CHA-mod") >= 0 ) {fieldToFind = "CHA-mod";}
				else if (fieldToFind.indexOf("melee") >= 0) {fieldToFind="attk-melee";}
				else if (fieldToFind.indexOf("Melee") >= 0) {fieldToFind="attk-melee";}
				else if (fieldToFind.indexOf("ranged") >= 0) {fieldToFind="attk-ranged";}
				else if (fieldToFind.indexOf("Ranged") >= 0) {fieldToFind="attk-ranged";}
				else if (fieldToFind.indexOf("CMB") >= 0) {fieldToFind="CMB";}
				else if (fieldToFind.indexOf("STR") >= 0 ) {fieldToFind = "STR";}
				else if (fieldToFind.indexOf("DEX") >= 0 ) {fieldToFind = "DEX";}
				else if (fieldToFind.indexOf("CON") >= 0 ) {fieldToFind = "CON";}
				else if (fieldToFind.indexOf("INT") >= 0 ) {fieldToFind = "INT";}
				else if (fieldToFind.indexOf("WIS") >= 0 ) {fieldToFind = "WIS";}
				else if (fieldToFind.indexOf("CHA") >= 0 ) {fieldToFind = "CHA";}
				return fieldToFind;
			},

		/* findMultiplier
		 * for damage dropdown in attack items, look at string for dropdown
		 * and return number of the multiplier: .5, 1, 1.5, 2, etc
		 *
		 * @str = the value of the damage ability
		 * @returns = a number indicating the multiplier for the ability mod
		 */
			findMultiplier = function (str) {
				var retNum;
				if (!str) { return 0;}
				if (str.indexOf("1.5") >= 0) {retNum=1.5;}
				else if (str.indexOf(".5") >= 0) {retNum=0.5;}
				else if (str.indexOf("1/2") >= 0) {retNum=0.5;}
				else if (str.indexOf("3/2") >= 0) {retNum=1.5;}
				else if (str.indexOf("1 1/2") >= 0) {retNum=1.5;}
				else if (str.indexOf("2") >= 0) {retNum=2;}
				else { retNum=1;}
				return retNum;
			},

		/* updateRowTotal
		 * Adds up numbers and puts it in the first field of the fields array.
		 * All numbers are added up as FLOATS, and then FLOOR is used to round the sum down
		 * @fields {Array}= array of field names, first element (fields[0]) MUST be the total field , rest are the fields to add up.
		 * Updates total field if the total is not the same as the number in the total, or if the current value is not a number.
		 * @bonus {number} = a number that is added
		 * @penalties {Array} = array of fieldnames to be subtracted from the total.
		 */
			updateRowTotal = function(fields,bonus,penalties) {
				var readFields=fields;
				if (!fields || fields.length===0 ) {return;}
				if( penalties && penalties.length>0){
					readFields=readFields.concat(penalties);
				}
				getAttrs(readFields,function(v){
					var currValue= parseInt(v[fields[0]],10),
						newValue=0,penalty=0,setter={},i;
					for(i=1;i<fields.length;i++){
						newValue+= parseFloat(v[fields[i]])||0;
					}
					if (bonus && !isNaN(bonus)) {newValue += bonus;}
					if (penalties){
						for(i=0;i<penalties.length;i++) {
							penalty+=parseFloat(v[penalties[i]])||0;
						}
						newValue-=penalty;
					}
					newValue = Math.floor(newValue);
					if (isNaN(currValue) || currValue !== newValue) {
						setter[fields[0]]=newValue;
						setAttrs(setter);
					}
				});
			},


		/* handleDropdown
		 * Looks at a dropdown selected value, finds the matching attribute value, and then
		 * sets the writeFields with that number.
		 *
		 * @readField {string} = the dropdpown field
		 * @writeFields {string or Array} = One string or an array of strings that are fields to write the value to
		 * @callback {function} optional = if we need to update the field, call this function
		 *         with the value we set as 1st param,
		 * 	 If writeField is a string not an Array, then set old value as 2nd param (could be NaN)
		 */
			handleDropdown = function (readField,writeFields,callback) {
				SWUtils.getReferencedAttributeValue(readField,findAbilityInString,function(valueOf){
					if (typeof writeFields === "string") {
						getAttrs([writeFields],function(v){
							var currValue=parseInt(v[writeFields],10),setter={};
							if (currValue!==valueOf || isNaN(writeFields)) {
								setter[writeFields]=valueOf;
								setAttrs(setter);
								if (typeof callback === "function" ) {
									callback(valueOf,currValue);
								}
							}
						});
					} else if (Array.isArray(writeFields)){
						getAttrs(writeFields,function(v){
							var i=0, setany=0,setter = {};
							for( i=0;i<writeFields.length;i++) {
								if (v[writeFields[i]] !== valueOf) {
									setter[writeFields[i]]=valueOf;
									setany++;
								}
							}
							if (setany) {
								setAttrs(setter);
								if (typeof callback === "function" ) {
									callback(valueOf);
								}
							}
						});
					}
				});
			},



		/****************************************** REPEATING SECTION SUPPORT *****************/
		/* if id is not empty, then returns the ID with an underscore on the right.
		 */
			getRepeatingIDStr=function(id){
				var idStr="";
				if (id) {idStr=id + "_";}
				return idStr;
			},


			isBadRowId=function(section,id,nullok) {
				//console.log("TRACE: isBadRowId section:"+section+", id:"+id+", null ok?:" + nullok);
				if (!nullok &&  !id ) {
					return true;
				}
				if ( id === section) {
					return true;
				}
				if (section==="weapon") {
					if ( id && (id.indexOf("attack")>=0 || id.indexOf("damage")>=0)) {
						return true;
					}
				}
				return false;
			},

		/* 	setRepeatingRowDefaultFields
		 *	Sets the ID for a row if the newflag is not set to 1.
		 * @section {string} the fieldset name after "section_"
		 * @id {string} the id ofthe row
		 * @forceReset {forceReset} = if true set the ID even if new_flag is not set.
		 */
			setRepeatingRowDefaultFields =function(section,id,forceReset) {
				var newflag  = "repeating_"+section +"_" +id+"_new_flag",
					rowid = "repeating_"+section +"_" +id+"_row_id",
					fieldNames=[newflag,rowid];
				getAttrs(fieldNames,function(v){
					var setter={};
					if ( v[newflag]!="1" || forceReset ) {
						setter[rowid]= id;
						setter[newflag]="1";
						setAttrs(setter);
					}
				});
			},

		/* handleRepeatingRowOrdering
		 *  sets the ID fields and new_flag fields for all rows in the section
		 * @section {string} = the fieldset name after "section_"
		 * @forceReset {forceReset} = if true set the ID even if new_flag is not set.
		 */
			handleRepeatingRowOrdering = function(section,forceReset) {
				getSectionIDs("repeating_"+section,function(ids){
					ids.forEach(function(id,index){
						if (isBadRowId(section,id,false)) {
							console.log("ERROR: handleRepeatingRowOrdering invalid id:"+id);
							return;
						}
						setRepeatingRowDefaultFields(section,id,forceReset);
					});
				});
			},


		/*checkIsNewRow - updates new_flag and id for a row. if a spell row calls updateSpell
		 * Within row context of a repeating section item,
		 * if _new_flag is blank or 0 then call handleRepeatingRowOrdering
		 * @section {string} = the name of the repeating section that appears after "repeating_"
		 * @eventinfo = from the event that launched this
		 */
			checkIsNewRow = function(section,eventInfo) {
				if (!section || !eventInfo){return;	}
				//console.log("checkIsNewRow: event:"+eventInfo.sourceAttribute);
				getAttrs(["repeating_"+section+"_new_flag"],function(v){
					var startIdx,endIdx,newid,setter={};
					if (v["repeating_"+section+"_new_flag"]!="1") {
						startIdx=("repeating_"+section+"_").length;
						endIdx = eventInfo.sourceAttribute.indexOf("_",startIdx);
						if (endIdx <= 0) {return;}
						newid = eventInfo.sourceAttribute.substring(startIdx,endIdx);
						setter["repeating_"+section+"_row_id"]= newid;
						setter["repeating_"+section+"_new_flag"]="1";
						setAttrs(setter);
						if (section.match(/lvl-.-spell/)){ updateSpell(section); }
					}
				});
			},



		/*************************************   MULTI PAGE ****************************************/
		/*updateSize
		 * When size attribute is changed, update CMD-size, size_display, size_skill, size_skill_double
		 */
			updateSize = function() {
				getAttrs(["size"],function(v){
					var size=parseInt(v.size,10)||0,
						skillSize,cmbsize,doubleSkill;
					switch (Math.abs(size)){
						case 0: skillSize=0;break;
						case 1: skillSize=2;break;
						case 2: skillSize=4;break;
						case 4: skillSize=6;break;
						case 8: skillSize=8;break;
						case 16: skillSize=10;break;
						default: skillSize=0;
					}
					if(size<0) {skillSize=skillSize*-1;}
					cmbsize= size * -1;
					doubleSkill=2*skillSize;
					setAttrs({ "size_display":size,  "size_skill":skillSize, "CMD-size":cmbsize, "size_skill_double":doubleSkill});
				});
			},


		/* updateConditionCheckPenalty - handles changes to skill and ability checks due to conditions AND buffs.
		 * Reads in condition that affect Ability and Skill checks and updates condition fields.
		 * checks-cond, Phys-skills-cond, Perception-cond.
		 */
			updateConditionCheckPenalty=function(){
				//console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCC at updateConditionCheckPenalty");
				getAttrs(["condition-Blinded","condition-Fear","condition-Drained","condition-Sickened","condition-Wounds"
							 ,"checks-cond","Phys-skills-cond","Perception-cond","buff_Check-total"
							 ,"CasterLevel-Penalty"]
					,function(v) {
						//there is no Fascinated, if we add it then:
						//,"condition-Fascinated" -4 to perception
						var buffCheck=parseInt(v["buff_Check-total"],10)||0
							,drained=parseInt(v["condition-Drained"],10)||0
							,fear = -1*(parseInt(v["condition-Fear"],10)||0)
							,sick= -1*(parseInt(v["condition-Sickened"],10)||0)
							,wounds = -1 * (parseInt(v["condition-Wounds"],10)||0)
							,allSkills=buffCheck+drained+fear+sick+wounds
							,casterlevel=drained+wounds
							,blindedMod = -2 * (parseInt(v["condition-Blinded"],10)||0)
							,currAllSkills=parseInt(v["checks-cond"],10)
							,currPhysSkills=parseInt(v["Phys-skills-cond"],10)
							,currPerSkills=parseInt(v["Perception-cond"],10)
							,currCaster=parseInt(v["CasterLevel-Penalty"],10)
							,casterpen=0
							,setter={},setAny=0;

						if (allSkills!==currAllSkills||isNaN(currAllSkills)){
							setter["checks-cond"]=allSkills;
							setAny=1;
						}
						if (blindedMod!==currPhysSkills||isNaN(currPhysSkills)){
							setter["Phys-skills-cond"]=blindedMod;
							setAny=1;
						}
						if (blindedMod!==currPerSkills||isNaN(currPerSkills)){
							setter["Perception-cond"]=blindedMod;
							setAny=1;
						}
						if (casterlevel!==currCaster||isNaN(currCaster) ){
							setter["CasterLevel-Penalty"]=casterlevel;
							setAny=1;
						}
						//console.log("about to set " + setter);
						if (setAny){
							setAttrs(setter);
						}
					});
			},

		/*************************************   CORE  PAGE ****************************************/

		/**** ABILITIES ****/
		/* updateAbility
		 * Updates the final ability score, ability modifier, condition column based on entries in ability grid plus conditions and buffs.
		 * Also sets unconscious flag if ability damage is >= ability score.
		 * Note: Ability value is not affected by damage and penalties, instead only modifier is affected.
		 * @ability {string} 3 letter abbreviation for one of the 6 ability scores.
		 */
			updateAbility = function(ability,columnUpdated,columnVal) {
				getAttrs([ability+"-base",ability+"-enhance",ability+"-misc",ability+"-damage",ability+"-penalty"
							 ,ability+"-drain",ability, ability+"-mod", ability+"-cond","buff_"+ability+"-total"], function (values){
					var base = (parseInt(values[ability+"-base"],10)||0) +
							   (parseInt(values[ability+"-enhance"],10)||0) +
							   (parseInt(values[ability+"-misc"],10)||0) +
							   (parseInt(values[ability+"-drain"],10)||0) +
							   (columnUpdated==="buff"?columnVal:(parseInt(values["buff_"+ability+"-total"],10)||0))
						,dmg =   Math.floor(Math.abs(parseInt(values[ability+"-damage"],10)||0)/2)
						,pen =   Math.floor(Math.abs(parseInt(values[ability+"-penalty"],10)||0)/2)
						,cond= (columnUpdated==="cond"?columnVal:( Math.floor(Math.abs(parseInt(values[ability+"-cond"],10)||0)/2)))
					//use 99 (never happen) to make sure we update if there's a problem
						,currAbility=parseInt(values[ability],10)||99
						,currMod = parseInt(values[ability+"-mod"],10)||99
						,mod= Math.floor((base -10)/2) - dmg - pen -cond
						,setAny=0,setter={};


					if (currAbility !== base){setter[ability]=base;setAny=1;}
					if (currMod !== mod){setter[ability+"-mod"]=mod;setAny=1;}

					if (setAny){setAttrs(setter);}
				});
			},


		/* updateConditionAbilityPenalty - for ability penalties, not "ability check" penalites
		 * Sets DEX-cond and STR-cond for fatigued, entangled, and grappled
		 */
			updateConditionAbilityPenalty = function() {
				getAttrs(["STR-cond","DEX-cond","condition-Fatigued","condition-Entangled","condition-Grappled"],function(v){
					var setter={},setAny=0
						,strMod = (parseInt(v["condition-Fatigued"],10)||0)
						,dexMod = (parseInt(v["condition-Entangled"],10)||0) +
								  (parseInt(v["condition-Grappled"],10)||0) + strMod
						,dexAbMod=dexMod*-2
						,strAbMod=strMod*-2;
					if (dexAbMod !== (parseInt(v["DEX-cond"],10)||0)) {
						setter["DEX-cond"]=dexAbMod;
						setAny=1;
					}
					if (strAbMod !== (parseInt(v["STR-cond"],10)||0)) {
						setter["STR-cond"]=strAbMod;
						setAny=1;
					}
					if (setAny) {
						setAttrs(setter);
						//short circuit
						updateAbility("DEX","cond",dexMod);
						updateAbility("STR","cond",strMod);
					}
				});
			},

		/***** BUFFS *****/

		/* updateBuff
		 * This updates the buff value when a textbox is updated.
		 * ONLY called if the toggle checkbox is CHECKED for this row,
		 * so set buff even if 0 since it changed from non zero
		 * @buffname {string} The case sensitive distinct portion of name of field that was changed.
		 *      So: Melee, Ranged, DMG, AC, HP-temp, Fort, Ref, Will, STR, DEX, CON, INT, WIS, CHA
		 * @row {number} The row number of the change.
		 */
			updateBuff = function (buffname, row) {
				var fieldtoUpdate = "buff"+row+"_"+buffname
					,fieldtoRead = fieldtoUpdate + "_macro-text";
				SWUtils.evaluateAndSetNumber(fieldtoRead,fieldtoUpdate);
			},

		/* updateBuffRow
		 * Updates the buff values for a given row of the buff array when the toggle checkbox is clicked on.
		 * If toggled off, then sets all to zero.  If toggled on, then sets non-zero buffs to proper value.
		 *
		 * @row {number} The buff row toggled (X in buffX_Toggle )
		 */
			updateBuffRow = function(row) {
				var toggle="buff"+row+"_Toggle"
					,buffFlds = ["buff"+row+"_Melee", "buff"+row+"_Ranged","buff"+row+"_DMG","buff"+row+"_AC","buff"+row+"_HP-temp","buff"+row+"_Fort",
								 "buff"+row+"_Ref","buff"+row+"_Will","buff"+row+"_STR","buff"+row+"_DEX","buff"+row+"_CON","buff"+row+"_INT","buff"+row+"_WIS","buff"+row+"_CHA",
								 "buff"+row+"_Touch","buff"+row+"_CMD","buff"+row+"_Check","buff"+row+"_CasterLevel",
								 toggle];

				getAttrs(buffFlds,function(v){
					var numFlds = buffFlds.length - 1; // -1 to skip toggle field at end of buffFlds array
					var i,numSet=0, valuesToSet ={};
					if (v[toggle] == "0") {
						for (i=0;i<numFlds;i++) {
							if (v[buffFlds[i]] !== 0) {valuesToSet[buffFlds[i]]=0;numSet++;}
						}
						if (numSet > 0) {  setAttrs(valuesToSet); }
					} else {
						var inputFlds =[numFlds];
						for (i=0;i<numFlds;i++){
							inputFlds[i] = buffFlds[i]+"_macro-text";
						}
						for (i=0;i<numFlds;i++){
							SWUtils.evaluateAndSetNumber(inputFlds[i],buffFlds[i],true);
						}
					}
				});
			},


		/* updateBuffColumn
		 * Updates the buff_***-total field for the column in the buff array.
		 * we know buffx_col will not be strings, unlike the _macro-text so just check for null not for isNaN
		 * @col {string} the case sensitive distinct portion of name of field.
		 *      So: Melee, Ranged, DMG, AC, HP-temp, Fort, Ref, Will, STR, DEX, CON, INT, WIS, CHA
		 */
			updateBuffColumn = function (col){
				var fields=["buff_"+col+"-total","buff1_"+col,"buff2_"+col,"buff3_"+col,"buff4_"+col,"buff5_"+col,
							"buff6_"+col,"buff7_"+col,"buff8_"+col,"buff9_"+col,"buff10_"+col];
				//updateRowTotal(fields);
				getAttrs(fields,function(v){
					var currValue= parseInt(v[fields[0]],10)
						,newValue=0,setter={},i=1;
					for(i=1;i<11;i++){
						//console.log("at"+i);
						newValue+= parseFloat(v[fields[i]])||0;
						//console.log("i:"+i+", val="+newValue);
					}
					if (isNaN(currValue) || currValue !== newValue) {
						setter[fields[0]]=newValue;
						setAttrs(setter);
						switch(col) {
							case "STR":
							case "DEX":
							case "CON":
							case "INT":
							case "WIS":
							case "CHA":
								updateAbility(col,"buff",newValue);
								break;
							//cannot do this in case the user hit "update row total"
							//then two or more could be updated, which breaks the repeating sections
							//case "Melee":
							//	updateAttack("melee",true,newValue);
							//	updateAttack("CMB",true,newValue);
							//	break;
							//case "Ranged":
							//	updateAttack("ranged",true,newValue);
							//	break;
						}
					}
				});
			},


		/* updateGrapple
		 * Ensures Grapple and Pin are mutually exclusive
		 */
			updateGrapple= function() {
				getAttrs(["condition-Pinned","condition-Grappled"],function(values){
					if (values["condition-Pinned"] !== "0" && values["condition-Grappled"] !== "0") {
						setAttrs({"condition-Pinned":"0"});
					} else {
						//user hit either pinned and it undid grapple, or hit grapple first time.
						updateConditionAbilityPenalty();
					}
				});
			},

		/* updatePin
		 * Ensures Grapple and Pin are mutually exclusive
		 */
			updatePin = function() {
				getAttrs(["condition-Pinned","condition-Grappled"],function(values){
					if (values["condition-Pinned"] !== "0" && values["condition-Grappled"] !== "0") {
						setAttrs({"condition-Grappled":"0"});
					} else {
						//user hit grapple and it  undid pinned, or hit pinned first time.
						updateConditionAbilityPenalty();
					}
				});
			},


		/* updateInit
		 * updates the init
		 */
			updateInit = function () {
				updateRowTotal(["init","init-ability-mod","init-trait","init-misc"],0,["condition-Deafened"]);
			},


		/* updateHP
		 * sets max HP
		 */
			updateHP = function() {
				getAttrs(["HP_max", "HP-ability-mod", "level", "total-hp", "total-mythic-hp", "condition-Drained", "HP-formula-mod", "HP-misc", "mythic-adventures-show"], function (values) {
					var  totalhp = (( parseInt(values["HP-ability-mod"],10)||0) * (parseInt(values["level"],10)||0)) +
								   (parseInt(values["total-hp"],10)||0) +
								   (parseInt(values["HP-misc"],10)||0) +
								   (parseInt(values["HP-formula-mod"],10)||0) +
								   (5 * (parseInt(values["condition-Drained"],10)||0));
					if (values["mythic-adventures-show"] == "1") {
						totalhp += (parseInt(values["total-mythic-hp"], 10) || 0);
					}
					var grazedhp = Math.floor(totalhp * 0.75),
						woundedhp = Math.floor(totalhp /2 ),
						criticalhp = Math.floor(totalhp /4);
					var currHP= parseInt(values["HP_max"],10)||0;
					if (currHP !== totalhp) {
						setAttrs({"HP_max":totalhp,"HP_grazed":grazedhp,"HP_wounded":woundedhp,"HP_critical":criticalhp});
					}
				});
			},

		/* updateTempHP
		 * sets temp hp
		 */
			updateTempHP = function() {
				getAttrs(["HP-temp","HP-temp-misc","buff_HP-temp-total"],function(values) {
					var totaltemp = (parseInt(values["HP-temp-misc"],10)||0) + (parseInt(values["buff_HP-temp-total"],10)||0),
						currtemp=  parseInt(values["HP-temp"],10)||0 ;
					if (currtemp !== totaltemp) {setAttrs({"HP-temp":totaltemp});}
				});
			},



		/********************************* NPC PAGE  *********************************************/

		/* updateNPCHP
		 * updates the NPC hp,
		 * also PC hp, if config page says to
		 */
			updateNPCHP = function () {
				getAttrs(["NPC-HD","NPC-HD-num","NPC-HD2","NPC-HD-num2","NPC-HD-misc-mod","NPC-HP_max","NPC-HP","sync_npc_pc_hp"],function(v){
					var hp = Math.floor(((parseInt(v["NPC-HD"],10)||0)+1)/2 * (parseInt(v["NPC-HD-num"],10)||0))
							 + Math.floor(((parseInt(v["NPC-HD2"],10)||0)+1)/2 * (parseInt(v["NPC-HD-num2"],10)||0))
							 + (parseInt(v["NPC-HD-misc-mod"],10)||0 ),
						maxhp=parseInt(v["NPC-HP_max"],10)||0,
						currhp=parseInt(v["NPC-HP"],10)||0,
						updatehp=parseInt(v.sync_npc_pc_hp,10)||0,
						setter={},setAny=0;
					//console.log("HHHHHHHHHHHHHHHHHHHHHHHHH updateNPCHP, hp:"+hp+", maxhp:"+maxhp);
					//console.log(v);
					if (hp !== maxhp) {
						setter["NPC-HP_max"]=hp;
						if (updatehp) { setter["HP"]=hp; }
						setAny=1;
						//first time
						if ((currhp === 0 && maxhp ===0 )||(currhp===maxhp)){
							setter["NPC-HP"]=hp;
							if (updatehp) { setter["HP_max"]=hp; }
						}
					}
					if (setAny){ setAttrs(setter);}
				});
			},

		/************************************* CLASS PAGE ***********************************/


		/* updateClassInformation
		 * Updates totals at bottom of Class Information grid
		 *
		 * @col the unique part of the string for the cell modified:
		 *   hp, fchp, bab, skill, fcskill, alt, Fort, Ref, Will, level
		 */
			updateClassInformation = function (col) {
				//console.log("at updateClassInformation");
				if (!col ) { return; }
				if (col==="fchp") { col="hp";}
				var getFields=[],totalColName,
					col0Name="class-0-"+col, col1Name="class-1-"+col, col2Name="class-2-"+col
					,col3Name="class-3-"+col,col4Name="class-4-"+col,col5Name="class-5-"+col
					,col0NameTwo,col1NameTwo,col2NameTwo,col3NameTwo,col4NameTwo,col5NameTwo;
				totalColName=(col === "bab" || col === "level")?col:"total-"+col;
				getFields=[totalColName,col0Name,col1Name,col2Name,col3Name,col4Name];
				if (col !== "skill") {
					if ( col === "hp"  ){
						col0NameTwo="class-0-fc"+col;
						col1NameTwo="class-1-fc"+col;
						col2NameTwo="class-2-fc"+col;
						col3NameTwo="class-3-fc"+col;
						col4NameTwo="class-4-fc"+col;
						col5NameTwo="class-5-fc"+col;
						getFields=getFields.concat([col0NameTwo,col1NameTwo,col2NameTwo,col3NameTwo,col4NameTwo,col5NameTwo]);
					}
					//console.log(getFields);
					updateRowTotal(getFields);
				} else {
					col0NameTwo="class-0-level";
					col1NameTwo="class-1-level";
					col2NameTwo="class-2-level";
					col3NameTwo="class-3-level";
					col4NameTwo="class-4-level";
					col5NameTwo="class-5-level";
					getFields=getFields.concat([col0NameTwo,col1NameTwo,col2NameTwo,col3NameTwo,col4NameTwo,col5NameTwo]);
					//console.log(getFields);
					getAttrs(getFields,function(v){
						var setter = {},currTot,
							tot = Math.floor(( parseFloat(v[col0Name],10)||0)*( parseInt(v[col0NameTwo],10)||0) +
											 ( parseFloat(v[col1Name],10)||0)*( parseInt(v[col1NameTwo],10)||0) +
											 ( parseFloat(v[col2Name],10)||0)*( parseInt(v[col2NameTwo],10)||0) +
											 ( parseFloat(v[col3Name],10)||0)*( parseInt(v[col3NameTwo],10)||0) +
											 ( parseFloat(v[col4Name],10)||0)* ( parseInt(v[col4NameTwo],10)||0)+
											 ( parseFloat(v[col5Name],10)||0)* ( parseInt(v[col5NameTwo],10)||0));
						currTot = parseInt(v[totalColName],10);
						//console.log("tot is "+tot+", currtot = "+currTot);
						if ( isNaN(currTot) ||  tot!== currTot) {
							setter[totalColName]=tot;
							setAttrs(setter);
						}
					});
				}
			},
		/******* MYTHIC ***************/


		/* updateMythicPathInformation
		 * Updates total at bottom of Mythic Path Information grid
		 */
			updateMythicPathInformation = function () {
				getAttrs(["mythic-tier", "mythic-hp", "total-mythic-hp"], function (values) {
					var tot = (parseInt(values["mythic-tier"], 10) || 0) * (parseInt(values["mythic-hp"], 10) || 0),
						currTot = parseInt(values["total-mythic-hp"], 10) || 0;
					//console.log("tot=" + tot + ", currTot=" + currTot);
					if (currTot !== tot) { setAttrs({ "total-mythic-hp": tot }); }
				});
			},

		/* updateMythicPower
		 * sets max MP
		 */
			updateMythicPower = function () {
				//console.log("entered updateMythicPower");
				getAttrs(["mythic-power_max", "tier-mythic-power", "misc-mythic-power"], function (values) {
					var totalMP = (parseInt(values["tier-mythic-power"], 10) || 0) + (parseInt(values["misc-mythic-power"], 10) || 0),
						currMP = parseInt(values["mythic-power_max"], 10) || 0;
					//console.log("totalMP=" + totalMP + ", currMP=" + currMP);
					if (currMP !== totalMP) { setAttrs({ "mythic-power_max": totalMP }); }
				});
			},

		/* updateTierMythicPower
		 * sets tier mp
		 */
			updateTierMythicPower = function () {
				//console.log("entered updateTierMythicPower");
				getAttrs(["tier-mythic-power", "mythic-tier"], function (values) {
					var totalTier = 3 + 2 * (parseInt(values["mythic-tier"], 10) || 0),
						curr = parseInt(values["tier-mythic-power"], 10) || 0;
					//console.log("totalTier=" + totalTier + ", curr=" + curr);
					if (curr !== totalTier) { setAttrs({ "tier-mythic-power": totalTier }); }
				});
			},


		/************************************* DEFENSE PAGE ***********************************/

		/*handleNonFFDefenseDropdown
		 * This handles the ability dropdown for AC and CMD. (except STR to CMD, just the "DEX" modifier)
		 * If the modifier is negative, then apply it to flat footed as well.
		 * @ddField {string} = field for ability dropdown
		 * @modField {string} = mod field containing value of ddField
		 * @ffField {string} = field for correlated flat footed ability dropdown
		 * @ffModField {string} = mod field containing value of ffField (to write to if modField is negative)
		 */
			handleNonFFDefenseDropdown=function(ddField,modField,ffField,ffModField){
				console.log("at handleNonFFDefenseDropdown");
				handleDropdown(ddField,modField,function(dexmod,oldmod){
					var setter={};
					if(dexmod<0){
						setter[ffModField]=dexmod;
						setAttrs(setter);
					}else if (oldmod < 0) {
						//if it changes from negative to 0 or  positive then reset flat footed - this may result in it being called twice but meh.
						handleDropdown(ffField,ffModField);
					}
				});
			},

		/*handleDefenseDropdown
		 * All dropdowns in the defense grid: AC, flat footed AC, touch, CMD, flat footed CMD.
		 * it calls handleNonFFDefenseDropdown for the 3 non flat footed
		 * otherwise it just calles handleDropdown directly.
		 *
		 * NOTE: due to the way eventInfo.sourceAttribute is populated if the change comes from the autocalc code, the value is
		 * lower case, so you must check either BOTH the regular and all lowercase, or just change it to lower case before comparing to be sure
		 *
		 * @dropdownField {string} = fieldname of dropdown, FROM eventInfo.sourceAttribute
		 */
			handleDefenseDropdown= function(dropdownField) {
				console.log("at handleDefenseDropdown:"+ability);
				switch(dropdownField){
					case "CMD-ability1":
					case "cmd-ability1":
						handleDropdown("CMD-ability1",["CMD-STR"]);
						break;
					case "AC-ability":
					case "ac-ability":
						handleNonFFDefenseDropdown("AC-ability","AC-ability-mod","FF-ability","FF-DEX");
						break;
					case "CMD-ability2":
					case "cmd-ability2":
						handleNonFFDefenseDropdown("CMD-ability2","CMD-DEX","CMD-ability","FF-CMD-DEX");
						break;
					case "FF-ability":
					case "ff-ability":
						handleDropdown("FF-ability",["FF-DEX"]);
						break;
					case "CMD-ability":
					case "cmd-ability":
						handleDropdown("CMD-ability",["FF-CMD-DEX"]);
						break;
				}
			},



		/*updateConditionDefensePenalty
		 * Updates the AC-penalty and CMD-penalty field based on conditions
		 *only difference is CMD penalty affected by energy drain for some reason
		 */
			updateConditionDefensePenalty = function(eventInfo) {
				if (!(eventInfo && eventInfo.sourceAttribute === "condition-Drained")) {
					updateRowTotal(["AC-penalty"],0,["condition-Blinded","condition-Cowering","condition-Stunned"
						,"condition-Flat-Footed","condition-Pinned","condition-Wounds"]);
				}
				updateRowTotal(["CMD-penalty","condition-Drained"],0,["condition-Blinded","condition-Cowering","condition-Stunned"
					,"condition-Flat-Footed","condition-Pinned","condition-Wounds"]);
			},


		/* updateDefenses
		 * updates the top grid of AC, Touch AC, Flat Footed AC, CMD, Flat Footed CMD
		 * http://paizo.com/pathfinderRPG/prd/coreRulebook/combat.html#combat-maneuver-defense
		 * A creature can also add any circumstance, deflection, dodge, insight, luck, morale, profane, and sacred bonuses to AC to its CMD.
		 * Any penalties to a creature's AC also apply to its CMD
		 *
		 */
			updateDefenses = function(eventInfo) {
				getAttrs(["condition-Flat-Footed","AC-ability-mod","FF-DEX","AC-penalty","CMD-penalty","size","max-dex",
						  "AC-dodge","AC-natural","AC-deflect","AC-misc","buff_AC-total","buff_Touch-total","buff_CMD-total",
						  "CMD-DEX","FF-CMD-DEX","CMD-STR","bab","CMD-misc",
						  "AC","Touch","Flat-Footed","CMD","FF-CMD","AC-ability","AC-armor","AC-shield",
						  "condition-Blinded","condition-Pinned","condition-Stunned","condition-Cowering","condition-Drained"], function(v) {
					//console.log("AAAAAAAAAAAAt update defenses");
					//console.log(v);
					var setter={}, setAny =0,
						size= parseInt(v["size"],10)||0,
						dodge =parseInt(v["AC-dodge"],10)||0,
						deflect=parseInt(v["AC-deflect"],10)||0,
						miscAC=parseInt(v["AC-misc"],10)||0,
						condPenalty=parseInt(v["AC-penalty"],10)||0,
						buffs=parseInt(v["buff_AC-total"],10)||0,
						buffsTouch=parseInt(v["buff_Touch-total"],10)||0,
						buffsCMD=parseInt(v["buff_CMD-total"],10)||0,
						armor=parseInt(v["AC-armor"],10)||0,
						shield=parseInt(v["AC-shield"],10)||0,
						natural=parseInt(v["AC-natural"],10)||0,
						bab=parseInt(v["bab"],10)||0,
						miscCMD=parseInt(v["CMD-misc"],10)||0,
						maxDex=parseInt(v["max-dex"],10),
						ability=parseInt(v["AC-ability-mod"],10)||0,
						ffAbility=parseInt(v["FF-DEX"],10)||0,
						cmdAbility1=parseInt(v["CMD-STR"],10)||0,
						cmdAbility2=parseInt(v["CMD-DEX"],10)||0,
						cmdFFAbility2=parseInt(v["FF-CMD-DEX"],10)||0,
						cmdPenalty=(parseInt(v["CMD-penalty"],10)||0),
						blinded = (parseInt(v["condition-Blinded"],10)||0)?1:0,
						pinned = (parseInt(v["condition-Pinned"],10)||0)?1:0,
						stunned = (parseInt(v["condition-Stunned"],10)||0)?1:0,
						ffed=(parseInt(v["condition-Flat-Footed"],10)||0)?1:0,
						cowering = (parseInt(v["condition-Cowering"],10)||0)?1:0,
						loseDex=0;

					//console.log("DDDDDDDDDD updateDefenses size:"+size+", dodge:"+dodge+", misc:"+miscAC+", def:"+deflect+", cond:"+condPenalty+", buff:"+buffs+", armor:"+armor+", shield:"+shield+
					//  ", natural:"+natural+", bab:"+bab+", miscCMD:"+miscCMD+", maxDex:"+maxDex+", stunned:"+stunned+", ffed:"+ffed+", ability:"+ability+
					//  ", ffAbility:"+ffAbility+", cmdAbility1:"+cmdAbility1+",cmdAbility2:"+cmdAbility2+", cmdFFAbility2:"+cmdFFAbility2
					//  + ", blinded: "+blinded+", pinned:"+pinned +", cowering:"+cowering  );

					maxDex=isNaN(maxDex)?99:maxDex; //cannot do "||0" since 0 is valid but falsy

					if (findAbilityInString(v["AC-ability"]) === "DEX-mod" && maxDex < 99 && maxDex >= 0) {
						ability = Math.min(ability,maxDex);
						ffAbility = Math.min(ffAbility,maxDex);
					}

					//lose Dex: you lose your bonus but are not flat footed
					//Must be applied even if your bonus is not dex :
					//http://paizo.com/paizo/faq/v5748nruor1fm#v5748eaic9qdi

					//blinded: uncanny dodge does not lose dex so set to ffAbility
					if ( blinded ) {
						loseDex= 1;
						ability = ffAbility;
						cmdAbility2=cmdFFAbility2;
					}

					//Uncanny dodge still loses dex in these conditions, so set both to 0
					if (pinned||cowering|| stunned) {
						loseDex=1;
						ffAbility=Math.min(0,ffAbility);
						ability=Math.min(0,ffAbility);
						cmdFFAbility2=Math.min(0,cmdFFAbility2);
						cmdAbility2=Math.min(0,cmdFFAbility2);
						dodge=0;
					}

					var ac = 10+ armor+shield+natural+size+dodge + ability  +deflect+miscAC+condPenalty +buffs;
					var touch= 10+size+dodge+ability+deflect+miscAC+condPenalty + buffsTouch;
					var ff=10+armor+shield+natural+size+ffAbility+deflect+miscAC+condPenalty+buffs +   ( ffAbility >0?dodge:0  ) ;
					var cmd = 10+bab+cmdAbility1+cmdAbility2+ (-1*size) +dodge+deflect+miscCMD+cmdPenalty+buffsCMD ;
					var cmdFF = 10+bab+cmdAbility1+cmdFFAbility2+ (-1*size) +deflect+miscCMD+cmdPenalty+buffsCMD+( cmdFFAbility2 >0 ? dodge:0  ) ;

					//use 0 not 10 to force an update so don't need to check for NaN
					var currAC= parseInt(v["AC"],10)||0;
					var currTouch= parseInt(v["Touch"],10)||0;
					var currFF= parseInt(v["Flat-Footed"],10)||0;
					var currCMD = parseInt(v["CMD"],10)||0;
					var currCMDFF = parseInt(v["FF-CMD"],10)||0;

					if (ac !== currAC) {setter["AC"]=ac;setAny+=1;}
					if (touch !== currTouch) {setter["Touch"]=touch;setAny+=1;}
					if (ff !== currFF) {setter["Flat-Footed"]=ff;setAny+=1;}
					if (cmd !== currCMD) {setter["CMD"]=cmd;setAny+=1;}
					if (cmdFF !== currCMDFF) {setter["FF-CMD"]=cmdFF;setAny+=1;}
					if (setAny) {
						setAttrs(setter);
					}

				});
			},


		/*updateArmor
		 * updates total AC and penalty and max dex
		 * if not proficient sets attack penalty
		 * for backward compatiblity, proficiency is string and 0 is proficient, anything else non proficient
		 */
			updateArmor=function(){
				getAttrs(["shield-equipped", "shield-acbonus", "shield-max-dex", "shield-acp", "shield-spell-fail", "shield-proficiency",
						  "shield2-equipped", "shield2-acbonus", "shield2-max-dex", "shield2-acp", "shield2-spell-fail", "shield2-proficiency",
						  "armor-equipped", "armor-acbonus", "armor-max-dex", "armor-acp", "armor-spell-fail", "armor-proficiency",
						  "armor2-equipped", "armor2-acbonus", "armor2-max-dex", "armor2-acp", "armor2-spell-fail", "armor2-proficiency",
						  "acp","max-dex","AC-armor","AC-shield","spell-fail","acp-attack-mod",
						  "max-dex-source","acp-source"], function(v)    {
					//console.log(v);
					var acp=0,maxDex=99,acA=0,acS=0,sp=0,atk=0;
					var subAC,subD,subAcp,nonProf,subsp;
					var currACP,currMaxDex,currACArmor,currACShield,currSpellFail,currAtkMod;
					var maxDexDropdown=parseInt(v["max-dex-source"],10);
					var acpDropdown  = parseInt(v["acp-source"],10);
					var setAny=0, setter={};

					if (v["armor-equipped"]=="1" ) {
						subAC=parseInt(v["armor-acbonus"],10)||0;
						subD=parseInt(v["armor-max-dex"],10);subD=isNaN(subD)?99:subD; //cannot do "or 0" since 0 is valid but falsy
						subAcp=parseInt(v["armor-acp"],10)||0;
						nonProf=parseInt(v["armor-proficiency"],10)||0;//assume proficient 0 is messing with it //prof=isNaN(prof)?0:prof;//cannot do "||0" since 0 is valid but falsy
						subsp=parseInt(v["armor-spell-fail"],10)||0;
						acA+=subAC;
						maxDex = Math.min(subD,maxDex);
						acp+=subAcp;
						sp+=subsp;
						if(nonProf) {atk+=subAcp; }
						//console.log("the proficiency is " + prof + " and attack penalty: " + atk);
					}
					if (v["armor2-equipped"]=="1" ) {
						subAC=parseInt(v["armor2-acbonus"],10)||0;
						subD=parseInt(v["armor2-max-dex"],10);subD=isNaN(subD)?99:subD; //cannot do "or 0" since 0 is valid but falsy
						subAcp=parseInt(v["armor2-acp"],10)||0;
						nonProf=parseInt(v["armor2-proficiency"],10)||0;//a;prof=isNaN(prof)?1:prof;
						subsp=parseInt(v["armor2-spell-fail"],10)||0;
						acA+=subAC;
						maxDex = Math.min(subD,maxDex);
						acp+=subAcp;
						sp+=subsp;
						if(nonProf) {atk+=subAcp;}
					}
					if (v["shield-equipped"]=="1" ) {
						subAC=parseInt(v["shield-acbonus"],10)||0;
						subD=parseInt(v["shield-max-dex"],10);subD=isNaN(subD)?99:subD; //cannot do "or 0" since 0 is valid but falsy
						subAcp=parseInt(v["shield-acp"],10)||0;
						nonProf=parseInt(v["shield-proficiency"],10)||0;//a;prof=isNaN(prof)?1:prof;
						subsp=parseInt(v["shield-spell-fail"],10)||0;
						acS+=subAC;
						maxDex = Math.min(subD,maxDex);
						acp+=subAcp;
						sp+=subsp;
						if(nonProf) {atk+=subAcp;}
					}
					if (v["shield2-equipped"]=="1" ) {
						subAC=parseInt(v["shield2-acbonus"],10)||0;
						subD=parseInt(v["shield2-max-dex"],10);subD=isNaN(subD)?99:subD; //cannot do "or 0" since 0 is valid but falsy
						subAcp=parseInt(v["shield2-acp"],10)||0;
						nonProf=parseInt(v["shield2-proficiency"],10)||0;//a;prof=isNaN(prof)?1:prof;
						subsp=parseInt(v["shield2-spell-fail"],10)||0;
						acS+=subAC;
						maxDex = Math.min(subD,maxDex);
						acp+=subAcp;
						sp+=subsp;
						if(nonProf) {atk+=subAcp;}
					}
					//if not using armor and shield then use value in the dropdown
					//armor and shield are not a number
					if (!isNaN(maxDexDropdown)) {
						maxDex = maxDexDropdown;
						if (maxDex===9999) { maxDex =99;}
					}
					if (!isNaN(acpDropdown)) {
						acp = acpDropdown;
					}

					currACP=parseInt(v.acp,10)||0;
					currMaxDex=parseInt(v["max-dex"],10);//cannot do "||0" since 0 is valid but falsy

					currMaxDex=isNaN(currMaxDex)?99:currMaxDex;

					//using -1 forces update
					currACArmor=parseInt(v["AC-armor"],10)||-1;
					currACShield=parseInt(v["AC-shield"],10)||-1;
					currSpellFail=parseInt(v["spell-fail"],10)||-1;
					currAtkMod=parseInt(v["acp-attack-mod"],10)||0;

					//console.log(v);
					//console.log("curr atk mod:"+currAtkMod+", curr acp:"+currACP+", new acp:"+acp+", currMaxDex:"+currMaxDex+", new maxdex:"+maxDex);

					if (currACP!==acp){setter["acp"]=acp;setAny=1;}
					if (currMaxDex!==maxDex){setter["max-dex"]=maxDex;setAny=1;}
					if (currACArmor!==acA){setter["AC-armor"]=acA;setAny=1;}
					if (currACShield!==acS){setter["AC-shield"]=acS;setAny=1;}
					if (currSpellFail!==sp){setter["spell-fail"]=sp;setAny=1;}
					if (currAtkMod!==atk){setter["acp-attack-mod"]=atk;setAny=1;}
					if (setAny) {
						setAttrs(setter);
					}
				});
			},

		/*updateConditionsSavePenalty
		 *  applies conditions to saves.
		 */
			updateConditionsSavePenalty =function() {
				getAttrs(["condition-Fear","condition-Sickened","condition-Drained","condition-Wounds","saves-cond"],function(v){
					var fear = parseInt(v["condition-Fear"],10)||0,
						sickened = parseInt(v["condition-Sickened"],10)||0,
						drained=parseInt(v["condition-Drained"],10)||0,
						wounds=parseInt(v["condition-Wounds"],10)||0,
						currCond=parseInt(v["saves-cond"],10)||0;
					var newCond = drained - fear -sickened - wounds;
					if (currCond !== newCond) {
						setAttrs({"saves-cond":newCond});
					}
				});
			},

		/* updateSave
		 * updates the saves for a character
		 * @save = type of save: Fort, Ref, Will  (first character capitalized)
		 */
			updateSave = function(save) {
				var getFields = [save,"total-"+save,save+"-ability-mod",save+"-trait",save+"-enhance",save+"-resist",save+"-misc","saves-cond","buff_"+save+"-total"];
				updateRowTotal(getFields);
			},


		/************************************* ATTACKS PAGE ***********************************/

			/********* TOP GRID **********/
			attackGridFields={
				"melee":{"size":"size","atk":"attk-melee","buff":"buff_Melee-total","abilityMod":"melee-ability-mod","misc":"attk-melee-misc"}
				,"ranged":{"size":"size","atk":"attk-ranged","buff":"buff_Ranged-total","abilityMod":"ranged-ability-mod","misc":"attk-ranged-misc"}
				,"CMB":{"size":"CMD-size","atk":"CMB","buff":"buff_Melee-total","abilityMod":"CMB-ability-mod","misc":"attk-CMB-misc"}
			},

		/* updates notes for damage row of grid
		 * sets reminder on @{DMG-cnote} to increase the damage die if size changes.
		 * CB: DO WE REALLY NEED THIS? IT DOESN'T GET REMOVED IF THEY DO SO IT"S PRETTY USLESS
		 * Plus it's not even in the rolltable. so safe to remove :)
		 */
			updateDamageNote = function() {
				getAttrs(["size","DMG-cnote"],function(v){
					var size = (parseInt(v["size"],10)||0),
						note="";
					if (size<0){
						note="Increase damage die";
					} else if (size > 0) {
						note="Decrease damage die";
					}
					if (v["DMG-cnote"]!==note) {
						setAttrs({"DMG-cnote":note});
					}
				});
			},

		/* updateDamage - conditions and buffs
		 * calculates damage mod in top grid
		 */
			updateDamage = function() {
				updateRowTotal(["DMG-mod","buff_DMG-total"],0,["condition-Sickened"]);
			},

		/* updateConditionAttackPenalty
		 *
		 * updates the attk-penalty for attacks based on conditions (including wearing armor you are not proficient in)
		 */
			updateConditionAttackPenalty = function() {
				var adds=["attk-penalty","condition-Invisible","acp-attack-mod","condition-Drained"]
					,subtracts=["condition-Dazzled","condition-Entangled","condition-Grappled"
					,"condition-Fear","condition-Sickened","condition-Prone"
					,"condition-Wounds"];
				updateRowTotal(adds,0,subtracts);
			},

		/* updates notes for attack grid
		 */
			updateConditionAttackNote = function () {
				getAttrs(["condition-Grappled","condition-Invisible"],function(v){
					var setter={},setAny=0,gnote,cnote;
					if(v["condition-Grappled"]!="0") {
						gnote="+"+v["condition-Grappled"]+" grapple";
					}
					if(v["condition-Invisible"]!="0") {
						cnote="vs sighted, +ignore dex";
					}
					if ( !(!v["attk-CMB-cnote"] && !gnote)  && v["attk-CMB-cnote"] !== gnote  ) {
						setter["attk-CMB-cnote"]=gnote;
						setAny=1;
					}
					if ( !(!v["attk-cnote"] && !cnote)  && v["attk-cnote"] !== cnote  ) {
						setter["attk-cnote"]=cnote;
						setAny=1;
					}
					if (setAny) {
						setAttrs(setter);
					}
				});
			},


		/* updateAttack - updates one row of attack grid,
		 * Updates the attack type totals at top of attack page for one row of grid
		 *
		 * @attype = the type of attack: melee, ranged, CMB case sensitive
		 */
			updateAttack=function(attype) {
				console.log("at updateAttack:"+attype);
				var fields=[attackGridFields[attype].atk,"bab","attk-penalty"
					,attackGridFields[attype].abilityMod,attackGridFields[attype].misc
					,attackGridFields[attype].size,attackGridFields[attype].buff];
				console.log(fields);
				updateRowTotal([attackGridFields[attype].atk,"bab","attk-penalty"
								   ,attackGridFields[attype].abilityMod,attackGridFields[attype].misc
								   ,attackGridFields[attype].size,attackGridFields[attype].buff]);
			},

		/****** Attack and Damge Effect section ********/
		/* handles the attacks effects row
		 */
			updateAttackEffectTotals = function() {
				getAttrs(["attk-effect-total",
						  "attk-effect_mod_1","attk-effect_mod_1_Toggle","attk-effect_mod_2","attk-effect_mod_2_Toggle",
						  "attk-effect_mod_3","attk-effect_mod_3_Toggle","attk-effect_mod_4","attk-effect_mod_4_Toggle"],function(v){
					var attkEffectTot=((v["attk-effect_mod_1_Toggle"]=="1")?(parseInt(v["attk-effect_mod_1"],10)||0):0) +
									  ((v["attk-effect_mod_2_Toggle"]=="1")?(parseInt(v["attk-effect_mod_2"],10)||0):0) +
									  ((v["attk-effect_mod_3_Toggle"]=="1")?(parseInt(v["attk-effect_mod_3"],10)||0):0) +
									  ((v["attk-effect_mod_4_Toggle"]=="1")?(parseInt(v["attk-effect_mod_4"],10)||0):0),
						currAttk=parseInt(v["attk-effect-total"],10)||0,
						setters={};
					if (isNaN(currAttk) || currAttk !== attkEffectTot) {
						setters["attk-effect-total"]=attkEffectTot;
						setAttrs(setters);
						//short circuit
						//updateRepeatingWeaponAttacks("attk-effect-total",attkEffectTot);
					}
				});
			},

		/* handles the damage effects row (separated just to speed up calculations)
		 */
			updateDMGEffectTotals = function() {
				getAttrs(["dmg-effect-total",
						  "dmg-effect_mod_1","dmg-effect_mod_1_Toggle","dmg-effect_mod_2","dmg-effect_mod_2_Toggle",
						  "dmg-effect_mod_3","dmg-effect_mod_3_Toggle","dmg-effect_mod_4","dmg-effect_mod_4_Toggle"],function(v){
					var dmgEffectTot=((v["dmg-effect_mod_1_Toggle"]=="1")?(parseInt(v["dmg-effect_mod_1"],10)||0):0) +
									 ((v["dmg-effect_mod_2_Toggle"]=="1")?(parseInt(v["dmg-effect_mod_2"],10)||0):0) +
									 ((v["dmg-effect_mod_3_Toggle"]=="1")?(parseInt(v["dmg-effect_mod_3"],10)||0):0) +
									 ((v["dmg-effect_mod_4_Toggle"]=="1")?(parseInt(v["dmg-effect_mod_4"],10)||0):0),
						currDmg=parseInt(v["dmg-effect-total"],10)||0,
						setters={};
					if (isNaN(currDmg) || currDmg !== dmgEffectTot) {
						setters["dmg-effect-total"]=dmgEffectTot;
						setAttrs(setters);
						//short circuit
						//updateRepeatingWeaponDamages("dmg-effect-total",dmgEffectTot);
					}
				});
			},


		/***********  REPEATING WEAPON FIELDSET *********/
		/*handleRepeatingAttackDropdown
		 */
			handleRepeatingAttackDropdown = function(id,eventInfo){
				var idStr=getRepeatingIDStr(id),prefix="repeating_weapon_"+idStr;
				//console.log("TRACE:handleRepeatingAttackDropdown id:" + id+", eventInfo is");
				//console.log(eventInfo);
				//console.log("TRACE end");
				if (isBadRowId("weapon",id,true)) {
					console.log("ERROR: handleRepeatingAttackDropdown, invalid id:"+id);
					return;
				}
				handleDropdown(prefix+"attack-type",prefix+"attack-type-mod");
			},

		/* handleRepeatingDamageDropdown
		 * this is a special case of dropdown, because it contains a possible multipler Damage ability dropdown.
		 * better to split this into two
		 */
			handleRepeatingDamageDropdown=function(id) {
				var idStr=getRepeatingIDStr(id)
					,readField=id?"repeating_weapon_"+idStr+"damage-ability":"repeating_weapon_damage-ability"
					,writeField= id?readField+"-mod":"repeating_weapon_damage-ability-mod";
				if (isBadRowId("weapon",id,true)) {
					console.log("ERROR: handleRepeatingDamageDropdown, invalid id:"+id);
					return;
				}
				getAttrs([readField,writeField],function(v) {
					var ability= findAbilityInString (v[readField]),
						mult = findMultiplier(v[readField]);
					getAttrs([ability],function(v2){
						var basemod = parseInt(v2[ability],10)||0;
						var dmgmod = Math.floor(basemod * mult);
						var currentmod = parseInt( v[writeField],10)||0;
						var setter={};
						if ( dmgmod !== currentmod) {
							setter[writeField]=dmgmod;
							setAttrs(setter);
							//short circuit
							//updateRepeatingWeaponDamage(id,"damage-ability-mod",value);
						}
					});
				});
			},

		/* updateRepeatingWeaponAttack - calculates total-attack
		 * also updates attk-effect-total-copy
		 * @id {string} optional = id of row, if blank we are within the context of the row
		 * @overrideAttr {string} optional = if we are passing in a value this is the fieldname after "repeating_weapon_"
		 * @overrideValue {number} optional = if overrideAttr then this should be a number usually int but it won't check
		 */
			updateRepeatingWeaponAttack=function(id,eventInfo) {
				//is it faster to not do the idstr each time? try it with ?:
				var idStr=getRepeatingIDStr(id)
					,enhanceField=id?"repeating_weapon_"+idStr+"enhance":"repeating_weapon_enhance"
					,mwkField=id?"repeating_weapon_"+idStr+"masterwork":"repeating_weapon_masterwork"
					,attkTypeModField=id?"repeating_weapon_"+idStr+"attack-type-mod":"repeating_weapon_attack-type-mod"
					,attkEffectField="attk-effect-total"
					,attkEffectCopyField=id?"repeating_weapon_"+idStr+"attk-effect-total-copy":"repeating_weapon_attk-effect-total-copy"
					,profField=id?"repeating_weapon_"+idStr+"proficiency":"repeating_weapon_proficiency"
					,attkMacroModField=id?"repeating_weapon_"+idStr+"attack-mod":"repeating_weapon_attack-mod"
					,totalAttackField=id?"repeating_weapon_"+idStr+"total-attack":"repeating_weapon_total-attack"
					;

				if (isBadRowId("weapon",id,true)) {
					console.log("ERROR: updateRepeatingWeaponAttack, invalid id:"+id);
					return;
				}


				getAttrs([enhanceField,mwkField,attkTypeModField,attkEffectField,attkEffectCopyField,profField,attkMacroModField,totalAttackField],function(v){
					var enhance=(parseInt(v[enhanceField],10)||0)
						,masterwork=(parseInt(v[mwkField],10)||0)
						,attackEffectTotal=(parseInt(v[attkEffectField],10)||0)
						,currAttackEffectTotal=(parseInt(v[attkEffectCopyField],10)||0)
						,attkTypeMod=(parseInt(v[attkTypeModField],10)||0)
						,prof=(parseInt(v[profField],10)||0)
						,attkMacroMod=(parseInt(v[attkMacroModField],10)||0)
						,currTotalAttack=(parseInt(v[totalAttackField],10)||0)
						,newTotalAttack=0
						,setter={},setAny=0;

					newTotalAttack = Math.max(enhance,masterwork)+attackEffectTotal + attkTypeMod +prof+attkMacroMod;
					if (newTotalAttack !== currTotalAttack || isNaN(currTotalAttack)) {
						setter[totalAttackField]=newTotalAttack;
						setAny=1;
					}
					if (currAttackEffectTotal != attackEffectTotal) {
						setter[attkEffectCopyField]=attackEffectTotal;
						setAny=1;
					}
					if (setAny) {setAttrs(setter);}
				});
			},

		/* loops trough all rows and calls updateRepeatingWeaponAttack */
			updateRepeatingWeaponAttacks = function(eventInfo) {
				getSectionIDs("repeating_weapon",function(ids){
					ids.forEach(function(id,index){
						if (isBadRowId("weapon",id,false)) {
							console.log("ERROR: updateRepeatingWeaponAttacks, invalid id:"+id+", index:" +index);
							return;
						}
						updateRepeatingWeaponAttack(id,eventInfo);
					});
				});
			},

		/* updateRepeatingWeaponDamage - updates total-damage
		 * also updates  dmg-effect-total-copy and DMG-mod-copy
		 */
			updateRepeatingWeaponDamage=function(id,eventInfo) {
				var idStr=getRepeatingIDStr(id),
					maxname="repeating_weapon_"+idStr+"damage-ability-max",
					modname="repeating_weapon_"+idStr+"damage-ability-mod",
					dmgEffectCopy="repeating_weapon_"+idStr+"dmg-effect-total-copy",
					dmgModCopy="repeating_weapon_"+idStr+"DMG-mod-copy";
				if (isBadRowId("weapon",id,true)) {
					console.log("ERROR: updateRepeatingWeaponDamage, invalid id:"+id);
					return;
				}
				getAttrs([maxname,modname,dmgEffectCopy,dmgModCopy,"dmg-effect-total","DMG-mod"],function(v){
					var dmgFields, setter={}, setAny=0,
						max=parseInt(v[maxname],10)||0,
						mod=parseInt(v[modname],10)||0,
						dmgEffect=(parseInt(v["dmg-effect-total"],10)||0),
						dmgMod=(parseInt(v["DMG-mod"],10)||0),
						currDmgEffect=(parseInt(v[dmgEffectCopy],10)||0),
						currDmgMod=(parseInt(v[dmgModCopy],10)||0);
					if (max<=0) {max=9999;}
					mod =Math.min(max,mod) + dmgEffect + dmgMod;

					dmgFields=["repeating_weapon_"+idStr+"total-damage","repeating_weapon_"+idStr+"enhance",
							   "repeating_weapon_"+idStr+"damage-mod"];
					updateRowTotal(dmgFields,mod);
					if (dmgMod !== currDmgMod) {
						setter[dmgModCopy]=dmgMod;
						setAny=1;
					}
					if (dmgEffect !== currDmgEffect){
						setter[dmgEffectCopy]=dmgEffect;
						setAny=1;
					}
					if (setAny) {setAttrs(setter);}
				});
			},

		/*  loops trough all rows and calls updateRepeatingWeaponDamage */
			updateRepeatingWeaponDamages = function(fieldUpdated,value) {
				getSectionIDs("repeating_weapon",function(ids){
					ids.forEach(function(id,index){
						if (isBadRowId("weapon",id,false)) {
							console.log("ERROR: updateRepeatingWeaponDamages, invalid id:"+id+", index:"+ index);
							return;
						}
						updateRepeatingWeaponDamage(id);
						//updateRepeatingWeaponDamage(id,fieldUpdated,value);
					});
				});
			},


		/******************************************* SKILLS PAGE ********************************/

		/* updateMaxSkills Calculates maximum skill ranks. Minimum 1 per level.
		 *  divides by 2 if using consolidated skills
		 */
			updateMaxSkills = function() {
				getAttrs(["total-skill","total-fcskill","INT-mod","level","Max-Skill-Ranks-mod","Max-Skill-Ranks","Max-Skill-Ranks-Misc2",
						  "unchained_skills-show","BG-Skill-Use"],function(v){
					var intMod = parseInt(v["INT-mod"],10)||0,
						classSkills=parseInt(v["total-skill"],10)||0,
						otherMod=parseInt(v["Max-Skill-Ranks-Misc2"],10)||0,
						level=parseInt(v.level,10)||0,
						fcSkills=parseInt(v["total-fcskill"],10)||0,
						extra=parseInt(v["Max-Skill-Ranks-mod"],10)||0,
						currSkills=parseInt(v["Max-Skill-Ranks"],10)||0,
						totIntMod, classPlusInt,totAllSkills,
						setter={},setAny=0;
					totIntMod=intMod * level;
					classPlusInt = classSkills + totIntMod;
					if (v["unchained_skills-show"]=="1" && (!v["BG-Skill-Use"] || v["BG-Skill-Use"]=="0")) {
						classPlusInt = Math.floor(classPlusInt / 2);
					}
					if (classPlusInt < level ) {classPlusInt = level;}
					totAllSkills = classPlusInt+fcSkills+extra+otherMod;
					if (currSkills !== totAllSkills) { setter["Max-Skill-Ranks"]=totAllSkills;setAny++;}
					if (setAny) {setAttrs(setter);}
				});
			},

			acpSkills = {
				"Acrobatics": 1, "Climb": 1, "Disable-Device": 1, "Escape-Artist": 1, "Fly": 1, "Ride": 1, "Sleight-of-Hand": 1, "Stealth": 1, "Swim": 1,
				"CS-Acrobatics":1,"CS-Athletics":1,"CS-Finesse":1,"CS-Stealth":1
			},
			sizeSkills = {
				"Fly": 1, "Stealth": 2
			},

		/* updates one  skill row
		 * @skill {string} skill to update, must have same capitalization as on html
		 */
			updateSkill = function(skill) {
				var csNm=skill+"-cs",
					ranksNm=skill+"-ranks",
					classNm=skill+"-class",
					abNm=skill+"-ability",
					modNm=skill+"-ability-mod",
					racialNm=skill+"-racial",
					featNm=skill+"-feat",
					itemNm=skill+"-item",
					miscNm=skill+"-misc",
					rtNm=skill+"-ReqTrain";
				getAttrs([skill,csNm,ranksNm,classNm,abNm,modNm,racialNm,featNm,itemNm,miscNm,rtNm,
						  "size_skill","size_skill_double","acp","checks-cond","Phys-skills-cond","Perception-cond"],function(v){

					var skillSize=0,adj,skillTot=0,setter={},mods="",setAny=0,cond=0,
						cs=parseInt(v[csNm],10)||0,
						currSkill=parseInt(v[skill],10),//no default
						ranks = parseInt(v[ranksNm],10)||0,
						rt = parseInt(v[rtNm],10)||0,
						allCond = parseInt(v["checks-cond"],10)||0,
						abilityName=findAbilityInString(v[abNm]),
						physCond = 0,perCond=0;

					if (ranks && cs ) {
						skillTot+=3;
						mods="3/";
					} else {
						mods="0/";
					}
					if (acpSkills[skill]) {
						adj = parseInt(v["acp"],10)||0;
						skillTot += adj;
						mods+=adj+"/";
					} else {
						mods+="0/";
					}
					skillSize=sizeSkills[skill];
					if (skillSize) {
						if (skillSize===1) {
							adj= parseInt(v["size_skill"],10)||0;
							skillTot +=adj;
							mods+=adj+"/";
						} else if (skillSize===2) {
							adj=parseInt(v["size_skill_double"],10)||0;
							skillTot += adj;
							mods+=adj+"/";
						}
					} else {
						mods+="0/";
					}
					if (abilityName==="DEX-mod" || abilityName==="STR-mod"){
						physCond= parseInt(v["Phys-skills-cond"],10)||0;
					}
					if (skill==="Perception" || skill==="CS-Perception"){
						perCond = parseInt(v["Perception-cond"],10)||0;
					}
					cond = allCond+physCond+perCond;
					mods+= cond;

					skillTot += ranks  + cond + (parseInt(v[modNm],10)||0) + (parseInt(v[racialNm],10)||0) +
								(parseInt(v[featNm],10)||0) + (parseInt(v[itemNm],10)||0) + (parseInt(v[miscNm],10)||0);

					if ( currSkill !== skillTot) {
						setter[skill]=skillTot;
						setAny++;
					}


					if ( (v[classNm]||"0/0/0/0")!== mods) {
						setter[classNm]=mods;
						setAny++;
					}
					if (setAny) {setAttrs(setter);}
				});
			},


		/*******************************************  SPELL PAGE ***********************/

		/********  Spell Classes top section ****/
		/*  findSpellClass - determines spell class from class dropdown at top of page
		 */
			findSpellClass=function(selected) {
				if (!selected) {return 0;} //it is undefined if it is default set to the first one
				if (selected.indexOf("0")>=0) {return 0;}
				if (selected.indexOf("1")>=0) {return 1;}
				if (selected.indexOf("2")>=0) {return 2;}
				return 0;
			},

		/* ifSpellClassExists - is a spell level filled in or not.
		 * if spellclass-classidx-level is greater than 0 then call the callback
		 * only check level, not level-total, since modifiers could cause it to drop
		 */
			ifSpellClassExists = function(classidx,callback) {
				getAttrs(["spellclass-"+classidx+"-level"],function(v){
					if ((parseInt(v["spellclass-"+classidx+"-level"],10)||0) > 0) {
						callback();
					}
				});
			},

		/* updateSpellClassLevel - when the class level is updated on the CLASS page, sync the level on the SPELL page
		 * but not vice versa
		 * @classidx {number} = the row on the CLASS GRID starting with 0
		 */
			updateSpellClassLevel = function(classidx) {
				var spellclassdropdown0="spellclass-0", spellclassdropdown1="spellclass-1", spellclassdropdown2="spellclass-2";
				getAttrs([spellclassdropdown0,spellclassdropdown1,spellclassdropdown2],function(va) {
					var spellclassidx,spellclasslevel,classlevel;
					if (parseInt(va[spellclassdropdown0],10)===classidx) {spellclassidx=0;}
					else if(parseInt(va[spellclassdropdown1],10)===classidx) {spellclassidx=1;}
					else if(parseInt(va[spellclassdropdown2],10)===classidx) {spellclassidx=2;}
					else { return; }
					spellclasslevel="spellclass-"+spellclassidx+"-level";
					classlevel="class-"+classidx+"-level";
					getAttrs([spellclasslevel,classlevel],function(v){
						var setter={},cll=parseInt(v[classlevel],10)||0
							,spl=parseInt(v[spellclasslevel],10);
						if (cll !== spl|| isNaN(spl)) {
							setter[spellclasslevel]=cll;
							setAttrs(setter);
						}
					});
				});
			},

		/* handleSpellClassDropdown - sets spell class name and level from dropdown
		 * When the spell class dropdown is changed to one of the 5 classees, update the spellclass name and level.
		 */
			handleSpellClassDropdown = function(spellclassidx) {
				//console.log("SSSSSSSSSSSSSSSSSSSSS handleSpellClassDropdown, level is :"+spellclassidx);
				var spellclassdropdown="spellclass-"+spellclassidx;
				var spellclasslevel="spellclass-"+spellclassidx+"-level";
				getAttrs([spellclassdropdown,spellclasslevel],function(va){
					//console.log(va);
					var classidx=(parseInt(va[spellclassdropdown],10))
						,sl=parseInt(va[spellclasslevel],10)
						,spellclassname,classname,classlevel;
					if (isNaN(classidx) || !va[spellclassdropdown] || va[spellclassdropdown] == "-1") {
						return;
					}
					spellclassname="spellclass-"+spellclassidx+"-name";
					classname="class-"+classidx+"-name";
					classlevel="class-"+classidx+"-level";
					//console.log("classname:"+classname+", level:"+ classlevel+", spellname:"+spellclassname);
					getAttrs([classname,classlevel,spellclassname],function(v){
						var setter={},setAny=0,cl=parseInt(v[classlevel],10)||0;
						//console.log("made it into get attrs");
						//console.log(v);
						if ( v[classname] && v[classname] !== v[spellclassname] ) {
							setter[spellclassname]=v[classname];
							setAny=1;
						}
						if(sl !== cl || isNaN(sl) ) {
							setter[spellclasslevel]=cl;
							setAny=1;
						}
						//console.log("SETTING");
						//console.log(setter);
						if (setAny) { setAttrs(setter);}
					});

				});
			},

		/*updateCasterLevel
		 */
			updateCasterLevel=function(classidx) {
				updateRowTotal(["spellclass-"+classidx+"-level-total","spellclass-"+classidx+"-level","spellclass-"+classidx+"-level-misc","buff_CasterLevel-total","CasterLevel-Penalty"]);
			},

		/*  updateCastingPenaltyNote - for condition deafened update penalty note on DEFENSE PAGE
		 */
			updateCastingPenaltyNote = function(){
				ifSpellClassExists(0,function(){
					getAttrs(["condition-Deafened","SpellFailureNote"],function(v){
						var setter={},notestr="";
						if (v["condition-Deafened"]!="0"){
							notestr="20% spell failure when casting spells with Verbal components";
						}
						setAttrs({"SpellFailureNote":notestr});
					});
				});
			},

		/* updateConcentration - updates concentration for spellclass
		 * @classidx {number} = 0,1,2 the spellclass
		 */
			updateConcentration = function(classidx) {
				updateRowTotal(["Concentration-"+classidx,"spellclass-"+classidx+"-level-total","Concentration-"+classidx+"-mod","Concentration-"+classidx+"-misc"]);
			},

		/* handleConcentrationAbilityDropdown - updates spell related ability modifier for spell class
		 * @classidx {number} = 0,1,2 the spellclass
		 */
			handleConcentrationAbilityDropdown= function(classidx) {
				handleDropdown("Concentration-"+classidx+"-ability",["Concentration-"+classidx+"-mod"]);
			},

		/*updateSpellPenetration
		 */
			updateSpellPenetration=function(classidx) {
				updateRowTotal(["spellclass-"+classidx+"-SP-mod","spellclass-"+classidx+"-SP_misc","spellclass-"+classidx+"-level-total"]);
			},


		/*** SPELLS PER DAY section ******/

		/* updateSaveDCs - update save DCs on left  column of Spells Per Day grid
		 * @classidx {number} = 0,1,2 the spellclass
		 */
			updateSaveDCs = function(classidx) {
				//console.log("DDDDDDCCCCCC at updateSaveDCs");
				getAttrs(["spellclass-"+classidx+"-level"],function(va){
					var fields,classlevel;
					classlevel=parseInt(va["spellclass-"+classidx+"-level"],10);
					//console.log("the spellclass level is "+classlevel);
					if(isNaN(classlevel) || classlevel < 1) {
						return;
					}
					fields=["Concentration-"+classidx+"-mod",
							"spellclass-"+classidx+"-level-0-savedc",
							"spellclass-"+classidx+"-level-1-savedc",
							"spellclass-"+classidx+"-level-2-savedc",
							"spellclass-"+classidx+"-level-3-savedc",
							"spellclass-"+classidx+"-level-4-savedc",
							"spellclass-"+classidx+"-level-5-savedc",
							"spellclass-"+classidx+"-level-6-savedc",
							"spellclass-"+classidx+"-level-7-savedc",
							"spellclass-"+classidx+"-level-8-savedc",
							"spellclass-"+classidx+"-level-9-savedc"];
					//console.log(fields);

					getAttrs(fields,function(v){
						//console.log(v);
						var mod,fieldname,dcBeforeLvl,currDC=0,newDC=0,setter={},setAny=0,i;
						mod=parseInt(v["Concentration-"+classidx+"-mod"],10)||0;
						dcBeforeLvl=10+mod;

						fieldname="spellclass-"+classidx+"-level-0-savedc";
						//console.log("the base save dc is: "+dcBeforeLvl+" see if it matches " + fieldname);
						currDC=parseInt(v[fieldname],10);
						//console.log("the old base dc is : "+ currDC);
						//if 0 is different then rest are different. if 0 is same, rest are same.
						if (isNaN(currDC) || currDC !== dcBeforeLvl) {
							setter[fieldname]=dcBeforeLvl;
							for( i=1;i<10;i++) {
								//console.log("we are at "+i);
								fieldname="spellclass-"+classidx+"-level-"+i+"-savedc";
								currDC=parseInt(v[fieldname],10);
								newDC = dcBeforeLvl+i;
								//console.log(" field "+fieldname+ " is "+currDC+" but new is "+newDC);
								if (isNaN(currDC) || currDC !== newDC) {
									setter[fieldname]=newDC;
								}
								//console.log("at "+i+", the field to find is "+fieldname);
							}
							setAttrs(setter);
						}
					});

				});
			},


		/* updateBonusSpells
		 * updates Bonus Spells for the class
		 * It looks at the attribute, not the attribute mod. So it does not change with ability damage or penalties.
		 */
			updateBonusSpells=function(classidx) {
				getAttrs(["Concentration-"+classidx+"-ability"],function(va){
					var ability=findAbilityInString(va["Concentration-"+classidx+"-ability"]).replace("-mod","");
					//eliminate the modifier, we just want @{INT} not @{INT-mod}
					getAttrs([ability],function(v){
						var spellAbility=parseInt(v[ability],10)||0
							,fields={},bonusSpells,bonusName,i,newRaw;
						if (spellAbility >= 12) {
							for(i=1;i<10;i++) {
								newRaw=Math.max(0,spellAbility-10-(2*(i-1)));
								bonusSpells=Math.ceil(newRaw/8);
								bonusName="spellclass-"+classidx+"-level-"+i+"-bonus";
								fields[bonusName]=bonusSpells;
							}
						} else {
							for(i=1;i<10;i++) {
								bonusName="spellclass-"+classidx+"-level-"+i+"-bonus";
								fields[bonusName]=0;
							}
						}
						setAttrs(fields);
					});
				});
			},

		/* updateMaxSpellsPerDay
		 */
			updateMaxSpellsPerDay = function(classidx,spelllvl) {
				var fields=["spellclass-"+classidx+"-level-"+spelllvl+"-spells-per-day_max"
					,"spellclass-"+classidx+"-level-"+spelllvl+"-class"
					,"spellclass-"+classidx+"-level-"+spelllvl+"-bonus"
					,"spellclass-"+classidx+"-level-"+spelllvl+"-misc"];
				updateRowTotal(fields);
			},

		/******** SPELLS REPEATING SECTION ******/

		/* updateSpell
		 * For a row in lvl-x-spells repeating sections, updates:
		 *  cast_def_dc, cast_def, savedc, casterlevel, Concentration,spellPen
		 * @section {string} =  lvl-0-spells , lvl-1-spells, etc
		 * @id {string} optional = id of row, can be omitted if we're already in row context
		 */
			updateSpell=function(section,id,eventInfo) {
				var idStr=getRepeatingIDStr(id)
					,prefix="repeating_"+section+"_"+idStr
					,spellclassField= prefix+"spellclass"
					,spellLevelField=prefix+"spell_level";
				console.log("At updateSpell prefix: "+prefix+", classfield="+spellclassField);
				TAS.log(eventInfo);
				getAttrs([spellLevelField,spellclassField],function(va){
					var  currSpellLevel=parseInt(va[spellLevelField],10)
						,spellLevel=isNaN(currSpellLevel)?parseInt(section.substring(4),10):currSpellLevel
						,classNum= findSpellClass(va[spellclassField])||0
						,hasClass=  (isNaN(classNum) || classNum < 0)?false:true
						,spellDefCastDCField=prefix+"cast_def_dc"
						,spellDefConField=prefix+"cast_def-mod"
						,spellDCField=prefix+"savedc"
						,spellDCUserField=prefix+"DC_misc"
						,spellCLField=prefix+"casterlevel"
						,spellCLUserField=prefix+"CL_misc"
						,spellConField=prefix+"Concentration-mod"
						,spellConUserField=prefix+"Concentration_misc"
						,spellSpellPenField=prefix+"SP-mod"
						,spellSpellPenUserField=prefix+"SP_misc"
						,classCLField="spellclass-"+classNum+"-level-total"
						,classDCField="spellclass-"+classNum+"-level-"+spellLevel+"-savedc"
						,classConField = "Concentration-"+classNum
						,classDefConField = "Concentration-"+classNum+"-def"
						,classSpellPenField = "spellclass-"+classNum+"-SP-mod";
					TAS.log(va);

					getAttrs([spellDCField,spellDCUserField,spellCLField,spellCLUserField
								 ,spellConField,spellConUserField,spellDefConField,spellDefCastDCField
								 ,spellSpellPenField,spellSpellPenUserField,classDCField,classCLField
								 ,classConField,classDefConField,classSpellPenField]	,function(v){
						var newDC,newCL,newCon,newDefCon,newSpellPen
							,currDC=parseInt(v[spellDCField],10)
							,currCL=parseInt(v[spellCLField],10)
							,currCon=parseInt(v[spellConField],10)
							,currDefCon=parseInt(v[spellDefConField],10)
							,currdefDC=parseInt(v[spellDefCastDCField],10)
							,currSpellPen=parseInt(v[spellSpellPenField],10)
							,classDC=(parseInt(v[classDCField],10)||0)
							,classCL=(parseInt(v[classCLField],10)||0)
							,classCon=(parseInt(v[classConField],10)||0)
							,classDefConMod=(parseInt(v[classDefConField],10)||0)
							,classSpellPen=(parseInt(v[classSpellPenField],10)||0)
							,defDC = 15+(spellLevel*2)
							,setter={},setAny=0
							,classLevelDelta=0
							;
						TAS.log(v);
						if (defDC !== currdefDC || isNaN(currdefDC)) {
							setter[spellDefCastDCField]=defDC;
							setAny=1;
						}
						//Caster level check mod
						newCL = (parseInt(v[spellCLUserField],10)||0) + classCL;
						if (newCL !== currCL || isNaN(currCL)) {
							setter[spellCLField]=newCL;
							setAny=1;
						}
						classLevelDelta= newCL - classCL;
						//DC to save
						newDC=   (parseInt(v[spellDCUserField],10)||0) + classDC;
						if (newDC !== currDC || isNaN(currDC)) {
							setter[spellDCField]=newDC;
							setAny=1;
						}

						//Concentration check mod
						newCon = (parseInt(v[spellConUserField],10)||0) + classCon + classLevelDelta;
						if (newCon !== currCon || isNaN(currCon)) {
							setter[spellConField]=newCon;
							setAny=1;
						}
						//concentration bonus when defensive casting
						//no need to add class level delta, since it's built into newCon
						newDefCon =  newCon+classDefConMod ;
						if (newDefCon !== currDefCon || isNaN(currDefCon)) {
							setter[spellDefConField]=newDefCon;
							setAny=1;
						}

						//Spell penetration check mod
						newSpellPen = classSpellPen +  (parseInt(v[spellSpellPenUserField],10)||0) +classLevelDelta ;
						if (newSpellPen !== currSpellPen || isNaN(currSpellPen)) {
							setter[spellSpellPenField]=newSpellPen;
							setAny=1;
						}

						if (currSpellLevel !== spellLevel || isNaN(currSpellLevel)) {
							setter[spellLevelField]=spellLevel;
							setAny=1;
						}

						if (setAny) {
							setAttrs(setter);
						}

					});

				});

			},

		/*updateSpells
		 * calls updateSpell for every row of the given spell section
		 * can call with either "lvl-0-spells", or with 0
		 */
			updateSpells = function (section){
				var spelllvl = parseInt(section,10);
				if (!isNaN(spelllvl)) {
					section = "lvl-"+spelllvl+"-spells";
				}
				getSectionIDs("repeating_"+section,function(ids){
					ids.forEach(function(id,index){
						updateSpell(section,id);
					});
				});
			},



		/************************************************ RECALCULATE  PAGES  to account for updates  *****************/

		/*recalculateSpell sets spell level because it is now modifiable
		 * ensures that spell_level is set on each spell repeating row, since it was changed to an editable field
		 * @section the spell level "lvl-0-spells", "lvl-1-spells", .... , "lvl-9-spells"
		 */
			recalculateSpell = function (section,id){
				var  spellLevelField="repeating_"+section+"_"+id+"_spell_level",
					classLevelField="repeating_"+section+"_"+id+"_spellclass",
					dcModField="repeating_"+section+"_"+id+"_DC-mod",
					dcMiscField="repeating_"+section+"_"+id+"_DC_misc"
					;
				getAttrs([spellLevelField,classLevelField,dcModField,dcMiscField],function(v){
					var setter={},currLevel=parseInt(v[spellLevelField],10),
						currDCMod=parseInt(v[dcModField],10),
						currDCMisc=parseInt(v[dcMiscField],10),
						spellLevel =parseInt(section.substring(4),10);

					if (isNaN(currLevel) && ! isNaN(spellLevel)) {
						setter[spellLevelField]=spellLevel;
						setAttrs(setter);
					}
				});
			},

		/*recalculateSpellLevels - for all spell repeating sections of a level 0,..,9 calls recalculateSpell and updateSpell
		 * @spellLevel {int} = the DEFAULT spell level of the repeating section, from 0 to 9
		 */
			recalculateSpellLevels = function (spellLevel){
				var section="lvl-"+spellLevel+"-spells";
				getSectionIDs("repeating_"+section,function(ids){
					ids.forEach(function(id,index){
						recalculateSpell(section,id);
					});
				});
				getSectionIDs("repeating_"+section,function(ids){
					ids.forEach(function(id,index){
						updateSpell(section,id);
					});
				});
			},

		/*recalculateSpellLevelsAll calls recalculateSpellLevels for each spell levels 0-9 */
			recalculateSpellLevelsAll = function() {
				var i=0;
				for (i=0;i<10;i++) {
					recalculateSpellLevels(i);
				}
			},

		/* recalculateRepeatingWeapons-  recalculates all repeating weapons rows.   */
			recalculateRepeatingWeapons = function() {
				getAttrs(["attk-effect-total","dmg-effect-total","DMG-mod"],function(v){
					getSectionIDs("repeating_weapon",function(ids){
						ids.forEach(function(id,index){
							var readField= "repeating_weapon_" +id+"_" ;
							if (isBadRowId("weapon",id,false)) {
								console.log("ERROR: recalculateRepeatingWeapons, invalid id:"+id+", index:" +index);
								return;
							}
							//console.log("TRACE: recalculateRepeatingWeapons id="+id);
							SWUtils.setAttributeNumber(readField+"attk-effect-total-copy",(parseInt(v["attk-effect-total"],10)||0));
							SWUtils.setAttributeNumber(readField+"dmg-effect-total-copy",(parseInt(v["dmg-effect-total"],10)||0));
							SWUtils.setAttributeNumber(readField+"DMG-mod-copy",(parseInt(v["DMG-mod"],10)||0));
							SWUtils.evaluateAndSetNumber(readField+"damage",readField+"damage-mod");
							SWUtils.evaluateAndSetNumber(readField+"attack",readField+"attack-mod");
							handleDropdown(readField+"attack-type",readField+"attack-type-mod");
							handleRepeatingDamageDropdown(id);
							updateRepeatingWeaponAttack(id);
							updateRepeatingWeaponDamage(id);
						});
					});
				});
			},

		/* recalculateRepeatingMaxUsed - Parses the macro text "...max-calculation" in the repeating items
		 * (such as class-abilities, feats, traits, racial-traits)
		 * and sets the used|max value.
		 * Loops through all rows in the given repeating section.
		 * @section {string}= the name of the section after the word "repeating_"
		 */
			recalculateRepeatingMaxUsed=function(section){
				getSectionIDs("repeating_"+section,function(ids){
					ids.forEach(function(id,index){
						var prefix="repeating_"+section +"_" +id;
						if (isBadRowId(section,id,false)) {
							console.log("ERROR: recalculateRepeatingMaxUsed, invalid id:"+id+", index:" +index);
							return;
						}
						SWUtils.evaluateAndSetNumber(prefix+"_max-calculation",prefix+"_used_max");
					});
				});
			},




		/* recalculateSkills - updates ALL skills  - calls handleDropdown for ability then updateSkill
		 * CB: REFACTOR: put updateSkill in the callback so it happens in order */
			recalculateSkills = function() {
				handleDropdown("Acrobatics-ability",["Acrobatics-ability-mod"]);
				handleDropdown("Artistry-ability",["Artistry-ability-mod"]);
				handleDropdown("Appraise-ability",["Appraise-ability-mod"]);
				handleDropdown("Bluff-ability",["Bluff-ability-mod"]);
				handleDropdown("Climb-ability",["Climb-ability-mod"]);
				handleDropdown("Craft-ability",["Craft-ability-mod"]);
				handleDropdown("Craft2-ability",["Craft2-ability-mod"]);
				handleDropdown("Craft3-ability",["Craft3-ability-mod"]);
				handleDropdown("Diplomacy-ability",["Diplomacy-ability-mod"]);
				handleDropdown("Disable-Device-ability",["Disable-Device-ability-mod"]);
				handleDropdown("Disguise-ability",["Disguise-ability-mod"]);
				handleDropdown("Escape-Artist-ability",["Escape-Artist-ability-mod"]);
				handleDropdown("Fly-ability",["Fly-ability-mod"]);
				handleDropdown("Handle-Animal-ability",["Handle-Animal-ability-mod"]);
				handleDropdown("Heal-ability",["Heal-ability-mod"]);
				handleDropdown("Intimidate-ability",["Intimidate-ability-mod"]);
				handleDropdown("Linguistics-ability",["Linguistics-ability-mod"]);
				handleDropdown("Lore-ability",["Lore-ability-mod"]);
				handleDropdown("Knowledge-Arcana-ability",["Knowledge-Arcana-ability-mod"]);
				handleDropdown("Knowledge-Dungeoneering-ability",["Knowledge-Dungeoneering-ability-mod"]);
				handleDropdown("Knowledge-Engineering-ability",["Knowledge-Engineering-ability-mod"]);
				handleDropdown("Knowledge-Geography-ability",["Knowledge-Geography-ability-mod"]);
				handleDropdown("Knowledge-History-ability",["Knowledge-History-ability-mod"]);
				handleDropdown("Knowledge-Local-ability",["Knowledge-Local-ability-mod"]);
				handleDropdown("Knowledge-Nature-ability",["Knowledge-Nature-ability-mod"]);
				handleDropdown("Knowledge-Nobility-ability",["Knowledge-Nobility-ability-mod"]);
				handleDropdown("Knowledge-Planes-ability",["Knowledge-Planes-ability-mod"]);
				handleDropdown("Knowledge-Religion-ability",["Knowledge-Religion-ability-mod"]);
				handleDropdown("Perception-ability",["Perception-ability-mod"]);
				handleDropdown("Perform-ability",["Perform-ability-mod"]);
				handleDropdown("Perform2-ability",["Perform2-ability-mod"]);
				handleDropdown("Perform3-ability",["Perform3-ability-mod"]);
				handleDropdown("Profession-ability",["Profession-ability-mod"]);
				handleDropdown("Profession2-ability",["Profession2-ability-mod"]);
				handleDropdown("Profession3-ability",["Profession3-ability-mod"]);
				handleDropdown("Ride-ability",["Ride-ability-mod"]);
				handleDropdown("Sense-Motive-ability",["Sense-Motive-ability-mod"]);
				handleDropdown("Sleight-of-Hand-ability",["Sleight-of-Hand-ability-mod"]);
				handleDropdown("Spellcraft-ability",["Spellcraft-ability-mod"]);
				handleDropdown("Stealth-ability",["Stealth-ability-mod"]);
				handleDropdown("Survival-ability",["Survival-ability-mod"]);
				handleDropdown("Swim-ability",["Swim-ability-mod"]);
				handleDropdown("Use-Magic-Device-ability",["Use-Magic-Device-ability-mod"]);
				handleDropdown("Misc-Skill-0-ability",["Misc-Skill-0-ability-mod"]);
				handleDropdown("Misc-Skill-1-ability",["Misc-Skill-1-ability-mod"]);
				handleDropdown("Misc-Skill-2-ability",["Misc-Skill-2-ability-mod"]);
				handleDropdown("Misc-Skill-3-ability",["Misc-Skill-3-ability-mod"]);
				handleDropdown("Misc-Skill-4-ability",["Misc-Skill-4-ability-mod"]);
				handleDropdown("Misc-Skill-5-ability",["Misc-Skill-5-ability-mod"]);
				handleDropdown("CS-Acrobatics-ability",["CS-Acrobatics-ability-mod"]);
				handleDropdown("CS-Athletics-ability",["CS-Athletics-ability-mod"]);
				handleDropdown("CS-Finesse-ability",["CS-Finesse-ability-mod"]);
				handleDropdown("CS-Influence-ability",["CS-Influence-ability-mod"]);
				handleDropdown("CS-Nature-ability",["CS-Nature-ability-mod"]);
				handleDropdown("CS-Perception-ability",["CS-Perception-ability-mod"]);
				handleDropdown("CS-Performance-ability",["CS-Performance-ability-mod"]);
				handleDropdown("CS-Religion-ability",["CS-Religion-ability-mod"]);
				handleDropdown("CS-Society-ability",["CS-Society-ability-mod"]);
				handleDropdown("CS-Spellcraft-ability",["CS-Spellcraft-ability-mod"]);
				handleDropdown("CS-Stealth-ability",["CS-Stealth-ability-mod"]);
				handleDropdown("CS-Survival-ability",["CS-Survival-ability-mod"]);

				updateSkill("Acrobatics");
				updateSkill("Appraise");
				updateSkill("Bluff");
				updateSkill("Climb");
				updateSkill("Craft");
				updateSkill("Craft2");
				updateSkill("Craft3");
				updateSkill("Diplomacy");
				updateSkill("Disable-Device");
				updateSkill("Disguise");
				updateSkill("Escape-Artist");
				updateSkill("Fly");
				updateSkill("Handle-Animal");
				updateSkill("Heal");
				updateSkill("Intimidate");
				updateSkill("Linguistics");
				updateSkill("Knowledge-Arcana");
				updateSkill("Knowledge-Dungeoneering");
				updateSkill("Knowledge-Engineering");
				updateSkill("Knowledge-Geography");
				updateSkill("Knowledge-History");
				updateSkill("Knowledge-Local");
				updateSkill("Knowledge-Nature");
				updateSkill("Knowledge-Nobility");
				updateSkill("Knowledge-Planes");
				updateSkill("Knowledge-Religion");
				updateSkill("Perception");
				updateSkill("Perform");
				updateSkill("Perform2");
				updateSkill("Perform3");
				updateSkill("Profession");
				updateSkill("Profession2");
				updateSkill("Profession3");
				updateSkill("Ride");
				updateSkill("Sense-Motive");
				updateSkill("Sleight-of-Hand");
				updateSkill("Spellcraft");
				updateSkill("Stealth");
				updateSkill("Survival");
				updateSkill("Swim");
				updateSkill("Use-Magic-Device");
				updateSkill("Misc-Skill-0");
				updateSkill("Misc-Skill-1");
				updateSkill("Misc-Skill-2");
				updateSkill("Misc-Skill-3");
				updateSkill("Misc-Skill-4");
				updateSkill("Misc-Skill-5");

				updateSkill("Artistry");
				updateSkill("Lore");

				updateSkill("CS-Acrobatics");
				updateSkill("CS-Athletics");
				updateSkill("CS-Finesse");
				updateSkill("CS-Influence");
				updateSkill("CS-Nature");
				updateSkill("CS-Perception");
				updateSkill("CS-Performance");
				updateSkill("CS-Religion");
				updateSkill("CS-Society");
				updateSkill("CS-Spellcraft");
				updateSkill("CS-Stealth");
				updateSkill("CS-Survival");
			},

		/* fixClassSkill - updates the class skill checkbox from that long string to a number 0 or 3 */
			fixClassSkill=function(skill) {
				var csNm=skill+"-cs";
				getAttrs([csNm],function(v){
					var  cs=0,setter={};
					if (v[csNm]=="0") { cs = 0;}
					else if(v[csNm]) { cs = 3;}
					else if (!v[csNm]) { cs = 0;}
					//console.log("FIXSKILL: "+skill+" : cs is "+cs + " raw is:"+v[csNm]);
					if (cs===3) {
						setter[csNm]=cs;
						setAttrs(setter);
					}
				});
			},

		/* fixClassSkills calls fixClassSkill for all skills */
			fixClassSkills=function() {
				fixClassSkill("Acrobatics");
				fixClassSkill("Appraise");
				fixClassSkill("Bluff");
				fixClassSkill("Climb");
				fixClassSkill("Craft");
				fixClassSkill("Craft2");
				fixClassSkill("Craft3");
				fixClassSkill("Diplomacy");
				fixClassSkill("Disable-Device");
				fixClassSkill("Disguise");
				fixClassSkill("Escape-Artist");
				fixClassSkill("Fly");
				fixClassSkill("Handle-Animal");
				fixClassSkill("Heal");
				fixClassSkill("Intimidate");
				fixClassSkill("Linguistics");
				fixClassSkill("Knowledge-Arcana");
				fixClassSkill("Knowledge-Dungeoneering");
				fixClassSkill("Knowledge-Engineering");
				fixClassSkill("Knowledge-Geography");
				fixClassSkill("Knowledge-History");
				fixClassSkill("Knowledge-Local");
				fixClassSkill("Knowledge-Nature");
				fixClassSkill("Knowledge-Nobility");
				fixClassSkill("Knowledge-Planes");
				fixClassSkill("Knowledge-Religion");
				fixClassSkill("Perception");
				fixClassSkill("Perform");
				fixClassSkill("Perform2");
				fixClassSkill("Perform3");
				fixClassSkill("Profession");
				fixClassSkill("Profession2");
				fixClassSkill("Profession3");
				fixClassSkill("Ride");
				fixClassSkill("Sense-Motive");
				fixClassSkill("Sleight-of-Hand");
				fixClassSkill("Spellcraft");
				fixClassSkill("Stealth");
				fixClassSkill("Survival");
				fixClassSkill("Swim");
				fixClassSkill("Use-Magic-Device");
				fixClassSkill("Misc-Skill-0");
				fixClassSkill("Misc-Skill-1");
				fixClassSkill("Misc-Skill-2");
				fixClassSkill("Misc-Skill-3");
				fixClassSkill("Misc-Skill-4");
				fixClassSkill("Misc-Skill-5");

				fixClassSkill("Artistry");
				fixClassSkill("Lore");

				fixClassSkill("CS-Acrobatics");
				fixClassSkill("CS-Athletics");
				fixClassSkill("CS-Finesse");
				fixClassSkill("CS-Influence");
				fixClassSkill("CS-Nature");
				fixClassSkill("CS-Perception");
				fixClassSkill("CS-Performance");
				fixClassSkill("CS-Religion");
				fixClassSkill("CS-Society");
				fixClassSkill("CS-Spellcraft");
				fixClassSkill("CS-Stealth");
				fixClassSkill("CS-Survival");
			},

		/* recalculateAllBuffs - can't we find  abetter way? sets about a thousand fields to 0*/
			recalculateAllBuffs = function() {
				setAttrs({
							 "buff_Melee-total":0,
							 "buff_Ranged-total":0,
							 "buff_DMG-total":0,
							 "buff_AC-total":0,
							 "buff_HP-temp-total":0,
							 "buff_Fort-total":0,
							 "buff_Ref-total":0,
							 "buff_Will-total":0,
							 "buff_STR-total":0,
							 "buff_DEX-total":0,
							 "buff_CON-total":0,
							 "buff_INT-total":0,
							 "buff_WIS-total":0,
							 "buff_CHA-total":0,
							 "buff_Touch-total":0,
							 "buff_CMD-total":0,
							 "buff_Check-total":0,
							 "buff_CasterLevel-total":0
						 });
				//not synchronous, but by the time these run the sets above should have run
				updateBuffRow("1");
				updateBuffRow("2");
				updateBuffRow("3");
				updateBuffRow("4");
				updateBuffRow("5");
				updateBuffRow("6");
				updateBuffRow("7");
				updateBuffRow("8");
				updateBuffRow("9");
				updateBuffRow("10");
				updateBuffColumn("STR");
				updateBuffColumn("DEX");
				updateBuffColumn("CON");
				updateBuffColumn("INT");
				updateBuffColumn("WIS");
				updateBuffColumn("CHA");
				updateBuffColumn("Ranged");
				updateBuffColumn("Melee");
				updateBuffColumn("DMG");
				updateBuffColumn("AC");
				updateBuffColumn("Fort");
				updateBuffColumn("Will");
				updateBuffColumn("Ref");
				updateBuffColumn("HP-temp");
				updateBuffColumn("Touch");
				updateBuffColumn("CMD");
				updateBuffColumn("Check");
				updateBuffColumn("CasterLevel");
			},

		/* recalculateSheet - all pages in sheet!  */
			recalculateSheet = function(oldversion) {
				if (oldversion < 0.15) {


					updateAbility("STR");
					updateAbility("DEX");
					updateAbility("CON");
					updateAbility("INT");
					updateAbility("WIS");
					updateAbility("CHA");

					handleDropdown("HP-ability",["HP-ability-mod"]);
					//init dropdown
					handleDropdown("init-ability",["init-ability-mod"]);
					//saves
					handleDropdown  ("Fort-ability",["Fort-ability-mod"]);
					handleDropdown  ("Ref-ability",["Ref-ability-mod"]);
					handleDropdown  ("Will-ability",["Will-ability-mod"]);
					//defense dropdowns
					handleDropdown("AC-ability",["AC-ability-mod"]);
					handleDropdown("FF-ability",["FF-DEX"]);
					handleDropdown("CMD-ability1",["CMD-STR"]);
					handleDropdown("CMD-ability2",["CMD-DEX"]);
					handleDropdown("CMD-ability",["FF-CMD-DEX"]);
					//attack non repeating dropdowns
					handleDropdown("melee-ability",["melee-ability-mod"]);
					handleDropdown("ranged-ability",["ranged-ability-mod"]);
					handleDropdown("CMB-ability",["CMB-ability-mod"]);


					updateSize();
					updateInit();
					SWUtils.evaluateAndSetNumber("HP-formula-macro-text","HP-formula-mod");
					updateHP();
					updateTempHP();
					SWUtils.evaluateAndSetNumber("NPC-HD-misc","NPC-HD-misc-mod");
					updateNPCHP();
					updateClassInformation("hp");
					updateClassInformation("skill");
					updateClassInformation("fcskill");
					updateClassInformation("fcalt");
					updateClassInformation("bab");
					updateClassInformation("Fort");
					updateClassInformation("Ref");
					updateClassInformation("Will");
					updateClassInformation("level");

					updateSave("Fort");
					updateSave("Ref");
					updateSave("Will");
					updateConditionDefensePenalty();
					updateArmor();
					updateConditionAttackPenalty();
					updateAttack("melee");
					updateAttack("ranged");
					updateAttack("CMB");
					recalculateRepeatingWeapons();

				}
				if (oldversion < 0.16) {

					SWUtils.evaluateAndSetNumber("Max-Skill-Ranks-Misc","Max-Skill-Ranks-mod");
					updateMaxSkills();

					updateConditionCheckPenalty();
					recalculateSkills();
					updateConditionAbilityPenalty();
				}
				if ( oldversion < 0.17) {
					//buff and skills fixed in 0.17
					recalculateAllBuffs();
					updateSkill("CS-Perception");
					updateConditionAbilityPenalty();
					recalculateRepeatingMaxUsed("class-ability");
					recalculateRepeatingMaxUsed("feat");
					recalculateRepeatingMaxUsed("racial-trait");
					recalculateRepeatingMaxUsed("trait");
				}
				if ( oldversion < 0.18) {
					fixClassSkills();
				}
				if (oldversion < 0.19) {
					updateDamage();
					updateDamageNote();
				}
				if (oldversion < 0.20) {
					recalculateRepeatingWeapons();
					handleRepeatingRowOrdering("class-ability",true);
					handleRepeatingRowOrdering("feat",true);
					handleRepeatingRowOrdering("racial-trait",true);
					handleRepeatingRowOrdering("trait",true);
					handleRepeatingRowOrdering("item",true);
				}
				if (oldversion < 0.21) {
					handleDefenseDropdown("FF-ability");
					handleDefenseDropdown("CMD-ability");
					handleDefenseDropdown("AC-ability");
					handleDefenseDropdown("CMD-ability2");
					handleDefenseDropdown("CMD-ability1");
					updateDefenses();
				}
				if (oldversion < 0.30) {

					handleConcentrationAbilityDropdown(0);
					handleConcentrationAbilityDropdown(1);
					handleConcentrationAbilityDropdown(2);
					updateCasterLevel(0);
					updateCasterLevel(1);
					updateCasterLevel(2);
					updateConcentration(0);
					updateConcentration(1);
					updateConcentration(2);
					updateSaveDCs(0);
					updateSaveDCs(1);
					updateSaveDCs(2);
					updateBonusSpells(0);
					updateBonusSpells(1);
					updateBonusSpells(2);
					handleRepeatingRowOrdering("lvl-0-spells",true);
					handleRepeatingRowOrdering("lvl-1-spells",true);
					handleRepeatingRowOrdering("lvl-2-spells",true);
					handleRepeatingRowOrdering("lvl-3-spells",true);
					handleRepeatingRowOrdering("lvl-4-spells",true);
					handleRepeatingRowOrdering("lvl-5-spells",true);
					handleRepeatingRowOrdering("lvl-6-spells",true);
					handleRepeatingRowOrdering("lvl-7-spells",true);
					handleRepeatingRowOrdering("lvl-8-spells",true);
					handleRepeatingRowOrdering("lvl-9-spells",true);
					handleRepeatingRowOrdering("npc-spell-like-abilities",true);
					handleRepeatingRowOrdering("npc-spells1",true);
					handleRepeatingRowOrdering("npc-spells2",true);
				}
				if (oldversion < 0.31) {
					updateConditionCheckPenalty();
					updateConditionDefensePenalty();
					updateCasterLevel(0);
					updateCasterLevel(1);
					updateCasterLevel(2);
					updateConcentration(0);
					updateConcentration(1);
					updateConcentration(2);
				}
				if (oldversion < 0.32) {
					recalculateSpellLevelsAll();
				}
				if (oldversion < 0.33) {
					handleRepeatingRowOrdering("mythic-ability",true);
					handleRepeatingRowOrdering("mythic-feat", true);
					recalculateRepeatingMaxUsed("mythic-ability");
					recalculateRepeatingMaxUsed("mythic-feat");

				}
			},


		/* checkForUpdate looks at current version of page in PFSheet_Version and compares to code PFSheet.version
		 *  calls recalulateSheet if versions don't match or if recalculate button was pressed.
		 */
			checkForUpdate=function(){
				getAttrs(["PFSheet_Version","PFSheet_forcesync","recalc1"],function(v){
					var setter={},currVer=0,setAny=0,recalc=false;
					currVer=parseFloat(v["PFSheet_Version"],10)||0;
					console.log("Current Pathfinder sheet data version:"+currVer+", Sheet code version:" + version );

					if ( currVer!== version ) {
						recalc=true;
						setter["PFSheet_Version"]= version;
						setAny=1;
					}
					if (v["recalc1"] && v["recalc1"]!="0" ) {
						currVer=-1;
						recalc=true;
						setter["recalc1"]=0;
						setAny=1;
					}
					if (v["PFSheet_forcesync"] &&  v["PFSheet_forcesync"]!="0"  ) {
						currVer=-1;
						recalc=true;
						setter["PFSheet_forcesync"]=0;
						setAny=1;
					}
					if (setAny) {
						setAttrs( setter);
					}
					if (recalc) {
						recalculateSheet(currVer);
					}
				});
			};

		return {
			util:{findAbilityInString:findAbilityInString,
				findMultiplier:findMultiplier,
				updateRowTotal:updateRowTotal,
				isBadRowId:isBadRowId
			},
			version:version,
			handleDropdown:handleDropdown,
			updateSize:updateSize,
			updateAbility:updateAbility,
			updateGrapple:updateGrapple,
			updatePin:updatePin,
			updateBuff:updateBuff,
			updateBuffRow:updateBuffRow,
			updateBuffColumn:updateBuffColumn,
			updateInit:updateInit,
			updateHP:updateHP,
			updateTempHP:updateTempHP,
			updateClassInformation:updateClassInformation,
			updateMythicPathInformation: updateMythicPathInformation,
			updateMythicPower: updateMythicPower,
			updateTierMythicPower: updateTierMythicPower,
			updateDefenses:updateDefenses,
			updateArmor:updateArmor,
			updateAttackEffectTotals:updateAttackEffectTotals,
			updateDMGEffectTotals:updateDMGEffectTotals,
			updateConditionsSavePenalty:updateConditionsSavePenalty,
			updateSave:updateSave,
			updateConditionDefensePenalty:updateConditionDefensePenalty,
			handleDefenseDropdown:handleDefenseDropdown,
			updateAttack:updateAttack,
			updateDamage:updateDamage,
			updateDamageNote:updateDamageNote,
			updateConditionAttackPenalty:updateConditionAttackPenalty,
			updateConditionAttackNote:updateConditionAttackNote,
			handleRepeatingDamageDropdown:handleRepeatingDamageDropdown,
			handleRepeatingAttackDropdown:handleRepeatingAttackDropdown,
			updateRepeatingWeaponAttack:updateRepeatingWeaponAttack,
			updateRepeatingWeaponDamage:updateRepeatingWeaponDamage,
			updateRepeatingWeaponAttacks:updateRepeatingWeaponAttacks,
			updateRepeatingWeaponDamages:updateRepeatingWeaponDamages,
			updateConditionCheckPenalty:updateConditionCheckPenalty,
			updateConditionAbilityPenalty:updateConditionAbilityPenalty,
			updateMaxSkills:updateMaxSkills,
			updateSkill:updateSkill,
			updateNPCHP:updateNPCHP,
			handleSpellClassDropdown:handleSpellClassDropdown,
			updateConcentration:updateConcentration,
			updateCasterLevel:updateCasterLevel,
			ifSpellClassExists:ifSpellClassExists,
			updateSpellPenetration:updateSpellPenetration,
			updateMaxSpellsPerDay:updateMaxSpellsPerDay,
			updateSpellClassLevel:updateSpellClassLevel,
			updateSaveDCs:updateSaveDCs,
			updateBonusSpells:updateBonusSpells,
			handleConcentrationAbilityDropdown:handleConcentrationAbilityDropdown,
			updateCastingPenaltyNote:updateCastingPenaltyNote,
			updateSpell:updateSpell,
			updateSpells:updateSpells,
			checkIsNewRow:checkIsNewRow,
			checkForUpdate:checkForUpdate
		};
	}());