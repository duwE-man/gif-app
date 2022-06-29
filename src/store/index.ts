import { createDirectStore, defineActions } from "direct-vuex"
import { tenorApi } from "../helpers/tenorApi"

interface State {
  displayedGifs: Array<string>
  next: string
}
const state: State = {
  displayedGifs: [],
  next: ""
}
const mutations = {
  SET_DISPLAYED_GIFS(state: State, newGifs: Array<string>) {
    state.displayedGifs = newGifs
  },
  PUSH_DISPLAYED_GIFS(state: State, newGifs: Array<string>) {
    state.displayedGifs.push(...newGifs)
  },
  SET_POS_NEXT(state: State, pos: string) {
    state.next = pos
  },
  CLEAR_GIFS(state: State) {
    state.displayedGifs = []
  }
}

const actions = defineActions({
  async getSearchedGifs(context, {searchTerm, limit}: {searchTerm: string, limit: number}) {
    const { commit } = rootActionContext(context)
    const gifUrls: Array<string> = []

    const response = await tenorApi.searchGif(searchTerm, limit)
    if (response.results) {
      response.results.forEach((result: any) => {
        gifUrls.push(result.media_formats.tinygif.url)
      })
      commit.SET_DISPLAYED_GIFS(gifUrls)
    } else {
      commit.SET_DISPLAYED_GIFS([])
    }
  },
  async getFeaturedGifs(context, limit: number) {
    const { commit } = rootActionContext(context)

    const response = await tenorApi.featuredGif(limit)
    if (response.results) {
      commit.SET_POS_NEXT(response.next)
      const gifs: Array<string> = []
      response.results.forEach((result: any) => {
        gifs.push(result.media_formats.tinygif.url)
      })
      commit.SET_DISPLAYED_GIFS(gifs)
    } else {
      commit.SET_DISPLAYED_GIFS([])
    }
  },
  async getFeaturedNext(context, limit: number) {
    const { commit, state } = rootActionContext(context)

    const response = await tenorApi.featuredGif(limit, state.next)
    if (response.results) {
      const gifs: Array<string> = []
      response.results.forEach((result: any) => {
        gifs.push(result.media_formats.tinygif.url)
      })
      commit.PUSH_DISPLAYED_GIFS(gifs)
    }
  }
})

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
} = createDirectStore({
  state: state,
  mutations: mutations,
  actions: actions
})
export default store.original
export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
  store
}

export type AppStore = typeof store
declare module "vuex" {
  interface Store<S> {
    direct: AppStore
  }
}