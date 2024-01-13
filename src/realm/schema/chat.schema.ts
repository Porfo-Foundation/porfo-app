import Realm, {ObjectSchema} from 'realm';

// Define your object model
export class Chat extends Realm.Object<Chat> {
  _id!: Realm.BSON.ObjectId;
  taskId!: string;
  type!: string;
  msg?: string;
  data?: string;
  role!: string;
  status!: string;
  timeStamp!: number;
  userAddress!: string;

  static schema: ObjectSchema = {
    name: 'Chat',
    properties: {
      _id: 'objectId',
      taskId: 'string',
      type: 'string',
      msg: {type: 'string', optional: true},
      data: 'string?',
      role: 'string',
      status: 'string',
      timeStamp: 'int',
      userAddress: 'string',
    },
    primaryKey: '_id',
  };
}
