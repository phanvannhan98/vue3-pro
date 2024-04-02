import { cloneDeep, keyBy } from 'lodash-es';
import { defineStore } from 'pinia';

import { TRoom } from '@/services/room';
import { store } from '@/store/index';

interface IState {
  rooms: TRoom[];
}

export const useRoomsStore = defineStore({
  id: 'rooms',
  state: (): IState => ({
    rooms: [],
  }),
  getters: {
    getRooms({ rooms }) {
      return keyBy(rooms, 'id');
    },
  },
  actions: {
    getRoomById(roomId: TRoom['id']) {
      return this.rooms.find(({ id }) => id === roomId);
    },

    setRooms(rooms: TRoom[]) {
      this.rooms = cloneDeep(rooms).map((room) => {
        return room;
      });
    },
  },
});

export const useRoomsStoreWithout = () => useRoomsStore(store);
