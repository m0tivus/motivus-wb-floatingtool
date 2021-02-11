import { SET_STATS } from 'actions/types'

const INITIAL_STATE = {
  task_quantity: 0,
  elapsed_time: 0,
  processing_ranking: 0,
  flop: 0,
  season: {},
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_STATS:
      return action.stats
    default:
      return state
  }
}
