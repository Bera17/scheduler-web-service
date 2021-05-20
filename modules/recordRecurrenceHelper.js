const {RRule, RRuleSet, rrulestr} = require('rrule');
exports.checkRuleLimitTime= function(start, end, recurrenceRule){
    let startRule;
    let endRule;
    if(!recurrenceRule.includes("COUNT") && !recurrenceRule.includes("UNTIL")){
      //S'il n'y a pas de limite de temps dans la recurrence
      let newStartRule = addTimeLimitToRule(start, recurrenceRule);
      let newEndRule = addTimeLimitToRule(end, recurrenceRule);
  
      startRule = getRRule(start, newStartRule);
      endRule = getRRule(end, newEndRule);
    }else {
      startRule = getRRule(start, recurrenceRule);
      endRule = getRRule(end, recurrenceRule);
    }
    return {startRule, endRule}
  }
  
  function getRRule(date, recurrenceRule){
    let ruleDate = ruleFormatDate(date);
    return rrulestr('DTSTART:'+ruleDate+'Z\nRRULE:'+recurrenceRule)
  }
  
  function addTimeLimitToRule(date, recurrenceRule){
    let addedOneYear = getDateOneYearAfter(new Date(date))
    return recurrenceRule.concat(';UNTIL=', ruleFormatDate(addedOneYear));
  }
  
  function ruleFormatDate(date){
    let tempDate1 = new Date(date).toISOString().split('.')[0];
    let tempDate2 = tempDate1.replace(/-/g, '').replace(/:/g, '');
    return tempDate2;
  }
  
  function getDateOneYearAfter(date){
    //date.setFullYear(date.getFullYear()+1)
    date.setDate(date.getDate()+13)
    date.setHours(23)
    date.setMinutes(59)
    date.setSeconds(59)
    return date;
  }