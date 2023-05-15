
export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

type DataStoreMethods = {
  [K in keyof DataEntityMap as `getAll${Capitalize<K>}s`]: () => DataEntityMap[K][]
} & {
    [K in keyof DataEntityMap as `get${Capitalize<K>}`]: (id: string) => DataEntityMap[K]
  } & {
    [K in keyof DataEntityMap as `clear${Capitalize<K>}s`]: () => void
  } & {
    [K in keyof DataEntityMap as `add${Capitalize<K>}`]: (props: DataEntityMap[K]) => DataEntityMap[K]
  }


function isDefined<T>(x: T | undefined): x is T {
  return typeof x !== "undefined"
}

export class DataStore implements DataStoreMethods {
  #data: { [K in keyof DataEntityMap]: Record<string, DataEntityMap[K]> } = {
    movie: {},
    song: {}
  }

  getAllSongs(): Song[] {
    return Object.keys(this.#data.song).map(
      (songkey) => this.#data.song[songkey]
    ).filter(isDefined)
  }
  getSong(id: string): Song {
    const song = this.#data.song[id]
    if (!song) throw new Error(`could not find the ${id}`)
    return song
  }
  clearSongs(): void {
    this.#data.song = {}
  }
  getAllMovies(): Movie[] {
    return Object.keys(this.#data.movie).map(
      (songkey) => this.#data.movie[songkey]
    ).filter(isDefined)
  }
  getMovie(id: string): Movie {
    const moive = this.#data.movie[id]
    if (!moive) throw new Error(`could not find the ${id}`)
    return moive
  }
  clearMovies(): void {
    this.#data.movie = {}
  }

  addMovie(props: Movie): Movie {
    this.#data.movie[props.id] = props
    return props
  }
  addSong(props: Song): Song {
    this.#data.song[props.id] = props
    return props
  }
}