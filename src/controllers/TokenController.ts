import TokenModel from "../models/TokenModel";
import { Request, Response, NextFunction } from "express";
class TokenController {
    getAllToken = async (req: Request, res: Response, next: NextFunction) => {
        console.log("Đã vào index123");
        const data = await TokenModel.find();
        res.json(data);
    }

    saveToken = async (req: Request, res: Response, next: NextFunction) => {
        let token = new TokenModel({
            setting: {
                name: "Ant",
            }
        })
        res.json(await token.save());
    }
}

export default new TokenController;