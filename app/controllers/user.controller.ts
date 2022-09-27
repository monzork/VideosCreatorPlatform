import {
  Get,
  Route,
  Controller,
  Query,
  Post,
  Body,
  SuccessResponse
} from 'tsoa';

interface sigIn {
  name: string;
  password: string;
}

@Route('users')
export class UserController extends Controller {
  @Get('{id}')
  public async read(id: number): Promise<any> {
    return { email: '', id: '', name: '', password: '', photo: '', type: '' };
  }

  // @Get()
  // public async readAll(@Query() search?: string): Promise<UserDTO[]> {
  //   return await db.User.findAll();
  // }

  // @SuccessResponse('201', 'Created')
  // @Post()
  // public async create(@Body() user: UserDTO): Promise<UserDTO> {
  //   user.password = bcrypt.hashSync(user.password, 3);
  //   return await db.User.create(user);
  // }

  // @SuccessResponse(200, 'Sign In')
  // async sigIn(userSigIn: sigIn) {
  //   const { dataValues: userFound } = await db.User.findOne({
  //     where: {
  //       name: userSigIn.name
  //     }
  //   });

  //   if (bcrypt.compareSync(userSigIn.password, userFound.password)) {
  //     const secret = process.env.SECRET as string;
  //     return { token: jwt.sign(userFound, secret) };
  //   }
  // }
  // read(req: Request, res: Response) {
  //   db.User.findById(req.params.id)
  //     .then((user: UserAttributes | null) => {
  //       if (user) {
  //         res.json(user);
  //       } else {
  //         res.status(204).send();
  //       }
  //     })
  //     .catch((err: any) => {
  //       res.json(err);
  //     });
  // }

  // create(req: Request, res: Response) {
  //   db.User.create(req.body)
  //     .then((user: UserAttributes) => {
  //       res.json(user);
  //     })
  //     .catch((err: any) => {
  //       res.status(500).json(err);
  //     });
  // }

  // update(req: Request, res: Response) {
  //   db.User.update(req.body, {
  //     fields: Object.keys(req.body),
  //     where: { id: req.params.id }
  //   })
  //     .then((affectedRows: [number, UserAttributes[]]) => {
  //       res.json({
  //         affectedRows: Number(affectedRows)
  //       });
  //     })
  //     .catch((err: any) => {
  //       res.json(err);
  //     });
  // }

  // delete(req: Request, res: Response) {
  //   db.User.destroy({
  //     where: { id: req.params.id }
  //   })
  //     .then((removedRows: number) => {
  //       res.json({
  //         removedRows
  //       });
  //     })
  //     .catch((err: any) => {
  //       res.json(err);
  //     });
  // }
}
