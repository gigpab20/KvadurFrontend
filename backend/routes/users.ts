import {Router, Response, Request} from "express";
import users from "../mockdata/mock_users.json";
import {UserModel} from "../userModel";

var router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send(users);
});

router.get("/username/:username", (req: Request, res: Response) => {
    let user = users.users.find((user: UserModel) => user.username === req.params.username);
    if (user) {
        res.status(200).send(users.users.find((user: UserModel) => user.username === req.params.username));
    } else {
        res.status(404).send("User not found");
    }
});

module.exports = router;