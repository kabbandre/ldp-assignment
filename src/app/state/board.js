import { makeItem, makeList } from 'app/utils/data'
import { getItemById, getListById, getListByItemId } from 'app/utils/board'

export function state () {
  return {
    lists: [
      [
        {'id': '768798d0-c2b1-11eb-9048-cf1429504150', 'title': 'Issues', 'items': []},
        {'id': 'b33f9d30-c2b2-11eb-8f96-5500acd0ce7d', 'title': 'In Progress', 'items': []},
        {'id': 'b44aa490-c2b2-11eb-8f96-5500acd0ce7d', 'title': 'Done', 'items': []}]
    ],
  }
}

const getters = {
  getListById: state => listId => {
    return getListById(state.lists, listId)
  },

  getListByItemId: state => itemId => {
    return getListByItemId(state.lists, itemId)
  },

  getItemById: state => itemId => {
    return getItemById(state.lists, itemId)
  }
}

export const mutations = {
  lists (state, value) {
    state.lists = value
  },

  reset (state) {
    state.lists = []
  },

  addList (state, { title }) {
    state.lists.push(makeList(title))
  },

  moveList (state, [fromIndex, toIndex]) {
    state.lists.splice(toIndex, 0, state.lists.splice(fromIndex, 1)[0])
  },

  removeList (state, { listId }) {
    const index = state.lists.findIndex(list => list.id === listId)
    state.lists.splice(index, 1)
  },

  addItem (state, { listId, title, description, date, priority }) {
    const list = getListById(state.lists, listId)
    list.items.push(makeItem(title, description, date, priority))
  },

  updateItem (state, { itemId, title, description, date, priority }) {
    const item = getItemById(state.lists, itemId)
    if (item) {
      Object.assign(item, makeItem(title, description, date, priority, itemId))
    }
  },

  moveItem (state, [fromListRef, fromIndex, toListRef, toIndex]) {
    const fromList = typeof fromListRef === 'number'
      ? state.lists[fromListRef].items
      : getListById(state.lists, fromListRef)
    const toList = typeof toListRef === 'number'
      ? state.lists[toListRef].items
      : getListById(state.lists, toListRef)
    toList.splice(toIndex, 0, fromList.splice(fromIndex, 1)[0])
  },

  removeItem (state, { id }) {
    const list = getListByItemId(state.lists, id)
    list.items.splice(list.items.findIndex(item => item.id === id), 1)
  }
}

export default {
  state,
  mutations,
  getters,
}
