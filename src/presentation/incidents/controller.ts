import { Request, Response } from "express"
import { IncidentModel } from "../../data/models/incident.model"
import { StatusCodes } from "http-status-codes"

export class IncidentController {
  public getIncidents = async(req: Request, res: Response)=>{
    try{
      const incident = await IncidentModel.find()
      res.json(incident).status(StatusCodes.OK)
    }catch(error){
      res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  public createIncident = async(req: Request, res: Response)=>{
    try{
      const { title, description, lat, lng} = req.body
      const newIncident = await IncidentModel.create({
        title: title,
        description: description,
        lat: lat,
        lng: lng
      })
      res.json(newIncident).status(StatusCodes.CREATED)
    }catch(error){
      res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
  
  public getIncidentById = async(req: Request, res: Response)=>{
    try{
      const { id } = req.params
      const incident = await IncidentModel.findById(id);
      res.json(incident).status(StatusCodes.OK)
    }catch(error){
      res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
  
  public updateIncident = async(req: Request, res: Response)=>{
    try{
      const { id } = req.params
      const { title, description, lat, lng} = req.body

      const incident = await IncidentModel.findByIdAndUpdate(id, {
        title: title,
        description: description,
        lat: lat,
        lng: lng
      })

      res.json(incident).status(StatusCodes.OK)
    }catch(error){
      res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
  
  public deleteIncident = async(req: Request, res: Response)=>{
    try{
      const { id } = req.params

      await IncidentModel.findByIdAndDelete(id)

      res.status(StatusCodes.OK)
    }catch(error){
      res.json(error).status(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }
    
}