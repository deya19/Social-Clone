import  events  from 'node:events';
import { db } from "../db/connect.js";
import { queryList } from '../db/queries.js';
import { Audit } from '../model/audit.model.js';
import dotenv from 'dotenv';
dotenv.config();

const emitter = new events.EventEmitter();

const auditEvent = process.env.AUDIT_EVENT; 
emitter.on(auditEvent , async(Audit)=>{
  // steps of actions - save into db  
  console.log("Audit Event Emmitter - Audit : " + JSON.stringify(Audit));
  try {
    const values = [Audit.auditAction, JSON.stringify(Audit.data), Audit.status, Audit.error, Audit.auditBy, Audit.auditOn];
    const q = queryList.AUDIT_QUERY;
    db.query(q, [values]);
  } catch (error) {
    console.log("Audit Event Emmitter - error : " + error);
  }
});

export const prepareAudit = (auditAction, data, error, auditBy, auditOn) =>{
   let status = 200;
   if(error)
       status = 500;

    const auditObj = new Audit(auditAction,data,status,error,auditBy,auditOn);
    emitter.emit(auditEvent , auditObj);
}