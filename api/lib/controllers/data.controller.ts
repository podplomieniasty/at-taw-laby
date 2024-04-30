import { checkPostCount } from '../middlewares/checkPostCount.middleware';
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router, response } from 'express';
import DataService from '../modules/services/data.service';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
    public path = '/api/data';
    public router = Router();
    public dataService = new DataService();

   constructor() {
       this.initializeRoutes();

   }

   private initializeRoutes() {
    //    this.router.get(`${this.path}/latest`, this.getAll);
    //    this.router.get(`${this.path}s`, this.getAll);
    //    this.router.get(`${this.path}/:id`, this.getById);

    //    this.router.post(`${this.path}/:id`, this.addData);
    //    this.router.post(`${this.path}`, this.addSampleData);
    //    //this.router.post(`${this.path}s/:num`, this.fetchNum);

    //    this.router.post(`${this.path}/:num`, checkPostCount, this.fetchNum);

    //    this.router.delete(`${this.path}/:id`, this.dropByIndex);
    //    this.router.delete(`${this.path}s`, this.dropAll);

        this.router.get(`${this.path}/:id`, this.getElementById);
        this.router.get(`${this.path}/`, this.getData);

        this.router.post(`${this.path}/add`, this.addData);

        this.router.delete(`${this.path}/:id`, this.removePost);
        this.router.delete(`${this.path}/`, this.removeAllPosts);
   }

//    private getById = async (req: Request, res: Response, next: NextFunction) => { 
//         const {id} = req.params;
//         if (parseInt(id) >= testArr.length || parseInt(id) < 0) res.status(404).json({});
//         else res.status(200).json(testArr[parseInt(id)]);
//    }

//    private getAll = async (req: Request, res: Response, next: NextFunction) => {
//         res.status(200).json(testArr);
//    }

//    private addData = async (req: Request, res: Response, next: NextFunction) => {
//         const {id} = req.params;
//         testArr.push(parseInt(id));
//         res.status(200).json(testArr)
//    }
//    private addSampleData = async (req: Request, res: Response, next: NextFunction) => {
//         testArr.push(69);
//         res.status(200).json(testArr)
//     }

//     private fetchNum = async (req: Request, res: Response, next: NextFunction) => {
//         const {num} = req.params;
//         if(parseInt(num) < 1) {
//             res.status(404).json({});
//         }
//         else {
//             res.status(200).json(testArr.filter((e, i) => i < parseInt(num)));
//         }
//     }
//     private dropByIndex = async (req: Request, res: Response, next: NextFunction) => {
//         const {id} = req.params;
//         if (parseInt(id) >= testArr.length || parseInt(id) < 0) {
//             res.status(404).json({});
//         } 
//         else {
//             testArr = testArr.filter((e, i) => i != parseInt(id));
//             res.status(200).json(testArr);
//         }
//     }
//     private dropAll = async (req: Request, res: Response, next: NextFunction) => {
//             testArr = [];
//             res.status(200).json(testArr);
//     }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const {title, text, image} = request.body;
    
        const readingData = {
            title,
            text,
            image
        };
    
        try {
            await this.dataService.createPost(readingData);
            response.status(200).json(readingData);
        } catch (error) {
            console.log('eeee', error)
    
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private getElementById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query({_id: id});
        response.status(200).json(allData);
     }

    private getData = async (request: Request, response: Response, next: NextFunction) => {
        const data = await this.dataService.fetchPosts();
        response.status(200).json(data);
    }
     
     private removePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteData({_id: id});
        response.sendStatus(200);
     };

    private removeAllPosts = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    await this.dataService.deleteAllPosts();
    response.sendStatus(200);
    };
     

}

export default PostController;

