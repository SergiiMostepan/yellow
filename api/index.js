const movies = {
    slug: '/movies',
    fetchAllMovies() {
        return this.slug
    },
    fetchMovie({id, name, genre}) {
        let endpoint = `${this.slug}?`
        if (id) {
            endpoint = endpoint + `movie_id=${id}&`
        }
        if (name) {
            endpoint = endpoint + `name=${name}&`
        }
        if (genre || genre === 0) {
            endpoint = endpoint + `genres=${genre}&`
        }
        return endpoint.slice(0, -1)
    },
}
const sessions = {
    slug: '/movieShows',
    fetchSessions(id) {
        return `${this.slug}?movie_id=${id}`
    }
}
const showPlaces = {
    slug: '/showPlaces',
    checkFreePlace(id,daytime,showdate) {
        return `${this.slug}?movie_id=${id}&daytime=${daytime}&showdate=${showdate}`
    }
}
const bookPlace = {
    slug: '/bookPlace',
    bookPlace() {
        return this.slug
    }
}
export const api = {
    movies,
    sessions,
    showPlaces,
    bookPlace
}