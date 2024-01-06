import { NextFunction,Request,Response } from "express";
import { ICreateCarReq } from "../interfaces/service/car.interface";
import CarService from "../services/car.service";

class CarController {
    public CarService = new CarService();


    public createCar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const carData: ICreateCarReq = req.body;
            const createCarData = await this.CarService.createCar(carData);
            res.status(201).json({ data: createCarData, message: 'car succesfully created' });
        } catch (error) {
            next(error);
        }
    }
}

export default CarController;