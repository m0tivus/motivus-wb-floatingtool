import { UPDATE_STATS } from 'actions/types'

const INITIAL_STATE = {
  quantity: 0,
  base_time: 0,
  flops: 0,
  elapsed_time: 0,
  ranking: 'n/a',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_STATS:
      return action.stats
    default:
      return state
  }
}
