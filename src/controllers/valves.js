import { valveTogle } from "../services/valves";


export const valve1Controller = async (req, res) => {

    const status = valveTogle(1);
    console.log(status);

    res.status(200).json({
        message: `Users accesfuly`,
        avatars: usersAvatarsArr,
    });
};

export const valve2Controller = async (req, res) => {
    const status = valveTogle(2);
    console.log(status);

    res.status(200).json({
        message: `Users accesfuly`,
        avatars: usersAvatarsArr,
    });
};