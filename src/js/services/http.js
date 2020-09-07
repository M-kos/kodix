export class HttpRequest {
  static async getData(url) {
    try {
      const result = await fetch(url)

      if (!result.ok) {
        throw new Error('Something went wrong')
      }

      const data = await result.json()

      return data
    } catch (error) {
      throw new Error(error)
    }
  }
}
