import { Router } from "express";

const router = Router();

router.get('/', (req, res)=>{
    const rotulos = {
        title:"Listo para trabajar con socket"
    }
    res.render('index', {
        rotulos
    });
});
export default router;