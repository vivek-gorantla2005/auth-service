import { Router } from "express"
import Authentication from "../controllers/auth-controller.js";
const router = Router();

const auth = new Authentication();

router.post('/register', (req, res) => auth.register(req, res));
router.post('/login', (req, res) => auth.login(req, res));

export default router;