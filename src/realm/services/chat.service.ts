// import {Chat} from '../schema/chat.schema';
import Realm from 'realm';

export const addChat = async (realm: Realm, chat: any) => {
  try {
    // console.log('chat', chat);
    realm.write(() => {
      realm.create('Chat', {
        ...chat,
        _id: new Realm.BSON.ObjectId(),
        data: JSON.stringify(chat.data),
      });
    });
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
