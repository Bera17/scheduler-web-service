const {POOL: pool} = require('../utils/config')

const getRecords = (request, response) => {
    let startDate = new Date(request.query.currentDay.start);
    let endDate = new Date(request.query.currentDay.start);
    endDate.setDate(startDate.getDate()+1);
    
    pool.query(`SELECT * FROM "scheduler-app".records 
                WHERE start >= $1 AND "end" < $2 `, [startDate, endDate] ,(error, results) => {
        if (error) {
            throw error
        }
        //console.log({"records":results.rows});
        response.status(200).json({"records":results.rows})
    })
}

const createRecord = (request, response) => {
    const parsedObj = JSON.parse(request.body.models)
    const obj = parsedObj.models[0]

    if(obj.recurrenceRule.length === 0){ // S'il n'y a pas de recurrences
      const { etat, avancement, titre, canalId, start, end, source, isAdobe, isWeb, isAvide, isArchive, isDiffusion, restrictionId, descrRestriction, bcTypeId, bcUmid, bcTitle, bcMemo, purgeDate, padId, asset, demandeur, serieId, commentaire, resume} = obj;
      pool
        .query(`
        INSERT INTO "scheduler-app".records 
          (etat, avancement, titre, "canalId", start, "end", source, "isAdobe", "isWeb", "isAvide", "isArchive", "isDiffusion", "restrictionId", "descrRestriction", "bcTypeId", "bcUmid", "bcTitle", "bcMemo", "purgeDate", "padId", asset, demandeur, "serieId", commentaire, resume) 
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25) 
          RETURNING *`, 
          [etat, avancement, titre, canalId, start, end, source, isAdobe, isWeb, isAvide, isArchive, isDiffusion, restrictionId, descrRestriction, bcTypeId, bcUmid, bcTitle, bcMemo, purgeDate, padId, asset, demandeur, serieId, commentaire, resume])
        .then((results)=> {
          response.status(201).send({"records": results.rows[0]})
        })
        .catch(err => console.log("Error executing query", err.stack))
    }
    else{
      let resultsRows=[];
      createRecurrenceHeadRecord(obj, resultsRows, response);
    }
}

const rrhelper = require('../modules/recordRecurrenceHelper')
function createRecurrenceHeadRecord(obj, resultsRows, response){
  const { etat, avancement, titre, canalId, start, end, recurrenceRule, recurrenceException, source, isAdobe, isWeb, isAvide, isArchive, isDiffusion, restrictionId, descrRestriction, bcTypeId, bcUmid, bcTitle, bcMemo, purgeDate, padId, asset, demandeur, serieId, commentaire, resume } = obj;
  const {startRule, endRule} = rrhelper.checkRuleLimitTime(start, end, recurrenceRule);
  // console.log(startRule.toString());
  // console.log(startRule.all());
  pool
    .query(`
  INSERT INTO "scheduler-app".records 
    (etat, avancement, titre, "canalId", start, "end", "recurrenceRule", "recurrenceException", source, "isAdobe", "isWeb", "isAvide", "isArchive", "isDiffusion", "restrictionId", "descrRestriction", "bcTypeId", "bcUmid", "bcTitle", "bcMemo", "purgeDate", "padId", asset, demandeur, "serieId", commentaire, resume) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27) 
    RETURNING *`, 
    [etat, avancement, titre, canalId, startRule.all()[0], endRule.all()[0], recurrenceRule, recurrenceException, source, isAdobe, isWeb, isAvide, isArchive, isDiffusion, restrictionId, descrRestriction, bcTypeId, bcUmid, bcTitle, bcMemo, purgeDate, padId, asset, demandeur, serieId, commentaire, resume])
    .then((results) => {
      resultsRows[0] = results.rows[0];
      createRecurrenceSeriesRecords(obj, resultsRows, response, startRule, endRule, resultsRows[0].recordId);
    })
    .catch(err => console.log("Error executing query", err.stack))
}

function createRecurrenceSeriesRecords(obj, resultsRows, response, startRule, endRule, headRecordId){
  const { etat, avancement, titre, canalId, source, isAdobe, isWeb, isAvide, isArchive, isDiffusion, restrictionId, descrRestriction, bcTypeId, bcUmid, bcTitle, bcMemo, purgeDate, padId, asset, demandeur, serieId, commentaire, resume } = obj;
  //console.log("Create recurr reco headRecordId", headRecordId);
  for(let i=1; i<startRule.all().length; i++){
    pool
      .query(`
        INSERT INTO "scheduler-app".records 
          (etat, avancement, titre, "canalId", start, "end", "recurrenceId", source, "isAdobe", "isWeb", "isAvide", "isArchive", "isDiffusion", "restrictionId", "descrRestriction", "bcTypeId", "bcUmid", "bcTitle", "bcMemo", "purgeDate", "padId", asset, demandeur, "serieId", commentaire, resume) 
          VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26)
          RETURNING *`, 
          [etat, avancement, titre, canalId, startRule.all()[i], endRule.all()[i], headRecordId, source, isAdobe, isWeb, isAvide, isArchive, isDiffusion, restrictionId, descrRestriction, bcTypeId, bcUmid, bcTitle, bcMemo, purgeDate, padId, asset, demandeur, serieId, commentaire, resume])
      .then((results)=>{
          resultsRows[i] = results.rows[0];
          if(i === startRule.all().length-1){
            console.log("records results ", resultsRows);
            response.status(201).send({"records": resultsRows})
          }
      })
      .catch(err => console.log("Error executing query", err.stack))
  }
}

const updateRecord = (request, response) => {
    const parsedObj = JSON.parse(request.body.models)
    console.log("Update parsedObj", parsedObj.models[0]);
    const id = parseInt(parsedObj.models[0].recordId)
    const { etat, avancement, titre, canalId, start, end, recurrenceRule, recurrenceException, recurrenceId, source, isAdobe, isWeb, isAvide, isArchive, isDiffusion, restrictionId, descrRestriction, bcTypeId, bcUmid, bcTitle, bcMemo, purgeDate, padId, asset, demandeur, serieId, commentaire, resume } = parsedObj.models[0]
    console.log("Update Id ", id);
    pool.query(
      `UPDATE "scheduler-app".records 
      SET etat=$1, avancement=$2, titre=$3, "canalId"=$4, start=$5, "end"=$6, "recurrenceRule"=$7, "recurrenceException"=$8, "recurrenceId"=$9, source=$10, "isAdobe"=$11, "isWeb"=$12, "isAvide"=$13, "isArchive"=$14, "isDiffusion"=$15, "restrictionId"=$16, "descrRestriction"=$17, "bcTypeId"=$18, "bcUmid"=$19, "bcTitle"=$20, "bcMemo"=$21, "purgeDate"=$22, "padId"=$23, asset=$24, demandeur=$25, "serieId"=$26, commentaire=$27, resume=$28
      WHERE "recordId"=$29`,
      [etat, avancement, titre, canalId, start, end, recurrenceRule, recurrenceException, recurrenceId, source, isAdobe, isWeb, isAvide, isArchive, isDiffusion, restrictionId, descrRestriction, bcTypeId, bcUmid, bcTitle, bcMemo, purgeDate, padId, asset, demandeur, serieId, commentaire, resume, id],
      (error, results) => {
        if (error) {
          throw error
        }
        console.log(results);
        response.status(201).send({"records": results.rows[0]})
      }
    )
}

const deleteRecord = (request, response) => {
    const parsedObj = JSON.parse(request.body.models)
    const id = parseInt(parsedObj.models[0].recordId)

    pool.query('DELETE FROM "scheduler-app".records WHERE "recordId" = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send('')
    })
}

  module.exports = {
      getRecords,
      createRecord,
      updateRecord,
      deleteRecord
  }