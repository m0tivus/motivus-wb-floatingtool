import { SET_STATS } from 'actions/types'

const INITIAL_STATE = {
  quantity: 0,
  base_time: 0,
  flops: 0,
  elapsed_time: 0,
  ranking: 0,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_STATS:
      return action.stats
    default:
      return state
  }
}
