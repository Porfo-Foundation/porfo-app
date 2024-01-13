import {Chat} from './schema/chat.schema';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';
// export const schemas = [Chat];

const realmConfig: Realm.Configuration = {
  schema: [Chat],
  schemaVersion: 4,
};

export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
