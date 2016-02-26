
//Buffs - columns
on("change:buff1_str change:buff2_str change:buff3_str change:buff4_str change:buff5_str change:buff6_str change:buff7_str change:buff8_str change:buff9_str change:buff10_str", function() { PFSheet.updateBuffColumn("STR"); });
on("change:buff1_dex change:buff2_dex change:buff3_dex change:buff4_dex change:buff5_dex change:buff6_dex change:buff7_dex change:buff8_dex change:buff9_dex change:buff10_dex", function() { PFSheet.updateBuffColumn("DEX"); });
on("change:buff1_con change:buff2_con change:buff3_con change:buff4_con change:buff5_con change:buff6_con change:buff7_con change:buff8_con change:buff9_con change:buff10_con", function() { PFSheet.updateBuffColumn("CON"); });
on("change:buff1_int change:buff2_int change:buff3_int change:buff4_int change:buff5_int change:buff6_int change:buff7_int change:buff8_int change:buff9_int change:buff10_int", function() { PFSheet.updateBuffColumn("INT"); });
on("change:buff1_wis change:buff2_wis change:buff3_wis change:buff4_wis change:buff5_wis change:buff6_wis change:buff7_wis change:buff8_wis change:buff9_wis change:buff10_wis", function() { PFSheet.updateBuffColumn("WIS"); });
on("change:buff1_cha change:buff2_cha change:buff3_cha change:buff4_cha change:buff5_cha change:buff6_cha change:buff7_cha change:buff8_cha change:buff9_cha change:buff10_cha", function() { PFSheet.updateBuffColumn("CHA"); });
on("change:buff1_melee change:buff2_melee change:buff3_melee change:buff4_melee change:buff5_melee change:buff6_melee change:buff7_melee change:buff8_melee change:buff9_melee change:buff10_melee", function() { PFSheet.updateBuffColumn("Melee"); });
on("change:buff1_ranged change:buff2_ranged change:buff3_ranged change:buff4_ranged change:buff5_ranged change:buff6_ranged change:buff7_ranged change:buff8_ranged change:buff9_ranged change:buff10_ranged", function() { PFSheet.updateBuffColumn("Ranged"); });
on("change:buff1_dmg change:buff2_dmg change:buff3_dmg change:buff4_dmg change:buff5_dmg change:buff6_dmg change:buff7_dmg change:buff8_dmg change:buff9_dmg change:buff10_dmg", function() { PFSheet.updateBuffColumn("DMG"); });
on("change:buff1_ac change:buff2_ac change:buff3_ac change:buff4_ac change:buff5_ac change:buff6_ac change:buff7_ac change:buff8_ac change:buff9_ac change:buff10_ac", function() { PFSheet.updateBuffColumn("AC"); });
on("change:buff1_hp-temp change:buff2_hp-temp change:buff3_hp-temp change:buff4_hp-temp change:buff5_hp-temp change:buff6_hp-temp change:buff7_hp-temp change:buff8_hp-temp change:buff9_hp-temp change:buff10_hp-temp", function() { PFSheet.updateBuffColumn("HP-temp"); });
on("change:buff1_fort change:buff2_fort change:buff3_fort change:buff4_fort change:buff5_fort change:buff6_fort change:buff7_fort change:buff8_fort change:buff9_fort change:buff10_fort", function() { PFSheet.updateBuffColumn("Fort"); });
on("change:buff1_ref change:buff2_ref change:buff3_ref change:buff4_ref change:buff5_ref change:buff6_ref change:buff7_ref change:buff8_ref change:buff9_ref change:buff10_ref", function() { PFSheet.updateBuffColumn("Ref"); });
on("change:buff1_will change:buff2_will change:buff3_will change:buff4_will change:buff5_will change:buff6_will change:buff7_will change:buff8_will change:buff9_will change:buff10_will", function() { PFSheet.updateBuffColumn("Will"); });
on("change:buff1_casterlevel change:buff2_casterlevel change:buff3_casterlevel change:buff4_casterlevel change:buff5_casterlevel change:buff6_casterlevel change:buff7_casterlevel change:buff8_casterlevel change:buff9_casterlevel change:buff10_casterlevel", function() { PFSheet.updateBuffColumn("CasterLevel"); });
on("change:buff1_check change:buff2_check change:buff3_check change:buff4_check change:buff5_check change:buff6_check change:buff7_check change:buff8_check change:buff9_check change:buff10_check", function() { PFSheet.updateBuffColumn("Check"); });
on("change:buff1_touch change:buff2_touch change:buff3_touch change:buff4_touch change:buff5_touch change:buff6_touch change:buff7_touch change:buff8_touch change:buff9_touch change:buff10_touch", function() { PFSheet.updateBuffColumn("Touch"); });
on("change:buff1_cmd change:buff2_cmd change:buff3_cmd change:buff4_cmd change:buff5_cmd change:buff6_cmd change:buff7_cmd change:buff8_cmd change:buff9_cmd change:buff10_cmd", function() { PFSheet.updateBuffColumn("CMD"); });

//Buffs - rows
on("change:buff1_toggle", function() { PFSheet.updateBuffRow("1");});
on("change:buff2_toggle", function() { PFSheet.updateBuffRow("2");});
on("change:buff3_toggle", function() { PFSheet.updateBuffRow("3");});
on("change:buff4_toggle", function() { PFSheet.updateBuffRow("4");});
on("change:buff5_toggle", function() { PFSheet.updateBuffRow("5");});
on("change:buff6_toggle", function() { PFSheet.updateBuffRow("6");});
on("change:buff7_toggle", function() { PFSheet.updateBuffRow("7");});
on("change:buff8_toggle", function() { PFSheet.updateBuffRow("8");});
on("change:buff9_toggle", function() { PFSheet.updateBuffRow("9");});
on("change:buff10_toggle", function() { PFSheet.updateBuffRow("10");});

//Buffs - cells
on("change:buff1_melee_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("Melee","1");}});});
on("change:buff1_ranged_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("Ranged","1");}});});
on("change:buff1_dmg_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("DMG","1");}});});
on("change:buff1_ac_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("AC","1");}});});
on("change:buff1_hp-temp_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("HP-temp","1");}});});
on("change:buff1_fort_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("Fort","1");}});});
on("change:buff1_ref_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("Ref","1");}});});
on("change:buff1_will_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("Will","1");}});});
on("change:buff1_str_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("STR","1");}});});
on("change:buff1_dex_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("DEX","1");}});});
on("change:buff1_con_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("CON","1");}});});
on("change:buff1_int_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("INT","1");}});});
on("change:buff1_wis_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("WIS","1");}});});
on("change:buff1_cha_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("CHA","1");}});});
on("change:buff1_touch_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("Touch","1");}});});
on("change:buff1_cmd_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("CMD","1");}});});
on("change:buff1_check_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("Check","1");}});});
on("change:buff1_casterlevel_macro-text", function() { getAttrs(["buff1_Toggle"], function (v){ if (v.buff1_Toggle === "1"){PFSheet.updateBuff("CasterLevel","1");}});});


on("change:buff2_melee_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("Melee","2");}});});
on("change:buff2_ranged_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("Ranged","2");}});});
on("change:buff2_dmg_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("DMG","2");}});});
on("change:buff2_ac_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("AC","2");}});});
on("change:buff2_hp-temp_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("HP-temp","2");}});});
on("change:buff2_fort_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("Fort","2");}});});
on("change:buff2_ref_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("Ref","2");}});});
on("change:buff2_will_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("Will","2");}});});
on("change:buff2_str_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("STR","2");}});});
on("change:buff2_dex_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("DEX","2");}});});
on("change:buff2_con_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("CON","2");}});});
on("change:buff2_int_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("INT","2");}});});
on("change:buff2_wis_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("WIS","2");}});});
on("change:buff2_cha_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle == "1"){PFSheet.updateBuff("CHA","2");}});});
on("change:buff2_touch_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle === "1"){PFSheet.updateBuff("Touch","2");}});});
on("change:buff2_cmd_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle === "1"){PFSheet.updateBuff("CMD","2");}});});
on("change:buff2_check_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle === "1"){PFSheet.updateBuff("Check","2");}});});
on("change:buff2_casterlevel_macro-text", function() { getAttrs(["buff2_Toggle"], function (v){ if (v.buff2_Toggle === "1"){PFSheet.updateBuff("CasterLevel","2");}});});

on("change:buff3_melee_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("Melee","3");}});});
on("change:buff3_ranged_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("Ranged","3");}});});
on("change:buff3_dmg_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("DMG","3");}});});
on("change:buff3_ac_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("AC","3");}});});
on("change:buff3_hp-temp_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("HP-temp","3");}});});
on("change:buff3_fort_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("Fort","3");}});});
on("change:buff3_ref_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("Ref","3");}});});
on("change:buff3_will_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("Will","3");}});});
on("change:buff3_str_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("STR","3");}});});
on("change:buff3_dex_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("DEX","3");}});});
on("change:buff3_con_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("CON","3");}});});
on("change:buff3_int_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("INT","3");}});});
on("change:buff3_wis_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("WIS","3");}});});
on("change:buff3_cha_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle == "1"){PFSheet.updateBuff("CHA","3");}});});
on("change:buff3_touch_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle === "1"){PFSheet.updateBuff("Touch","3");}});});
on("change:buff3_cmd_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle === "1"){PFSheet.updateBuff("CMD","3");}});});
on("change:buff3_check_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle === "1"){PFSheet.updateBuff("Check","3");}});});
on("change:buff3_casterlevel_macro-text", function() { getAttrs(["buff3_Toggle"], function (v){ if (v.buff3_Toggle === "1"){PFSheet.updateBuff("CasterLevel","3");}});});

on("change:buff4_melee_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("Melee","4");}});});
on("change:buff4_ranged_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("Ranged","4");}});});
on("change:buff4_dmg_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("DMG","4");}});});
on("change:buff4_ac_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("AC","4");}});});
on("change:buff4_hp-temp_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("HP-temp","4");}});});
on("change:buff4_fort_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("Fort","4");}});});
on("change:buff4_ref_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("Ref","4");}});});
on("change:buff4_will_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("Will","4");}});});
on("change:buff4_str_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("STR","4");}});});
on("change:buff4_dex_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("DEX","4");}});});
on("change:buff4_con_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("CON","4");}});});
on("change:buff4_int_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("INT","4");}});});
on("change:buff4_wis_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("WIS","4");}});});
on("change:buff4_cha_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle == "1"){PFSheet.updateBuff("CHA","4");}});});
on("change:buff4_touch_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle === "1"){PFSheet.updateBuff("Touch","4");}});});
on("change:buff4_cmd_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle === "1"){PFSheet.updateBuff("CMD","4");}});});
on("change:buff4_check_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle === "1"){PFSheet.updateBuff("Check","4");}});});
on("change:buff4_casterlevel_macro-text", function() { getAttrs(["buff4_Toggle"], function (v){ if (v.buff4_Toggle === "1"){PFSheet.updateBuff("CasterLevel","4");}});});

on("change:buff5_melee_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("Melee","5");}});});
on("change:buff5_ranged_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("Ranged","5");}});});
on("change:buff5_dmg_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("DMG","5");}});});
on("change:buff5_ac_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("AC","5");}});});
on("change:buff5_hp-temp_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("HP-temp","5");}});});
on("change:buff5_fort_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("Fort","5");}});});
on("change:buff5_ref_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("Ref","5");}});});
on("change:buff5_will_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("Will","5");}});});
on("change:buff5_str_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("STR","5");}});});
on("change:buff5_dex_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("DEX","5");}});});
on("change:buff5_con_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("CON","5");}});});
on("change:buff5_int_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("INT","5");}});});
on("change:buff5_wis_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("WIS","5");}});});
on("change:buff5_cha_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle == "1"){PFSheet.updateBuff("CHA","5");}});});
on("change:buff5_touch_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle === "1"){PFSheet.updateBuff("Touch","5");}});});
on("change:buff5_cmd_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle === "1"){PFSheet.updateBuff("CMD","5");}});});
on("change:buff5_check_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle === "1"){PFSheet.updateBuff("Check","5");}});});
on("change:buff5_casterlevel_macro-text", function() { getAttrs(["buff5_Toggle"], function (v){ if (v.buff5_Toggle === "1"){PFSheet.updateBuff("CasterLevel","5");}});});

on("change:buff6_melee_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("Melee","6");}});});
on("change:buff6_ranged_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("Ranged","6");}});});
on("change:buff6_dmg_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("DMG","6");}});});
on("change:buff6_ac_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("AC","6");}});});
on("change:buff6_hp-temp_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("HP-temp","6");}});});
on("change:buff6_fort_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("Fort","6");}});});
on("change:buff6_ref_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("Ref","6");}});});
on("change:buff6_will_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("Will","6");}});});
on("change:buff6_str_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("STR","6");}});});
on("change:buff6_dex_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("DEX","6");}});});
on("change:buff6_con_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("CON","6");}});});
on("change:buff6_int_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("INT","6");}});});
on("change:buff6_wis_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("WIS","6");}});});
on("change:buff6_cha_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle == "1"){PFSheet.updateBuff("CHA","6");}});});
on("change:buff6_touch_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle === "1"){PFSheet.updateBuff("Touch","6");}});});
on("change:buff6_cmd_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle === "1"){PFSheet.updateBuff("CMD","6");}});});
on("change:buff6_check_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle === "1"){PFSheet.updateBuff("Check","6");}});});
on("change:buff6_casterlevel_macro-text", function() { getAttrs(["buff6_Toggle"], function (v){ if (v.buff6_Toggle === "1"){PFSheet.updateBuff("CasterLevel","6");}});});

on("change:buff7_melee_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("Melee","7");}});});
on("change:buff7_ranged_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("Ranged","7");}});});
on("change:buff7_dmg_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("DMG","7");}});});
on("change:buff7_ac_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("AC","7");}});});
on("change:buff7_hp-temp_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("HP-temp","7");}});});
on("change:buff7_fort_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("Fort","7");}});});
on("change:buff7_ref_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("Ref","7");}});});
on("change:buff7_will_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("Will","7");}});});
on("change:buff7_str_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("STR","7");}});});
on("change:buff7_dex_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("DEX","7");}});});
on("change:buff7_con_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("CON","7");}});});
on("change:buff7_int_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("INT","7");}});});
on("change:buff7_wis_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("WIS","7");}});});
on("change:buff7_cha_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle == "1"){PFSheet.updateBuff("CHA","7");}});});
on("change:buff7_touch_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle === "1"){PFSheet.updateBuff("Touch","7");}});});
on("change:buff7_cmd_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle === "1"){PFSheet.updateBuff("CMD","7");}});});
on("change:buff7_check_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle === "1"){PFSheet.updateBuff("Check","7");}});});
on("change:buff7_casterlevel_macro-text", function() { getAttrs(["buff7_Toggle"], function (v){ if (v.buff7_Toggle === "1"){PFSheet.updateBuff("CasterLevel","7");}});});

on("change:buff8_melee_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("Melee","8");}});});
on("change:buff8_ranged_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("Ranged","8");}});});
on("change:buff8_dmg_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("DMG","8");}});});
on("change:buff8_ac_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("AC","8");}});});
on("change:buff8_hp-temp_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("HP-temp","8");}});});
on("change:buff8_fort_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("Fort","8");}});});
on("change:buff8_ref_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("Ref","8");}});});
on("change:buff8_will_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("Will","8");}});});
on("change:buff8_str_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("STR","8");}});});
on("change:buff8_dex_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("DEX","8");}});});
on("change:buff8_con_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("CON","8");}});});
on("change:buff8_int_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("INT","8");}});});
on("change:buff8_wis_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("WIS","8");}});});
on("change:buff8_cha_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle == "1"){PFSheet.updateBuff("CHA","8");}});});
on("change:buff8_touch_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle === "1"){PFSheet.updateBuff("Touch","8");}});});
on("change:buff8_cmd_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle === "1"){PFSheet.updateBuff("CMD","8");}});});
on("change:buff8_check_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle === "1"){PFSheet.updateBuff("Check","8");}});});
on("change:buff8_casterlevel_macro-text", function() { getAttrs(["buff8_Toggle"], function (v){ if (v.buff8_Toggle === "1"){PFSheet.updateBuff("CasterLevel","8");}});});

on("change:buff9_melee_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("Melee","9");}});});
on("change:buff9_ranged_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("Ranged","9");}});});
on("change:buff9_dmg_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("DMG","9");}});});
on("change:buff9_ac_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("AC","9");}});});
on("change:buff9_hp-temp_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("HP-temp","9");}});});
on("change:buff9_fort_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("Fort","9");}});});
on("change:buff9_ref_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("Ref","9");}});});
on("change:buff9_will_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("Will","9");}});});
on("change:buff9_str_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("STR","9");}});});
on("change:buff9_dex_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("DEX","9");}});});
on("change:buff9_con_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("CON","9");}});});
on("change:buff9_int_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("INT","9");}});});
on("change:buff9_wis_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("WIS","9");}});});
on("change:buff9_cha_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle == "1"){PFSheet.updateBuff("CHA","9");}});});
on("change:buff9_touch_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle === "1"){PFSheet.updateBuff("Touch","9");}});});
on("change:buff9_cmd_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle === "1"){PFSheet.updateBuff("CMD","9");}});});
on("change:buff9_check_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle === "1"){PFSheet.updateBuff("Check","9");}});});
on("change:buff9_casterlevel_macro-text", function() { getAttrs(["buff9_Toggle"], function (v){ if (v.buff9_Toggle === "1"){PFSheet.updateBuff("CasterLevel","9");}});});

on("change:buff10_melee_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("Melee","10");}});});
on("change:buff10_ranged_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("Ranged","10");}});});
on("change:buff10_dmg_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("DMG","10");}});});
on("change:buff10_ac_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("AC","10");}});});
on("change:buff10_hp-temp_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("HP-temp","10");}});});
on("change:buff10_fort_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("Fort","10");}});});
on("change:buff10_ref_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("Ref","10");}});});
on("change:buff10_will_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("Will","10");}});});
on("change:buff10_str_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("STR","10");}});});
on("change:buff10_dex_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("DEX","10");}});});
on("change:buff10_con_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("CON","10");}});});
on("change:buff10_int_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("INT","10");}});});
on("change:buff10_wis_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("WIS","10");}});});
on("change:buff10_cha_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle == "1"){PFSheet.updateBuff("CHA","10");}});});
on("change:buff10_touch_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle === "1"){PFSheet.updateBuff("Touch","10");}});});
on("change:buff10_cmd_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle === "1"){PFSheet.updateBuff("CMD","10");}});});
on("change:buff10_check_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle === "1"){PFSheet.updateBuff("Check","10");}});});
on("change:buff10_casterlevel_macro-text", function() { getAttrs(["buff10_Toggle"], function (v){ if (v.buff10_Toggle === "1"){PFSheet.updateBuff("CasterLevel","10");}});});


//allskills



on("change:acrobatics-ability",function(){PFSheet.handleDropdown("Acrobatics-ability",["Acrobatics-ability-mod"]);});
on("change:acp change:acrobatics-cs change:acrobatics-ranks change:acrobatics-class change:checks-cond change:acrobatics-ability-mod change:acrobatics-racial change:acrobatics-feat change:acrobatics-item change:acrobatics-size change:acrobatics-acp change:acrobatics-misc change:acrobatics-ReqTrain"
	,function(){PFSheet.updateSkill("Acrobatics");});

on("change:artistry-ability",function(){PFSheet.handleDropdown("Artistry-ability",["Artistry-ability-mod"]);});
on("change:artistry-cs change:artistry-ranks change:artistry-class change:checks-cond change:artistry-ability-mod change:artistry-racial change:artistry-feat change:artistry-item change:artistry-size change:artistry-acp change:artistry-misc change:artistry-ReqTrain"
	,function(){PFSheet.updateSkill("Artistry");});

on("change:appraise-ability",function(){PFSheet.handleDropdown("Appraise-ability",["Appraise-ability-mod"]);});
on("change:appraise-cs change:appraise-ranks change:appraise-class change:checks-cond change:appraise-ability-mod change:appraise-racial change:appraise-feat change:appraise-item change:appraise-size change:appraise-acp change:appraise-misc change:appraise-ReqTrain"
	,function(){PFSheet.updateSkill("Appraise");});

on("change:bluff-ability",function(){PFSheet.handleDropdown("Bluff-ability",["Bluff-ability-mod"]);});
on("change:bluff-cs change:bluff-ranks change:bluff-class change:checks-cond change:bluff-ability-mod change:bluff-racial change:bluff-feat change:bluff-item change:bluff-size change:bluff-acp change:bluff-misc change:bluff-ReqTrain"
	,function(){PFSheet.updateSkill("Bluff");});

on("change:climb-ability",function(){PFSheet.handleDropdown("Climb-ability",["Climb-ability-mod"]);});
on("change:acp change:climb-cs change:climb-ranks change:climb-class change:checks-cond change:climb-ability-mod change:climb-racial change:climb-feat change:climb-item change:climb-size change:climb-acp change:climb-misc change:climb-ReqTrain"
	,function(){PFSheet.updateSkill("Climb");});

on("change:craft-ability",function(){PFSheet.handleDropdown("Craft-ability",["Craft-ability-mod"]);});
on("change:craft-cs change:craft-ranks change:craft-class change:checks-cond change:craft-ability-mod change:craft-racial change:craft-feat change:craft-item change:craft-size change:craft-acp change:craft-misc change:craft-ReqTrain"
	,function(){PFSheet.updateSkill("Craft");});

on("change:craft2-ability",function(){PFSheet.handleDropdown("Craft2-ability",["Craft2-ability-mod"]);});
on("change:craft2-cs change:craft2-ranks change:craft2-class change:checks-cond change:craft2-ability-mod change:craft2-racial change:craft2-feat change:craft2-item change:craft2-size change:craft2-acp change:craft2-misc change:craft2-ReqTrain"
	,function(){PFSheet.updateSkill("Craft2");});

on("change:craft3-ability",function(){PFSheet.handleDropdown("Craft3-ability",["Craft3-ability-mod"]);});
on("change:craft3-cs change:craft3-ranks change:craft3-class change:checks-cond change:craft3-ability-mod change:craft3-racial change:craft3-feat change:craft3-item change:craft3-size change:craft3-acp change:craft3-misc change:craft3-ReqTrain"
	,function(){PFSheet.updateSkill("Craft3");});

on("change:diplomacy-ability",function(){PFSheet.handleDropdown("Diplomacy-ability",["Diplomacy-ability-mod"]);});
on("change:diplomacy-cs change:diplomacy-ranks change:diplomacy-class change:checks-cond change:diplomacy-ability-mod change:diplomacy-racial change:diplomacy-feat change:diplomacy-item change:diplomacy-size change:diplomacy-acp change:diplomacy-misc change:diplomacy-ReqTrain"
	,function(){PFSheet.updateSkill("Diplomacy");});

on("change:disable-Device-ability",function(){PFSheet.handleDropdown("Disable-Device-ability",["Disable-Device-ability-mod"]);});
on("change:acp change:disable-Device-cs change:disable-Device-ranks change:disable-Device-class change:checks-cond change:disable-Device-ability-mod change:disable-Device-racial change:disable-Device-feat change:disable-Device-item change:disable-Device-size change:disable-Device-acp change:disable-Device-misc change:disable-Device-ReqTrain"
	,function(){PFSheet.updateSkill("Disable-Device");});

on("change:disguise-ability",function(){PFSheet.handleDropdown("Disguise-ability",["Disguise-ability-mod"]);});
on("change:disguise-cs change:disguise-ranks change:disguise-class change:checks-cond change:disguise-ability-mod change:disguise-racial change:disguise-feat change:disguise-item change:disguise-size change:disguise-acp change:disguise-misc change:disguise-ReqTrain"
	,function(){PFSheet.updateSkill("Disguise");});

on("change:escape-Artist-ability",function(){PFSheet.handleDropdown("Escape-Artist-ability",["Escape-Artist-ability-mod"]);});
on("change:acp change:escape-Artist-cs change:escape-Artist-ranks change:escape-Artist-class change:checks-cond change:escape-Artist-ability-mod change:escape-Artist-racial change:escape-Artist-feat change:escape-Artist-item change:escape-Artist-size change:escape-Artist-acp change:escape-Artist-misc change:escape-Artist-ReqTrain"
	,function(){PFSheet.updateSkill("Escape-Artist");});

on("change:fly-ability",function(){PFSheet.handleDropdown("Fly-ability",["Fly-ability-mod"]);});
on("change:acp change:size_skill change:fly-cs change:fly-ranks change:fly-class change:checks-cond change:fly-ability-mod change:fly-racial change:fly-feat change:fly-item change:fly-size change:fly-acp change:fly-misc change:fly-ReqTrain"
	,function(){PFSheet.updateSkill("Fly");});

on("change:handle-Animal-ability",function(){PFSheet.handleDropdown("Handle-Animal-ability",["Handle-Animal-ability-mod"]);});
on("change:handle-Animal-cs change:handle-Animal-ranks change:handle-Animal-class change:checks-cond change:handle-Animal-ability-mod change:handle-Animal-racial change:handle-Animal-feat change:handle-Animal-item change:handle-Animal-size change:handle-Animal-acp change:handle-Animal-misc change:handle-Animal-ReqTrain"
	,function(){PFSheet.updateSkill("Handle-Animal");});

on("change:heal-ability",function(){PFSheet.handleDropdown("Heal-ability",["Heal-ability-mod"]);});
on("change:heal-cs change:heal-ranks change:heal-class change:checks-cond change:heal-ability-mod change:heal-racial change:heal-feat change:heal-item change:heal-size change:heal-acp change:heal-misc change:heal-ReqTrain"
	,function(){PFSheet.updateSkill("Heal");});

on("change:intimidate-ability",function(){PFSheet.handleDropdown("Intimidate-ability",["Intimidate-ability-mod"]);});
on("change:intimidate-cs change:intimidate-ranks change:intimidate-class change:checks-cond change:intimidate-ability-mod change:intimidate-racial change:intimidate-feat change:intimidate-item change:intimidate-size change:intimidate-acp change:intimidate-misc change:intimidate-ReqTrain"
	,function(){PFSheet.updateSkill("Intimidate");});

on("change:linguistics-ability",function(){PFSheet.handleDropdown("Linguistics-ability",["Linguistics-ability-mod"]);});
on("change:linguistics-cs change:linguistics-ranks change:linguistics-class change:checks-cond change:linguistics-ability-mod change:linguistics-racial change:linguistics-feat change:linguistics-item change:linguistics-size change:linguistics-acp change:linguistics-misc change:linguistics-ReqTrain"
	,function(){PFSheet.updateSkill("Linguistics");});

on("change:lore-ability",function(){PFSheet.handleDropdown("Lore-ability",["Lore-ability-mod"]);});
on("change:lore-cs change:lore-ranks change:lore-class change:checks-cond change:lore-ability-mod change:lore-racial change:lore-feat change:lore-item change:lore-size change:lore-acp change:lore-misc change:lore-ReqTrain"
	,function(){PFSheet.updateSkill("Lore");});

on("change:knowledge-arcana-ability",function(){PFSheet.handleDropdown("Knowledge-Arcana-ability",["Knowledge-Arcana-ability-mod"]);});
on("change:knowledge-arcana-cs change:knowledge-arcana-ranks change:knowledge-arcana-class change:checks-cond change:knowledge-arcana-ability-mod change:knowledge-arcana-racial change:knowledge-arcana-feat change:knowledge-arcana-item change:knowledge-arcana-size change:knowledge-arcana-acp change:knowledge-arcana-misc change:knowledge-arcana-ReqTrain"
	,function(){PFSheet.updateSkill("Knowledge-Arcana");});

on("change:knowledge-dungeoneering-ability",function(){PFSheet.handleDropdown("Knowledge-Dungeoneering-ability",["Knowledge-Dungeoneering-ability-mod"]);});
on("change:knowledge-dungeoneering-cs change:knowledge-dungeoneering-ranks change:knowledge-dungeoneering-class change:checks-cond change:knowledge-dungeoneering-ability-mod change:knowledge-dungeoneering-racial change:knowledge-dungeoneering-feat change:knowledge-dungeoneering-item change:knowledge-dungeoneering-size change:knowledge-dungeoneering-acp change:knowledge-dungeoneering-misc change:knowledge-dungeoneering-ReqTrain"
	,function(){PFSheet.updateSkill("Knowledge-Dungeoneering");});

on("change:knowledge-engineering-ability",function(){PFSheet.handleDropdown("Knowledge-Engineering-ability",["Knowledge-Engineering-ability-mod"]);});
on("change:knowledge-engineering-cs change:knowledge-engineering-ranks change:knowledge-engineering-class change:checks-cond change:knowledge-engineering-ability-mod change:knowledge-engineering-racial change:knowledge-engineering-feat change:knowledge-engineering-item change:knowledge-engineering-size change:knowledge-engineering-acp change:knowledge-engineering-misc change:knowledge-engineering-ReqTrain"
	,function(){PFSheet.updateSkill("Knowledge-Engineering");});

on("change:knowledge-geography-ability",function(){PFSheet.handleDropdown("Knowledge-Geography-ability",["Knowledge-Geography-ability-mod"]);});
on("change:knowledge-geography-cs change:knowledge-geography-ranks change:knowledge-geography-class change:checks-cond change:knowledge-geography-ability-mod change:knowledge-geography-racial change:knowledge-geography-feat change:knowledge-geography-item change:knowledge-geography-size change:knowledge-geography-acp change:knowledge-geography-misc change:knowledge-geography-ReqTrain"
	,function(){PFSheet.updateSkill("Knowledge-Geography");});

on("change:knowledge-history-ability",function(){PFSheet.handleDropdown("Knowledge-History-ability",["Knowledge-History-ability-mod"]);});
on("change:knowledge-history-cs change:knowledge-history-ranks change:knowledge-history-class change:checks-cond change:knowledge-history-ability-mod change:knowledge-history-racial change:knowledge-history-feat change:knowledge-history-item change:knowledge-history-size change:knowledge-history-acp change:knowledge-history-misc change:knowledge-history-ReqTrain"
	,function(){PFSheet.updateSkill("Knowledge-History");});

on("change:knowledge-local-ability",function(){PFSheet.handleDropdown("Knowledge-Local-ability",["Knowledge-Local-ability-mod"]);});
on("change:knowledge-local-cs change:knowledge-local-ranks change:knowledge-local-class change:checks-cond change:knowledge-local-ability-mod change:knowledge-local-racial change:knowledge-local-feat change:knowledge-local-item change:knowledge-local-size change:knowledge-local-acp change:knowledge-local-misc change:knowledge-local-ReqTrain"
	,function(){PFSheet.updateSkill("Knowledge-Local");});

on("change:knowledge-nature-ability",function(){PFSheet.handleDropdown("Knowledge-Nature-ability",["Knowledge-Nature-ability-mod"]);});
on("change:knowledge-nature-cs change:knowledge-nature-ranks change:knowledge-nature-class change:checks-cond change:knowledge-nature-ability-mod change:knowledge-nature-racial change:knowledge-nature-feat change:knowledge-nature-item change:knowledge-nature-size change:knowledge-nature-acp change:knowledge-nature-misc change:knowledge-nature-ReqTrain"
	,function(){PFSheet.updateSkill("Knowledge-Nature");});

on("change:knowledge-nobility-ability",function(){PFSheet.handleDropdown("Knowledge-Nobility-ability",["Knowledge-Nobility-ability-mod"]);});
on("change:knowledge-nobility-cs change:knowledge-nobility-ranks change:knowledge-nobility-class change:checks-cond change:knowledge-nobility-ability-mod change:knowledge-nobility-racial change:knowledge-nobility-feat change:knowledge-nobility-item change:knowledge-nobility-size change:knowledge-nobility-acp change:knowledge-nobility-misc change:knowledge-nobility-ReqTrain"
	,function(){PFSheet.updateSkill("Knowledge-Nobility");});

on("change:knowledge-planes-ability",function(){PFSheet.handleDropdown("Knowledge-Planes-ability",["Knowledge-Planes-ability-mod"]);});
on("change:knowledge-planes-cs change:knowledge-planes-ranks change:knowledge-planes-class change:checks-cond change:knowledge-planes-ability-mod change:knowledge-planes-racial change:knowledge-planes-feat change:knowledge-planes-item change:knowledge-planes-size change:knowledge-planes-acp change:knowledge-planes-misc change:knowledge-planes-ReqTrain"
	,function(){PFSheet.updateSkill("Knowledge-Planes");});

on("change:knowledge-religion-ability",function(){PFSheet.handleDropdown("Knowledge-Religion-ability",["Knowledge-Religion-ability-mod"]);});
on("change:knowledge-religion-cs change:knowledge-religion-ranks change:knowledge-religion-class change:checks-cond change:knowledge-religion-ability-mod change:knowledge-religion-racial change:knowledge-religion-feat change:knowledge-religion-item change:knowledge-religion-size change:knowledge-religion-acp change:knowledge-religion-misc change:knowledge-religion-ReqTrain"
	,function(){PFSheet.updateSkill("Knowledge-Religion");});

on("change:perception-ability",function(){PFSheet.handleDropdown("Perception-ability",["Perception-ability-mod"]);});
on("change:perception-cs change:perception-ranks change:perception-class change:checks-cond change:perception-ability-mod change:perception-racial change:perception-feat change:perception-item change:perception-size change:perception-acp change:perception-misc change:perception-ReqTrain"
	,function(){PFSheet.updateSkill("Perception");});

on("change:perform-ability",function(){PFSheet.handleDropdown("Perform-ability",["Perform-ability-mod"]);});
on("change:perform-cs change:perform-ranks change:perform-class change:checks-cond change:perform-ability-mod change:perform-racial change:perform-feat change:perform-item change:perform-size change:perform-acp change:perform-misc change:perform-ReqTrain"
	,function(){PFSheet.updateSkill("Perform");});

on("change:perform2-ability",function(){PFSheet.handleDropdown("Perform2-ability",["Perform2-ability-mod"]);});
on("change:perform2-cs change:perform2-ranks change:perform2-class change:checks-cond change:perform2-ability-mod change:perform2-racial change:perform2-feat change:perform2-item change:perform2-size change:perform2-acp change:perform2-misc change:perform2-ReqTrain"
	,function(){PFSheet.updateSkill("Perform2");});

on("change:perform3-ability",function(){PFSheet.handleDropdown("Perform3-ability",["Perform3-ability-mod"]);});
on("change:perform3-cs change:perform3-ranks change:perform3-class change:checks-cond change:perform3-ability-mod change:perform3-racial change:perform3-feat change:perform3-item change:perform3-size change:perform3-acp change:perform3-misc change:perform3-ReqTrain"
	,function(){PFSheet.updateSkill("Perform3");});

on("change:profession-ability",function(){PFSheet.handleDropdown("Profession-ability",["Profession-ability-mod"]);});
on("change:profession-cs change:profession-ranks change:profession-class change:checks-cond change:profession-ability-mod change:profession-racial change:profession-feat change:profession-item change:profession-size change:profession-acp change:profession-misc change:profession-ReqTrain"
	,function(){PFSheet.updateSkill("Profession");});

on("change:profession2-ability",function(){PFSheet.handleDropdown("Profession2-ability",["Profession2-ability-mod"]);});
on("change:profession2-cs change:profession2-ranks change:profession2-class change:checks-cond change:profession2-ability-mod change:profession2-racial change:profession2-feat change:profession2-item change:profession2-size change:profession2-acp change:profession2-misc change:profession2-ReqTrain"
	,function(){PFSheet.updateSkill("Profession2");});

on("change:profession3-ability",function(){PFSheet.handleDropdown("Profession3-ability",["Profession3-ability-mod"]);});
on("change:profession3-cs change:profession3-ranks change:profession3-class change:checks-cond change:profession3-ability-mod change:profession3-racial change:profession3-feat change:profession3-item change:profession3-size change:profession3-acp change:profession3-misc change:profession3-ReqTrain"
	,function(){PFSheet.updateSkill("Profession3");});

on("change:ride-ability",function(){PFSheet.handleDropdown("Ride-ability",["Ride-ability-mod"]);});
on("change:acp change:ride-cs change:ride-ranks change:ride-class change:checks-cond change:ride-ability-mod change:ride-racial change:ride-feat change:ride-item change:ride-size change:ride-acp change:ride-misc change:ride-ReqTrain"
	,function(){PFSheet.updateSkill("Ride");});

on("change:sense-Motive-ability",function(){PFSheet.handleDropdown("Sense-Motive-ability",["Sense-Motive-ability-mod"]);});
on("change:sense-Motive-cs change:sense-Motive-ranks change:sense-Motive-class change:checks-cond change:sense-Motive-ability-mod change:sense-Motive-racial change:sense-Motive-feat change:sense-Motive-item change:sense-Motive-size change:sense-Motive-acp change:sense-Motive-misc change:sense-Motive-ReqTrain"
	,function(){PFSheet.updateSkill("Sense-Motive");});

on("change:sleight-of-Hand-ability",function(){PFSheet.handleDropdown("Sleight-of-Hand-ability",["Sleight-of-Hand-ability-mod"]);});
on("change:sleight-of-Hand-cs change:sleight-of-Hand-ranks change:sleight-of-Hand-class change:checks-cond change:sleight-of-Hand-ability-mod change:sleight-of-Hand-racial change:sleight-of-Hand-feat change:sleight-of-Hand-item change:sleight-of-Hand-size change:sleight-of-Hand-acp change:sleight-of-Hand-misc change:sleight-of-Hand-ReqTrain"
	,function(){PFSheet.updateSkill("Sleight-of-Hand");});

on("change:spellcraft-ability",function(){PFSheet.handleDropdown("Spellcraft-ability",["Spellcraft-ability-mod"]);});
on("change:spellcraft-cs change:spellcraft-ranks change:spellcraft-class change:checks-cond change:spellcraft-ability-mod change:spellcraft-racial change:spellcraft-feat change:spellcraft-item change:spellcraft-size change:spellcraft-acp change:spellcraft-misc change:spellcraft-ReqTrain"
	,function(){PFSheet.updateSkill("Spellcraft");});

on("change:stealth-ability",function(){PFSheet.handleDropdown("Stealth-ability",["Stealth-ability-mod"]);});
on("change:acp change:size_skill_double change:stealth-cs change:stealth-ranks change:stealth-class change:checks-cond change:stealth-ability-mod change:stealth-racial change:stealth-feat change:stealth-item change:stealth-size change:stealth-acp change:stealth-misc change:stealth-ReqTrain"
	,function(){PFSheet.updateSkill("Stealth");});

on("change:survival-ability",function(){PFSheet.handleDropdown("Survival-ability",["Survival-ability-mod"]);});
on("change:survival-cs change:survival-ranks change:survival-class change:checks-cond change:survival-ability-mod change:survival-racial change:survival-feat change:survival-item change:survival-size change:survival-acp change:survival-misc change:survival-ReqTrain"
	,function(){PFSheet.updateSkill("Survival");});

on("change:swim-ability",function(){PFSheet.handleDropdown("Swim-ability",["Swim-ability-mod"]);});
on("change:acp change:swim-cs change:swim-ranks change:swim-class change:checks-cond change:swim-ability-mod change:swim-racial change:swim-feat change:swim-item change:swim-size change:swim-acp change:swim-misc change:swim-ReqTrain"
	,function(){PFSheet.updateSkill("Swim");});

on("change:use-magic-device-ability",function(){PFSheet.handleDropdown("Use-Magic-Device-ability",["Use-Magic-Device-ability-mod"]);});
on("change:use-magic-device-cs change:use-magic-device-ranks change:use-magic-device-class change:checks-cond change:use-magic-device-ability-mod change:use-magic-device-racial change:use-magic-device-feat change:use-magic-device-item change:use-magic-device-size change:use-magic-device-acp change:use-magic-device-misc change:use-magic-device-ReqTrain"
	,function(){PFSheet.updateSkill("Use-Magic-Device");});

on("change:misc-skill-0-ability",function(){PFSheet.handleDropdown("Misc-Skill-0-ability",["Misc-Skill-0-ability-mod"]);});
on("change:misc-skill-0-cs change:misc-skill-0-ranks change:misc-skill-0-class change:checks-cond change:misc-skill-0-ability-mod change:misc-skill-0-racial change:misc-skill-0-feat change:misc-skill-0-item change:misc-skill-0-size change:misc-skill-0-acp change:misc-skill-0-misc change:misc-skill-0-ReqTrain"
	,function(){PFSheet.updateSkill("Misc-Skill-0");});

on("change:misc-skill-1-ability",function(){PFSheet.handleDropdown("Misc-Skill-1-ability",["Misc-Skill-1-ability-mod"]);});
on("change:misc-skill-1-cs change:misc-skill-1-ranks change:misc-skill-1-class change:checks-cond change:misc-skill-1-ability-mod change:misc-skill-1-racial change:misc-skill-1-feat change:misc-skill-1-item change:misc-skill-1-size change:misc-skill-1-acp change:misc-skill-1-misc change:misc-skill-1-ReqTrain"
	,function(){PFSheet.updateSkill("Misc-Skill-1");});

on("change:misc-skill-2-ability",function(){PFSheet.handleDropdown("Misc-Skill-2-ability",["Misc-Skill-2-ability-mod"]);});
on("change:misc-skill-2-cs change:misc-skill-2-ranks change:misc-skill-2-class change:checks-cond change:misc-skill-2-ability-mod change:misc-skill-2-racial change:misc-skill-2-feat change:misc-skill-2-item change:misc-skill-2-size change:misc-skill-2-acp change:misc-skill-2-misc change:misc-skill-2-ReqTrain"
	,function(){PFSheet.updateSkill("Misc-Skill-2");});

on("change:misc-skill-3-ability",function(){PFSheet.handleDropdown("Misc-Skill-3-ability",["Misc-Skill-3-ability-mod"]);});
on("change:misc-skill-3-cs change:misc-skill-3-ranks change:misc-skill-3-class change:checks-cond change:misc-skill-3-ability-mod change:misc-skill-3-racial change:misc-skill-3-feat change:misc-skill-3-item change:misc-skill-3-size change:misc-skill-3-acp change:misc-skill-3-misc change:misc-skill-3-ReqTrain"
	,function(){PFSheet.updateSkill("Misc-Skill-3");});

on("change:misc-skill-4-ability",function(){PFSheet.handleDropdown("Misc-Skill-4-ability",["Misc-Skill-4-ability-mod"]);});
on("change:misc-skill-4-cs change:misc-skill-4-ranks change:misc-skill-4-class change:checks-cond change:misc-skill-4-ability-mod change:misc-skill-4-racial change:misc-skill-4-feat change:misc-skill-4-item change:misc-skill-4-size change:misc-skill-4-acp change:misc-skill-4-misc change:misc-skill-4-ReqTrain"
	,function(){PFSheet.updateSkill("Misc-Skill-4");});

on("change:misc-skill-5-ability",function(){PFSheet.handleDropdown("Misc-Skill-5-ability",["Misc-Skill-5-ability-mod"]);});
on("change:misc-skill-5-cs change:misc-skill-5-ranks change:misc-skill-5-class change:checks-cond change:misc-skill-5-ability-mod change:misc-skill-5-racial change:misc-skill-5-feat change:misc-skill-5-item change:misc-skill-5-size change:misc-skill-5-acp change:misc-skill-5-misc change:misc-skill-5-ReqTrain"
	,function(){PFSheet.updateSkill("Misc-Skill-5");});

on("change:cS-Acrobatics-ability",function(){PFSheet.handleDropdown("CS-Acrobatics-ability",["CS-Acrobatics-ability-mod"]);});
on("change:acp change:cS-Acrobatics-cs change:cS-Acrobatics-ranks change:cS-Acrobatics-class change:checks-cond change:cS-Acrobatics-ability-mod change:cS-Acrobatics-racial change:cS-Acrobatics-feat change:cS-Acrobatics-item change:cS-Acrobatics-size change:cS-Acrobatics-acp change:cS-Acrobatics-misc change:cS-Acrobatics-ReqTrain"
	,function(){PFSheet.updateSkill("CS-Acrobatics");});

on("change:cS-Athletics-ability",function(){PFSheet.handleDropdown("CS-Athletics-ability",["CS-Athletics-ability-mod"]);});
on("change:acp change:cS-Athletics-cs change:cS-Athletics-ranks change:cS-Athletics-class change:checks-cond change:cS-Athletics-ability-mod change:cS-Athletics-racial change:cS-Athletics-feat change:cS-Athletics-item change:cS-Athletics-size change:cS-Athletics-acp change:cS-Athletics-misc change:cS-Athletics-ReqTrain"
	,function(){PFSheet.updateSkill("CS-Athletics");});


on("change:cs-finesse-ability",function(){PFSheet.handleDropdown("CS-Finesse-ability",["CS-Finesse-ability-mod"]);});
on("change:cs-finesse-cs change:cs-finesse-ranks change:cs-finesse-class change:checks-cond change:cs-finesse-ability-mod change:cs-finesse-racial change:cs-finesse-feat change:cs-finesse-item change:cs-finesse-size change:cs-finesse-acp change:cs-finesse-misc change:cs-finesse-ReqTrain"
	,function(){PFSheet.updateSkill("CS-Finesse");});

on("change:cs-influence-ability",function(){PFSheet.handleDropdown("CS-Influence-ability",["CS-Influence-ability-mod"]);});
on("change:cs-influence-cs change:cs-influence-ranks change:cs-influence-class change:checks-cond change:cs-influence-ability-mod change:cs-influence-racial change:cs-influence-feat change:cs-influence-item change:cs-influence-size change:cs-influence-acp change:cs-influence-misc change:cs-influence-ReqTrain"
	,function(){PFSheet.updateSkill("CS-Influence");});

on("change:cs-nature-ability",function(){PFSheet.handleDropdown("CS-Nature-ability",["CS-Nature-ability-mod"]);});
on("change:cs-nature-cs change:cs-nature-ranks change:cs-nature-class change:checks-cond change:cs-nature-ability-mod change:cs-nature-racial change:cs-nature-feat change:cs-nature-item change:cs-nature-size change:cs-nature-acp change:cs-nature-misc change:cs-nature-ReqTrain"
	,function(){PFSheet.updateSkill("CS-Nature");});

on("change:cs-perception-ability",function(){PFSheet.handleDropdown("CS-Perception-ability",["CS-Perception-ability-mod"]);});
on("change:cs-perception-cs change:cs-perception-ranks change:cs-perception-class change:checks-cond change:cs-perception-ability-mod change:cs-perception-racial change:cs-perception-feat change:cs-perception-item change:cs-perception-size change:cs-perception-acp change:cs-perception-misc change:cs-perception-ReqTrain"
	,function(){PFSheet.updateSkill("CS-Perception");});

on("change:cs-performance-ability",function(){PFSheet.handleDropdown("CS-Performance-ability",["CS-Performance-ability-mod"]);});
on("change:cs-performance-cs change:cs-performance-ranks change:cs-performance-class change:checks-cond change:cs-performance-ability-mod change:cs-performance-racial change:cs-performance-feat change:cs-performance-item change:cs-performance-size change:cs-performance-acp change:cs-performance-misc change:cs-performance-ReqTrain"
	,function(){PFSheet.updateSkill("CS-Performance");});

on("change:cs-religion-ability",function(){PFSheet.handleDropdown("CS-Religion-ability",["CS-Religion-ability-mod"]);});
on("change:cs-religion-cs change:cs-religion-ranks change:cs-religion-class change:checks-cond change:cs-religion-ability-mod change:cs-religion-racial change:cs-religion-feat change:cs-religion-item change:cs-religion-size change:cs-religion-acp change:cs-religion-misc change:cs-religion-ReqTrain"
	,function(){PFSheet.updateSkill("CS-Religion");});

on("change:cs-society-ability",function(){PFSheet.handleDropdown("CS-Society-ability",["CS-Society-ability-mod"]);});
on("change:cs-society-cs change:cs-society-ranks change:cs-society-class change:checks-cond change:cs-society-ability-mod change:cs-society-racial change:cs-society-feat change:cs-society-item change:cs-society-size change:cs-society-acp change:cs-society-misc change:cs-society-ReqTrain"
	,function(){PFSheet.updateSkill("CS-Society");});

on("change:cs-spellcraft-ability",function(){PFSheet.handleDropdown("CS-Spellcraft-ability",["CS-Spellcraft-ability-mod"]);});
on("change:cs-spellcraft-cs change:cs-spellcraft-ranks change:cs-spellcraft-class change:checks-cond change:cs-spellcraft-ability-mod change:cs-spellcraft-racial change:cs-spellcraft-feat change:cs-spellcraft-item change:cs-spellcraft-size change:cs-spellcraft-acp change:cs-spellcraft-misc change:cs-spellcraft-ReqTrain"
	,function(){PFSheet.updateSkill("CS-Spellcraft");});


on("change:cs-stealth-ability",function(){PFSheet.handleDropdown("CS-Stealth-ability",["CS-Stealth-ability-mod"]);});
on("change:checks-cond change:acp change:cs-stealth-cs change:cs-stealth-ranks change:cs-stealth-class change:cs-stealth-ability-mod change:cs-stealth-racial change:cs-stealth-feat change:cs-stealth-item change:cs-stealth-size change:cs-stealth-acp change:cs-stealth-misc change:cs-stealth-ReqTrain"
	,function(){PFSheet.updateSkill("CS-Stealth");});

on("change:cs-survival-ability",function(){PFSheet.handleDropdown("CS-Survival-ability",["CS-Survival-ability-mod"]);});
on("change:cs-survival-cs change:cs-survival-ranks change:cs-survival-class change:cs-survival-ability-mod change:cs-survival-racial change:cs-survival-feat change:cs-survival-item change:cs-survival-size change:cs-survival-acp change:cs-survival-misc change:cs-survival-ReqTrain"
	,function(){PFSheet.updateSkill("CS-Survival");});

//buffs
on("change:buff_check-total", function() {
	PFSheet.updateConditionCheckPenalty();
});

//Abilities
//on("change:str-base change:str-enhance change:str-misc change:str-temp change:str-damage change:str-penalty change:str-drain change:buff_str-total change:str-cond", function() { PFSheet.updateAbility("STR"); });
//on("change:dex-base change:dex-enhance change:dex-misc change:dex-temp change:dex-damage change:dex-penalty change:dex-drain change:buff_dex-total change:dex-cond", function() { PFSheet.updateAbility("DEX"); });
//on("change:con-base change:con-enhance change:con-misc change:con-temp change:con-damage change:con-penalty change:con-drain change:buff_con-total change:con-cond", function() { PFSheet.updateAbility("CON"); });
//on("change:int-base change:int-enhance change:int-misc change:int-temp change:int-damage change:int-penalty change:int-drain change:buff_int-total change:int-cond", function() { PFSheet.updateAbility("INT"); });
//on("change:wis-base change:wis-enhance change:wis-misc change:wis-temp change:wis-damage change:wis-penalty change:wis-drain change:buff_wis-total change:wis-cond", function() { PFSheet.updateAbility("WIS"); });
//on("change:cha-base change:cha-enhance change:cha-misc change:cha-temp change:cha-damage change:cha-penalty change:cha-drain change:buff_cha-total change:cha-cond", function() { PFSheet.updateAbility("CHA"); });

on("change:str-base change:str-enhance change:str-misc change:str-temp change:str-damage change:str-penalty change:str-drain", function() { PFSheet.updateAbility("STR"); });
on("change:dex-base change:dex-enhance change:dex-misc change:dex-temp change:dex-damage change:dex-penalty change:dex-drain", function() { PFSheet.updateAbility("DEX"); });
on("change:con-base change:con-enhance change:con-misc change:con-temp change:con-damage change:con-penalty change:con-drain change:con-cond", function() { PFSheet.updateAbility("CON"); });
on("change:int-base change:int-enhance change:int-misc change:int-temp change:int-damage change:int-penalty change:int-drain change:int-cond", function() { PFSheet.updateAbility("INT"); });
on("change:wis-base change:wis-enhance change:wis-misc change:wis-temp change:wis-damage change:wis-penalty change:wis-drain change:wis-cond", function() { PFSheet.updateAbility("WIS"); });
on("change:cha-base change:cha-enhance change:cha-misc change:cha-temp change:cha-damage change:cha-penalty change:cha-drain change:cha-cond", function() { PFSheet.updateAbility("CHA"); });



//Conditions
on("change:condition-fatigued change:condition-entangled", function() { PFSheet.updateConditionAbilityPenalty(); });
on("change:condition-grappled", function() {  PFSheet.updateGrapple(); });
on("change:condition-pinned", function() { PFSheet.updatePin();});

on("change:condition-drained", function() {
	PFSheet.updateHP();
});
on("change:condition-wounds change:condition-fear change:condition-sickened change:condition-drained", function(eventInfo) {
	PFSheet.updateConditionCheckPenalty();
	PFSheet.updateConditionsSavePenalty();
	PFSheet.updateConditionAttackPenalty();
});

on("change:condition-blinded", function(eventInfo) {
	PFSheet.updateConditionCheckPenalty();
	PFSheet.updateConditionDefensePenalty(eventInfo);
});

on ("change:condition-drained change:condition-wounds change:condition-cowering change:condition-flat-footed change:condition-stunned change:condition-pinned", function(eventInfo) {
	PFSheet.updateConditionDefensePenalty(eventInfo);
});

on("change:acp-attack-mod change:condition-dazzled change:condition-entangled change:condition-grappled",function() {
	PFSheet.updateConditionAttackPenalty();
});
on("change:condition-invisible change:condition-prone", function() {
	PFSheet.updateConditionAttackPenalty();
});

on("change:condition-grappled change:condition-invisible", function() {
	PFSheet.updateConditionAttackNote();
});

//init
on("change:init-ability", function() {  PFSheet.handleDropdown("init-ability",["init-ability-mod"]);});
on("change:init-ability-mod change:init-trait change:init-misc change:condition-deafened",function(){ PFSheet.updateInit(); });

//hp
on("change:hp-ability", function () {PFSheet.handleDropdown("HP-ability",["HP-ability-mod"]);});
on("change:hp-ability-mod change:level change:total-hp change:total-mythic-hp change:hp-formula-mod change:HP-misc change:mythic-adventures-show", function () { PFSheet.updateHP(); });
on("change:hp-temp-misc change:buff_hp-temp-total", function() { PFSheet.updateTempHP(); });
on("change:hp-formula-macro-text",function(){SWUtils.evaluateAndSetNumber("HP-formula-macro-text","HP-formula-mod");});




//classes
on("change:class-0-hp change:class-1-hp change:class-2-hp change:class-3-hp change:class-4-hp change:class-5-hp", function() {PFSheet.updateClassInformation("hp");});
on("change:class-0-fchp change:class-1-fchp change:class-2-fchp change:class-3-fchp change:class-4-fchp change:class-5-fchp", function() {PFSheet.updateClassInformation("fchp");});
on("change:class-0-bab change:class-1-bab change:class-2-bab change:class-3-bab change:class-4-bab change:class-5-bab", function() {PFSheet.updateClassInformation("bab");});
on("change:class-0-skill change:class-1-skill change:class-2-skill change:class-3-skill change:class-4-skill change:class-5-skill", function() {PFSheet.updateClassInformation("skill");});
on("change:class-0-fcskill change:class-1-fcskill change:class-2-fcskill change:class-3-fcskill change:class-4-fcskill change:class-5-fcskill", function() {PFSheet.updateClassInformation("fcskill");});
on("change:class-0-fcalt change:class-1-fcalt change:class-2-fcalt change:class-3-fcalt change:class-4-fcalt change:class-5-fcalt", function() {PFSheet.updateClassInformation("fcalt");});
on("change:class-0-fort change:class-1-fort change:class-2-fort change:class-3-fort change:class-4-fort change:class-5-fort", function() {PFSheet.updateClassInformation("Fort");});
on("change:class-0-ref change:class-1-ref change:class-2-ref change:class-3-ref change:class-4-ref change:class-5-ref", function() {PFSheet.updateClassInformation("Ref");});
on("change:class-0-will change:class-1-will change:class-2-will change:class-3-will change:class-4-will change:class-5-will", function() {PFSheet.updateClassInformation("Will");});
on("change:class-0-level change:class-1-level change:class-2-level change:class-3-level change:class-4-level change:class-5-level", function() {
	PFSheet.updateClassInformation("level");
	PFSheet.updateClassInformation("skill");
});

//mythic paths
on("change:mythic-tier change:mythic-hp", function () { PFSheet.updateMythicPathInformation(); });
//mythic power
on("change:mythic-tier", function () { PFSheet.updateTierMythicPower(); });
on("change:misc-mythic-power change:tier-mythic-power", function () { PFSheet.updateMythicPower(); });
//mythic features/abilities
on("change:repeating_mythic-ability:max-calculation",function(){ SWUtils.evaluateAndSetNumber("repeating_mythic-ability_max-calculation","repeating_mythic-ability_used_max");});

//mythic feats
on("change:repeating_mythic-feat:max-calculation", function () { SWUtils.evaluateAndSetNumber("repeating_mythic-feat_max-calculation", "repeating_mythic-feat_used_max"); });
//class abilities
on("change:repeating_class-ability:max-calculation",function(){ SWUtils.evaluateAndSetNumber("repeating_class-ability_max-calculation","repeating_class-ability_used_max");});
//on("change:repeating_class-ability:max-calculation",function(eventInfo){ console.log("Detected change to "+eventInfo.sourceAttribute);});

//defense dropdowns
//on("change:ac-ability", function () {PFSheet.handleDefenseDropdown("AC-ability");});
//on("change:ff-ability", function () {PFSheet.handleDefenseDropdown("FF-ability");});
//on("change:cmd-ability1", function () {PFSheet.handleDefenseDropdown("CMD-ability1");});
//on("change:cmd-ability2", function () {PFSheet.handleDefenseDropdown("CMD-ability2");});
//on("change:cmd-ability", function () {PFSheet.handleDefenseDropdown("CMD-ability");});

on("change:ac-ability change:ff-ability change:cmd-ability1 change:cmd-ability2 change:cmd-ability"
	, function (eventInfo) {PFSheet.handleDefenseDropdown(eventInfo.sourceAttribute);});


//defenses
on("change:condition-stunned change:condition-flat-footed change:ac-ability-mod change:ff-dex change:ac-penalty change:cmd-penalty change:size change:ac-dodge change:ac-natural change:ac-deflect change:ac-misc change:ac-shield change:ac-armor change:cmd-dex change:ff-cmd-dex change:cmd-str change:cmd-misc change:buff_ac-total change:buff_touch-total change:buff_cmd-total change:bab change:max-dex"
	,function(eventInfo) { PFSheet.updateDefenses(eventInfo); });

on("change:shield-equipped change:shield-acbonus change:shield-max-dex change:shield-acp change:shield-spell-fail change:shield-proficiency "
   +"change:shield2-equipped change:shield2-acbonus change:shield2-max-dex change:shield2-acp change:shield2-spell-fail change:shield2-proficiency "
   +"change:armor-equipped change:armor-acbonus change:armor-max-dex change:armor-acp change:armor-spell-fail change:armor-proficiency "
   +"change:armor2-equipped change:armor2-acbonus change:armor2-max-dex change:armor2-acp change:armor2-spell-fail change:armor2-proficiency "
   +"change:max-dex-source change:acp-source"
	,function(eventInfo){PFSheet.updateArmor(eventInfo.sourceAttribute); });

//saves
on("change:saves-cond change:total-fort change:fort-ability-mod change:fort-trait change:fort-enhance change:fort-resist change:fort-misc change:buff_fort-total",function(){
	PFSheet.updateSave("Fort");
});
on("change:saves-cond change:total-ref change:ref-ability-mod change:ref-trait change:ref-enhance change:ref-resist change:ref-misc change:buff_ref-total",function(){
	PFSheet.updateSave("Ref");
});
on("change:saves-cond change:total-will change:will-ability-mod change:will-trait change:will-enhance change:will-resist change:will-misc change:buff_will-total",function(){
	PFSheet.updateSave("Will");
});
on("change:fort-ability", function(){PFSheet.handleDropdown  ("Fort-ability","Fort-ability-mod");   });
on("change:ref-ability", function(){PFSheet.handleDropdown  ("Ref-ability","Ref-ability-mod");   });
on("change:will-ability", function(){PFSheet.handleDropdown  ("Will-ability","Will-ability-mod");   });


//attacks
on("change:melee-ability", function () {PFSheet.handleDropdown("melee-ability","melee-ability-mod");});
on("change:ranged-ability", function () {PFSheet.handleDropdown("ranged-ability","ranged-ability-mod");});
on("change:cmb-ability", function () {PFSheet.handleDropdown("CMB-ability","CMB-ability-mod");});
on("change:bab change:size change:melee-ability-mod change:buff_melee-total change:attk-melee-misc change:attk-penalty",function() { PFSheet.updateAttack("melee"); });
on("change:bab change:size change:ranged-ability-mod change:buff_ranged-total change:attk-ranged-misc change:attk-penalty",function() { PFSheet.updateAttack("ranged"); });
on("change:bab change:CMD-size change:cmb-ability-mod change:cmb-total change:attk-cmb-misc change:attk-penalty",function() { PFSheet.updateAttack("CMB"); });
on("change:condition-Sickened change:buff_dmg-total",function(){PFSheet.updateDamage();});


//attack effects
on("change:attk-effect_mod_1 change:attk-effect_mod_1_Toggle change:attk-effect_mod_2 change:attk-effect_mod_2_Toggle change:attk-effect_mod_3 change:attk-effect_mod_3_Toggle change:attk-effect_mod_4 change:attk-effect_mod_4_Toggle"
	,function(){ PFSheet.updateAttackEffectTotals();
	});
on("change:dmg-effect_mod_1 change:dmg-effect_mod_1_Toggle change:dmg-effect_mod_2 change:dmg-effect_mod_2_Toggle change:dmg-effect_mod_3 change:dmg-effect_mod_3_Toggle change:dmg-effect_mod_4 change:dmg-effect_mod_4_Toggle"
	,function(){ PFSheet.updateDMGEffectTotals();
	});
//repeating weapons
on("change:attk-effect-total",function(eventInfo){PFSheet.updateRepeatingWeaponAttacks(eventInfo);});
on("change:dmg-effect-total change:dmg-mod", function(){PFSheet.updateRepeatingWeaponDamages();});


on("change:repeating_weapon:attack-type-mod change:repeating_weapon:masterwork change:repeating_weapon:proficiency change:repeating_weapon:attack-mod"
	, function(eventInfo) { PFSheet.updateRepeatingWeaponAttack(null,eventInfo);
	});
on("change:repeating_weapon:damage-ability-mod change:repeating_weapon:damage-mod change:repeating_weapon:damage-ability-max"
	,function() { PFSheet.updateRepeatingWeaponDamage();
	});

on("change:repeating_weapon:attack-type",function(eventInfo) {PFSheet.handleRepeatingAttackDropdown(null,eventInfo);});
on("change:repeating_weapon:damage-ability",function() {PFSheet.handleRepeatingDamageDropdown();});
on("change:repeating_weapon:damage",function(){SWUtils.evaluateAndSetNumber("repeating_weapon_damage","repeating_weapon_damage-mod");});
on("change:repeating_weapon:attack",function(){SWUtils.evaluateAndSetNumber("repeating_weapon_attack","repeating_weapon_attack-mod");});

on("change:repeating_weapon:enhance",function(eventInfo) {
	PFSheet.updateRepeatingWeaponAttack(null,eventInfo);
	PFSheet.updateRepeatingWeaponDamage();
});

//size
on("change:size",function(){
	PFSheet.updateSize();
	PFSheet.updateDamageNote();
});
//feats
on("change:repeating_feat:max-calculation",function(){  SWUtils.evaluateAndSetNumber("repeating_feat_max-calculation","repeating_feat_used_max");});
//racial-traits
on("change:repeating_racial-trait:max-calculation",function(){  SWUtils.evaluateAndSetNumber("repeating_racial-trait_max-calculation","repeating_racial-trait_used_max");});
//traits
on("change:repeating_trait:max-calculation",function(){ SWUtils.evaluateAndSetNumber("repeating_trait_max-calculation","repeating_trait_used_max");});



//skills
on("change:total-skill change:total-fcskill change:int-mod change:level change:max-skill-ranks-mod change:Max-Skill-Ranks-Misc2 change:unchained_skills-show change:BG-Skill-Use",function() { PFSheet.updateMaxSkills(); });
on("change:max-skill-ranks-misc",function(){SWUtils.evaluateAndSetNumber("Max-Skill-Ranks-Misc","Max-Skill-Ranks-mod");});



on("change:size_skill",function(){PFSheet.updateSkill("Fly");});

on("change:size_skill_double",function(){   PFSheet.updateSkill("Stealth");});

on("change:Phys-skills-cond",function() {
	PFSheet.updateSkill("Acrobatics");
	PFSheet.updateSkill("Climb");
	PFSheet.updateSkill("Disable-Device");
	PFSheet.updateSkill("Escape-Artist");
	PFSheet.updateSkill("Fly");
	PFSheet.updateSkill("Intimidate");
	PFSheet.updateSkill("Ride");
	PFSheet.updateSkill("Sleight-of-Hand");
	PFSheet.updateSkill("Stealth");
	PFSheet.updateSkill("Swim");
	PFSheet.updateSkill("CS-Acrobatics");
	PFSheet.updateSkill("CS-Athletics");
	PFSheet.updateSkill("CS-Finesse");
	PFSheet.updateSkill("CS-Stealth");
});
on("change:Perception-cond",function() {
	PFSheet.updateSkill("Perception");
	PFSheet.updateSkill("CS-Perception");
});

//sheet
on("sheet:opened",function(){PFSheet.checkForUpdate();});
on("change:recalc1",function(){PFSheet.checkForUpdate();});

//npc sheet
on("change:npc-hd change:npc-hd-num change:npc-hd2 change:npc-hd-num2 change:npc-hd-misc-mod",function() {PFSheet.updateNPCHP();});
on("change:npc-hd-misc",function(){ SWUtils.evaluateAndSetNumber("NPC-HD-misc","NPC-HD-misc-mod");});


//spells
on("change:spellclass-0",function(){ PFSheet.handleSpellClassDropdown(0);});
on("change:spellclass-1",function(){ PFSheet.handleSpellClassDropdown(1);});
on("change:spellclass-2",function(){ PFSheet.handleSpellClassDropdown(2);});

on("change:class-0-level", function(){ PFSheet.updateSpellClassLevel(0);});
on("change:class-1-level", function(){ PFSheet.updateSpellClassLevel(1);});
on("change:class-2-level", function(){ PFSheet.updateSpellClassLevel(2);});
on("change:class-3-level", function(){ PFSheet.updateSpellClassLevel(3);});
on("change:class-4-level", function(){ PFSheet.updateSpellClassLevel(4);});
on("change:class-5-level", function(){ PFSheet.updateSpellClassLevel(5);});


on("change:concentration-0-ability", function () {PFSheet.handleConcentrationAbilityDropdown(0);});
on("change:concentration-1-ability", function () {PFSheet.handleConcentrationAbilityDropdown(1);});
on("change:concentration-2-ability", function () {PFSheet.handleConcentrationAbilityDropdown(2);});


on("change:concentration-0-mod",function(){PFSheet.ifSpellClassExists(0,function(){PFSheet.updateBonusSpells(0);PFSheet.updateSaveDCs(0);});});
on("change:concentration-1-mod",function(){PFSheet.ifSpellClassExists(1,function(){PFSheet.updateBonusSpells(1);PFSheet.updateSaveDCs(1);});});
on("change:concentration-2-mod",function(){PFSheet.ifSpellClassExists(2,function(){PFSheet.updateBonusSpells(2);PFSheet.updateSaveDCs(2);});});

on("change:concentration-0-mod change:buff_check-total change:concentration-0-misc", function () {PFSheet.ifSpellClassExists(0,function(){PFSheet.updateConcentration(0);});});
on("change:concentration-1-mod change:buff_check-total change:concentration-1-misc", function () {PFSheet.ifSpellClassExists(1,function(){PFSheet.updateConcentration(1);});});
on("change:concentration-2-mod change:buff_check-total change:concentration-2-misc", function () {PFSheet.ifSpellClassExists(2,function(){PFSheet.updateConcentration(2);});});

on("change:spellclass-0-level-total", function () {
	PFSheet.updateConcentration(0);
	PFSheet.updateSpellPenetration(0);
});
on("change:spellclass-1-level-total", function () {
	PFSheet.updateConcentration(1);
	PFSheet.updateSpellPenetration(1);
});
on("change:spellclass-2-level-total", function () {
	PFSheet.updateConcentration(2);
	PFSheet.updateSpellPenetration(2);
});
on("change:spellclass-0-SP_misc", function () {
	PFSheet.updateSpellPenetration(0);
});
on("change:spellclass-1-SP_misc", function () {
	PFSheet.updateSpellPenetration(1);
});
on("change:spellclass-2-SP_misc", function () {
	PFSheet.updateSpellPenetration(2);
});
on("change:condition-Deafened",function(){PFSheet.updateCastingPenaltyNote();});



on("change:spellclass-0-level-0-class change:spellclass-0-level-0-bonus change:spellclass-0-level-0-misc",function() {PFSheet.updateMaxSpellsPerDay(0,0);});
on("change:spellclass-0-level-1-class change:spellclass-0-level-1-bonus change:spellclass-0-level-1-misc",function() {PFSheet.updateMaxSpellsPerDay(0,1);});
on("change:spellclass-0-level-2-class change:spellclass-0-level-2-bonus change:spellclass-0-level-2-misc",function() {PFSheet.updateMaxSpellsPerDay(0,2);});
on("change:spellclass-0-level-3-class change:spellclass-0-level-3-bonus change:spellclass-0-level-3-misc",function() {PFSheet.updateMaxSpellsPerDay(0,3);});
on("change:spellclass-0-level-4-class change:spellclass-0-level-4-bonus change:spellclass-0-level-4-misc",function() {PFSheet.updateMaxSpellsPerDay(0,4);});
on("change:spellclass-0-level-5-class change:spellclass-0-level-5-bonus change:spellclass-0-level-5-misc",function() {PFSheet.updateMaxSpellsPerDay(0,5);});
on("change:spellclass-0-level-6-class change:spellclass-0-level-6-bonus change:spellclass-0-level-6-misc",function() {PFSheet.updateMaxSpellsPerDay(0,6);});
on("change:spellclass-0-level-7-class change:spellclass-0-level-7-bonus change:spellclass-0-level-7-misc",function() {PFSheet.updateMaxSpellsPerDay(0,7);});
on("change:spellclass-0-level-8-class change:spellclass-0-level-8-bonus change:spellclass-0-level-8-misc",function() {PFSheet.updateMaxSpellsPerDay(0,8);});
on("change:spellclass-0-level-9-class change:spellclass-0-level-9-bonus change:spellclass-0-level-9-misc",function() {PFSheet.updateMaxSpellsPerDay(0,9);});

on("change:spellclass-1-level-0-class change:spellclass-1-level-0-bonus change:spellclass-1-level-0-misc",function() {PFSheet.updateMaxSpellsPerDay(1,0);});
on("change:spellclass-1-level-1-class change:spellclass-1-level-1-bonus change:spellclass-1-level-1-misc",function() {PFSheet.updateMaxSpellsPerDay(1,1);});
on("change:spellclass-1-level-2-class change:spellclass-1-level-2-bonus change:spellclass-1-level-2-misc",function() {PFSheet.updateMaxSpellsPerDay(1,2);});
on("change:spellclass-1-level-3-class change:spellclass-1-level-3-bonus change:spellclass-1-level-3-misc",function() {PFSheet.updateMaxSpellsPerDay(1,3);});
on("change:spellclass-1-level-4-class change:spellclass-1-level-4-bonus change:spellclass-1-level-4-misc",function() {PFSheet.updateMaxSpellsPerDay(1,4);});
on("change:spellclass-1-level-5-class change:spellclass-1-level-5-bonus change:spellclass-1-level-5-misc",function() {PFSheet.updateMaxSpellsPerDay(1,5);});
on("change:spellclass-1-level-6-class change:spellclass-1-level-6-bonus change:spellclass-1-level-6-misc",function() {PFSheet.updateMaxSpellsPerDay(1,6);});
on("change:spellclass-1-level-7-class change:spellclass-1-level-7-bonus change:spellclass-1-level-7-misc",function() {PFSheet.updateMaxSpellsPerDay(1,7);});
on("change:spellclass-1-level-8-class change:spellclass-1-level-8-bonus change:spellclass-1-level-8-misc",function() {PFSheet.updateMaxSpellsPerDay(1,8);});
on("change:spellclass-1-level-9-class change:spellclass-1-level-9-bonus change:spellclass-1-level-9-misc",function() {PFSheet.updateMaxSpellsPerDay(1,9);});

on("change:spellclass-2-level-0-class change:spellclass-2-level-0-bonus change:spellclass-2-level-0-misc",function() {PFSheet.updateMaxSpellsPerDay(2,0);});
on("change:spellclass-2-level-1-class change:spellclass-2-level-1-bonus change:spellclass-2-level-1-misc",function() {PFSheet.updateMaxSpellsPerDay(2,1);});
on("change:spellclass-2-level-2-class change:spellclass-2-level-2-bonus change:spellclass-2-level-2-misc",function() {PFSheet.updateMaxSpellsPerDay(2,2);});
on("change:spellclass-2-level-3-class change:spellclass-2-level-3-bonus change:spellclass-2-level-3-misc",function() {PFSheet.updateMaxSpellsPerDay(2,3);});
on("change:spellclass-2-level-4-class change:spellclass-2-level-4-bonus change:spellclass-2-level-4-misc",function() {PFSheet.updateMaxSpellsPerDay(2,4);});
on("change:spellclass-2-level-5-class change:spellclass-2-level-5-bonus change:spellclass-2-level-5-misc",function() {PFSheet.updateMaxSpellsPerDay(2,5);});
on("change:spellclass-2-level-6-class change:spellclass-2-level-6-bonus change:spellclass-2-level-6-misc",function() {PFSheet.updateMaxSpellsPerDay(2,6);});
on("change:spellclass-2-level-7-class change:spellclass-2-level-7-bonus change:spellclass-2-level-7-misc",function() {PFSheet.updateMaxSpellsPerDay(2,7);});
on("change:spellclass-2-level-8-class change:spellclass-2-level-8-bonus change:spellclass-2-level-8-misc",function() {PFSheet.updateMaxSpellsPerDay(2,8);});
on("change:spellclass-2-level-9-class change:spellclass-2-level-9-bonus change:spellclass-2-level-9-misc",function() {PFSheet.updateMaxSpellsPerDay(2,9);});


on("change:spellclass-0-level change:spellclass-0-level-misc change:buff_CasterLevel-total change:condition-Drained", function () {PFSheet.updateCasterLevel(0);});
on("change:spellclass-1-level change:spellclass-1-level-misc change:buff_CasterLevel-total change:condition-Drained", function () {PFSheet.updateCasterLevel(1);});
on("change:spellclass-2-level change:spellclass-2-level-misc change:buff_CasterLevel-total change:condition-Drained", function () {PFSheet.updateCasterLevel(2);});



on("change:concentration-0 change:spellclass-0-level-total change:spellclass-0-SP-mod change:concentration-0-def " +
   "change:concentration-1 change:spellclass-1-level-total change:spellclass-1-SP-mod change:concentration-1-def " +
   "change:concentration-2 change:spellclass-2-level-total change:spellclass-2-SP-mod change:concentration-2-def"
	,function() {
		PFSheet.updateSpells("lvl-0-spells");
		PFSheet.updateSpells("lvl-1-spells");
		PFSheet.updateSpells("lvl-2-spells");
		PFSheet.updateSpells("lvl-3-spells");
		PFSheet.updateSpells("lvl-4-spells");
		PFSheet.updateSpells("lvl-5-spells");
		PFSheet.updateSpells("lvl-6-spells");
		PFSheet.updateSpells("lvl-7-spells");
		PFSheet.updateSpells("lvl-8-spells");
		PFSheet.updateSpells("lvl-9-spells");
	});

on("change:spellclass-0-level-0-savedc change:spellclass-1-level-0-savedc change:spellclass-2-level-0-savedc",function() {PFSheet.updateSpells("lvl-0-spells");});
on("change:spellclass-0-level-1-savedc change:spellclass-1-level-1-savedc change:spellclass-2-level-1-savedc",function() {PFSheet.updateSpells("lvl-1-spells");});
on("change:spellclass-0-level-2-savedc change:spellclass-1-level-2-savedc change:spellclass-2-level-2-savedc",function() {PFSheet.updateSpells("lvl-2-spells");});
on("change:spellclass-0-level-3-savedc change:spellclass-1-level-3-savedc change:spellclass-2-level-3-savedc",function() {PFSheet.updateSpells("lvl-3-spells");});
on("change:spellclass-0-level-4-savedc change:spellclass-1-level-4-savedc change:spellclass-2-level-4-savedc",function() {PFSheet.updateSpells("lvl-4-spells");});
on("change:spellclass-0-level-5-savedc change:spellclass-1-level-5-savedc change:spellclass-2-level-5-savedc",function() {PFSheet.updateSpells("lvl-5-spells");});
on("change:spellclass-0-level-6-savedc change:spellclass-1-level-6-savedc change:spellclass-2-level-6-savedc",function() {PFSheet.updateSpells("lvl-6-spells");});
on("change:spellclass-0-level-7-savedc change:spellclass-1-level-7-savedc change:spellclass-2-level-7-savedc",function() {PFSheet.updateSpells("lvl-7-spells");});
on("change:spellclass-0-level-8-savedc change:spellclass-1-level-8-savedc change:spellclass-2-level-8-savedc",function() {PFSheet.updateSpells("lvl-8-spells");});
on("change:spellclass-0-level-9-savedc change:spellclass-1-level-9-savedc change:spellclass-2-level-9-savedc",function() {PFSheet.updateSpells("lvl-9-spells");});


on("change:repeating_lvl-0-spells:spellclass change:repeating_lvl-0-spells:spell_level change:repeating_lvl-0-spells:DC_misc change:repeating_lvl-0-spells:CL_misc change:repeating_lvl-0-spells:SP_misc  change:repeating_lvl-0-spells:Concentration_misc",function(eventInfo) {PFSheet.updateSpell("lvl-0-spells",null,eventInfo);});
on("change:repeating_lvl-1-spells:spellclass change:repeating_lvl-1-spells:spell_level change:repeating_lvl-1-spells:DC_misc change:repeating_lvl-1-spells:CL_misc change:repeating_lvl-1-spells:SP_misc  change:repeating_lvl-1-spells:Concentration_misc",function(eventInfo) {PFSheet.updateSpell("lvl-1-spells",null,eventInfo);});
on("change:repeating_lvl-2-spells:spellclass change:repeating_lvl-2-spells:spell_level change:repeating_lvl-2-spells:DC_misc change:repeating_lvl-2-spells:CL_misc change:repeating_lvl-2-spells:SP_misc  change:repeating_lvl-2-spells:Concentration_misc",function(eventInfo) {PFSheet.updateSpell("lvl-2-spells",null,eventInfo);});
on("change:repeating_lvl-3-spells:spellclass change:repeating_lvl-3-spells:spell_level change:repeating_lvl-3-spells:DC_misc change:repeating_lvl-3-spells:CL_misc change:repeating_lvl-3-spells:SP_misc  change:repeating_lvl-3-spells:Concentration_misc",function(eventInfo) {PFSheet.updateSpell("lvl-3-spells",null,eventInfo);});
on("change:repeating_lvl-4-spells:spellclass change:repeating_lvl-4-spells:spell_level change:repeating_lvl-4-spells:DC_misc change:repeating_lvl-4-spells:CL_misc change:repeating_lvl-4-spells:SP_misc  change:repeating_lvl-4-spells:Concentration_misc",function(eventInfo) {PFSheet.updateSpell("lvl-4-spells",null,eventInfo);});
on("change:repeating_lvl-5-spells:spellclass change:repeating_lvl-5-spells:spell_level change:repeating_lvl-5-spells:DC_misc change:repeating_lvl-5-spells:CL_misc change:repeating_lvl-5-spells:SP_misc  change:repeating_lvl-5-spells:Concentration_misc",function(eventInfo) {PFSheet.updateSpell("lvl-5-spells",null,eventInfo);});
on("change:repeating_lvl-6-spells:spellclass change:repeating_lvl-6-spells:spell_level change:repeating_lvl-6-spells:DC_misc change:repeating_lvl-6-spells:CL_misc change:repeating_lvl-6-spells:SP_misc  change:repeating_lvl-6-spells:Concentration_misc",function(eventInfo) {PFSheet.updateSpell("lvl-6-spells",null,eventInfo);});
on("change:repeating_lvl-7-spells:spellclass change:repeating_lvl-7-spells:spell_level change:repeating_lvl-7-spells:DC_misc change:repeating_lvl-7-spells:CL_misc change:repeating_lvl-7-spells:SP_misc  change:repeating_lvl-7-spells:Concentration_misc",function(eventInfo) {PFSheet.updateSpell("lvl-7-spells",null,eventInfo);});
on("change:repeating_lvl-8-spells:spellclass change:repeating_lvl-8-spells:spell_level change:repeating_lvl-8-spells:DC_misc change:repeating_lvl-8-spells:CL_misc change:repeating_lvl-8-spells:SP_misc  change:repeating_lvl-8-spells:Concentration_misc",function(eventInfo) {PFSheet.updateSpell("lvl-8-spells",null,eventInfo);});
on("change:repeating_lvl-9-spells:spellclass change:repeating_lvl-9-spells:spell_level change:repeating_lvl-9-spells:DC_misc change:repeating_lvl-9-spells:CL_misc change:repeating_lvl-9-spells:SP_misc  change:repeating_lvl-9-spells:Concentration_misc",function(eventInfo) {PFSheet.updateSpell("lvl-9-spells",null,eventInfo);});

//set repeating IDS
on("change:repeating_weapon:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("weapon",eventInfo);});
on("change:repeating_class-ability:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("class-ability",eventInfo);});
on("change:repeating_feat:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("feat",eventInfo);});
on("change:repeating_racial-trait:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("racial-trait",eventInfo);});
on("change:repeating_trait:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("trait",eventInfo);});
on("change:repeating_item:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("item",eventInfo);});
on("change:repeating_lvl-0-spells:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("lvl-0-spells",eventInfo);});
on("change:repeating_lvl-1-spells:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("lvl-1-spells",eventInfo);});
on("change:repeating_lvl-2-spells:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("lvl-2-spells",eventInfo);});
on("change:repeating_lvl-3-spells:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("lvl-3-spells",eventInfo);});
on("change:repeating_lvl-4-spells:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("lvl-4-spells",eventInfo);});
on("change:repeating_lvl-5-spells:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("lvl-5-spells",eventInfo);});
on("change:repeating_lvl-6-spells:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("lvl-6-spells",eventInfo);});
on("change:repeating_lvl-7-spells:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("lvl-7-spells",eventInfo);});
on("change:repeating_lvl-8-spells:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("lvl-8-spells",eventInfo);});
on("change:repeating_lvl-9-spells:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("lvl-9-spells",eventInfo);});
on("change:repeating_npc-spell-like-abilities:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("npc-spell-like-abilities",eventInfo);});
on("change:repeating_npc-spells1:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("npc-spells1",eventInfo);});
on("change:repeating_npc-spells2:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("npc-spells2",eventInfo);});
on("change:repeating_mythic-ability:ids-show",function(eventInfo) {PFSheet.checkIsNewRow("mythic-ability",eventInfo);});
on("change:repeating_mythic-feat:ids-show", function (eventInfo) { PFSheet.checkIsNewRow("mythic-feat", eventInfo); });

//reset based on config changes
on("change:wound_threshold-show", function (eventInfo) { setAttrs({"condition-Wounds":0}); });